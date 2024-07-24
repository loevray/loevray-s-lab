"use client";

import { useRef, useState } from "react";
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

const DragAndDrop = () => {
  const [items, setItems] = useState(initialItems);
  const draggingIndex = useRef(-1);

  const onDragStart = (index: number) => {
    draggingIndex.current = index;
  };

  const onDragOver = (index: number) => {
    if (draggingIndex.current === -1 || draggingIndex.current === index) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggingIndex.current, 1);
    newItems.splice(index, 0, draggedItem);
    draggingIndex.current = index;
    setItems(newItems);
  };

  const onDragEnd = () => {
    draggingIndex.current = -1;
  };

  return (
    <div className="App">
      <h2>Drag and Drop List</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={item + index}
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
