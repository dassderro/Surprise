// floating stickers
const emojis = ['💖','💜','💙','✨','🌸','🦋','💌','🌈','⭐','🎀','💫','🫶'];
const box = document.getElementById('stickers');
for (let i = 0; i < 26; i++) {
  const s = document.createElement('span');
  s.className = 'sticker';
  s.textContent = emojis[i % emojis.length];
  s.style.left = Math.random() * 95 + '%';
  s.style.top = Math.random() * 92 + '%';
  s.style.fontSize = 26 + Math.random() * 40 + 'px';
  s.style.animationDelay = Math.random() * 5 + 's';
  s.style.animationDuration = 5 + Math.random() * 5 + 's';
  box.appendChild(s);
}

// screen 1 -> screen 2
document.getElementById('nextBtn').addEventListener('click', () => {
  document.getElementById('screen1').classList.remove('active');
  document.getElementById('screen2').classList.add('active');
  window.scrollTo(0, 0);
});

// the "No" button runs away
const no = document.getElementById('no');
const yes = document.getElementById('yes');
let scale = 1;
function dodge() {
  no.style.position = 'fixed';
  no.style.left = Math.random() * (window.innerWidth - no.offsetWidth - 20) + 10 + 'px';
  no.style.top = Math.random() * (window.innerHeight - no.offsetHeight - 20) + 10 + 'px';
  scale += 0.12;
  yes.style.transform = 'scale(' + scale + ')';
}
no.addEventListener('mouseover', dodge);
no.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); });
no.addEventListener('click', dodge);

// YES!
yes.addEventListener('click', () => {
  document.querySelector('.reveal').classList.add('hidden');
  no.style.display = 'none';
  document.getElementById('thanks').classList.remove('hidden');
  startConfetti();
});

// full-screen confetti
function startConfetti() {
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:50;pointer-events:none';
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#ff6fb5', '#ff4f9a', '#b693ff', '#8a5cff', '#7ec8ff', '#4aa8ff', '#ffe66d', '#ffffff'];
  let pieces = [];

  function burst(x, y, n) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 6 + Math.random() * 12;
      pieces.push({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6,
        w: 6 + Math.random() * 8, h: 10 + Math.random() * 10,
        r: Math.random() * 6, vr: (Math.random() - .5) * .4,
        c: colors[Math.floor(Math.random() * colors.length)],
        round: Math.random() < .3
      });
    }
  }

  // bursts from all over the screen, then a rain from the top
  const W = () => window.innerWidth, H = () => window.innerHeight;
  burst(W() / 2, H() / 2, 180);
  const bursts = setInterval(() => burst(Math.random() * W(), Math.random() * H() * .7, 90), 450);
  const rain = setInterval(() => {
    for (let i = 0; i < 8; i++) {
      pieces.push({
        x: Math.random() * W(), y: -20, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4,
        w: 6 + Math.random() * 8, h: 10 + Math.random() * 10,
        r: Math.random() * 6, vr: (Math.random() - .5) * .4,
        c: colors[Math.floor(Math.random() * colors.length)], round: Math.random() < .3
      });
    }
  }, 60);
  setTimeout(() => clearInterval(bursts), 6000);
  setTimeout(() => clearInterval(rain), 14000);

  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    pieces.forEach(p => {
      p.vy += .25; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 7); ctx.fill(); }
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    pieces = pieces.filter(p => p.y < cv.height + 40);
    requestAnimationFrame(draw);
  }
  draw();
}