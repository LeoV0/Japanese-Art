import { useEffect, useRef } from "react";

const TechArt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = {
      offWhite: "#f5f5f5",
      lightGray: "#d4d4d4",
      gray: "#666666",
      blue: "#4a9eff",
      black: "#1a1a1a",
      sakuraPink: "#f9b5c3",
      sakuraCenter: "#f26d85",
    };

    function drawGrid() {
      ctx.fillStyle = colors.offWhite;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      // Petits points gris discrets
      ctx.fillStyle = colors.gray + "30";
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          if (Math.random() > 0.85) {
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }
    }

    // 🌸 Petit sakura stylisé après le "O" de TOKYO
    function drawSakura(x, y, size) {
      ctx.save();
      ctx.translate(x, y);

      // pétales (5)
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.5, -size * 0.5, 0, -size);
        ctx.quadraticCurveTo(-size * 0.5, -size * 0.5, 0, 0);
        ctx.fillStyle = colors.sakuraPink;
        ctx.fill();
      }

      // cœur
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = colors.sakuraCenter;
      ctx.fill();

      ctx.restore();
    }

    function drawTokyoText() {
      ctx.save();
      ctx.translate(100, 120);

      // Texte "TOKYO" en italique avec contour
      ctx.font = "italic bold 100px Arial, sans-serif";
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.blue;
      ctx.strokeText("TOKYO", 0, 0);

      // Position du Sakura
      drawSakura(350, -65, 25);

      // Texte japonais en dessous (東京)
      ctx.font = "bold 36px 'Arial', sans-serif";
      ctx.strokeStyle = colors.blue;
      ctx.lineWidth = 1.2;
      ctx.strokeText("東京", 85, 40);

      ctx.restore();
    }

    // Générer les mots japonais avec positions fixes
    const japaneseWords = [
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
    const randomWords = [];
    const wordCount = 20; // combien de mots fixes sur le canvas

    for (let i = 0; i < wordCount; i++) {
      randomWords.push({
        text: japaneseWords[Math.floor(Math.random() * japaneseWords.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }

    // Fonction pour dessiner les mots fixes
    function drawFixedJapaneseWords() {
      ctx.font = "bold 24px 'Arial', sans-serif";
      ctx.fillStyle = colors.blue + "40";
      randomWords.forEach(({ text, x, y }) => {
        ctx.fillText(text, x, y);
      });
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759867903/cad25b893505a8680c740c5d0a3e880a-removebg-preview_yq4h9w.png";

    // Fonction pour dessiner l'image centrée
    function drawCenteredImage() {
      if (!img.complete) return;
      const imgWidth = 400;
      const imgHeight = 800;
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.drawImage(img, x, y, imgWidth, imgHeight);
      ctx.restore();
    }

    // Création des particules étoiles
    const stars = [];
    const starCount = 100; // ajuster le nombre d'étoiles

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2, // vitesse très lente
      });
    }

    // Fonction pour dessiner les étoiles
    function drawStars() {
      ctx.save();
      ctx.fillStyle = "#ffffffAA"; // blanc transparent
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Mise à jour de la position
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0; // réapparaît en haut
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.restore();
    }

    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759869038/c44d5b1a3c64c77dde7c9325ec254663-removebg-preview_elxl0v.png";

    function drawSecondImage() {
      if (!img2.complete) return;
      const imgWidth = 300; // tu peux ajuster la taille
      const imgHeight = 300; // garder les proportions ou adapter
      const x = (canvas.width - imgWidth) / 2 + 50; // léger décalage à droite
      const y = (canvas.height - imgHeight) / 2 - 50; // léger décalage vers le haut
      ctx.save();
      ctx.globalAlpha = 0.8; // légère transparence
      ctx.drawImage(img2, x, y, imgWidth, imgHeight);
      ctx.restore();
    }

    const img3 = new Image();
    img3.crossOrigin = "anonymous";
    img3.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759869038/c252de7c1b86cdfbc515b01bbea83475-removebg-preview_fpkjyd.png";

    function animate() {
      drawGrid();
      drawTokyoText();
      drawFixedJapaneseWords();
      drawCenteredImage();
      drawSecondImage();
      drawStars();
      requestAnimationFrame(animate);
    }

    animate();

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
