import { useEffect, useRef } from "react";

const TechArt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.cursor = "none"; // cacher le curseur natif

    // === COLORS ===
    const colors = {
      offWhite: "#f5f5f5",
      gray: "#666666",
      blue: "#4a9eff",
      sakuraPink: "#f9b5c3",
      sakuraCenter: "#f26d85",
      cardBg: "#f5f5f5",
    };

    // === CURSOR POSITION ===
    const cursor = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener("mousemove", (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    });

    // === CURSOR TRAIL ===
    const cursorTrail = [];

    // === HEX → RGBA UTILITY ===
    function hexToRgba(hex, alpha = 1) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    // === DRAW SAKURA ===
    function drawSakura(x, y, size, color1, color2, alpha = 1) {
      ctx.save();
      ctx.translate(x, y);
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.5, -size * 0.5, 0, -size);
        ctx.quadraticCurveTo(-size * 0.5, -size * 0.5, 0, 0);
        ctx.fillStyle = hexToRgba(color1, alpha);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color2, alpha);
      ctx.fill();
      ctx.restore();
    }

    // === DRAW BACKGROUND ===
    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, colors.offWhite);
      gradient.addColorStop(1, "#e0f0ff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // === GRID ===
    function drawGrid() {
      ctx.strokeStyle = colors.blue + "30";
      ctx.lineWidth = 1;
      const spacing = 82;
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.fillStyle = colors.gray + "30";
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          if (Math.random() > 0.85) ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }

    // === TOKYO TEXT ===
    function drawTokyoText() {
      ctx.save();
      ctx.translate(100, 120);
      ctx.font = "italic bold 100px Arial, sans-serif";
      ctx.lineWidth = 4;
      ctx.strokeStyle = colors.blue;
      ctx.shadowColor = colors.blue;
      ctx.shadowBlur = 20;
      ctx.strokeText("TOKYO", 0, 0);
      drawSakura(350, -65, 25, colors.sakuraPink, colors.sakuraCenter);
      ctx.font = "bold 36px 'Arial', sans-serif";
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.blue;
      ctx.shadowColor = colors.blue;
      ctx.shadowBlur = 10;
      ctx.strokeText("東京", 85, 40);
      ctx.restore();
    }

    // === RANDOM JAPANESE CHARACTERS ===
    const japaneseChars = [
      "夢",
      "愛",
      "風",
      "光",
      "心",
      "道",
      "力",
      "星",
      "海",
      "山",
    ];
    const randomWords = Array.from({ length: 20 }, () => ({
      text: japaneseChars[Math.floor(Math.random() * japaneseChars.length)],
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }));
    function drawRandomJapaneseWords() {
      ctx.font = "bold 24px 'Arial', sans-serif";
      ctx.fillStyle = colors.blue + "40";
      randomWords.forEach(({ text, x, y }) => ctx.fillText(text, x, y));
    }

    // === IMAGES ===
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759867903/cad25b893505a8680c740c5d0a3e880a-removebg-preview_yq4h9w.png";
    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759869038/c44d5b1a3c64c77dde7c9325ec254663-removebg-preview_elxl0v.png";

    function drawCenteredImage() {
      if (!img.complete) return;
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.drawImage(
        img,
        (canvas.width - 400) / 2,
        (canvas.height - 800) / 2,
        400,
        800
      );
      ctx.restore();
    }

    function drawSecondImage() {
      if (!img2.complete) return;
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.drawImage(
        img2,
        (canvas.width - 300) / 2 + 50,
        (canvas.height - 300) / 2 - 50,
        300,
        300
      );
      ctx.restore();
    }

    // === STARS ===
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
    }));
    function drawStars() {
      ctx.save();
      ctx.fillStyle = "#ffffffAA";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.restore();
    }

    // === CENTRAL TEXT "JAPANESE ART" ===
    function drawCentralText() {
      ctx.save();
      ctx.font = "bold 80px Arial, sans-serif";
      ctx.lineWidth = 4;
      ctx.strokeStyle = colors.blue;
      ctx.shadowColor = colors.blue;
      ctx.shadowBlur = 30;

      const text = "JAPANESE ART";
      const x = canvas.width * 0.6;
      const y = canvas.height / 2;
      ctx.strokeText(text, x, y);

      ctx.restore();
    }

    // === CURSOR SAKURA ===
    function drawCursorSakura() {
      drawSakura(
        cursor.x,
        cursor.y,
        15,
        colors.sakuraPink,
        colors.sakuraCenter
      );

      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        const sakura = cursorTrail[i];
        const alpha = sakura.life / sakura.maxLife;
        drawSakura(
          sakura.x,
          sakura.y,
          sakura.size,
          sakura.color1,
          sakura.color2,
          alpha
        );
        sakura.x += sakura.vx;
        sakura.y += sakura.vy;
        sakura.life--;
        if (sakura.life <= 0) cursorTrail.splice(i, 1);
      }
    }

    canvas.addEventListener("click", () => {
      for (let i = 0; i < 5; i++) {
        cursorTrail.push({
          x: cursor.x + (Math.random() - 0.5) * 40,
          y: cursor.y + (Math.random() - 0.5) * 40,
          size: Math.random() * 12 + 5,
          life: 80,
          maxLife: 80,
          color1: colors.sakuraPink,
          color2: colors.sakuraCenter,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.5,
        });
      }
    });

    // === ANIMATION LOOP ===
    function animate() {
      drawBackground();
      drawGrid();
      drawTokyoText();
      drawRandomJapaneseWords();
      drawCenteredImage();
      drawSecondImage();
      drawStars();
      drawCentralText();
      drawCursorSakura();
      requestAnimationFrame(animate);
    }
    animate();

    // === RESIZE HANDLER ===
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="full-screen-canvas" />;
};

export default TechArt;
