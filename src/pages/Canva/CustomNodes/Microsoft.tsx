import React, { memo, ChangeEvent } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ColorPickerNodeProps {
  data: {
    color: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  isConnectable: boolean;
}

const Git: React.FC<ColorPickerNodeProps> = memo(({ isConnectable }) => {
  return (
    <>
    <div className="px-4 py-2 border-2 border-black rounded-sm cursor-grab bg-white text-xs">
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('Handle onConnect:', params)}
        isConnectable={isConnectable}
      />
      <div className="leading-5">
        Microsoft:<br/>
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Best OS<br/>
        </label>
        <label>
          <input type="radio" name="myRadio" value="option2" />
          Arch user here<br/>
        </label>
        <label>
          <input type="radio" name="myRadio" value="option3" />
          Coding on a potatoe<br/>
        </label>
      </div>
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
