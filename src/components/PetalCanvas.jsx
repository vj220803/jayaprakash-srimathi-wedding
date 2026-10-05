import React, { useEffect, useRef } from "react";

/**
 * PetalCanvas: Renders subtle, elegant floating golden embers and South Indian
 * wedding petals (soft rose and jasmine) with silky smooth canvas physics.
 */
export const PetalCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Reduced density for peak performance on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 45;

    // Petal types: 'rose', 'jasmine', 'gold-spark'
    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.type = Math.random() > 0.45 ? (Math.random() > 0.5 ? "rose" : "jasmine") : "gold-spark";
        
        if (this.type === "gold-spark") {
          this.size = Math.random() * 2.2 + 0.8;
          this.speedY = Math.random() * 0.4 + 0.2;
          this.speedX = (Math.random() - 0.5) * 0.4;
          this.opacity = Math.random() * 0.6 + 0.2;
          this.pulse = Math.random() * Math.PI;
          this.pulseSpeed = Math.random() * 0.03 + 0.01;
        } else if (this.type === "rose") {
          this.size = Math.random() * 6 + 6;
          this.speedY = Math.random() * 0.7 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.6;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotSpeed = (Math.random() - 0.5) * 0.02;
          this.opacity = Math.random() * 0.45 + 0.35;
          this.flip = Math.random() * Math.PI;
          this.flipSpeed = Math.random() * 0.03 + 0.01;
        } else {
          // jasmine
          this.size = Math.random() * 4 + 4;
          this.speedY = Math.random() * 0.6 + 0.4;
          this.speedX = (Math.random() - 0.5) * 0.5;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotSpeed = (Math.random() - 0.5) * 0.025;
          this.opacity = Math.random() * 0.5 + 0.4;
          this.flip = Math.random() * Math.PI;
          this.flipSpeed = Math.random() * 0.02 + 0.01;
        }
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.005) * 0.4;

        if (this.type === "gold-spark") {
          this.pulse += this.pulseSpeed;
        } else {
          this.rotation += this.rotSpeed;
          this.flip += this.flipSpeed;
        }

        if (this.y > height + 25 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === "gold-spark") {
          const currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulse));
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 215, 130, ${currentOpacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(255, 220, 120, 0.8)";
          ctx.fill();
        } else if (this.type === "rose") {
          ctx.rotate(this.rotation);
          ctx.scale(1, Math.sin(this.flip));
          ctx.beginPath();
          // Curved rose petal shape
          ctx.moveTo(0, -this.size);
          ctx.bezierCurveTo(this.size * 0.9, -this.size * 0.5, this.size * 0.9, this.size * 0.7, 0, this.size);
          ctx.bezierCurveTo(-this.size * 0.9, this.size * 0.7, -this.size * 0.9, -this.size * 0.5, 0, -this.size);
          ctx.fillStyle = `rgba(195, 60, 95, ${this.opacity})`;
          ctx.fill();
        } else {
          // Jasmine petal (soft ivory white with pale yellow center touch)
          ctx.rotate(this.rotation);
          ctx.scale(0.8, Math.sin(this.flip));
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 250, 240, ${this.opacity})`;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 15,
      }}
    />
  );
};
