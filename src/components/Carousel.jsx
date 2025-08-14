"use client";
import { useEffect, useRef, useState } from "react";

export default function Carousel({ images=[] }){
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const wrapRef = useRef(null);
  const INTERVAL_MS = 7000;

  const goTo = (i) => setIdx((i + images.length) % images.length);
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const stop = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  const start = () => { stop(); timerRef.current = setInterval(() => setIdx(i => (i+1)%images.length), INTERVAL_MS); };
  const restart = () => start();

  useEffect(() => {
    start();
    const vis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener('visibilitychange', vis);
    return () => { stop(); document.removeEventListener('visibilitychange', vis); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onEnter = () => stop();
    const onLeave = () => start();
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    return () => { wrap.removeEventListener('mouseenter', onEnter); wrap.removeEventListener('mouseleave', onLeave); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { prev(); restart(); }
      if (e.key === 'ArrowRight') { next(); restart(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div ref={wrapRef} className="relative mx-auto overflow-visible" style={{width:460,height:460}}>
      <div className="glow"></div>
      <div className="absolute inset-0 rounded-[22px] ring-1 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="avatar" src={images[idx]} className="absolute w-full h-full object-cover" />
      </div>
      <button type="button" aria-label="Previous" onClick={()=>{prev();restart();}} className="carousel-btn left">❮</button>
      <button type="button" aria-label="Next"     onClick={()=>{next();restart();}} className="carousel-btn right">❯</button>

      <div className="dots">
        {images.map((_, i) => (
          <button key={i} type="button"
            onClick={()=>{goTo(i);restart();}}
            className={"dot" + (i===idx ? " active" : "")} />
        ))}
      </div>
    </div>
  );
}
