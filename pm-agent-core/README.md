# PM Agent Core

## 唯一执行入口

`AGENT.md` 是 PM Agent 的跨平台唯一执行入口和权威规则源。Claude Code、Codex、OpenCode 及其他宿主 Agent 开始任何任务前，必须先读取并遵循该文件。

它统一规定：

- Agent 角色和输出边界；
- 产品知识库读取顺序与证据等级；
- 强制澄清边界；
- 需求拆解、功能关联和页面影响分析；
- PRD 输出、校验与交付；
- PRD 评审；
- Open Design 和 OpenSpec 使用边界；
- 产品知识库维护。

## 平台入口

- Codex：根目录 `AGENTS.md`；
- Claude Code：根目录 `CLAUDE.md` 和 `.claude/commands/`；
- OpenCode：`.opencode/agent/pm.md` 和 `.opencode/commands/`。

平台文件只负责宿主所需的加载、命令和参数传递，不得重新定义业务规则。`ROLE.md`、`KNOWLEDGE.md`、`BOUNDARIES.md`、`WORKFLOW.md`、`OUTPUT.md`、`REVIEW.md` 和 `prompts/` 保留为兼容性拆分文档；如与 `AGENT.md` 不一致，以 `AGENT.md` 为准。

## 产品知识库

统一规范默认使用同级目录下的 `product-knowledge/`。相关知识包括产品概览、功能模块、关联图谱、术语、数据字典、指标、待确认项、页面设计系统、页面注册表和最新实机观察。

## 可选能力

- Open Design：只有用户确认后调用；
- OpenSpec：只有用户明确要求变更追踪后调用；
- `.opencode/scripts/validate-pm-agent.mjs`：校验知识库和 PRD 结构。
