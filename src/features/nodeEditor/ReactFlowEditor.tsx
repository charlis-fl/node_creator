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
  ControlButton,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowInstance,
  ReactFlowProvider,
  useKeyPress,
  Node,
} from 'reactflow';
import { useEffectOnce } from 'common/hooks/useEffectOnce';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { setWorkflow } from 'common/store/appSlice';
import downloadIcon from 'assets/icons/download.svg';
import Stencil from './Stencil';
import CustomNode from './CustomNode';
import NodeConfiguration from './NodeConfiguration';
import { CustomNodeType, EdgeType, NodeType } from './types';
import 'reactflow/dist/style.css';

const getId = () => crypto.randomUUID();

const ReactFlowEditor = () => {
  const dispatch = useAppDispatch();
  const workflowState = useAppSelector((state) => state.app.workflow);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const deletePressed = useKeyPress('Delete');
  const [currentNodeId, setCurrentNodeId] = useState<number | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [currentNodeOpened, setCurrentNodeOpened] = useState<NodeType | null>(null);

  const onConnect = useCallback((params: any) => setEdges((els) => addEdge(params, els)), []);
  const nodeTypes = useMemo(() => ({
    customNode: CustomNode,
  }), []);

  useEffect(() => {
    if (nodes.length || edges.length) {
      const latestWorkflow = {
        nodes: nodes as Array<NodeType>,
        edges: edges as Array<EdgeType>,
      };
      dispatch(setWorkflow(latestWorkflow));
    }
  }, [nodes.toString(), edges.toString()]);

  useEffectOnce(() => {
    if (workflowState && workflowState.nodes.length) {
      setNodes(workflowState.nodes);
      setEdges(workflowState.edges);
    }
  });

  useEffect(() => {
    if (currentNodeId && deletePressed) {
      setNodes(nodes.filter((node) => {
        return node.id !== currentNodeId.toString();
      }));
    }
  }, [deletePressed, currentNodeId]);
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
    const selectedNode = workflowState.nodes.find((n) => n.id === node.id);
    if (selectedNode && !currentNodeOpened) {
      setCurrentNodeOpened(selectedNode);
    }
  };
  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    if (nodes.length || edges.length) {
      const latestWorkflow = {
        nodes: nodes as Array<NodeType>,
        edges: edges as Array<EdgeType>,
      };
      dispatch(setWorkflow(latestWorkflow));
    }
  };
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const nodeData = JSON.parse(event.dataTransfer.getData('node-data')) as CustomNodeType;
        const { label, image, configuration } = nodeData;
        const imageURL = image.url;
        const imageDesc = image.alt;

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
            configuration,
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance],
  );
  const downloadJSON = () => {
    const a = document.createElement('a');
    const workflowStateString = JSON.stringify(workflowState);
    a.href = URL.createObjectURL(
      new Blob([workflowStateString], { type: 'application/json' }),
    );
    a.download = 'workflow.json';
    a.click();
  };
  return (
    <ReactFlowProvider>
      <NodeConfiguration
        node={currentNodeOpened}
        setCurrentNodeOpened={setCurrentNodeOpened}
      />
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
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <Background />
          <Controls>
            <ControlButton onClick={() => downloadJSON()}>
              <span className="download-icon">
                <img src={downloadIcon} alt="download" />
              </span>
            </ControlButton>
          </Controls>
        </ReactFlow>
      </div>
      <Stencil />
    </ReactFlowProvider>
  );
};

export default ReactFlowEditor;
