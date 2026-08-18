# 原型：进货单拿货价异常提示

- 原型工具：Open Design
- Open Design 项目标识：`purchase-price-anomaly-warning`
- Open Design 会话标识：`a2f938c2-7077-441e-b364-0821a3b7b30f`
- Open Design 本机入口：`http://127.0.0.1:53690/projects/purchase-price-anomaly-warning/conversations/a2f938c2-7077-441e-b364-0821a3b7b30f`
- Open Design 原型版本标识：`purchase-create-price-warning-v1`
- Open Design 版本 ID：`b33a81cd-1f89-4fbf-881e-aea2b8b787ca`（v3，移除拿货价提示背景；v2 为 `017a03e4-70d8-406c-b991-d7e7db0b63d2`）
- 页面映射：`purchase-create`（新建入库单）
- 原型类型：可交互移动端页面原型
- 原型产物：`prototypes/purchase-create-price-warning-v1.html`
- 原型状态：待用户业务评审（v3 已完成交互样式调整；Open Design 视觉导出待下一次打开项目时确认）
- 制作日期：2026-08-12

## 覆盖范围

- 现有进货单页面结构还原：顶部导航、供应商、入库日期、备注、三种添加货品方式、货品明细和底部固定操作栏。
- 低于原拿货价超过 20% 的提示。
- 高于原拿货价超过 20% 的提示。
- 正常价格、空态、输入错误、多货品独立异常。
- 修改拿货价后提示实时更新。
- 异常提示不阻断「确定」提交。

## 使用方式

在 Open Design 项目 `purchase-price-anomaly-warning` 中打开 `prototypes/purchase-create-price-warning-v1.html`；点击页面右上角「单据工具」切换业务状态，也可以直接编辑「本次拿货价」输入框。

## 页面映射

| PRD 页面ID | 页面名 | 原型页面标识 | 页面状态 |
|------------|--------|--------------|----------|
| `purchase-create` | 新建入库单 | `purchase-create-price-warning-v1` | 现有页面改造 |

## 状态覆盖

| 状态 | 覆盖情况 |
|------|----------|
| 默认/已添加货品 | 已覆盖 |
| 空态 | 已覆盖 |
| 正常价格 | 已覆盖 |
| 低于 20% | 已覆盖 |
| 高于 20% | 已覆盖 |
| 输入为空/格式错误 | 已覆盖 |
| 原拿货价缺失或为 0 | 已覆盖 |
| 多货品同时异常 | 已覆盖 |
| 加载中/失败 | 已覆盖 |
| 提交按钮可用/提交成功 | 已覆盖 |

## v2 更新记录

- 恢复桌面端左侧手机页面 + 右侧评审控制台的双栏结构。
- 右侧状态按钮直接同步左侧页面，初始选中“多货品异常”。
- 保留手机内本次拿货价直接编辑和实时提示重算。
- 右侧控制台明确标注“不属于正式 App 页面”。
- Open Design 视觉导出检查已通过；当前产物版本为 v2。

## v3 更新记录

- 拿货价异常提示固定放在对应输入框正下方。
- 移除提示文字的背景、边框、气泡和卡片容器。
- 保留小字号警示色文字和原有低于/高于文案。

## 评审记录

- 页面结构依据：`product-knowledge/ui/device-observation-2026-08-07.md` 的 `purchase-create` 实机观察。
- 设计依据：`product-knowledge/ui/design-system.md`、`product-knowledge/ui/pages.md`。
- 业务依据：`docs/prd/2026-08-12-purchase-price-anomaly-warning.md`。
- 待确认：20%边界是否包含等于、百分比展示精度、是否直接展示原拿货价。
- 待用户确认：右侧评审控制台的状态命名和桌面布局是否作为后续原型评审标准保留。
