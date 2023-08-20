<script lang="ts">
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
  id: string;
  label: string;
  source: string;
  target: string;
  style: string;
  animated: boolean;
}
interface Style {
  stroke: string;
  strokeWidth: string;
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
  function NewNode(
    this: any,
    id: string,
    type: string,
    label: string,
    position: NodePosition,
    parentId: string,
    data: Data
  ): void {
    this.id = id;
    this.type = type;
    this.label = label;
    this.position = position;
    this.parentId = parentId;
    this.data = data;
    this.class = "light";
  }
  // EDGE FACTORY FUNCTION
  function NewEdge(
    this: any,
    edgeId: string,
    source: string,
    target: string,
    style: Style,
    animated: boolean
  ): void {
    this.id = edgeId;
    this.label;
    this.source = source;
    this.target = target;
    this.style = style;
    this.animated = animated;
  }

  // INITIALIZE CONSTANTS AND HELPER DATA STRUCTURES
  const arrayOfNodesAndEdges: (Node | Edge)[] = [];
  const arrayOfNodes: Node[][] = [];
  const arrayOfEdges: Edge[] = [];
  const queue: Tree[] = [];

  if (tree) {
    queue.push(tree);
  }

  // ID FOR FIRST NODE OF AST. INITIALIZES FOR NODE ID FOR BUILDING OF POSITIONS
  let nodeId: number = 1;
  const positions: Positions = {
    lastNode: 1,
    1: { x: 0, y: 0 },
  };

  // TRAVERSE THE TREE
  while (queue.length) {
    const level: Node[] = [];
    const queueLength: number = queue.length;

    for (let i = 0; i < queueLength; i++) {
      // INITIALIZE VARIABLES NEEDED FOR EACH NODE
      const node: Tree = queue.shift();
      let type: string = "template"; // --> 'type' refers to handles on VueFlow nodes (i.e. handle on top and bottom of node)
      let newPosition: NodePosition = positions[nodeId];
      let parentId: string = "";
      const oneway: string[] = node.props.oneWay;
      const twoway: string[] = node.props.twoWay;
      const data: Data = { oneway, twoway };
      if (!arrayOfNodes.length) type = "input";

      if (node.parentId) parentId = node.parentId;

      // INSTANTIATE NEW NODE & PUSH TO 'level' array
      const newNode: Node = new (NewNode as any)(
        nodeId.toString(),
        type,
        node.name,
        newPosition,
        parentId,
        data
      );

      level.push(newNode);

      // SET X & Y POSITIONS FOR EACH CHILD NODE
      if (node.children.length) {
        queue.push(...node.children);

        let xGap: number = 250;
        let yGap: number = 150;
        let newXPosition: number = -(
          (node.children.length * xGap) / 2 -
          xGap / 2
        );

        let childId: number = positions.lastNode + 1;

        for (let i = 0; i < node.children.length; i++) {
          let x: number = newNode.position.x + newXPosition;
          let y: number = newNode.position.y + yGap;
          let prevNode: NodePosition = positions[childId - 1];

          if (prevNode.y === y) x = Math.max(prevNode.x + xGap, x);
          positions[childId] = { x, y };
          positions.lastNode = childId;
          newXPosition += xGap;
          node.children[i].parentId = newNode.id.toString();
          childId += 1;
        }
      }

      // INSTANTIATE NEW EDGE OBJECTS
      if (newNode.parentId) {
        const onewayLength: number = newNode.data.oneway.length;
        const twowayLength: number = newNode.data.twoway.length;
        const edgeId: string = `e${newNode.parentId}-${newNode.id}`;
        let animated: boolean = false;
        let strokeWidth: string = "2px";

        if (onewayLength || twowayLength) {
          animated = true;
          strokeWidth = "4px";
        }
        let color: string = "";
        if (onewayLength && twowayLength) color = "rgb(244, 102, 102)";
        else if (onewayLength) color = "rgb(66, 136, 242)";
        else if (twowayLength) color = "rgb(66, 211, 146)";

        const style: Style = { stroke: color, strokeWidth };

        const newEdge = new (NewEdge as any)(
          edgeId,
          newNode.parentId,
          newNode.id,
          style,
          animated
        );
        arrayOfEdges.push(newEdge);
      }
      nodeId += 1;
    }

    // PUSH 'level' TO 'arrayOfNodes'
    if (level.length) arrayOfNodes.push(level);
  }

  // PUSH ALL NODE OBJECTS TO OUTPUT ARRAY
  for (let i = 0; i < arrayOfNodes.length; i++) {
    arrayOfNodesAndEdges.push(...arrayOfNodes[i]);
  }

  // PUSH ALL EDGE OBJECTS TO OUTPUT ARRAY
  arrayOfNodesAndEdges.push(...arrayOfEdges);

  return arrayOfNodesAndEdges;
}
</script>
