# PM Agent 项目说明

这是一个平台无关的 PM Agent 项目。开始任何产品需求、PRD、知识库或页面评审任务前，先读取：

- `pm-agent-core/README.md`
- `pm-agent-core/ROLE.md`
- `pm-agent-core/KNOWLEDGE.md`
- `pm-agent-core/BOUNDARIES.md`
- `pm-agent-core/WORKFLOW.md`

本项目的核心规则不依赖 OpenCode。Open Design 是 PRD 产出后的可选流程，只有用户确认后才调用。遇到不确定的名词含义、业务逻辑或交互样式，必须先提问，得到答案后继续。

常用命令：

- `/prd <需求>`：按 `pm-agent-core/prompts/prd.md` 输出 PRD；
- `/pm-review <PRD路径>`：按 `pm-agent-core/prompts/review.md` 评审 PRD；
- `/pm-knowledge <补充内容>`：维护 `product-knowledge/`。
