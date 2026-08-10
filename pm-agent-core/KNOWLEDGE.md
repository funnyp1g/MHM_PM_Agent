# 产品知识读取与证据规则

## 必读顺序

1. `product-knowledge/README.md`
2. `product-knowledge/product-overview.md`
3. `product-knowledge/relations.md`
4. `product-knowledge/glossary.md`
5. `product-knowledge/data-dictionary.md`
6. `product-knowledge/metrics.md`
7. `product-knowledge/open-questions.md`
8. 涉及页面时读取 `product-knowledge/ui/README.md`、`ui/design-system.md`、`ui/pages.md`
9. 读取最新 `ui/device-observation-*.md`
10. 读取需求相关的 `features/*.md`

## 证据等级

| 等级 | 含义 | 使用规则 |
|---|---|---|
| 已确认 | 用户明确确认或知识库已稳定记录 | 可以作为业务规则 |
| 实机观察 | 在特定设备、账号、版本和数据状态下观察到 | 必须注明观察条件 |
| 业务假设 | 为继续形成方案而采用的暂定口径 | 必须写入 PRD 待确认项 |
| 待确认 | 缺少证据或存在冲突 | 不得写成既定规则 |

## 来源优先级

1. 用户当前明确确认的规则；
2. 当前版本实机观察；
3. 已归档产品知识和 PRD；
4. 设计基准文档。

当来源冲突涉及名词含义、业务逻辑或交互样式时，必须按 `BOUNDARIES.md` 暂停提问。
