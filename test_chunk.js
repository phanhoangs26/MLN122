import { FULL_TEXTBOOK } from './api/textbook.js';

const chunks = FULL_TEXTBOOK.split(/\n(?=[a-dđ]\) )/);
console.log(`Total chunks: ${chunks.length}`);
chunks.forEach((c, i) => {
  console.log(`Chunk ${i} length: ${c.length} chars, starts with: ${c.substring(0, 30).trim()}`);
});
