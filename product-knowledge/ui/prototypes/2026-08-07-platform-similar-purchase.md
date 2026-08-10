# 原型记录：平台相似款推荐与平台采购

## 文档信息

| 字段 | 内容 |
|------|------|
| 原型工具 | Open Design |
| Open Design 项目 | `replenishment-prototype` |
| 原型文件 | `platform-similar-purchase.html` |
| 原型标识 | `od://app/api/projects/replenishment-prototype/raw/platform-similar-purchase.html?workspaceId=w9ueo9qukk1hikfvn38wd2n1&workspaceMemberId=thu39dw39om6ocn2rbafap5k` |
| 关联 PRD | `docs/prd/2026-08-07-platform-similar-goods-purchase.md` |
| 原型版本 | v1.0 |
| 评审状态 | 待评审 |
| 日期 | 2026-08-07 |

## 页面映射

| PRD 页面ID | 原型 screen | 页面状态 |
|------------|-------------|----------|
| `home` | `home` | 现有页面改造：增加拍照找相似款入口 |
| `goods-list` | `goods` | 现有页面改造：卡片提示存在相似款 |
| `goods-create` | `create` | 现有页面改造：图片检测结果反馈 |
| `purchase-create` | `purchase` | 现有页面改造：SKU 相似款提示 |
| `platform-similar-camera` | `camera` | 新增临时页面ID |
| `platform-similar-list` | `similar` | 新增临时页面ID |
| `platform-goods-detail` | `detail` | 新增临时页面ID |
| `platform-cart` | `cart` | 新增临时页面ID |
| 采购提交结果 | `success` | 原型结果状态，是否注册为页面待确认 |

## 已覆盖流程

- 首页进入拍照找相似款。
- 图片检测默认态、加载态、无结果态、失败态和恢复默认。
- 平台相似款列表展示 94%、88%、81% 相似度、平台款号、供货价、颜色和尺码。
- 货品列表、新建货品、进货单 SKU 的相似款提示入口。
- 平台货品详情、颜色/尺码选择和数量步进器。
- 平台购物车加购、数量调整、删除、空购物车和提交采购请求。
- 提交结果明确展示“采购请求已提交”“本地库存未增加”“到货后请通过平台入库”。

## 交互校验

| 校验项 | 结果 | 说明 |
|--------|------|------|
| Inline JS 语法 | 通过 | `new Function` 静态解析通过 |
| 页面结构 | 通过 | 9 个 screen：4 个现有页面、4 个新增页面、1 个结果状态 |
| 核心 DOM/事件 | 通过 | 返回、检测、排序、详情、加购、购物车步进、删除、提交均有事件处理 |
| 主流程实操 | 部分通过 | 首页 → 拍照页 → 相似款列表 → 加购 → 购物车 → 提交结果已操作验证；真实文件上传后的检测分支待补测 |
| 渲染截图导出 | 受限 | Open Design 当前会话缺少 workspace 绑定标识，导出器未生成截图；编辑器内预览可打开 |

## 评审待确认项

- 相似度阈值、排序算法和平台商品目录数据来源。
- 平台供货价是否包含运费、税费、优惠和最终确认价校验。
- “平台购物车”与现有 `replenishment-tab` 的产品边界、入口命名和数据实体隔离。
- 采购请求提交结果是否独立注册 `platform-purchase-success` 页面。
- 远程商品图在正式环境中的资源来源、缓存和失败降级方案。

## 知识库回写

- `ui/pages.md`：暂不注册新增页面，等待原型评审确认。
- `relations.md`：暂不新增页面导航关系，等待页面ID确认。
- 关联 PRD：已回写 Open Design 原型标识、页面映射和评审状态。
