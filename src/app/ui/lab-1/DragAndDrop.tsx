"use client";

import { useState } from "react";

const DragAndDrop = () => {
  const [draggableElements, setDraggableElements] = useState([
    "요소1",
    "요소2",
    "요소3",
    "요소4",
    "요소5",
  ]);
  const handleDragStart = () => {};
  const handleDrag = () => {};
  const handleDragEnter = () => {};
  const handleDragOver = () => {};

  /* 
    1. 요소를 드래그해서 움직이는 동안, 다른 요소와 자리가 겹칠 시 그 자리를 밀려나게해줌
      1-1. 요소의 자리가 밀려나려면, key값을 다르게 주고 state를 사용해야한다.
  */
  return (
    <ul className="*:bg-emerald-200 *:flex *:gap-2 *:items-center *:p-2 *:h-10 flex gap-1 mt-2">
      <li className="*:w-10 *:h-full *:flex *:justify-center *:items-center *:cursor-pointer *:bg-gray-50">
        {draggableElements.map(
          (el, i) =>
            i < 4 && (
              <span draggable key={`${el},${i}`}>
                {el}
              </span>
            )
        )}
      </li>
      <li className="*:w-10 *:h-full *:flex *:justify-center *:items-center *:cursor-pointer *:bg-gray-50">
        <span draggable>{draggableElements[draggableElements.length - 1]}</span>
      </li>
    </ul>
  );
};

export default DragAndDrop;
