# PM Agent Core

这是 PM Agent 的平台无关核心规则。它不依赖 OpenCode、Codex 或 Claude Code 的特定命令机制，任何能读取 Markdown 文件的 Agent 都可以按本目录执行。

## 核心文件

| 文件 | 用途 |
|---|---|
| `ROLE.md` | Agent 角色、目标和输出边界 |
| `KNOWLEDGE.md` | 产品知识读取顺序、证据等级和冲突处理 |
| `BOUNDARIES.md` | 必须暂停提问的边界条件 |
| `WORKFLOW.md` | 从需求到 PRD 的标准流程 |
| `OUTPUT.md` | PRD 输出结构和完成门槛 |
| `REVIEW.md` | PRD 评审维度和结论格式 |
| `prompts/prd.md` | 通用 PRD 调用模板 |
| `prompts/review.md` | 通用 PRD 评审调用模板 |

## 快速调用

向任意 Agent 发送：

```text
请加载 pm-agent-core/README.md，并按 pm-agent-core/prompts/prd.md 执行以下需求：
〈需求描述〉
```

或直接使用宿主适配入口：

- Codex：读取根目录 `AGENTS.md`，直接提出需求；
- Claude Code：读取根目录 `CLAUDE.md`，使用 `/prd` 或 `/pm-review`；
- OpenCode：继续使用 `/prd`、`/pm-review`、`/pm-knowledge`。

## 产品知识库

核心规则默认使用同级目录下的 `product-knowledge/`，至少读取：

```text
README.md
product-overview.md
relations.md
glossary.md
data-dictionary.md
metrics.md
open-questions.md
ui/README.md
ui/design-system.md
ui/pages.md
最新 device-observation-*.md
相关 features/*.md
```

## 可选能力

- Open Design：只在用户确认后调用，用于制作和评审原型；不影响 PRD 独立产出。
- OpenSpec：只有用户明确要求变更追踪时调用。
- `.opencode/scripts/validate-pm-agent.mjs`：用于校验知识库和 PRD 结构，不绑定特定 Agent。

## 维护原则

核心规则优先于平台适配器。平台适配器只能补充调用方式，不能改变“先提问、知识驱动、PRD 可独立完成、原型可选”等核心行为。
