---
name: product-knowledge
description: 管理 PM Agent 的产品知识库。在需求分析、PRD 撰写、知识补充等场景下使用。当需要了解产品定位、功能模块、功能关联、术语口径，或需要更新/补充产品知识库时触发。
---

# 产品知识管理

PM Agent 的产品知识来源于 `product-knowledge/` 目录。本技能定义如何读取、维护知识库，确保 agent 对产品有准确、完整的理解。

## 知识库结构

```
product-knowledge/
├── README.md               # 索引与使用规范
├── product-overview.md     # 产品定位、目标用户、核心价值、竞品
├── features/               # 功能模块清单（一功能一文件）
├── relations.md            # 功能关联图谱、依赖、数据流、页面导航
├── glossary.md             # 术语表、状态机、指标口径、页面与UI术语
├── data-dictionary.md      # 核心业务实体、字段、状态、金额/数量口径
├── metrics.md              # 业务指标定义、公式、数据来源和目标状态
├── open-questions.md       # 待确认业务口径和证据缺口
└── ui/                     # 页面结构层
    ├── README.md           # 页面层读写与维护规范
    ├── design-system.md    # 设计系统规范（颜色/字体/布局/组件/交互）
    ├── pages.md            # 页面注册总表 + 页面快照（导航/布局/元素/状态/跳转）
    ├── device-observation-*.md # 当前设备/账号/版本的实机页面观察与差异
    ├── assets/observed/    # 实机页面截图
    └── source/             # 设计规范原始文档留档
```

## 读取流程（必做）

分析任何需求之前：

1. 读取 `product-knowledge/README.md` 了解结构与约定。
2. 读取 `product-knowledge/product-overview.md` 掌握产品全貌。
3. 读取 `product-knowledge/relations.md` 掌握功能关联。
4. 读取 `product-knowledge/glossary.md` 掌握术语口径。
5. 读取 `product-knowledge/data-dictionary.md`；涉及字段、金额、数量、库存或状态时不得跳过。
6. 读取 `product-knowledge/metrics.md`；涉及目标、效果衡量或经营指标时不得跳过。
7. 读取 `product-knowledge/open-questions.md`，识别 P0/P1 待确认项和证据缺口。
8. 读取 `product-knowledge/ui/design-system.md` 与 `ui/pages.md` 掌握页面结构与设计规范（涉及页面/界面时必须）。
9. 读取 `product-knowledge/features/` 下与需求相关的功能文件。
10. 读取最新的 `product-knowledge/ui/device-observation-*.md`；涉及页面时核对对应实机截图。

若知识库文件缺失或为「待填充」，向用户说明缺口，并基于已有信息做合理假设（明确标注假设）。

### 证据与冲突处理

- 用户明确确认的业务规则优先于所有文档。
- 当前版本实机观察用于判断实际页面、入口可见性、权限表现和数据状态；必须记录设备、账号、版本和观察日期。
- `product-knowledge/` 中已确认的业务规则用于判断业务口径和跨模块影响。
- 设计基准用于判断目标视觉与交互范式，不能覆盖当前版本的实机事实。
- 任何来源冲突都必须列入待确认项，不得把假设写成既定规则。
- 如果来源冲突或知识缺失涉及名词含义、业务逻辑或交互样式，必须先向用户提问并暂停分析；用户回答后以用户确认结论为准继续执行。

## 维护规则

### 新增功能
在 `features/` 下新建 `<feature-name>.md`，参照 `features/_template.md` 结构：
- 描述能力清单、关键流程、依赖与关联、数据与规则、边界。
- 同步更新 `relations.md` 与 `product-overview.md` 的功能清单索引。

### 更新既有功能
- 编辑对应功能文件，保持格式一致。
- 更新 `relations.md` 中的依赖与关联。
- 更新 `glossary.md` 中的术语与状态机（若有变化）。
- 页面结构变化时，更新 `ui/pages.md` 与 `ui/design-system.md`（遵循 `ui/README.md`）。

### 新增/更新页面（页面层）
- 在 `ui/pages.md` 注册表新增/更新行，按 `## 页面:<id>` 快照模板补充结构、元素、状态、跳转。
- 页面结构变更必须同步更新 `relations.md` 页面导航关系与对应 `features/*.md` 的「页面清单」。
- 页面命名与 `glossary.md`「页面与UI术语」表一致；使用英文小写 kebab-case 页面ID。

### 删除/废弃功能
- 在功能文件头部标注「已废弃」及废弃原因，保留历史（不直接删除文件）。
- 更新 `relations.md` 移除对应依赖，标注影响。

## 数据流与关联更新

- 每次新增或修改功能，必须检查 `relations.md` 的依赖关系是否仍准确。
- 新增公共能力（如登录、通知、支付）时，在 `relations.md` 的「复用组件」表中登记。

## 一致性检查

- 术语使用必须与 `glossary.md` 一致；发现新术语时先补充术语表再使用。
- 状态机描述与 `glossary.md`「状态机与枚举」表对齐。
- 核心实体、字段、金额/数量和状态与 `data-dictionary.md` 对齐；证据等级不足时必须保留假设或待确认标记。
- 指标名称、公式和数据范围与 `metrics.md` 对齐；没有目标值时不得自行编造目标。
- 功能关联与 `relations.md` 图谱一致，不做图谱之外的臆断。
- 页面结构与 `ui/pages.md`、`ui/design-system.md` 一致；引用页面使用页面ID，不自造布局。
- 页面结构与实机观察不一致时，同时标注设计目标和当前实际表现，并说明需要确认的版本/权限/业务原因。
- 「补货单」不是唯一语义：必须区分 `replenishment-tab`（采购进货页的平台货品/其他货品处理功能）与 `08-replenishment`（SKU补货采购请求）；不得因文案相同而复用实体、页面或状态机。
