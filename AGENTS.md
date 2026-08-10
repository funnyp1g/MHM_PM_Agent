# AGENTS.md

本项目是「产品经理 Agent (PM Agent)」框架，用于为现有产品快速输出可落地、与既有功能深度关联的中文 PRD 文档。

跨平台核心规则位于 `pm-agent-core/`，本文件只负责项目级加载约束。使用 Codex、Claude Code、OpenCode 或其他 Agent 时，均以 `pm-agent-core/` 为唯一权威规则源。

## 目录结构

```
├── .opencode/
│   ├── agent/
│   │   └── pm.md                 # PM agent（primary agent）
│   ├── skills/
│   │   ├── product-knowledge/     # 产品知识库读写规范
│   │   ├── requirement-analysis/  # 需求拆解与关联分析
│   │   └── prd-writing/           # PRD 中文模板与规范
│   └── commands/
│       ├── prd.md                 # /prd 生成 PRD
│       ├── pm-knowledge.md        # /pm-knowledge 维护产品知识库
│       └── pm-review.md           # /pm-review 评审 PRD
├── pm-agent-core/                 # 平台无关核心规则与通用 prompt
├── adapters/                      # Codex/Claude Code/OpenCode 适配说明
├── .claude/                       # Claude Code 命令入口
├── product-knowledge/            # 产品知识库（需填充）
│   ├── README.md
│   ├── product-overview.md
│   ├── features/                 # 一功能一文件
│   ├── relations.md              # 功能关联图谱
│   └── glossary.md               # 术语表
├── docs/prd/                     # PRD 输出目录
└── openspec/                     # OpenSpec 规范（变更管理）
```

## 工作流

1. 用户提出新功能需求
2. 使用 pm agent（或 `/prd` 命令）
3. 读取产品知识库 → 需求拆解 → 功能关联分析 → 输出中文 PRD
4. 先输出 PRD；如果需求涉及页面、组件或交互，在 PRD 输出后提示用户是否需要连接 Open Design 制作原型
5. 仅在用户确认需要原型时，调用已配置的 `open-design` MCP 制作原型并进行评审
6. 原型评审：核对页面结构、设计系统、业务规则、字段和各状态；评审完成后将原型链接/标识、页面映射、评审结论和待确认项回写到 PRD，确认后的页面同步到 `product-knowledge/ui/`
7. 未选择原型时，PRD 可独立进入评审或归档；需要变更追踪时再走 OpenSpec 流程（`/opsx-propose` → apply → archive）

### Open Design 使用边界

- Open Design 是项目的可选原型工具连接。只有用户确认需要原型后才调用；本仓库只提供 `config/open-design.example.json` 配置模板，不提交任何个人电脑绝对路径；不得把原型截图或链接写成已确认事实，除非已完成原型评审。
- 调用 Open Design 前必须读取 `product-knowledge/ui/design-system.md`、`ui/pages.md` 和最新实机观察记录。
- 原型必须标注现有页面ID与新增页面的临时ID；新页面只有评审确认后才能注册到 `ui/pages.md`。
- 原型至少覆盖默认、空态、加载、错误、禁用和关键成功/失败反馈；不适用的状态要明确记录原因。
- Open Design 原型制作与 OpenSpec 变更追踪是两个独立步骤；没有明确变更追踪要求时，不调用 OpenSpec。

## 重要约定

- **先读知识库，再写 PRD**：所有分析必须基于 `product-knowledge/`。
- **不确定先提问**：当名词含义、业务逻辑或交互样式存在不确定、歧义或多个合理解释时，必须暂停当前流程并向用户提问；得到用户答案后，将其作为当前需求的优先依据，再继续执行。不得用业务假设替代这三类问题。
- **跨平台调用**：宿主 Agent 先读取 `pm-agent-core/README.md`、`ROLE.md`、`KNOWLEDGE.md`、`BOUNDARIES.md` 和 `WORKFLOW.md`；`.opencode/`、`.claude/` 等目录只提供平台适配入口。
- **中文输出**：PRD 与说明均用中文，代码/字段名保持英文。
- **业务优先**：PRD 重点说明业务背景、现状问题、用户场景、需求说明、核心业务逻辑和业务规则；技术实现只保留最小必要内容。
- **术语一致**：使用 `glossary.md` 中的术语。
- **关联显性**：PRD 必须标注与既有功能的关联（依赖、影响、复用）。
- **落地导向**：每个功能点含业务规则、边界、验收标准（Given/When/Then）。

## 使用示例

- `/prd 新增「数据看板」功能，支持多维度统计与导出`
- `/pm-knowledge 新增功能模块：用户权限管理`
- `/pm-review docs/prd/2026-08-06-data-dashboard.md`

## 验证命令

- `openspec validate` — 校验 OpenSpec 变更与规范
- `openspec list` — 查看变更列表
