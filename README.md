# MHM PM Agent

MHM PM Agent 是一套面向现有产品的产品经理 Agent 工作流框架，目标是将自然语言需求转化为基于产品知识、可评审、可开发、可验收的中文 PRD。

项目支持 Codex、Claude Code、OpenCode，以及其他能够读取项目 Markdown 文件的 Agent。核心规则与平台适配入口分离，保证不同 Agent 使用同一套需求分析、知识加载、PRD 输出和校验规范。

仓库地址：[https://github.com/funnyp1g/MHM_PM_Agent](https://github.com/funnyp1g/MHM_PM_Agent)

## 项目能力

- 读取现有产品知识库，理解产品定位、功能、页面、术语和业务数据。
- 对需求进行背景、目标、用户、场景、功能和优先级拆解。
- 分析上游依赖、下游影响、可复用能力和既有功能冲突。
- 识别业务名词、状态、金额、库存、权限和交互歧义，并在必要时先向用户澄清。
- 生成包含业务规则、边界异常和 Given/When/Then 验收标准的中文 Markdown PRD。
- 关联现有页面 ID、设计系统和实机观察，避免臆造页面结构。
- 支持 PRD 评审、产品知识库维护和可选的 Open Design 原型流程。
- 提供项目结构和知识库校验脚本。

## 核心设计

### 核心规则唯一来源

所有 Agent 统一遵循：

```text
pm-agent-core/AGENT.md
```

该文件规定：

- Agent 角色与目标
- 产品知识读取顺序
- 证据等级和来源优先级
- 强制澄清边界
- 需求拆解和关联分析流程
- PRD 输出要求
- 页面、原型和 OpenSpec 的使用边界
- 校验和交付要求

平台入口文件只负责加载核心规则，不应重复定义或覆盖业务规则。

### 产品知识驱动

PRD 不是脱离产品上下文的通用文档，而是基于以下知识库生成：

```text
product-knowledge/
├── product-overview.md       # 产品定位与范围
├── relations.md              # 功能关联和依赖关系
├── glossary.md                # 统一术语
├── data-dictionary.md         # 字段、金额、数量、库存和状态口径
├── metrics.md                 # 指标定义和口径
├── open-questions.md          # 未确认问题和证据缺口
├── features/                  # 功能模块知识
└── ui/                        # 页面、设计系统和实机观察
```

## 快速开始

### 1. 获取项目

```bash
git clone https://github.com/funnyp1g/MHM_PM_Agent.git
cd MHM_PM_Agent
```

### 2. 用 Agent 打开项目根目录

必须将仓库根目录作为工作区打开，使 Agent 能够读取：

```text
AGENTS.md
CLAUDE.md
pm-agent-core/
product-knowledge/
```

### 3. 提出需求

通用调用方式：

```text
按 pm-agent-core/AGENT.md 为以下需求生成 PRD：

新增一个销售数据看板，展示销售额、订单数和毛利。
```

## 各 Agent 的使用方式

### Codex

将仓库作为 Codex 工作区打开，然后直接提出需求：

```text
按 pm-agent-core/AGENT.md 为以下需求生成 PRD：
新增一个销售数据看板，展示销售额、订单数和毛利。
```

Codex 通过根目录的 `AGENTS.md` 进入统一流程。

### Claude Code

在项目根目录启动 Claude Code，使用：

```text
/prd 新增一个销售数据看板，展示销售额、订单数和毛利
```

常用命令：

```text
/prd <需求描述>
/pm-review <PRD路径>
/pm-knowledge <产品知识补充内容>
```

Claude Code 的入口文件为：

```text
CLAUDE.md
.claude/commands/prd.md
.claude/commands/pm-review.md
```

### OpenCode

在项目根目录启动 OpenCode，使用：

```text
/prd 新增一个销售数据看板，展示销售额、订单数和毛利
```

常用命令：

```text
/prd <需求描述>
/pm-review <PRD路径>
/pm-knowledge <产品知识补充内容>
```

OpenCode 的入口文件为：

```text
.opencode/agent/pm.md
.opencode/commands/
.opencode/skills/
```

### 其他 Agent

如果 Agent 不支持项目级命令，只需让它先读取：

```text
pm-agent-core/README.md
pm-agent-core/AGENT.md
pm-agent-core/prompts/prd.md
```

然后输入：

```text
请严格按照 pm-agent-core/AGENT.md，
为以下需求生成 PRD：

<需求描述>
```

## PRD 生成流程

完整流程如下：

```text
需求输入
   ↓
识别任务类型
   ↓
读取 AGENTS.md 和 pm-agent-core/AGENT.md
   ↓
读取产品知识库和相关功能资料
   ↓
检查歧义与强制澄清项
   ├─ 存在阻塞歧义 → 向用户提问，暂停生成
   └─ 信息足够 → 继续分析
   ↓
需求拆解
   ├─ 背景、问题、目标
   ├─ 用户、场景、价值
   ├─ 功能点和优先级
   ├─ 业务规则、状态、边界和异常
   └─ 成功指标和本期非目标
   ↓
功能关联分析
   ├─ 上游依赖和下游影响
   ├─ 复用能力和既有页面
   ├─ 术语、数据和状态冲突
   ├─ 权限、安全和外部依赖
   └─ 页面 ID、导航和设计系统
   ↓
生成中文 Markdown PRD
   ↓
运行校验脚本
   ↓
交付 PRD 路径、结论、依据、风险和待确认项
```

## PRD 输出位置和内容

默认输出路径：

```text
docs/prd/YYYY-MM-DD-<feature-slug>.md
```

PRD 至少包含：

1. 文档信息和评审状态
2. 背景、目标和非目标
3. 用户与场景
4. 功能总览和详细功能需求
5. 用户流程、业务逻辑和状态流转
6. 页面与交互（涉及页面时）
7. 业务信息、数据口径和效果衡量
8. 与既有功能的关联
9. 权限与业务安全
10. 迭代规划
11. 风险与依赖
12. 假设与待确认项
13. Given/When/Then 验收标准
14. 验收清单

每个功能点必须明确：

- 功能描述
- 可判定的业务规则
- 边界和异常处理
- Given/When/Then 验收标准

未知的字段、金额、数量、库存、状态、权限或指标不能写成已确认事实，必须标记为假设或待确认项。

## 页面、原型和 OpenSpec 边界

### 页面需求

涉及页面、组件、页面跳转或交互时，必须：

- 引用 `product-knowledge/ui/pages.md` 中已有的页面 ID。
- 遵循 `product-knowledge/ui/design-system.md`。
- 参考最新的实机观察记录。
- 覆盖默认、空态、加载、错误、禁用、成功和失败状态。
- 对尚未确认的页面标记为假设、待补充或临时页面 ID。

### Open Design

Open Design 是可选流程，不会因为 PRD 涉及页面就自动启动。

只有用户明确确认制作原型后，才进入 Open Design 流程。原型制作完成后，需要把原型标识、页面映射、状态覆盖、设计差异和评审状态回写到 PRD。

如果没有真实的 Open Design 产物标识，不能将原型写成“已完成”或“已评审”。

### OpenSpec

OpenSpec 变更追踪不会自动启动。只有用户明确要求变更追踪，或明确要求执行 `propose`、`apply`、`archive` 时才使用。

## 校验

普通项目和 PRD 校验：

```bash
node .opencode/scripts/validate-pm-agent.mjs
```

只校验某个 PRD：

```bash
node .opencode/scripts/validate-pm-agent.mjs docs/prd/<file>.md
```

只校验产品知识库：

```bash
node .opencode/scripts/validate-pm-agent.mjs --knowledge
```

如果项目包含 OpenSpec 变更并且用户明确要求校验：

```bash
openspec validate --all
```

校验未通过时，不能将 PRD 标记为已确认，应先修正文档或明确说明缺口。

## 项目结构

```text
.
├── AGENTS.md                         # Codex 入口
├── CLAUDE.md                         # Claude Code 入口
├── README.md                         # 项目说明和使用指南
├── adapters/                         # 各 Agent 平台适配说明
├── pm-agent-core/                    # 跨平台统一规则
│   ├── AGENT.md                      # 唯一权威执行入口
│   ├── BOUNDARIES.md                 # 边界和澄清规则
│   ├── KNOWLEDGE.md                  # 知识库读取规则
│   ├── OUTPUT.md                     # PRD 输出要求
│   ├── ROLE.md                       # Agent 角色说明
│   ├── WORKFLOW.md                   # 标准工作流
│   └── prompts/                      # 通用调用模板
├── product-knowledge/                # 产品知识库
│   ├── features/                     # 功能知识
│   └── ui/                           # 页面和设计知识
├── docs/prd/                         # PRD 文档
├── .claude/                          # Claude Code 适配入口
├── .opencode/                        # OpenCode 适配入口、命令和校验脚本
├── config/                           # Open Design 等本地配置示例
├── openspec/                         # OpenSpec 配置和变更文件
└── opencode.json                     # OpenCode 项目配置
```

## 证据和不确定性规则

信息来源按以下优先级处理：

1. 用户当前明确确认的业务规则
2. 当前版本实机观察
3. 已归档产品知识和既有 PRD
4. 设计基准文档

证据分为：

- **已确认**：用户明确确认或知识库中稳定记录
- **实机观察**：特定设备、账号、版本和数据状态下观察到
- **业务假设**：为了形成方案而采用的暂定口径
- **待确认**：缺少证据或存在冲突

如果名词含义、业务逻辑或交互样式存在冲突，必须先暂停并提问，不能静默选择一种解释。

## 当前项目约束

- 默认目标角色为老板账号。
- 不主动扩展店长、店员权限矩阵。
- `replenishment-tab` 与 `08-replenishment` 是两个不同的功能语境，不得混用。
- 业务规则和用户结果优先于技术实现。
- PRD 正文不展开 API、数据库表结构、服务拆分、缓存和代码实现等技术细节，除非用户明确要求。

## 参与贡献

修改核心流程时，请优先修改：

```text
pm-agent-core/AGENT.md
```

然后检查平台适配入口和相关知识库文档，运行校验脚本，并在 PR 中说明：

- 变更原因
- 影响范围
- 是否影响 Codex、Claude Code 或 OpenCode
- 是否需要更新产品知识库
- 是否需要更新示例 PRD

不要只修改某个平台的命令文件来改变统一业务规则。

## 许可证

当前仓库未声明正式开源许可证。若需要公开分发，请根据组织要求补充 LICENSE 文件和第三方依赖说明。
