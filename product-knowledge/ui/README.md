# 页面结构层（ui/）

> PM Agent 的页面/界面权威来源。任何涉及页面结构、导航、布局、组件样式的分析或 PRD 撰写，必须先读本目录。

## 目录结构

| 路径 | 内容 | 状态 |
|------|------|------|
| `design-system.md` | 颜色/字体/布局/组件样式/交互模式/AI 前端实现约束（设计系统规范） | 已补充（2026-08-11） |
| `pages.md` | 页面注册总表 + 页面快照（导航/布局/关键元素/状态/跳转） | 已填充 5 个结构化快照；其余见实机观察或待补充 |
| `device-observation-2026-08-07.md` | iPhone 16 Pro 实机页面观察、差异记录与截图索引 | 已填充（2026-08-07） |
| `source/APP页面设计规范及功能位置参考.md` | 设计规范原始文档（多店版）留档 | 留档 |
| `source/卖货猫组件应用规范-AI前端开发指南.md` | Figma 组件应用规范与 AI 前端实现指南留档 | 已新增（2026-08-11） |
| `assets/` | 截图/线框留档（人工核对用） | 已新增 `observed/` 实机截图 |
| `prototypes/` | Open Design 原型记录、页面映射与评审结论 | 按需求新增 |

## 读取流程（必做）

撰写 PRD 前，除既有知识库文件外，**必须**读取：

1. `ui/design-system.md` —— 掌握全局视觉与交互规范。
2. `ui/pages.md` —— 找到需求涉及的页面快照，了解其结构、元素、范式与导航。
3. `ui/device-observation-2026-08-07.md` —— 核对当前设备、账号和版本下的真实页面与设计差异。

## 维护规则

### 新增页面快照
- 在 `ui/pages.md` 注册表中新增一行（页面ID/页面名/所属模块/导航入口/快照锚点）。
- 在 `ui/pages.md` 新增 `## 页面:<id>` 小节，按固定结构编写：导航路径 → 布局示意(ASCII) → 关键元素表 → 页面状态 → 跳转关系 → 截图。
- 同步更新 `pages.md` 导航 mermaid 图与 `relations.md` 页面导航关系。
- 页面命名与 `glossary.md`「页面与UI术语」保持一致。

### 修改既有页面
- 编辑对应快照小节；若页面结构变化影响功能模块，同步更新对应 `features/*.md` 的「页面清单」与入口描述。

### 页面结构变更
- 结构变更必须在 `features/*.md`「历史变更」表登记，注明影响的功能与页面。

## 页面ID 约定

- 英文小写 `kebab-case`，如 `sales-create`、`purchase-list`。
- 中文展示名用 App 内真实叫法，登记在 `glossary.md` 页面术语表。

## 一致性要求

- 引用页面时使用页面ID（如 `` `sales-create` ``），不使用自造名称。
- PRD「页面与交互」章节必须沿袭页面快照中的结构与交互范式；新增元素不得与 `design-system.md` 冲突。
- 设计文档未覆盖的页面（见 `pages.md`「待补充页面」）在填充前标注「待补充」，不得臆造结构。
- `device-observation-*.md` 是实机证据；若与设计基准冲突，必须保留差异并检查权限、版本和数据状态。

## Open Design 原型流程

涉及页面、组件、页面跳转或交互的需求，先在 PRD 中完成页面与交互说明。PRD 产出后，再提示用户是否需要使用本机已配置的 `open-design` MCP 制作原型。Open Design 是可选流程，不是 PRD 产出的必要条件；仓库默认不要求配置 Open Design；纯后端、数据或不改变用户界面的需求不需要提示原型。

### 原型输入

- PRD 的用户流程、业务规则、字段和验收标准。
- `design-system.md` 的颜色、字体、布局、组件和交互规范。
- `pages.md` 的现有页面快照、页面ID和导航关系。
- 最新 `device-observation-*.md` 的实机状态、截图和设计差异。

### 原型交付与评审

用户确认制作原型后，每个原型必须记录：

| 字段 | 要求 |
|------|------|
| 原型工具 | `Open Design` |
| 原型链接/标识 | 可定位到项目和页面的链接或唯一标识 |
| 页面映射 | PRD 页面ID ↔ Open Design 页面/画板标识 |
| 覆盖状态 | 默认、空态、加载、错误、禁用、成功/失败反馈；不适用时说明原因 |
| 评审状态 | 待制作 / 待评审 / 已确认 / 需修改 |
| 差异与待确认项 | 原型与 PRD、实机或设计系统的差异及处理结论 |

原型评审至少核对页面ID、页面结构、设计系统、文案、字段、业务规则、状态、跳转和异常反馈。评审结论先回写 PRD；新增或改版页面确认后，再更新 `pages.md`、`relations.md` 和对应功能文件。推荐在 `ui/prototypes/` 下按 `YYYY-MM-DD-<feature-slug>.md` 保存原型记录。

Open Design 原型制作与 OpenSpec 变更追踪相互独立。只有用户明确要求变更追踪，或明确要求 `propose/apply/archive` 时，才启动 OpenSpec。

### Codex 调用与交付约束

- 在 Codex 中必须连接本机 Open Design 应用及其 MCP/daemon；不得使用 `opencode.json`、`.opencode/` 或 OpenCode CLI 代替 Open Design。
- `config/open-design.example.json` 仅是占位配置模板，不是实际调用入口；其中的 `<OPEN_DESIGN_DAEMON_CLI_PATH>` 和 `<OPEN_DESIGN_SOCKET_PATH>` 不能直接执行。
- 不得直接生成普通 HTML/CSS/JS 作为 Open Design 替代品。HTML 只有在 Open Design 项目内生成、注册并可预览时，才算 Open Design 项目文件。
- 若 Open Design MCP 未出现在当前工具列表、Open Design 应用/daemon 未运行或原型未成功注册，必须明确报告不可用/失败，不得伪造项目、版本、链接或评审状态。
- 多状态页面优先采用“左侧真实页面 + 右侧原型评审控制台”。右侧控制台只服务于原型评审，不属于正式 App 页面；真实业务提示必须仍显示在左侧页面对应位置。
- 评审记录至少保存 Open Design 项目标识、页面/产物标识、版本标识、页面映射、预览入口、状态覆盖、差异和待确认项。
