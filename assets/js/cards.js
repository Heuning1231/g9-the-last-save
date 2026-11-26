/* G9 — The Last Save — High-Resolution Tech Keepsake PNG Generators */

function downloadCanvas(canvas, filename) {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function drawTechFrame(ctx, w, h, pad = 42) {
  ctx.strokeStyle = 'rgba(166, 181, 200, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, w - pad * 2, h - pad * 2);

  // Corner brackets in electric violet
  const b = 36;
  ctx.strokeStyle = '#9278ED';
  ctx.lineWidth = 3.5;
  [
    [pad, pad + b, pad, pad, pad + b, pad],
    [w - pad - b, pad, w - pad, pad, w - pad, pad + b],
    [pad, h - pad - b, pad, h - pad, pad + b, h - pad],
    [w - pad - b, h - pad, w - pad, h - pad, w - pad, h - pad - b]
  ].forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  });
}

export function exportG9PassPNG(passId, exploredCount, totalCount) {
  const w = 1440;
  const h = 900;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#080C16');
  bg.addColorStop(0.5, '#111D30');
  bg.addColorStop(1, '#1A243A');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle circuit grid
  ctx.strokeStyle = 'rgba(166, 181, 200, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 48) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 48) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const glow = ctx.createRadialGradient(w * 0.78, h * 0.32, 20, w * 0.78, h * 0.32, 420);
  glow.addColorStop(0, 'rgba(146, 120, 237, 0.32)');
  glow.addColorStop(1, 'rgba(8, 12, 22, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  drawTechFrame(ctx, w, h, 44);

  // Right G9 Processor Emblem
  const cx = w - 280;
  const cy = h / 2;
  ctx.strokeStyle = 'rgba(146, 120, 237, 0.75)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 110, cy - 110, 220, 220);
  ctx.strokeStyle = 'rgba(166, 181, 200, 0.45)';
  ctx.strokeRect(cx - 82, cy - 82, 164, 164);
  ctx.fillStyle = '#DCE8F4';
  ctx.textAlign = 'center';
  ctx.font = '700 64px monospace';
  ctx.fillText('G9', cx, cy + 20);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#9278ED';
  ctx.font = '600 22px monospace';
  ctx.fillText('GRADUATION PASS  ·  INTERACTIVE DIGITAL ARCHIVE', 96, 130);

  ctx.fillStyle = '#DCE8F4';
  ctx.font = '700 84px sans-serif';
  ctx.fillText('G9 — THE LAST SAVE', 96, 260);

  ctx.fillStyle = '#A6B5C8';
  ctx.font = '500 30px monospace';
  ctx.fillText('Software Engineering  |  2024 — 2026', 96, 330);

  ctx.fillStyle = '#DCE8F4';
  ctx.font = '500 26px monospace';
  ctx.fillText('GRADUATION STATUS : COMPLETED', 96, 460);
  ctx.fillText(`MEMORY ARCHIVE    : ${exploredCount} / ${totalCount} EXPLORED`, 96, 512);
  ctx.fillText(`SESSION PASS ID   : ${passId}`, 96, 564);

  ctx.fillStyle = 'rgba(166, 181, 200, 0.72)';
  ctx.font = '400 22px monospace';
  ctx.fillText('Some memories never log out.  ·  BUILD v2026.9-FINAL', 96, 780);

  downloadCanvas(canvas, `G9-Graduation-Pass-${passId}.png`);
}

export function exportG9BlessingPNG(blessing, drawIndex, total = 30) {
  const w = 1080;
  const h = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createRadialGradient(w / 2, h * 0.35, 30, w / 2, h / 2, 850);
  bg.addColorStop(0, '#1B2842');
  bg.addColorStop(1, '#080C16');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  drawTechFrame(ctx, w, h, 48);

  // Cube wireframe graphic
  ctx.strokeStyle = 'rgba(146, 120, 237, 0.7)';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(w / 2 - 110, 250, 220, 220);
  ctx.strokeStyle = 'rgba(166, 181, 200, 0.45)';
  ctx.strokeRect(w / 2 - 75, 285, 150, 150);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#9278ED';
  ctx.font = '600 24px monospace';
  ctx.fillText('G9 // GRADUATE DESTINY PROTOCOL', w / 2, 130);

  ctx.fillStyle = '#DCE8F4';
  ctx.font = '700 44px sans-serif';
  ctx.fillText('毕业牛马命运分配局', w / 2, 570);

  ctx.fillStyle = '#A6B5C8';
  ctx.font = '500 22px monospace';
  ctx.fillText(`ALLOCATION #${String(drawIndex).padStart(2, '0')} / ${total}`, w / 2, 625);

  // Blessing text wrapped cleanly for CJK/mixed chars
  ctx.fillStyle = '#DCE8F4';
  ctx.font = '700 48px "Microsoft YaHei", "PingFang SC", sans-serif';
  const maxWidth = 820;
  const chars = Array.from(blessing);
  const lines = [];
  let line = '';
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);

  lines.forEach((ln, idx) => {
    ctx.fillText(ln, w / 2, 760 + idx * 72);
  });

  ctx.fillStyle = 'rgba(166, 181, 200, 0.72)';
  ctx.font = '400 22px monospace';
  ctx.fillText('G9 — THE LAST SAVE  ·  SOFTWARE ENGINEERING 2024–2026', w / 2, 1210);

  downloadCanvas(canvas, `G9-Destiny-Drop-${drawIndex}.png`);
}

export function exportFinalCommitPNG(exploredCount, totalCount) {
  const w = 1200;
  const h = 1500;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#080C16');
  bg.addColorStop(0.55, '#111D30');
  bg.addColorStop(1, '#080C16');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  drawTechFrame(ctx, w, h, 48);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#9278ED';
  ctx.font = '600 24px monospace';
  ctx.fillText('FINAL COMMIT · BUILD SUCCESSFUL', w / 2, 145);

  ctx.fillStyle = '#DCE8F4';
  ctx.font = '700 72px sans-serif';
  ctx.fillText('G9 — THE LAST SAVE', w / 2, 300);

  ctx.fillStyle = '#A6B5C8';
  ctx.font = '500 28px monospace';
  ctx.fillText('Software Engineering · 2024–2026', w / 2, 365);

  // Code block box
  ctx.fillStyle = 'rgba(17, 29, 48, 0.9)';
  ctx.fillRect(140, 460, w - 280, 410);
  ctx.strokeStyle = 'rgba(146, 120, 237, 0.6)';
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 460, w - 280, 410);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#DCE8F4';
  ctx.font = '500 28px monospace';
  const codeLines = [
    'const G9 = {',
    '  status: "Graduated",',
    '  memories: "Permanent",',
    '  assignments: "Completed",',
    `  explored: "${exploredCount} / ${totalCount}",`,
    '  friendship: Infinity',
    '};',
    'save(G9);'
  ];
  codeLines.forEach((l, i) => {
    ctx.fillText(l, 200, 535 + i * 42);
  });

  ctx.textAlign = 'center';
  ctx.fillStyle = '#DCE8F4';
  ctx.font = '600 38px sans-serif';
  ctx.fillText('Our story is not a game over.', w / 2, 1050);

  ctx.fillStyle = '#9278ED';
  ctx.font = '600 34px sans-serif';
  ctx.fillText('Not goodbye. See you again.', w / 2, 1125);

  ctx.fillStyle = 'rgba(166, 181, 200, 0.72)';
  ctx.font = '400 22px monospace';
  ctx.fillText('CONNECTION: PERMANENT  ·  G9 ARCHIVE', w / 2, 1360);

  downloadCanvas(canvas, 'G9-The-Last-Save-Final-Commit.png');
}
