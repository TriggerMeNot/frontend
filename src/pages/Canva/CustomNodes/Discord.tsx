import React, { memo, ChangeEvent } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ColorPickerNodeProps {
  data: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  isConnectable: boolean;
}

const Discord: React.FC<ColorPickerNodeProps> = memo(({ isConnectable }) => {
  return (
    <>
    <div className="px-4 py-2 border-2 border-black rounded-sm cursor-grab bg-white text-xs">

        <Handle
            type="target"
            position={Position.Left}
            onConnect={(params) => console.log('Handle onConnect:', params)}
            isConnectable={isConnectable}
        />
        <div>
            Discord
        </div>
        <label>
            Your Discord handle: <input className="border border-slate-600 rounded-sm" name="myInput" />
        </label>
        <Handle
            type="source"
            position={Position.Right}
            id="a"
            isConnectable={isConnectable}
        />
        <Handle
            type="source"
            position={Position.Right}
            id="b"
            isConnectable={isConnectable}
        />
    </div>
    </>
  );
});

export default Discord;
