"use client";

import { useRef } from "react";

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawLadders = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
    ctx.lineTo(50, 200);
    ctx.lineTo(50, 50);
    ctx.stroke();
  };
  drawLadders();
  return (
    <main>
      <div>ㅎㅇ 여기는 사다리타기페이지</div>
      <div>canvas를 공부할거에요</div>
      <canvas width={600} height={600} ref={canvasRef} />
    </main>
  );
};

export default Page;
