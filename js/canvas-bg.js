/* ==========================================================================
   INTERACTIVE CANVAS BACKGROUND & MOUSE SPOTLIGHT AURA
   ========================================================================== */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, targetX: null, targetY: null, radius: 220 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.6;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
      this.color = Math.random() > 0.4 ? '#7c5cff' : Math.random() > 0.5 ? '#00e5ff' : '#ff6b4a';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse reaction proximity
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.baseAlpha;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = '#7c5cff';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  function drawSpotlight() {
    if (mouse.x === null || mouse.y === null) return;

    // Smooth cursor target easing
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    let grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.8);
    grad.addColorStop(0, 'rgba(124, 92, 255, 0.14)');
    grad.addColorStop(0.5, 'rgba(0, 229, 255, 0.05)');
    grad.addColorStop(1, 'rgba(7, 7, 12, 0)');

    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.radius * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    if (mouse.targetX !== null && mouse.x === null) {
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;
    }

    drawSpotlight();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
  }

  resize();
  animate();
})();
