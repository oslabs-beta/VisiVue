<script lang=ts>
// import { notDeepEqual } from 'assert';
// import { Tree } from '../../../types/Tree';

interface NodePosition {
  x: number;
  y: number;
}

interface Data {
  oneway: string[];
  twoway: string[];
}

interface Positions {
  lastNode: number;
  [nodeId: number]: NodePosition;
}

interface Node {
  id: string;
  type: string;
  label: string;
  position: NodePosition;
  parentId: string;
  data: Data;
  class: string;
}

interface Edge {
  edgeId: string;
  label: string;
  source: string;
  target: string;
  style: string;
  animated: boolean;
}

interface Style {
  stroke: string, 
  strokeWidth: string
}

type Tree = {
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  fileDirname: string;
  importPath: string;
  children: Tree[];
  parentList: string[];
  props: {
    oneWay: string[];
    twoWay: string[];
  };
  error: string;
  parentId?: string;
};

export function createNodesAndEdges(tree: Tree): (Node | Edge)[] {
  // NODE FACTORY FUNCTION
  function NewNode(id: number, type: string, label: string, position: NodePosition, parentId: string, data: Data): void {
    this.id = id;
    this.type = type;
    this.label = label;
    this.position = position;
    this.parentId = parentId;
    this.data = data;
    this.class = "light";
    
  }
  // NODE FACTORY FUNCTION
  function NewEdge(edgeId: string, source: string, target: string, style: Style, animated: boolean): void {
    this.id = edgeId;
    this.label;
    this.source = source;
    this.target = target;
    this.style = style;
    this.animated = animated;
  }
  
  // INITIALIZE CONSTANTS AND DATA STRUCTURES
  const result: (Node | Edge)[] = [];
  const levels: Node[][] = [];
  const edges: Edge[] = [];
  const queue: Tree[] = [];
  
  // ID FOR FIRST NODE OF AST. INITIALIZES FOR NODE ID FOR BUILDING OF POSITIONS
  let nodeId: number = 1;
  const positions: Positions = {
    lastNode: 1,
    1: {x: 0, y: 0 },
  };

  // TRAVERSE THE TREE
  while (queue.length) {
    const level: Node[] = [];
    const queueLength: number = queue.length;

    for (let i = 0; i < queueLength; i ++) {
      // INITIALIZE VARIABLES NEEDED FOR EACH NODE
      const node: Tree  = queue.shift();
      let type: string = "template"; // --> 'type' refers to handles on VueFlow (i.e. handle on top and bottom)
      let newPosition: NodePosition = positions[nodeId];
      let parentId: string = "";
      const oneway: string[] = node.props.oneWay;
      const twoway: string[] = node.props.twoWay;
      const data: Data = { oneway, twoway };
      if (!levels.length) {
        type = "input";
      }

      if (node.parentId) {
        parentId = node.parentId;
      }
      
      // INSTANTIATE NEW NODE TO PUSH TO 'level' array
      const newNode: Node = new NewNode(
        nodeId,
        type,
        node.name,
        newPosition,
        parentId,
        data,
      )
      level.push(newNode);

      if (node.children.length) {
        queue.push(...node.children);

        let xGap: number = 250;
        let yGap: number = 150
        let newXPosition: number = -(
          (node.children.length * xGap) / 2 - xGap / 2
        );
        
        let childId: number = positions.lastNode + 1;

        for (let i = 0; i < node.children.length; i ++) {
          let x: number = newNode.position.x + newXPosition;
          let y: number = newNode.position.y + yGap;
          let prevNode: NodePosition = positions[childId - 1];

          if (prevNode.y === y) x = Math.max(prevNode.x + xGap, x);
          positions[childId] = { x, y };
          positions.lastNode = childId;
          newXPosition += xGap;
          node.children[i].parentId = newNode.id.toString();
          childId += 1;
        };
      }
      
      // INSTANTIATE NEW EDGE OBJECTS
      if (newNode.parentId) {
        const onewayLength: number = newNode.data.oneway.length;
        const twowayLength: number = newNode.data.twoway.length;
        const edgeId: string = `e${newNode.parentId}-${newNode.id}`;
        let animated: boolean = false;
        let strokeWidth: string = "2px";
        // (onewayLength || twowayLength) 
        //   ? strokeWidth = "4px"
        //   : strokeWidth = "2px";
        if (onewayLength || twowayLength) {
          animated = true;
          strokeWidth = '4px';
        }
        let color: string;
        if (onewayLength && twowayLength) color = 'rgb(244, 102, 102)';
        else if (onewayLength) color = 'rgb(66, 136, 242)';
        else if (twowayLength) color = 'rgb(66, 211, 146)';

        const style: Style = { stroke: color.toString(), strokeWidth };
        
        const newEdge = new NewEdge(
          edgeId,
          newNode.parentId,
          newNode.id, // this is set as number and string in interface and factory function
          style,
          animated,
        )
        edges.push(newEdge);
      }
      nodeId += 1;
    };
    if (level.length) {
      levels.push(level);
    }
  }

  for (let i = 0; i < levels.length; i ++) {
    for (let j = 0; j < levels[i].length; i ++) {
      result.push(levels[i][j]);
    };
  };
  result.push(...edges);

  const message = JSON.stringify(result);
  console.log('Array of Nodes & Edges:', message);

  return result;

} 
</script>