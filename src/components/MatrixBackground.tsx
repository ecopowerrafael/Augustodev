import React, { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Drops coordinates and speeds
    let drops: { y: number; speed: number; chars: string[] }[] = [];
    const initDrops = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          y: Math.random() * -height,
          speed: 1 + Math.random() * 2,
          chars: Array.from({ length: 15 }, () =>
            Math.random() > 0.5 ? "1" : "0"
          ),
        };
      }
    };
    initDrops();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initDrops();
    };

    window.addEventListener("resize", handleResize);

    const draw = () => {
      // Clear with slight alpha to create trailing effect
      ctx.fillStyle = "rgba(2, 2, 2, 0.12)"; // Pitch black background
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const drop = drops[i];

        // Check distance to mouse
        const distToMouse = Math.hypot(x - mouse.x, drop.y - mouse.y);
        const nearMouse = distToMouse < mouse.radius;

        // Determine color: gradient from bright neon green to darker green/white
        // If near mouse, glow bright white/green
        if (nearMouse) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00FF41";
        } else {
          // Gradient based on vertical position
          const ratio = Math.max(0, Math.min(1, drop.y / height));
          if (ratio < 0.4) {
            ctx.fillStyle = "rgba(0, 255, 65, 0.85)"; // Bright Neon Green
          } else if (ratio < 0.7) {
            ctx.fillStyle = "rgba(0, 255, 65, 0.4)"; // Medium Neon Green
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // Soft White fade
          }
          ctx.shadowBlur = 0;
        }

        // Draw character
        const charIndex = Math.floor(Math.random() * drop.chars.length);
        const char = Math.random() > 0.98 ? "AD" : drop.chars[charIndex]; // Occasionally drop "AD"
        ctx.fillText(char, x, drop.y);

        // Update drop position
        const currentSpeed = nearMouse ? drop.speed * 2.5 : drop.speed;
        drop.y += currentSpeed;

        // Reset drop when off screen
        if (drop.y > height && Math.random() > 0.975) {
          drop.y = -20;
          drop.speed = 1 + Math.random() * 2.5;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.22 }}
    />
  );
}
