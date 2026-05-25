const fs = require('fs');
const stageArg = process.argv[2];
if (!stageArg) { console.error('Usage: node scripts/checkMaze.cjs <stageNumber>'); process.exit(2); }
const stageId = stageArg.trim();
const path = 'src/app/pages/Maze.tsx';
const s = fs.readFileSync(path, 'utf8');
const re = new RegExp(stageId + '\\s*:\\s*\\{[\\s\\S]*?rows:\\s*\\[([\\s\\S]*?)\\]', 'm');
const m = s.match(re);
if (!m) { console.error('rows not found for stage', stageId); process.exit(3); }
const rowsRaw = m[1].trim().split(/\r?\n/).map(l => l.trim().replace(/^'/, '').replace(/',?$/, '').replace(/\"/g, '"'));
const rows = rowsRaw.map(l => l.replace(/'/g, '').replace(/,/g, '').trim()).filter(Boolean);
const h = rows.length, w = rows[0].length;
function find(ch){ for(let y=0;y<h;y++) for(let x=0;x<w;x++) if(rows[y][x]===ch) return {x,y}; return null }
const S = find('S'), E = find('E');
console.log('Stage', stageId, 'grid', w, 'x', h);
if(!S||!E){ console.log('S or E missing', S, E); process.exit(4) }
const q = [S];
const seen = Array.from({length:h}, ()=> Array(w).fill(false));
seen[S.y][S.x] = true;
const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
while(q.length){
  const p = q.shift();
  if(p.x===E.x && p.y===E.y){ console.log('reachable'); process.exit(0); }
  for(const d of dirs){
    const nx = p.x + d[0], ny = p.y + d[1];
    if(ny<0||ny>=h||nx<0||nx>=w) continue;
    const c = rows[ny][nx];
    if(c==="#") continue;
    if(!seen[ny][nx]){ seen[ny][nx]=true; q.push({x:nx,y:ny}); }
  }
}
console.log('not reachable');
for(let y=0;y<h;y++){ let line=''; for(let x=0;x<w;x++){ line += seen[y][x] ? (rows[y][x]==='#' ? '#' : '.') : 'X' } console.log(line) }
process.exit(0);
