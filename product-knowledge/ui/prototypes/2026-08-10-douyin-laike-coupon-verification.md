# 抖音来客团购券绑定与核销原型评审记录

## 文档信息

- 原型项目：`douyin-laike-coupon-verification`
- Open Design 项目标识：`douyin-laike-coupon-verification-93a6`
- 会话标识：`dbd729f2-3f62-4761-baa2-ba2f44303f25`
- 原型入口：`http://127.0.0.1:56914/projects/douyin-laike-coupon-verification-93a6/conversations/dbd729f2-3f62-4761-baa2-ba2f44303f25`
- 产物文件：`douyin-coupon-verification-app.html`（Open Design 项目内文件；本机绝对路径不纳入仓库）
- 评审日期：2026-08-11
- 评审状态：本轮评审完成，临时页面待业务确认后注册

## 页面映射

| 页面ID | 页面名称 | 原型中的页面/入口 | 页面性质 |
|---|---|---|---|
| `home` / `data` / `marketing` | 既有主页面 | 原型仅借用视觉语言 | 非本功能页面，不参与流程和导航 |
| `more` | 更多功能 | `screen-more` | 既有入口页面，承接平台工具 |
| `sales-create` | 新建销售 | `screen-sales-create` | 既有页面，增加抖音验券入口 |
| `checkout` | 普通销售结算 | `screen-checkout` | 既有页面，支持扫码/手动录入并选择抖音代金券抵扣 |
| `sales-list` | 核销记录/销售单列表 | `screen-records` | 既有页面，增加平台券状态 |
| `douyin-platform` | 授权和门店绑定 | `screen-platform` | 临时页面ID，待注册 |
| `douyin-product-map` | 团购商品映射 | `screen-map` | 临时页面ID，待注册 |
| `douyin-coupon-verify` | 验抖音团购券 | `screen-verify` | 临时页面ID，待注册 |
| `douyin-verify-detail` | 核销详情 | `screen-success` | 临时页面ID，待注册 |
| `douyin-verify-detail` | 待补录异常变体 | `screen-pending` | 复用详情页面ID语义，待确认是否拆分正式页面 |
| `douyin-reconciliation` | 抖音核销对账 | `screen-reconcile` | 临时页面ID，待注册 |

## 状态覆盖

| 状态 | 覆盖位置 | 评审结论 |
|---|---|---|
| 默认 | 绑定、商品映射、验券、结算、详情、对账主视图 | 已覆盖 |
| 空态 | 未绑定、无商品、无对账数据 | 已覆盖 |
| 加载 | 授权同步、预校验结果查询 | 已覆盖 |
| 错误 | 授权失败、不可用券、已核销券、本地落单失败 | 已覆盖 |
| 禁用 | 下架固定套餐、库存不足 SKU、未选货确认按钮 | 已覆盖 |
| 成功 | 核销成功、销售单生成、库存更新、补录成功反馈 | 已覆盖 |
| 失败 | 平台已核销但本地销售单失败、差异对账 | 已覆盖 |

## 评审发现与修正

### 已修正

1. 原型不再把 `首页 / 数据 / 营销` 作为新功能导航；这些页面仅保留为视觉基线，功能入口从既有 `more` 和 `sales-create` 承接。
2. 去除原型内与新功能无关的顶部主 Tab 和右下角“更多功能”浮层，避免把既有视觉结构误读为本功能导航。
3. 既有页面与临时页面的标识已区分，避免把 `more`、`sales-create` 当成临时页面。
4. 结算页明确四类金额：销售应收、抖音券抵扣、店内优惠、顾客补款；“本地应收”与顾客补款保持同一金额口径。
5. 绑定/解绑示例按钮会同步更新文案、绑定状态和 POI 信息。
6. 明确抖音平台券与卖货猫本地优惠券是两套实体；待补录只补写本地销售单和库存流水，不重复调用平台核销。
7. 窄屏预览断点前移到 `520px`，避免 430px 门店端视图继续使用桌面外边距。
8. 长页面 ID 徽章增加窄屏截断，避免入口卡片横向溢出。
9. 普通销售结算页改为先展示销售明细，再提供“使用抖音代金券抵扣”入口，覆盖扫码、手动录入、预校验、选择代金券和金额更新。

### 待确认

- 真实授权流程、抖音来客账号主体和当前门店 POI 的绑定约束。
- 固定套餐是否能在核销前选择颜色、尺码，或必须由平台商品预绑定 SKU。
- 抖音券抵扣超过本地销售应收时的找零、余额保留或阻断规则。
- 平台核销成功但本地落单失败时，平台结果查询、补偿和人工补录的最终边界。
- `douyin-verify-detail` 的待补录状态是详情页状态，还是需要单独注册异常处理页面。

## 设计依据

- `product-knowledge/ui/design-system.md`
- `product-knowledge/ui/pages.md`
- `product-knowledge/ui/device-observation-2026-08-07.md`
- `docs/prd/2026-08-10-douyin-laike-coupon-verification.md`
