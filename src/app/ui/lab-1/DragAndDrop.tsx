"use client";

import swap from "@/utils/swap";
import { useRef, useState } from "react";
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
const NULL_INDEX = -1;

const DragAndDrop = () => {
  const [items, setItems] = useState(initialItems);
  const draggingIndex = useRef(NULL_INDEX);

  const onDragStart = (index: number) => {
    draggingIndex.current = index;
  };

  const onDragOver = (index: number) => {
    if (draggingIndex.current === NULL_INDEX || draggingIndex.current === index)
      return;

    const newItems = [...items];

    swap(newItems, draggingIndex.current, index);
    draggingIndex.current = index;
    setItems(newItems);
  };

  const onDragEnd = () => {
    draggingIndex.current = NULL_INDEX;
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
