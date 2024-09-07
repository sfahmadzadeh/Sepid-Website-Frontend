import React, { useEffect, useRef } from 'react';
import { EdgeType } from 'types/models';
import { FSMStateType } from 'types/models';
import { useState, useCallback } from 'react';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import '@xyflow/react/dist/style.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateFSMDialog from '../dialogs/CreateFSMDialog';
import { MarkerType, useEdgesState, useViewport } from '@xyflow/react';
import { 
            ReactFlow, 
            Controls, 
            Background, 
            applyNodeChanges, 
            addEdge, 
            Handle, 
            Position, 
            NodeProps, 
            ReactFlowProvider,
            getBezierPath, 
            EdgeProps,
            useReactFlow,
            useInternalNode,
} from '@xyflow/react';
import { Opacity } from '@mui/icons-material';


interface nodeInfo{
    data: {
        label: string, 
        isFirstNode: boolean
    },
    id: string,
    position: {
        x: number,
        y: number
    },
    type: string,
    draggable: boolean
}

const sampleNodes: nodeInfo[] = [
    {
        data: {label: "این استیت اوله", isFirstNode: true,},
        id: "1",
        position: {x: 0, y: 0},
        type: "stateNode",
        draggable: true
    },
    {
        data: {label: "این یک استیت است", isFirstNode: false,},
        id: "2",
        position: {x: 300, y: 0},
        type: "stateNode",
        draggable: true
    },
    {
        data: {label: " kjugilougpihiqoiejhf09q47rihاستیت رندوم", isFirstNode: false,},
        id: "3",
        position: {x: 500, y: 0},
        type: "stateNode",
        draggable: true
    }
];

interface stateNodeProps extends NodeProps{
    data: {
        label: string,
        isFirstNode: boolean
    },
    id:string
}

interface edgeProps extends EdgeProps{
    id: string,
    source: string,
    target: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    type: string,
    markerEnd: any,
    style: any 
}

const StateNode: React.FC<stateNodeProps> = ({data, id}) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState(null);
    const [currentPos, setCurrentPos] = useState(null);
    const { setEdges, getNodes, getEdges, setNodes } = useReactFlow();

    const handleMouseDown = (event) => {
        setIsDrawing(true);
        setStartPos({ x: event.clientX, y: event.clientY });
    };
    const handleMouseMove = (event) => {
        if (isDrawing) {
            setCurrentPos({ x: event.clientX, y: event.clientY });
        }
    };
    
    const handleMouseUp = (event) => {
        if (isDrawing) {
            setIsDrawing(false);
            const nodes = getNodes();
            const targetNode = findTargetNode(event.clientX, event.clientY, nodes);

            if (targetNode) {
                const newEdge = {
                    id: `edge-${id}-${targetNode.id}-${Math.random()}`,
                    source: id,
                    target: targetNode.id,
                    sourceX: startPos.x,
                    sourceY: startPos.y,
                    targetX: event.clientX,
                    targetY: event.clientY,
                    type: "floating"
                };
            
            setEdges([...getEdges(), newEdge]);
            }
        }
  };
  const findTargetNode = (mouseX, mouseY, nodes) => {
    const boundingBox = document.getElementById('reactflow-wrapper').getBoundingClientRect();
    const flowX = mouseX - boundingBox.left;
    const flowY = mouseY - boundingBox.top;

    return nodes.find((node) => {
      const { positionAbsolute, width, height } = node;
      return (
        flowX >= positionAbsolute.x &&
        flowX <= positionAbsolute.x + width &&
        flowY >= positionAbsolute.y &&
        flowY <= positionAbsolute.y + height
      );
    });
  };
    
    return(
        <Box
            sx={{
                backgroundColor: data.isFirstNode? "#96EFFF": "#C5FFF8",
                border: data.isFirstNode? "3px solid #ffb496": "0px",
                borderRadius: "5px",
                width: "200px",
                height: "50px",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-around",
            }}
            id={id}
            //onMouseDown={handleMouseDown}
            //onMouseMove={handleMouseMove}
            //onMouseUp={handleMouseUp}
        >
            {(!data.isFirstNode) &&
            <>
                <Handle 
                    type="target"
                    position={Position.Top}
                    isConnectable={true}
                    id="top-target"
                />
                <Handle 
                    type="target"
                    position={Position.Bottom}
                    isConnectable={true}
                    id="bottom-target"
                />
                <Handle 
                    type="target"
                    position={Position.Right}
                    isConnectable={true}
                    id="right-target"
                />
                <Handle 
                    type="target"
                    position={Position.Left}
                    isConnectable={true}
                    id="left-target"
                />
            </>}
            <Typography
                sx={{
                    width: "120px",
                    flexShrink: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {data.label}
            </Typography>
            <IconButton>
                <EditIcon />
            </IconButton>
            <Handle 
                type="source"
                position={Position.Top}
                isConnectable={true}
                id="top-source"
            />
            <Handle 
                type="source"
                position={Position.Bottom}
                isConnectable={true}
                id="bottom-source"
            />
            <Handle 
                type="source"
                position={Position.Right}
                isConnectable={true}
                id="right-source"
            />
            <Handle 
                type="source"
                position={Position.Left}
                isConnectable={true}
                id="left-source"
            />
        </Box>
    );
}

const nodeTypes = { stateNode: StateNode };

export default function CourseMapEditorProvider(){
    return(
        <ReactFlowProvider>
            <CourseMapEditor />
        </ReactFlowProvider>
    );
}

function CourseMapEditor(){

    const [nodes, setNodes] = useState(sampleNodes);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //change values of width and height to 100%
    return(
        <Container 
            sx={{ 
                width: "100vw",
                height: "100vh",
            }}
            maxWidth={false}
        >
            <FlowCanva nodes={nodes} setNodes={setNodes}/>
        <Grid 
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={"row-reverse"}
        >
            <Grid item xs={3}>
                <Button
                    sx={{width: "100%"}}
                    variant="contained"
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                    گام جدید
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button 
                    sx={{width: "100%"}}
                    variant="contained"
                >
                    ذخیره
                </Button>
            </Grid>
        </Grid>
        <CreteNewStateDialog 
            open={open}
            onClose={handleClose}
            nodes={nodes}
            setNodes={setNodes}
        />
      </Container>
    );
}


function FlowCanva({nodes, setNodes}){
    
    const [edges, setEdges] = useState([]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    const onConnect = useCallback(
        ((connection) => {
            const doubleEdge = edges.filter((edge) => {
                return edge.source === connection.source && edge.target === connection.target;
            });
            if(doubleEdge.length > 0){
                return;
            }
            const source = connection.target;
            const target = connection.source;
            let visited = [];
            let toExplore = [source];
            while(toExplore.length > 0){
                const sourceEdges = edges.filter((edge) => {
                    return edge.source === toExplore[0];
                });
                for(let edge of sourceEdges){
                    if(!visited.includes(edge.target)){
                        visited.push(edge.target);
                        toExplore.push(edge.target);
                    }
                }
                toExplore.shift();
            }
            if(!visited.includes(target)){
                const newEdge = {...connection,  type: 'floating', markerEnd: { type: MarkerType.Arrow, color: "black" }};
                console.log(newEdge);
                setEdges((eds) => addEdge(newEdge, eds));
            }
        }),
        [edges,setEdges],
    );

    const isOverlapping = (node1, node2) => {
        const node1element = document.getElementById(node1.id);
        const node2element = document.getElementById(node2.id);
        return (
            node1.position.x < node2.position.x + node2element.offsetWidth &&
            node1.position.x + node1element.offsetWidth > node2.position.x &&
            node1.position.y < node2.position.y + node2element.offsetHeight &&
            node1.position.y + node1element.offsetHeight > node2.position.y
        );
    };
    const avoidOverlap = (newNode, nodes) => {
        let adjustedNode = { ...newNode };
      
        for (const node of nodes) {
            if (node.id != newNode.id && isOverlapping(newNode, node)) {
                adjustedNode.position = dragStartPosition.current;
            }
        }
        return adjustedNode;
    };
    const onNodeDragStop = useCallback(
        (event, node) => {
          const newNodes = nodes.map((n) => (n.id === node.id ? avoidOverlap(node, nodes) : n));
          setNodes(newNodes);
        },
        [nodes]
    );

    const dragStartPosition = useRef(0);
    const onNodeDragStart = useCallback((event, node) => {
        dragStartPosition.current = node.position;
    }, []);

    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault();
        if (window.confirm('آیا می‌خواهید یال را خذف کنید؟')) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
    };


    const { fitView } = useReactFlow();
    const containerRef = useRef(null);
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                fitView();
            }
        };
  
        window.addEventListener('resize', handleResize);
        handleResize();
  
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fitView]);


    return(
        <Container 
                sx={{height: "90%", width: "100%"}} 
                maxWidth={false}
                ref={containerRef}
            >
                <ReactFlow 
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes} 
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onNodeDragStart={onNodeDragStart}
                    onEdgeContextMenu={onEdgeContextMenu}
                    connectionLineComponent={FloatingConnectionLine}
                >
                <Background />
                <Controls />
                </ReactFlow>
            </Container>
    );
}

const FloatingCustomEdge: React.FC<EdgeProps> = ({ id, source, target, markerEnd, style }) => {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);
  
    if (!sourceNode || !targetNode) {
        return null;
    }  
    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
      sourceNode,
      targetNode,
    );
  
    const [edgePath] = getBezierPath({
      sourceX: sx,
      sourceY: sy,
      sourcePosition: sourcePos,
      targetPosition: targetPos,
      targetX: tx,
      targetY: ty,
    });
  
    return (
      <path
        id={id}
        d={edgePath}
        markerEnd={markerEnd}
        style={{fill:"none", stroke:"#222", strokeWidth:"1.5", color: "#222" }}
      />
    );
}
  

const edgeTypes = {floating: FloatingCustomEdge};

interface createNewStateProps{
    open: boolean,
    onClose: () => void,
    nodes: nodeInfo[],
    setNodes: React.Dispatch<React.SetStateAction<nodeInfo[]>>,
}
const CreteNewStateDialog: React.FC<createNewStateProps> = ({onClose, open, nodes, setNodes}) => {
    const handleClose = () => {
        onClose();
    };
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const {x, y, zoom} = useViewport();
    const addNewNode = () => {
        setNodes([
            ...nodes,
            {
                data: {
                label: inputValue, 
                isFirstNode: false
                },
                id: (nodes.length + 1).toString(),
                position: {
                    x: -x / zoom,
                    y: -y / zoom
                },
                type: "stateNode",
                draggable: true
            }
        ]);
        onClose();
    }
    return(
        <Dialog
            open = {open}
        >
            <DialogTitle>ایجاد گام جدید</DialogTitle>
            <DialogContent>
                <TextField 
                    onChange={handleInputChange}
                    label="نام گام"
                />
                <Button onClick={addNewNode}>ایجاد</Button>
                <Button onClick={handleClose}>انصراف</Button>
            </DialogContent>
        </Dialog>
    );
}

function FloatingConnectionLine({toX, toY, fromPosition, toPosition, fromNode,}){
    if (!fromNode) {
      return null;
    }
  
    const targetNode = {
        id: 'connection-target',
        measured: {
            width: 1,
            height: 1,
        },
        internals: {
            positionAbsolute: { x: toX, y: toY },
        },
    };
  
    const { sx, sy } = getEdgeParams(fromNode, targetNode);
    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
        targetX: toX,
        targetY: toY,
    });
  
    return (
      <g>
            <path
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                d={edgePath}
            />
      </g>
    );
  }

function getEdgePosition (node, intersectionPoint) {
    const n = { ...node.internals.positionAbsolute, ...node };
    const nx = Math.round(n.x);
    const ny = Math.round(n.y);
    const px = Math.round(intersectionPoint.x);
    const py = Math.round(intersectionPoint.y);
  
    if (px <= nx + 1) {
      return Position.Left;
    }
    if (px >= nx + n.measured.width - 1) {
      return Position.Right;
    }
    if (py <= ny + 1) {
      return Position.Top;
    }
    if (py >= n.y + n.measured.height - 1) {
      return Position.Bottom;
    }
  
    return Position.Top;
}

function getNodeIntersection(intersectionNode, targetNode) {
    const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
      intersectionNode.measured;
    const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
    const targetPosition = targetNode.internals.positionAbsolute;
  
    const w = intersectionNodeWidth / 2;
    const h = intersectionNodeHeight / 2;
  
    const x2 = intersectionNodePosition.x + w;
    const y2 = intersectionNodePosition.y + h;
    const x1 = targetPosition.x + targetNode.measured.width / 2;
    const y1 = targetPosition.y + targetNode.measured.height / 2;
  
    const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
    const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
    const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
    const xx3 = a * xx1;
    const yy3 = a * yy1;
    const x = w * (xx3 + yy3) + x2;
    const y = h * (-xx3 + yy3) + y2;
  
    return { x, y };
}

function getEdgeParams(source, target) {
    const sourceIntersectionPoint = getNodeIntersection(source, target);
    const targetIntersectionPoint = getNodeIntersection(target, source);
  
    const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
    const targetPos = getEdgePosition(target, targetIntersectionPoint);
  
    return {
      sx: sourceIntersectionPoint.x,
      sy: sourceIntersectionPoint.y,
      tx: targetIntersectionPoint.x,
      ty: targetIntersectionPoint.y,
      sourcePos,
      targetPos,
    };
}
  
  