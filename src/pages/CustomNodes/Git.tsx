import React, { memo, ChangeEvent } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ColorPickerNodeProps {
  data: {
    color: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  isConnectable: boolean;
}

const Git: React.FC<ColorPickerNodeProps> = memo(({ data, isConnectable }) => {
  return (
    <>
    <div className="px-4 py-2 border-2 border-black rounded-sm cursor-grab bg-white text-xs">
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('Handle onConnect:', params)}
        isConnectable={isConnectable}
      />
      <div className="mb-2">
        Git Color Picker: <strong>{data.color}</strong>
      </div>
      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
    </>
  );
});

export default Git;
