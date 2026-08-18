# Claude Code 适配说明

将本项目作为工作目录打开。Claude Code 读取根目录 `CLAUDE.md` 和 `.claude/commands/` 后，必须先读取并严格遵循 `pm-agent-core/AGENT.md`。该文件是所有宿主 Agent 共用的唯一执行入口和权威规则源。

可用命令：

```text
/prd 新增一个数据看板，支持销售、库存和会员统计
/pm-review docs/prd/example.md
```
