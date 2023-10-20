/* eslint-disable no-plusplus */
import {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowInstance,
  ReactFlowProvider,
  Node,
  useKeyPress,
} from 'reactflow';
import workflow from 'common/utils/workflow.json';
import Stencil from './Stencil';
import CustomNode from './CustomNode';
import NodeConfiguration from './NodeConfiguration';
import { CustomNodeType } from './types';
import 'reactflow/dist/style.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const ReactFlowEditor = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const deletePressed = useKeyPress('Delete');
  const [currentNodeId, setCurrentNodeId] = useState<number | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(workflow.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow.initialEdges);
  const [currentNodeOpened, setCurrentNodeOpened] = useState<CustomNodeType | null>(null);

  const onConnect = useCallback((params: any) => setEdges((els) => addEdge(params, els)), []);
  const nodeTypes = useMemo(() => ({
    customNode: CustomNode,
  }), []);

  useEffect(() => {
    if (currentNodeId && deletePressed) {
      setNodes(nodes.filter((node) => {
        return node.id !== currentNodeId.toString();
      }));
    }
  }, [deletePressed, currentNodeId]);
  // const onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);
  const onSelectionChange = (data: { edges: Array<any> ; nodes: Array<any>;}) => {
    if (data && data.nodes && data.nodes.length) {
      setCurrentNodeId(data.nodes[0].id);
    }
  };
  const onDragOver = useCallback((event : any) => {
    event.preventDefault();
    const evt = { ...event };
    evt.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    setCurrentNodeOpened(node.data);
  };

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const label = event.dataTransfer.getData('label');
        const imageURL = event.dataTransfer.getData('image-url');
        const imageDesc = event.dataTransfer.getData('image-alt');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: {
            label,
            image: {
              url: imageURL,
              alt: imageDesc,
            },
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance],
  );

  return (
    <ReactFlowProvider>
      <NodeConfiguration node={currentNodeOpened} setCurrentNodeOpened={setCurrentNodeOpened} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <Stencil />
    </ReactFlowProvider>
  );
};

export default ReactFlowEditor;
