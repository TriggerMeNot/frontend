import React from 'react';
import { useDnD } from './DnDContext';

const Sidebar: React.FC = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-96 max-w-xl border-r border-white px-6 py-8 text-l bg-gray-200 text-black">
      <div className="mb-6">You can drag these nodes to the pane on the right.</div>
      <div
        className="h-8 p-1 border-2 border-sky-600 rounded-md mb-2.5 flex justify-center items-center cursor-grab"
        onDragStart={(event) => onDragStart(event, 'discord')}
        draggable
      >
        Discord Node
      </div>
      <div
        className="h-8 p-1 border-2 border-black rounded-md mb-2.5 flex justify-center items-center cursor-grab"
        onDragStart={(event) => onDragStart(event, 'git')}
        draggable
      >
        Git Node
      </div>
      <div
        className="h-8 p-1 border-2 border-red-700 rounded-md mb-2.5 flex justify-center items-center cursor-grab"
        onDragStart={(event) => onDragStart(event, 'microsoft')}
        draggable
      >
        Microsoft Node
      </div>
    </aside>
  );
};

export default Sidebar;
