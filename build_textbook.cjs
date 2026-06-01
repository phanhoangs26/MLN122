const fs = require('fs');
const content = fs.readFileSync('theory/GIÁO TRÌNH TRIẾT HỌC MÁC - LÊNIN.md', 'utf-8');
const escaped = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
fs.writeFileSync('api/textbook.js', 'export const FULL_TEXTBOOK = `\n' + escaped + '\n`;\n');
