let canvas;
let ctx;
let width;
let height;
let drops = [];
let fontSize = 14;
let chars = '01<>/{}';
let rafId = null;
let lastFrame = 0;
let config = {
  isLight: false,
  color: '77, 163, 255', // default blue
  fps: 30
};

self.onmessage = function(e) {
  const { type, payload } = e.data;

  if (type === 'init') {
    canvas = payload.canvas;
    ctx = canvas.getContext('2d');
    width = payload.width;
    height = payload.height;
    canvas.width = width;
    canvas.height = height;
    initDrops();
    requestAnimationFrame(draw);
  } else if (type === 'resize') {
    width = payload.width;
    height = payload.height;
    canvas.width = width;
    canvas.height = height;
    initDrops();
  } else if (type === 'config') {
    config = { ...config, ...payload };
  } else if (type === 'pause') {
    cancelAnimationFrame(rafId);
    rafId = null;
  } else if (type === 'resume') {
    if (!rafId) requestAnimationFrame(draw);
  }
};

function initDrops() {
  const columns = width / fontSize;
  drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
}

function draw(timestamp) {
  if (timestamp - lastFrame < 1000 / config.fps) {
    rafId = requestAnimationFrame(draw);
    return;
  }
  lastFrame = timestamp;

  // Trail effect
  if (config.isLight) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  } else {
    ctx.fillStyle = 'rgba(17, 17, 17, 0.1)';
  }
  ctx.fillRect(0, 0, width, height);

  // Text settings
  const opacity = config.isLight ? '0.8' : '0.4';
  ctx.fillStyle = `rgba(${config.color}, ${opacity})`;
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  rafId = requestAnimationFrame(draw);
}
