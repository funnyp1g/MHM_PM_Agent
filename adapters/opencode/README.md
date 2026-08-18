# OpenCode 适配说明

保留 `.opencode/` 作为 OpenCode 的宿主适配入口。OpenCode 读取 `.opencode/agent/pm.md` 或命令后，必须先读取并严格遵循 `pm-agent-core/AGENT.md`。该文件是所有宿主 Agent 共用的唯一执行入口和权威规则源。

可用命令：

```text
/prd 新增一个数据看板，支持销售、库存和会员统计
/pm-review docs/prd/example.md
/pm-knowledge 新增功能模块：用户权限管理
```
