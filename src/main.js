import { useState, useEffect, useRef } from "react";
import './styles.css';
import insta from './img/insta.jpg';
import twitter from './img/twitter.png';
import youtube from './img/youtube.jpg';
import Mac from './img/mac.png'
import arkadia from './img/arkadia.jpg'
import flowers from './img/flowers.jpg';
import google from './img/google.png';
import zoomquilt2 from './img/zoomquilt2.jpg';


export default function ZoomQuiltAdvanced() {
const [modal, setModal] = useState(false);
  const canvasRef = useRef(null);

  const imgShow = [
    {brand: 'Screensaver for Mac', slide1: <img src={Mac} alt="designs" className="image3" />},
    {brand: 'Live Wallpaper for Andriod', slide1: <img src={google} alt="designs1" className="image3" />}
  ]

  const imgShow1 = [
    {firstText: 'Infinite flowers', img1: <img src={flowers} alt="images" className="image3" />},
    {firstText: 'Arkadia', img1: <img src={arkadia} alt="images" className="image3" />},
    {firstText: 'Zoomquilt2', img1: <img src={zoomquilt2} alt="images" className="image3" />}
  ]

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const IMAGE_COUNT = 7;
    const images = [];
    let loaded = 0;

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const img = new Image();
      img.src = `/zoom/${i}.jpg`;
      img.onload = () => loaded++;
      images.push(img);
    }

    let index = 0;
    let t = 0; // zoom progress (0 → 1)
    const speed = 0.0012;

    function easeInOut(t) {
      return t * t * (3 - 2 * t);
    }

    function drawImageCover(img, scale) {
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawW, drawH;

      if (imgRatio > canvasRatio) {
        drawH = height * scale;
        drawW = drawH * imgRatio;
      } else {
        drawW = width * scale;
        drawH = drawW / imgRatio;
      }

      const x = (width - drawW) / 2;
      const y = (height - drawH) / 2;

      ctx.drawImage(img, x, y, drawW, drawH);
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);

      const img = images[index];
      const nextImg = images[(index + 1) % images.length];

      if (
        !img ||
        !nextImg ||
        !img.complete ||
        img.naturalWidth === 0 ||
        !nextImg.complete ||
        nextImg.naturalWidth === 0
      ) {
        requestAnimationFrame(loop);
        return;
      }

      const zoom = 1 + easeInOut(t) * 1.2;

      drawImageCover(img, zoom);

      if (t > 0.6) {
        const alpha = (t - 0.6) / 0.4;
        ctx.globalAlpha = alpha;
        drawImageCover(nextImg, 1 + easeInOut(t) * 1.2);
        ctx.globalAlpha = 1;
      }

      t += speed;
                      

      if (t >= 1) {
        t = t % 1; // prevents time drift
        index = (index + 1) % images.length;
    }


      requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
    <canvas onClick={() => setModal(!modal)}
      ref={canvasRef}
      style={{
        display: "block",
        background: "black",
      }}
    />
  {modal && 
    <div className="main">

    <div className="container">
      <h1 className="zoomq">The Zoomquilt</h1>
      <p className="collab">A collaborative infinitely zooming painting
Created in 2004</p>

<p className="collab1">Up and down keys to navigate</p>

<p className="text1">A project by<a href="nikkki.net" className="link1">Nikolaus Baumgarten</a>
<span className="socials">
  <a href="instagram.com" className="social"><div className="image1"><img src={insta} alt="instagram" className="image" /></div></a>
  <a href="twitter.com" className="social"><div className="image1"><img src={twitter} alt="x" className="image" /></div></a>
  <a href="youtube.com" className="social"><div className="image1"><img src={youtube} alt="youtube" className="image" /></div></a>
  </span></p>

  <p className="collab3">Participating illustrators: 
    Andreas Schumann, Eero Pitkänen, Florian Biege, 
    Jann Kerntke, Lars Götze, Luis Felipe, 
    Marcus Blättermann, Markus Neidel, Paul Painter, 
    Oliver Schlemmer, Sonja Schneider, Thorsten Wolber, 
    Tony Stanley, Ville Vanninen</p>

    <p><a href="https://www.youtube.com/watch?v=RpHnKaxt_OQ" className="zoom">The Zoomquilt on YouTube</a></p>

    <p><a href="/" className="read">Read about the history of this project</a></p>

    <div className="phase links">
      <a href="/" className="sec1">
      {imgShow.map((app, id ) => (
        <div className="sec2" key={id}>
          <div>{app.brand}</div> 
<div className="image2">{app.slide1}</div>
</div>
      ))}
      </a>
    </div>

    <div className="phase links">
      <a href="/" className="sec1">
      {imgShow1.map((app, id ) => (
        <div className="sec2" key={id}>
          <div>{app.firstText}</div> 
<div className="image4">{app.img1}</div>
</div>
      ))}
      </a>
    </div>
    
    <p className="privacy1"><a href="/" className="privacy">Privacy policy and Legal Notice</a></p>
    </div>
          </div>
  }
    </div>
  );
}
