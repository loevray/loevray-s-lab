"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Button from "../ui/common/Button";
import toast from "../ui/common/toast/createObserver";

interface LadderPathProps {
  coord: {
    startX: number;
    endX: number;
    y: number;
  };
  connectedIndex: {
    vertical: number;
  };
}

const ladderWidth = 1000;
const ladderHeight = 500;
const ladderX = 100;
const ladderY = 50;

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userCount, setUserCount] = useState(2);
  const [pathArray, setPathArray] = useState<LadderPathProps[][]>([]);
  const minHorizontalLines = userCount - 1;
  const columnGap = ladderWidth / minHorizontalLines;

  useEffect(() => {
    initializeLadder();
  }, [userCount]);

  const initializeLadder = () => {
    if (userCount < 2 || userCount > 20) {
      alert("유저 수는 2명 이상 20명 이하로 설정해주세요.");
      return;
    }
    const newPathArray = Array.from({ length: userCount }, () => []);
    drawLadder(newPathArray);
    setPathArray(newPathArray);
  };

  const drawLadder = (newPathArray: LadderPathProps[][]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    for (let i = 0; i < userCount; i++) {
      const x = ladderX + i * columnGap;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, ladderY);
      ctx.lineTo(x, ladderY + ladderHeight);
      ctx.stroke();
    }

    const horizontalLines =
      minHorizontalLines + Math.ceil(Math.random() * (minHorizontalLines * 2));

    for (let i = 0; i < horizontalLines; i++) {
      const currentVerticalIndex = i % minHorizontalLines;
      const connectedVerticalIndex = currentVerticalIndex + 1;

      const x = ladderX + currentVerticalIndex * columnGap;
      const y = ladderY + Math.random() * ladderHeight;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + columnGap, y);
      ctx.stroke();

      newPathArray[currentVerticalIndex].push({
        coord: { startX: x, endX: x + columnGap, y },
        connectedIndex: {
          vertical: connectedVerticalIndex,
        },
      });
      newPathArray[connectedVerticalIndex].push({
        coord: { startX: x + columnGap, endX: x, y },
        connectedIndex: {
          vertical: currentVerticalIndex,
        },
      });
    }

    newPathArray.forEach((path) =>
      path.sort(({ coord: { y: ay } }, { coord: { y: by } }) => ay - by)
    );
  };

  const redrawLadder = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < userCount; i++) {
      const x = ladderX + i * columnGap;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, ladderY);
      ctx.lineTo(x, ladderY + ladderHeight);
      ctx.stroke();
    }

    pathArray.forEach((verticalPath) => {
      verticalPath.forEach(({ coord: { startX, endX, y } }) => {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });
    });
  };

  const showResult = useCallback(
    (e: MouseEvent, startPoint: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      redrawLadder(); // Redraw the ladder

      const userIndex = startPoint - 1;
      let nextLine = pathArray[userIndex][0];

      let prevX = ladderX + userIndex * columnGap;
      let prevY = ladderY;

      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";

      let t = 0;
      while (nextLine) {
        ++t;
        if (t >= 1000) break; //혹시 모르는 예외처리...
        const { startX, endX, y } = nextLine.coord;
        const { vertical } = nextLine.connectedIndex;

        // 수직 경로
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(prevX, y);
        ctx.stroke();

        // 수평 경로
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();

        const nextLineIndex = pathArray[vertical].findIndex(
          ({ coord }) =>
            coord.startX === endX && coord.endX === startX && coord.y === y
        );

        const tempNextLine = pathArray[vertical]?.[nextLineIndex + 1];

        if (tempNextLine && nextLineIndex !== -1) {
          nextLine = tempNextLine;
          prevX = endX;
          prevY = y;
        } else {
          ctx.beginPath();
          ctx.moveTo(endX, y);
          ctx.lineTo(endX, ladderY + ladderHeight);
          ctx.stroke();
        }
      }
    },
    [columnGap, pathArray]
  );

  const renderButtons = useCallback(() => {
    const buttons = [];
    for (let i = 0; i < userCount; ++i) {
      buttons.push(
        <Button
          key={i}
          text={`${i + 1}번`}
          onClick={(e) => showResult(e, i + 1)}
          style={{
            position: "absolute",
            left: `${i * columnGap + ladderX / 2}px`,
            top: "10px",
          }}
        />
      );
    }
    return buttons;
  }, [userCount, showResult, columnGap]);

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
      <div className="relative">{renderButtons()}</div>
      <canvas ref={canvasRef} width="1200" height="700"></canvas>
    </div>
  );
};

export default Page;
