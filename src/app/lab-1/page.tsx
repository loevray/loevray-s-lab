"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/common/Button";
import toast from "../ui/common/toast/createObserver";

interface LadderPathProps {
  coord: {
    x: number;
    y: number;
  };
  connectedIndex: {
    horizon: number;
    vertical: number;
  };
}
const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userCount, setUserCount] = useState(2);
  let pathArray: LadderPathProps[][] = Array.from({ length: userCount }, () =>
    Array()
  );

  const initializeLadder = () => {
    if (userCount < 2 || userCount > 20) {
      alert("유저 수는 2명 이상 10명 이하로 설정해주세요.");
      return;
    }
    pathArray = Array.from({ length: userCount }, () => Array());
    drawLadder();
  };

  const drawLadder = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ladderWidth = 1000;
    const ladderHeight = 500;
    const ladderX = 100;
    const ladderY = 50;
    const minHorizontalLines = userCount - 1;
    const columnGap = ladderWidth / minHorizontalLines;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < userCount; i++) {
      const x = ladderX + i * columnGap;
      ctx.beginPath();
      ctx.moveTo(x, ladderY);
      ctx.lineTo(x, ladderY + ladderHeight);
      ctx.stroke();
    }

    const horizontalLines =
      minHorizontalLines + Math.ceil(Math.random() * (minHorizontalLines * 2));

    for (let i = 0; i < horizontalLines; i++) {
      const currentVerticalIndex = i % minHorizontalLines;
      const x = ladderX + currentVerticalIndex * columnGap;
      let y = ladderY + Math.random() * ladderHeight;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + columnGap, y);
      ctx.stroke();

      pathArray[i % minHorizontalLines].push({
        coord: { x, y },
        connectedIndex: {
          horizon: pathArray[currentVerticalIndex].length,
          vertical: currentVerticalIndex,
        },
      });
    }

    console.log(pathArray);
  };

  const showResult = (startPoint: number) => {
    /* 
      pathArray[startPoint].forEach(() => {
              
      })
    */
  };

  return (
    <div>
      <div className="flex">
        <Button onClick={() => toast({ message: "기본 토스트" })}>
          디폴트
        </Button>
        <Button
          onClick={() => toast({ message: "에러 토스트", eventType: "error" })}
        >
          에러
        </Button>
        <Button
          onClick={() =>
            toast({ message: "성공 토스트", eventType: "success" })
          }
        >
          성공
        </Button>
        <Button
          onClick={() =>
            toast({ message: "경고 토스트", eventType: "warning" })
          }
        >
          경고
        </Button>
      </div>
      <h1>사다리타기</h1>
      <label htmlFor="userCount">유저 수 (최대 20명):</label>
      <input
        type="number"
        id="userCount"
        min="2"
        max="20"
        value={userCount}
        onChange={(e) => setUserCount(Number(e.target.value))}
      />
      <button onClick={initializeLadder}>사다리타기 시작</button>
      <button>결과 보기</button>
      <canvas ref={canvasRef} width="1200" height="1000"></canvas>
    </div>
  );
};

export default Page;
