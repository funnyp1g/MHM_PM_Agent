---
description: 基于产品知识库，为给定新功能需求生成中文 PRD 文档。
agent: pm
---

# 生成 PRD

请为以下需求撰写完整的 PRD 文档。

## 需求描述

$ARGUMENTS

## 执行要求

1. 先读取 `pm-agent-core/README.md`、`ROLE.md`、`KNOWLEDGE.md`、`BOUNDARIES.md`、`WORKFLOW.md` 和 `OUTPUT.md`，再加载 `product-knowledge` 技能，完整读取 `product-knowledge/README.md`、`product-overview.md`、相关 `features/`、`relations.md`、`glossary.md`、`data-dictionary.md`、`metrics.md`、`open-questions.md`、`ui/README.md`、`ui/design-system.md`、`ui/pages.md`，以及最新的 `ui/device-observation-*.md`。
2. 加载 `requirement-analysis` 技能，完成需求拆解与功能关联分析（明确依赖、影响面、复用组件）。
3. 加载 `prd-writing` 技能，按“业务优先”标准中文 PRD 模板输出。
   - 重点展开业务背景、现状痛点、需求目标、用户场景、业务逻辑、业务规则、边界和需求说明。
   - 页面与交互从用户行为和业务结果描述，不把组件、接口或实现细节当作需求主体。
   - 技术实体、字段类型、API、算法、缓存和完整埋点表不写入正文，只有影响业务决策时才以“技术备注”简述。
4. 执行强制澄清：若名词含义、业务逻辑或交互样式存在不确定、歧义或多个合理解释，必须暂停并先向我提问，不得臆测、写 PRD 或调用 Open Design。得到回答后，将答案作为当前需求的优先依据并继续执行。除此之外，只有不影响本期决策的资料缺口才可采用明确标注的业务假设继续输出。
5. 判断需求是否涉及页面、组件、页面跳转或交互，并在 PRD 中完成页面与交互说明；这一步不要求调用 Open Design。
6. 将 PRD 写入 `docs/prd/`，命名 `YYYY-MM-DD-<feature-slug>.md`。PRD 产出后，若涉及页面，提示用户是否需要连接本机已配置的 `open-design` MCP 制作原型；仓库默认不要求配置 Open Design。
7. 仅当用户确认需要原型时：读取 `product-knowledge/ui/README.md` 的 Open Design 规范，调用 Open Design；原型输入必须包含 PRD、设计系统、页面快照和最新实机观察，新增页面使用临时页面ID，并覆盖默认、空态、加载、错误、禁用和关键成功/失败反馈。
8. 原型完成后进行评审，核对原型与 PRD 的业务规则、字段、状态、跳转、页面ID和设计系统一致性；将原型链接/标识、页面映射、差异和待确认项回写 PRD。用户未选择原型时，不创建原型记录，也不阻塞 PRD 评审或归档。
9. 评审确认新增或改版页面后，同步更新 `product-knowledge/ui/pages.md`、`relations.md` 和受影响功能文件。
10. Open Design 不自动触发 OpenSpec。只有明确需要变更追踪时才走 `/opsx-propose`。
11. 完成后：给出 PRD 文件路径、核心结论摘要、「与既有功能关联」要点、“实机依据/设计依据/待确认项”；如用户选择原型，再补充 Open Design 原型链接/标识和评审状态。
12. 写入前执行 `.opencode/scripts/validate-pm-agent.mjs`；校验失败时先修正 PRD 或明确缺口，不能把未通过的文档标记为“已确认”。

## 输出总结模板

- **PRD 文件**：
- **需求结论**：（一句话）
- **涉及功能点**：
- **关联既有功能**：
- **风险提示**：
