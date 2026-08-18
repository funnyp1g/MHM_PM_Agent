# Codex 适配说明

将本项目作为工作区打开。Codex 读取根目录 `AGENTS.md` 后，必须先读取并严格遵循 `pm-agent-core/AGENT.md`。该文件是所有宿主 Agent 共用的唯一执行入口和权威规则源。

通用调用：

```text
按 pm-agent-core/AGENT.md 为以下需求生成 PRD：……
评审 docs/prd/<file>.md
维护产品知识库：……
```

Open Design 仅在用户明确确认后，使用 Codex 当前工具列表中提供的本机 Open Design MCP/daemon。不得通过 OpenCode、普通 HTML 或未注册的本地文件替代；具体边界和失败处理统一遵循 `pm-agent-core/AGENT.md`。
