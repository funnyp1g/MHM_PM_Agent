# PM Agent 项目说明

开始任何产品需求、PRD、知识库或页面评审任务前，先读取并严格遵循：

- `pm-agent-core/AGENT.md`

该文件是 Claude Code、Codex、OpenCode 和其他宿主 Agent 共用的唯一执行入口和权威规则源。`CLAUDE.md` 与 `.claude/commands/` 只负责 Claude Code 的命令入口和参数传递，不重复定义业务规则。

常用命令：

- `/prd <需求>`：按统一规范输出 PRD；
- `/pm-review <PRD路径>`：按统一规范评审 PRD；
- `/pm-knowledge <补充内容>`：按统一规范维护产品知识库。
