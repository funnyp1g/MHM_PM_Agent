# PM Agent

PM Agent 是一套面向现有产品的、平台无关的产品经理 Agent 方法。它可以在 Codex、Claude Code、OpenCode 或其他能读取项目 Markdown 文件的 Agent 中使用。

## 快速开始

1. 将项目复制或克隆到本地。
2. 用任意 Agent 打开项目根目录。
3. 让 Agent 读取 `pm-agent-core/README.md`。
4. 提出需求，例如：

```text
请按 pm-agent-core/prompts/prd.md 为以下需求生成 PRD：
新增一个数据看板，支持销售、库存和会员统计。
```

## 各 Agent 的入口

| Agent | 入口 |
|---|---|
| Codex | 根目录 `AGENTS.md`；直接提出需求 |
| Claude Code | 根目录 `CLAUDE.md`；使用 `/prd` 或 `/pm-review` |
| OpenCode | `.opencode/`；使用 `/prd`、`/pm-review`、`/pm-knowledge` |
| 其他 Agent | 读取 `pm-agent-core/README.md` 和对应 prompt |

核心规则位于 `pm-agent-core/`，平台适配入口位于 `adapters/`、`.claude/` 和 `.opencode/`。修改规则时优先修改核心文件，不要只修改某个平台的适配文件。

## 强制边界

当名词含义、业务逻辑或交互样式不确定时，Agent 必须先提问，得到答案后才能继续。PRD 可以独立产出；Open Design 原型只有在用户确认后才制作。

## 校验

```bash
node .opencode/scripts/validate-pm-agent.mjs
openspec validate --all
```

## Open Design

Open Design 是可选能力。项目默认不要求每个使用者安装它；需要制作原型时，根据 `config/open-design.example.json` 配置本机路径，不要把个人电脑的绝对路径提交到仓库。
