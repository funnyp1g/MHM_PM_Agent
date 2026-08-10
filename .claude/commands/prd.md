# 生成 PRD

先读取 `pm-agent-core/prompts/prd.md`、`pm-agent-core/WORKFLOW.md` 和 `pm-agent-core/OUTPUT.md`，再处理以下需求：

```text
$ARGUMENTS
```

必须先执行 `pm-agent-core/BOUNDARIES.md` 的强制澄清检查。遇到不确定的名词含义、业务逻辑或交互样式时，先提问并等待回答；得到回答后继续。涉及页面时，PRD 完成后提示用户是否需要 Open Design 原型。
