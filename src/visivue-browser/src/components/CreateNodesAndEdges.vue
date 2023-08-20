<script>

export function createNodesAndEdges(tree) {
  // Node factory func:
  function NewNode(id, type, label, position, parentId, data) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.position = position;
    this.parentId = parentId;
    this.data = data;
    this.class = "light";
  }
  // Edge factory function
  function NewEdge(id, source, target, style, animated) {
    this.id = id;
    this.label;
    this.source = source;
    this.target = target;
    this.style = style;
    this.animated = animated;
  }

  // initialize variables
  const result = [];
  const levels = [];
  const edges = [];

  const q = [];
  if (tree) {
    q.push(tree);
  }

  let nodeId = 1;

  const pos = {
    lastNode: 1,
    1: { x: 0, y: 0 },
  };

  // traverse the tree and build node and edge objects
  while (q.length) {
    const level = [];
    const l = q.length;

    for (let i = 0; i < l; i++) {
      // initialize variables and save to respective values:
      const node = q.shift();
      let type = "template";
      let newPos = pos[nodeId];
      let parentId = "";

      // Add oneway and twoway props from AST to 'data' to be passed into a new instance of NewNode:
      const oneway = node.props.oneWay;
      const twoway = node.props.twoWay;
      const data = { oneway, twoway };

      // change 'type' property based on if the node is a root node or leaf node:
      if (!levels.length) {
        type = "input";
      }

      // if the current node in the AST has a parentId property, assign it to 'parentId'
      if (node.parentId) {
        parentId = node.parentId;
      }

      // instantiate a new node and push to 'levels' array:
      const newNode = new NewNode(
        nodeId,
        type,
        node.name,
        newPos,
        parentId,
        data
      );
      level.push(newNode);

      // If the current node has children, push its children to the 'q' and create x and y postions for each child and push them to 'xQ' and 'yQ' respectively
      if (node.children.length) {
        // push all child nodes to 'q'
        q.push(...node.children);

        // intialize variable to calculate x and y positions:
        let horizontalSpace = 250; // horizontal space between sibling nodes
        let verticalSpace = 150; // vertical space between parent/child nodes
        let newXPos = -(
          (node.children.length * horizontalSpace) / 2 -
          horizontalSpace / 2
        );

        // create new x and y positions for each child node:

        // find the id of the last sibling node:
        let childId = pos.lastNode + 1;

        for (let i = 0; i < node.children.length; i++) {
          // initialize x and y positions
          let x = newNode.position.x + newXPos;
          let y = newNode.position.y + verticalSpace;

          let prevNode = pos[childId - 1];

          // assign 'x' position based on if the current node is the first in a level or not:
          if (prevNode.y === y) x = Math.max(prevNode.x + horizontalSpace, x);

          // assign a new property to 'pos' for the current child node
          pos[childId] = { x, y };

          // update lastNode property on 'pos'
          pos.lastNode = childId;
          // update newXPos
          newXPos += horizontalSpace;
          // containers[newNode.id].children.push(childId);

          // add a 'parentId' to all children of the current node in the AST:
          node.children[i].parentId = newNode.id;
          // increment 'childId'
          childId += 1;
        }
      }

      // Instantiate a new edge object and push to 'levels' array
      if (newNode.parentId) {
        const id = `e${newNode.parentId}-${newNode.id}`;

        // assign edge width and animation based on stateful variables:
        let animated = false;
        let strokeWidth;
        if (newNode.data.oneway.length || newNode.data.twoway.length) {
          animated = true;
          strokeWidth = "4px";
        } else {
          strokeWidth = "2px";
        }

        // assign edge color based on stateful variables:
        let color;
        if (newNode.data.oneway.length && newNode.data.twoway.length)
          color = "rgb(244, 102, 102)";
        // else if (newNode.data.oneway.length) color = 'rgb(255, 72, 72)';
        // else if (newNode.data.twoway.length) color = 'rgb(0, 102, 255)';
        else if (newNode.data.oneway.length) color = "rgb(66, 136, 242)";
        else if (newNode.data.twoway.length) color = "rgb(66, 211, 146)";

        const style = { stroke: `${color}`, strokeWidth: `${strokeWidth}` };

        // instantiate a new edge and push to 'levels'
        const newEdge = new NewEdge(
          id,
          `${newNode.parentId}`,
          `${newNode.id}`,
          style,
          animated
        );
        edges.push(newEdge);
      }

      // increment node ID:
      nodeId += 1;
    }
    if (level.length) {
      levels.push(level);
    }
  }
  // console.log(levels);

  // Add node objects to 'result' array
  for (let i = 0; i < levels.length; i++) {
    for (let j = 0; j < levels[i].length; j++) {
      result.push(levels[i][j]);
    }
  }

  // push edge object into 'result' array
  result.push(...edges);

  return result;
}
</script>