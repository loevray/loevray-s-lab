"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import LADDER from "./constants/ladder";
import Button from "../ui/common/Button";
import { useFieldArray, useForm } from "react-hook-form";
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

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [userCount, setUserCount] = useState(2);
  const [pathArray, setPathArray] = useState<LadderPathProps[][]>([]);
  const [isStartGame, setIsStartGame] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset: resetPrizeInputs,
    getValues,
  } = useForm();

  const minHorizontalLines = userCount - 1;
  const columnGap = LADDER.WIDTH / minHorizontalLines;

  useEffect(() => {
    initializeLadder();
  }, [userCount]);

  const initializePath = () => {
    const newPathArray = Array.from({ length: userCount }, () => []);
    setPathArray(newPathArray);
  };

  const initializeLadder = () => {
    if (userCount < 2 || userCount > 10) {
      alert("유저 수는 2명 이상 20명 이하로 설정해주세요.");
      return;
    }
    initializePath();
    drawInitialLadder();
  };

  const drawVerticalLines = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < userCount; i++) {
      const x = LADDER.X + i * columnGap;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, LADDER.Y);
      ctx.lineTo(x, LADDER.Y + LADDER.HEIGHT);
      ctx.stroke();
    }
  };

  const drawHorizontalLines = (
    horizontalLines: number,
    ctx: CanvasRenderingContext2D
  ) => {
    const newPathArray: LadderPathProps[][] = Array.from(
      { length: userCount },
      () => []
    );

    for (let i = 0; i < horizontalLines; i++) {
      const currentVerticalIndex = i % minHorizontalLines;
      const connectedVerticalIndex = currentVerticalIndex + 1;

      const x = LADDER.X + currentVerticalIndex * columnGap;
      const y = LADDER.Y + Math.random() * LADDER.HEIGHT;

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

    setPathArray(newPathArray);
  };

  const drawInitialLadder = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    drawVerticalLines(ctx);
  };

  const redrawLadder = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    for (let i = 0; i < userCount; i++) {
      const x = LADDER.X + i * columnGap;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(x, LADDER.Y);
      ctx.lineTo(x, LADDER.Y + LADDER.HEIGHT);
      ctx.stroke();
    }

    console.log(pathArray);
    pathArray.forEach((verticalPath) => {
      verticalPath.forEach(({ coord: { startX, endX, y } }) => {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });
    });
  };

  const showResultPath = useCallback(
    (e: MouseEvent, startPoint: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      redrawLadder(); // Redraw the ladder

      const userIndex = startPoint - 1;
      let nextLine = pathArray[userIndex][0];

      let prevX = LADDER.X + userIndex * columnGap;
      let prevY = LADDER.Y;
      let currentIndex = userIndex;

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
          currentIndex = vertical;
          prevX = endX;
          prevY = y;
        } else {
          ctx.beginPath();
          ctx.moveTo(endX, y);
          ctx.lineTo(endX, LADDER.Y + LADDER.HEIGHT);
          ctx.stroke();

          getPrize(currentIndex);
          break;
        }
      }
    },
    [columnGap, pathArray]
  );

  const renderStartNumberButtons = useCallback(() => {
    const buttons = [];
    for (let i = 0; i < userCount; ++i) {
      buttons.push(
        <Button
          key={i}
          text={`${i + 1}`}
          onClick={(e) => showResultPath(e, i + 1)}
          style={{
            position: "absolute",
            left: `${i * columnGap + LADDER.X / 2}px`,
            top: "10px",
          }}
          className="w-5 translate-x-[50%]"
          disabled={!isValid}
        />
      );
    }
    return buttons;
  }, [userCount, showResultPath, columnGap, isValid]);

  const startNumberButtons = renderStartNumberButtons();
  const renderPrizeInputs = () => {
    const inputs = [];
    for (let i = 0; i < userCount; ++i) {
      inputs.push(
        <input
          key={i}
          className="ring-2 w-10"
          minLength={1}
          maxLength={8}
          style={{
            position: "absolute",
            left: `${i * columnGap + LADDER.X / 2}px`,
            top: "0",
          }}
          {...register(`prizes.${i}`, {
            required: true,
          })}
        />
      );
    }
    return inputs;
  };

  const prizeInputs = renderPrizeInputs();

  const onLadderStartClick = () => {
    initializePath();

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const horizontalLines =
      minHorizontalLines + Math.ceil(Math.random() * (minHorizontalLines * 2));

    drawHorizontalLines(horizontalLines, ctx);
  };

  const invalidToast = () =>
    toast({ message: "빈 칸을 모두 채워주세요!", eventType: "warning" });

  const onValid = () => {
    onLadderStartClick();
    setIsStartGame(true);
  };

  const onInvalid = () => invalidToast();

  const prizeToast = (index: number, prize: string) =>
    toast({
      eventType: "success",
      message: `${index + 1}번 사다리 ${prize}당첨!`,
    });

  const getPrize = (endPoint: number) => {
    prizeToast(endPoint, getValues(`prizes.${endPoint}`));
  };
  return (
    <main>
      <div>
        <label htmlFor="userCount">유저 수 (최대 10명):</label>
        <input
          type="number"
          id="userCount"
          min="2"
          max="10"
          value={userCount}
          onChange={(e) => setUserCount(Number(e.target.value))}
          className="ring-2 disabled:cursor-not-allowed"
          disabled={isStartGame}
        />
        {isStartGame ? (
          <Button
            text="초기화"
            onClick={() => {
              initializeLadder();
              resetPrizeInputs();
              setIsStartGame(false);
            }}
          />
        ) : (
          <Button
            text="사다리 시작"
            onClick={handleSubmit(onValid, onInvalid)}
          />
        )}
        <div className="relative">
          {startNumberButtons.map((button) => button)}
        </div>
        <div className="w-[70vw]">
          <canvas ref={canvasRef} width={1200} height={650} />
        </div>
        <form className="relative">{prizeInputs.map((input) => input)}</form>
      </div>
    </main>
  );
};

export default Page;
