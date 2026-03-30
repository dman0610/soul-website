#!/bin/bash
# Stop hook: blocks Claude from stopping if task checklist has unchecked items.
# Escape: type "cancel" or "stop" in chat, press Escape, or Ctrl+C.
# Emergency: delete c:/Projects/soul/.claude/task.local.md to immediately unblock.

TASK_FILE="c:/Projects/soul/.claude/task.local.md"

node -e "
const fs = require('fs');
const f = process.argv[1];
if (!fs.existsSync(f)) { process.exit(0); }
const content = fs.readFileSync(f, 'utf8');
const unchecked = (content.match(/^- \[ \].*/gm) || []);
if (unchecked.length === 0) { process.exit(0); }
const list = unchecked.slice(0, 8).join('\n');
process.stdout.write(JSON.stringify({
  decision: 'block',
  reason: unchecked.length + ' checklist item(s) remain',
  systemMessage: 'TASK INCOMPLETE — ' + unchecked.length + ' item(s) still unchecked in .claude/task.local.md:\n' + list + '\n\nContinue working until all items are checked off. If the user says stop or cancel, delete .claude/task.local.md and then you may stop.'
}));
" "$TASK_FILE"
