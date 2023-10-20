import { Handle, Position } from 'reactflow';
import { CustomNodeStyled } from './Styled';

const CustomNode = ({ data } : { data: { label: string; image: { url: string; alt: string;} }}) => {
  return (
    <CustomNodeStyled className="node-item">
      <Handle type="target" position={Position.Top} id="node-handler-top" />
      <img src={data.image.url} alt="node" />
      <div>
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} id="node-handler-bottom" />
    </CustomNodeStyled>
  );
};

export default CustomNode;
