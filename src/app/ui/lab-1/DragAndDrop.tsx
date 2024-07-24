"use client";

import { useRef, useState } from "react";
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const swap = <T,>(arr: T[], index1: number, index2: number) =>
  ([arr[index1], arr[index2]] = [arr[index2], arr[index1]]);

const DragAndDrop = () => {
  const [items, setItems] = useState(initialItems);
  const draggingIndex = useRef(-1);

  const onDragStart = (index: number) => {
    draggingIndex.current = index;
  };

  const onDragOver = (index: number) => {
    if (draggingIndex.current === -1 || draggingIndex.current === index) return;

    const newItems = [...items];

    swap<string>(newItems, draggingIndex.current, index);
    draggingIndex.current = index;
    setItems(newItems);
  };

  const onDragEnd = () => {
    draggingIndex.current = -1;
  };

  return (
    <div>
      <h2 draggable>Drag and Drop List</h2>
      <ul className="flex bg-emerald-200 w-50 h-10 p-2 gap-3">
        {items.map((item, index) => (
          <li
            className="h-full flex-1 flex justify-center items-center bg-indigo-300 cursor-pointer"
            key={`${item},${index}`}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={() => onDragOver(index)}
            onDragEnd={onDragEnd}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragAndDrop;
