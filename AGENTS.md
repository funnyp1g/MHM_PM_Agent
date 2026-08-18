# AGENTS.md

本项目是「产品经理 Agent (PM Agent)」框架。使用 Codex、Claude Code、OpenCode 或其他 Agent 时，开始任何产品需求、PRD、知识库或页面评审任务前，必须先读取并严格遵循：

- `pm-agent-core/AGENT.md`

该文件是跨平台唯一执行入口和权威规则源，统一规定角色、产品知识读取、强制澄清、需求分析、PRD 编写与评审、Open Design、OpenSpec、知识库维护和校验要求。

## 平台入口

- Codex：读取本文件后执行 `pm-agent-core/AGENT.md`。
- Claude Code：读取 `CLAUDE.md` 和 `.claude/commands/` 后执行 `pm-agent-core/AGENT.md`。
- OpenCode：读取 `.opencode/agent/pm.md` 或 `.opencode/commands/` 后执行 `pm-agent-core/AGENT.md`。

平台入口只负责加载统一规范、传入参数和提供宿主命令，不得复制或覆盖统一规范中的业务规则。

## 常用调用

```text
按 pm-agent-core/AGENT.md 为以下需求生成 PRD：……
评审 docs/prd/<file>.md
维护产品知识库：……
```

## 目录结构

```text
├── pm-agent-core/                 # 跨平台唯一核心规范
├── product-knowledge/             # 产品知识库
├── docs/prd/                      # PRD 输出目录
├── .opencode/                     # OpenCode 适配入口、命令与技能
├── .claude/                       # Claude Code 命令入口
├── adapters/                      # 平台适配说明
└── openspec/                      # OpenSpec 变更管理
```

## 验证命令

```bash
node .opencode/scripts/validate-pm-agent.mjs
openspec validate --all
```
