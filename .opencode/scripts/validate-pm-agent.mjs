#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredKnowledge = [
  "product-knowledge/README.md",
  "product-knowledge/product-overview.md",
  "product-knowledge/relations.md",
  "product-knowledge/glossary.md",
  "product-knowledge/data-dictionary.md",
  "product-knowledge/metrics.md",
  "product-knowledge/open-questions.md",
  "product-knowledge/ui/README.md",
  "product-knowledge/ui/design-system.md",
  "product-knowledge/ui/pages.md",
];

const requiredCore = [
  "pm-agent-core/README.md",
  "pm-agent-core/ROLE.md",
  "pm-agent-core/KNOWLEDGE.md",
  "pm-agent-core/BOUNDARIES.md",
  "pm-agent-core/WORKFLOW.md",
  "pm-agent-core/OUTPUT.md",
  "pm-agent-core/REVIEW.md",
  "pm-agent-core/prompts/prd.md",
  "pm-agent-core/prompts/review.md",
];

const errors = [];
const warnings = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`缺少文件：${relativePath}`);
    return "";
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function checkKnowledge() {
  for (const file of requiredCore) read(file);
  for (const file of requiredKnowledge) read(file);
  const opencodeConfig = path.join(root, "opencode.json");
  if (fs.existsSync(opencodeConfig)) {
    const config = fs.readFileSync(opencodeConfig, "utf8");
    if (/\/Users\/|\\Users\\|Downloads\//.test(config)) {
      errors.push("opencode.json 包含个人电脑绝对路径，请改用本机配置模板");
    }
  }
  const uiDir = path.join(root, "product-knowledge/ui");
  const observations = fs.existsSync(uiDir)
    ? fs.readdirSync(uiDir).filter((name) => /^device-observation-.*\.md$/.test(name))
    : [];
  if (observations.length === 0) errors.push("缺少 ui/device-observation-*.md 实机观察记录");

  const pageRegistry = read("product-knowledge/ui/pages.md");
  const snapshots = (pageRegistry.match(/^## 页面:/gm) ?? []).length;
  const pending = (pageRegistry.match(/待补充/g) ?? []).length;
  if (snapshots < 5) warnings.push(`页面结构化快照数量偏少：${snapshots}`);
  if (pending > 0) warnings.push(`页面注册表仍有 ${pending} 处“待补充”，涉及这些页面时必须在 PRD 显式标注`);

  const questions = read("product-knowledge/open-questions.md");
  if (!/\| P0 \|/.test(questions)) warnings.push("open-questions.md 当前没有 P0 待确认项记录");
}

const sectionAliases = [
  ["背景与目标", /背景与目标|需求背景与目标/],
  ["用户与场景", /用户与场景|用户与使用场景/],
  ["需求说明", /功能需求|核心业务逻辑|需求说明/],
  ["页面与交互", /页面与交互|原型与页面依据|核心业务逻辑/],
  ["既有功能关联", /与既有功能的关联|与既有功能关联/],
  ["权限与安全", /权限与业务安全|权限与安全|业务规则与边界/],
  ["风险与依赖", /风险与依赖/],
  ["验收", /验收标准|验收清单/],
];

function validatePrd(relativePath) {
  const content = read(relativePath);
  if (!content) return;
  for (const [label, pattern] of sectionAliases) {
    if (!pattern.test(content)) errors.push(`${relativePath} 缺少章节：${label}`);
  }

  const gwtCount = (content.match(/Given|When|Then/g) ?? []).length;
  if (gwtCount < 3) errors.push(`${relativePath} Given/When/Then 验收内容不足（当前 ${gwtCount} 个）`);

  if (!/待确认|假设|无待确认项/.test(content)) {
    errors.push(`${relativePath} 未明确假设与待确认项`);
  }
  if (!/评审状态/.test(content)) warnings.push(`${relativePath} 未标注文档评审状态`);
  if (!/data-dictionary\.md|数据字典|核心数据实体|业务对象/.test(content)) {
    warnings.push(`${relativePath} 未引用核心数据字典或业务对象口径`);
  }
  if (!/metrics\.md|效果衡量|成功标准|指标/.test(content)) {
    warnings.push(`${relativePath} 未说明效果衡量或指标状态`);
  }

  const pages = [...content.matchAll(/`([a-z][a-z0-9-]+)`/g)].map((match) => match[1]);
  const pageRegistry = read("product-knowledge/ui/pages.md");
  const glossary = read("product-knowledge/glossary.md");
  const known = new Set([
    ...[...pageRegistry.matchAll(/`([a-z][a-z0-9-]+)`/g)].map((match) => match[1]),
    ...[...glossary.matchAll(/`([a-z][a-z0-9-]+)`/g)].map((match) => match[1]),
  ]);
  for (const page of new Set(pages)) {
    if (!known.has(page) && !new RegExp(`${page}[^\n]*(临时|待注册|新增)`).test(content)) {
      warnings.push(`${relativePath} 引用了未注册页面ID：${page}；请标注为临时ID或补充页面注册`);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  const knowledgeOnly = args.includes("--knowledge");
  checkKnowledge();
  if (!knowledgeOnly) {
    const explicit = args.filter((arg) => !arg.startsWith("--"));
    const prds = explicit.length > 0
      ? explicit
      : fs.readdirSync(path.join(root, "docs/prd"))
          .filter((name) => name.endsWith(".md"))
          .map((name) => path.join("docs/prd", name));
    for (const prd of prds) validatePrd(prd);
  }

  for (const warning of warnings) console.log(`WARN  ${warning}`);
  for (const error of errors) console.error(`ERROR ${error}`);
  console.log(`\n校验完成：${errors.length} 个错误，${warnings.length} 个警告`);
  process.exitCode = errors.length > 0 ? 1 : 0;
}

main();
