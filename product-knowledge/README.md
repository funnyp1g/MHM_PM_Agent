# 产品知识库

本目录是 PM agent 的产品知识来源。PM agent 在分析需求、撰写 PRD 前必须先读取本目录，确保对产品有充分理解。

## 目录结构

| 路径 | 内容 | 状态 |
|------|------|------|
| `product-overview.md` | 产品定位、目标用户、核心价值、功能模块、业务规则 | 已填充（2026-08-07） |
| `features/` | 功能模块清单，一个功能一个文件 | 已填充（含 1 个规划模块） |
| `relations.md` | 功能关联图谱、依赖关系、数据流、复用组件、冲突约束 | 已填充（2026-08-07） |
| `glossary.md` | 术语表（行业知识 + 卖货猫产品术语 + 页面与UI术语） | 已填充（2026-08-07） |
| `data-dictionary.md` | 核心业务实体、字段、状态、金额/数量口径及证据等级 | 新增（部分字段待确认） |
| `metrics.md` | 业务指标定义、公式、数据来源、展示范围和目标状态 | 新增（目标值待确认） |
| `open-questions.md` | 未确认业务口径、权限矩阵和实机覆盖缺口 | 持续补充 |
| `ui/` | 页面结构层：设计系统 + 页面注册总表/快照 + 实机观察 + 设计文档留档 | 已填充（2026-08-07，部分页面待补充） |

## 产品背景

产品为**卖货猫（服装零售进销存管理系统 App，多店版）**，面向服装零售门店的货品、进货、销售开单、客户、供应商全链路经营。知识库基于《【卖货猫】app产品使用手册》（`/Users/mac/Downloads/卖货猫app产品使用手册.md`）与《APP页面设计规范及功能位置参考.md》（多店版）整理，并保留服装零售行业通用知识。

## 功能模块索引

| 功能模块 | 文件 | 核心能力 | 主要页面 |
|---------|------|---------|---------|
| 货品管理 | `features/01-goods.md` | 新增/列表/详情/复制/自动算价/滞销/停用/批量调价 | `goods-list`/`goods-detail` |
| 进货入库 | `features/02-purchase.md` | 一手货源/扫码入库/入库单/进货单管理 | `purchase-create`/`purchase-list` |
| 客户管理与会员营销 | `features/03-customer.md` | 营销页会员/营销工具、新增/列表/详情/画像/消费记录 | `marketing`/`customer-list` |
| 销售开单 | `features/04-sales.md` | 开单收银/赠品/欠货/挂单/退货/收银/打印 | `sales-create`/`sales-list` |
| 供应商管理 | `features/05-supplier.md` | 列表/新增/修改 | `more`（供应商分类） |
| 权限配置与系统设置 | `features/06-settings.md` | 岗位权限/定价/滞销/停用/抹零规则 | `more`/`settings` |
| 首页与数据/经营分析 | `features/07-home.md` | 首页仪表盘/数据页分析 | `home`/`data` |
| 补货采购请求 | `features/08-replenishment.md` | SKU选品加车/补货车/采购请求管理 | `replenish-select` |
| 平台相似款推荐与平台采购（规划） | `features/09-platform-similar-purchase.md` | 图片相似款检测/平台货品详情/平台购物车/采购请求 | `home`/`goods-list`/`goods-create`/`purchase-create` |

> 页面ID 详见 `ui/pages.md`；页面命名与 `glossary.md` 一致。

> 当前 PRD 范围：默认以老板账号为目标角色；店长/店员权限划分不作为分析前置条件。SKU 补货采购请求属于后续新功能，当前版本入口和实机流程不作为分析前置条件。

## 使用规范

1. **先读后写**：任何需求分析开始前，先读取本目录全部内容（README → product-overview → relations → glossary → data-dictionary → metrics → open-questions → `ui/` → 相关 features）。
   - `ui/` 内除 `design-system.md`、`pages.md` 外，还必须读取最新的 `device-observation-*.md`，核对实机页面与设计基准的差异。
   - 生成 PRD 前同步读取 `open-questions.md`；其中的事项不得在 PRD 中写成已确认规则。
   - 涉及字段、金额、数量、库存、状态或指标时，必须引用数据字典和指标口径；证据不足时标注为假设或待确认。
2. **写 PRD 时关联**：新功能必须引用 `relations.md` 中的关联功能，标注依赖、影响、复用；页面结构引用 `ui/pages.md` 页面ID。
3. **知识补充**：当发现知识库缺失时，通过 `/pm-knowledge` 命令补充，避免临时信息散落。
4. **维护约定**：
   - 新增功能模块：在 `features/` 下新建文件，复制 `features/_template.md` 结构。
   - 功能变更：同步更新 `product-overview.md` 与 `relations.md`，避免知识过期。
   - 新术语/新口径：先更新 `glossary.md` 再使用。
   - 页面/界面变更：更新 `ui/pages.md` 与 `ui/design-system.md`，遵循 `ui/README.md` 规范。
   - 字段/状态/金额口径变更：更新 `data-dictionary.md`，并将影响同步到 `glossary.md`、相关功能文件和 `relations.md`。
   - 指标定义或目标变更：更新 `metrics.md`，在相关 PRD 中说明目标和数据来源。

## 关联文档

- 产品使用手册：`/Users/mac/Downloads/卖货猫app产品使用手册.md`
- 页面设计规范：`/Users/mac/Downloads/APP页面设计规范及功能位置参考.md`（留档：`ui/source/`）

## 验证命令

- `openspec validate --all` — 校验 OpenSpec 变更与规范
- `openspec list` — 查看变更列表
