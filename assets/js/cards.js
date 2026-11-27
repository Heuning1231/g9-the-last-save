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
  const w=1080,h=1350,canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d');
  const rect=(x,y,w,h,fill,stroke)=>{ctx.fillStyle=fill;ctx.fillRect(x,y,w,h);if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.strokeRect(x,y,w,h)}};
  const text=(v,x,y,font,color,align='left')=>{ctx.font=font;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(v,x,y)};
  const line=(x,y,X,Y,color,width=2)=>{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(X,Y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()};
  let bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#070b16');bg.addColorStop(.45,'#1a2943');bg.addColorStop(1,'#0b1022');rect(0,0,w,h,bg);
  let glow=ctx.createRadialGradient(780,280,0,780,280,650);glow.addColorStop(0,'#9a79ff55');glow.addColorStop(1,'#9a79ff00');rect(0,0,w,h,glow);
  for(let i=0;i<26;i++){line(0,i*56,w,i*56,'#9fb4d110',1);line(i*56,0,i*56,h,'#9fb4d110',1)}
  const metal=ctx.createLinearGradient(0,0,w,h);metal.addColorStop(0,'#dce8f4');metal.addColorStop(.22,'#576c89');metal.addColorStop(.45,'#b5a6ff');metal.addColorStop(.7,'#364c67');metal.addColorStop(1,'#bfcde6');
  ctx.strokeStyle=metal;ctx.lineWidth=12;ctx.strokeRect(36,36,w-72,h-72);ctx.lineWidth=2;ctx.strokeRect(54,54,w-108,h-108);drawTechFrame(ctx,w,h,67);
  text('G9 / THE LAST SAVE',96,125,'700 28px monospace','#e2ebfc');text('BUILD 2026',984,125,'500 24px monospace','#aa9aff','right');
  line(96,151,984,151,'#6b83ac');
  text('DESTINY',94,245,'800 90px sans-serif','#e9f0ff');text('CERTIFICATE',98,311,'600 52px sans-serif','#b6c7e1');
  text('毕业牛马命运分配局',99,371,'600 35px "Microsoft YaHei","PingFang SC",sans-serif','#a99aff');
  // Faceted decorative holographic G9 seal.
  ctx.save();ctx.translate(843,262);const holo=ctx.createLinearGradient(-100,-100,100,100);holo.addColorStop(0,'#e0f3ff');holo.addColorStop(.28,'#8472d2');holo.addColorStop(.53,'#90decf');holo.addColorStop(.76,'#7966cc');holo.addColorStop(1,'#e6e3ff');ctx.fillStyle=holo;ctx.beginPath();for(let i=0;i<6;i++){let a=i*Math.PI/3-Math.PI/2;let x=Math.cos(a)*105,y=Math.sin(a)*105;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.closePath();ctx.fill();ctx.strokeStyle='#dce8ff';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.arc(0,0,73,0,Math.PI*2);ctx.fillStyle='#111d30';ctx.fill();ctx.stroke();text('G9',0,17,'800 56px monospace','#eef2ff','center');ctx.restore();
  rect(95,429,890,84,'#101a2d','#657ba4');text('ALLOCATION / '+String(drawIndex).padStart(2,'0')+' OF '+total,119,480,'600 27px monospace','#c4d3eb');text('ISSUED',960,480,'600 24px monospace','#94dfcc','right');
  rect(95,549,890,435,'#101a30','#7989bb');rect(95,549,8,435,'#9e89ff');
  text('YOUR GRADUATE DESTINY',131,609,'600 25px monospace','#b5a8ff');
  let fontSize=64,lines=[];const wrap=()=>{let l='';lines=[];for(const ch of Array.from(blessing)){if(l&&ctx.measureText(l+ch).width>790){lines.push(l);l=ch}else l+=ch}if(l)lines.push(l)};
  do{ctx.font='700 '+fontSize+'px "Microsoft YaHei","PingFang SC",sans-serif';wrap();if(lines.length<=3)break;fontSize-=4}while(fontSize>40);
  let step=fontSize*1.5;lines.forEach((l,i)=>text(l,w/2,770+(i-(lines.length-1)/2)*step,ctx.font,'#f1f5ff','center'));
  text('STATUS: DESTINY ASSIGNED',131,942,'500 23px monospace','#8bd9cf');
  line(95,1030,985,1030,'#657ba4');text('SOFTWARE ENGINEERING',96,1086,'600 27px monospace','#dce8f4');text('2024 — 2026',96,1131,'500 25px monospace','#a6b5c8');
  // Decorative data strip, not a scannable code.
  for(let i=0,x=730;i<35;i++){let bw=2+(i*7%5);rect(x,1060,bw,77,'#a6b5c8');x+=bw+3}
  text('Some memories never log out.',w/2,1235,'500 27px sans-serif','#c6d4ea','center');
  downloadCanvas(canvas,'G9-Destiny-Certificate-'+String(drawIndex).padStart(2,'0')+'.png');
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
