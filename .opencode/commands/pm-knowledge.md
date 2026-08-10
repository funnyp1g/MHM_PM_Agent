---
description: 维护/补充产品知识库（新增功能模块、更新关联图谱、补充术语）。
agent: pm
---

# 更新产品知识库

请根据以下内容维护产品知识库 `product-knowledge/`。

## 更新内容

$ARGUMENTS

## 执行要求

1. 加载 `product-knowledge` 技能，按其规范执行。
2. 根据内容判断属于哪种更新：
   - 新增功能模块 → 在 `features/` 新建 `<name>.md`（参照 `_template.md`）
   - 更新既有功能 → 编辑对应文件并保持格式一致
   - 功能关联变化 → 更新 `relations.md`
   - 新术语 → 补充到 `glossary.md` 后再使用
   - 核心实体、字段、状态或金额口径 → 更新 `data-dictionary.md`
   - 指标定义、公式、数据来源或目标 → 更新 `metrics.md`
   - 证据不足或来源冲突 → 更新 `open-questions.md`，并标注证据类型
3. 保持所有文件结构与既有格式一致。
4. 完成后运行 `.opencode/scripts/validate-pm-agent.mjs --knowledge`，并给出变更摘要：更新了哪些文件、改了什么、是否有待确认的缺口。

## 输出总结模板

- **变更文件**：
- **变更内容**：
- **知识缺口**：（尚未填充、需人工确认的部分）
