# Agent 宿主适配层

PM Agent 的规则以 `pm-agent-core/` 为唯一权威来源。适配层只负责让不同 Agent 快速加载核心规则，不得复制或改写业务规则。

## Codex

项目根目录的 `AGENTS.md` 会引导 Codex 读取 `pm-agent-core/`。直接在项目中提出 PRD 需求即可。

## Claude Code

项目根目录的 `CLAUDE.md` 和 `.claude/commands/` 提供入口。可使用 `/prd`、`/pm-review`，或让 Claude Code 读取 `pm-agent-core/prompts/`。

## OpenCode

现有 `.opencode/agent/`、`.opencode/commands/` 和 `.opencode/skills/` 保留兼容，核心规则同步指向 `pm-agent-core/`。可继续使用 `/prd`、`/pm-review` 和 `/pm-knowledge`。

## 其他 Agent

让 Agent 读取 `pm-agent-core/README.md`，再使用 `pm-agent-core/prompts/prd.md` 或 `pm-agent-core/prompts/review.md`。只要 Agent 能读取项目 Markdown 文件即可运行，不依赖特定厂商。
