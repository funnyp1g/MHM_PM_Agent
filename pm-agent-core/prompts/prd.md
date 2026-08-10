# 通用 PRD 调用模板

请加载并执行：

1. `pm-agent-core/ROLE.md`
2. `pm-agent-core/KNOWLEDGE.md`
3. `pm-agent-core/BOUNDARIES.md`
4. `pm-agent-core/WORKFLOW.md`
5. `pm-agent-core/OUTPUT.md`

用户需求：

```text
{{REQUEST}}
```

先完成强制澄清检查。若名词含义、业务逻辑或交互样式不确定，暂停并提问；得到回答后继续。若无阻塞问题，读取产品知识库并输出中文 PRD。涉及页面时，PRD 完成后再询问用户是否需要 Open Design 原型。
