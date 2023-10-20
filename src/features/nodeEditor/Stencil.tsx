import workflow from 'common/utils/workflow.json';
import { StencilStyled } from './Styled';

const Stencil = () => {
  const onDragStart = (event: any, node: { label: string; image: { url: string; alt: string; }}) => {
    event.dataTransfer.setData('application/reactflow', 'customNode');
    event.dataTransfer.setData('label', node.label);
    event.dataTransfer.setData('image-url', node.image.url);
    event.dataTransfer.setData('image-alt', node.image.alt);
    const evt = { ...event };
    evt.dataTransfer.effectAllowed = 'move';
  };

  return (
    <StencilStyled>
      {
        workflow.initialNodes.map((node) => {
          return (
            <div title={node.data.label} key={node.id} className="stencil-item" onDragStart={(event) => onDragStart(event, node.data)} draggable>
              <img src={node.data.image.url} alt={node.data.image.url} />
            </div>
          );
        })
      }
    </StencilStyled>
  );
};

export default Stencil;
