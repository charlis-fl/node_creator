import Header from './Header';
import ReactFlowEditor from './ReactFlowEditor';
import { WorkflowContainerStyled } from './Styled';

const NodeEditor = () => {
  return (
    <>
      <Header />
      <WorkflowContainerStyled>
        <ReactFlowEditor />
      </WorkflowContainerStyled>
    </>
  );
};

export default NodeEditor;
