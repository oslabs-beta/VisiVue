const tree = {
  children: [
    {
      children: [
        {
          children: [],
          count: 1,
          depth: 0,
          error: "",
          expanded: false,
          fileName: "GrandBaby One",
          filePath:
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
          id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
          importPath: "/",
          name: "Sidebar",
          parentList: [
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
          ],
          props: { propOne: true, propTwo: true },
          reactRouter: false,
          reduxConnect: false,
          thirdParty: false,
          // [[Prototype]]: Object,
        },
      ],
      count: 1,
      depth: 0,
      error: "",
      expanded: false,
      fileName: "Child One",
      filePath:
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
      id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
      importPath: "/",
      name: "Sidebar",
      parentList: [
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
      ],
      props: { propOne: true, propTwo: true },
      reactRouter: false,
      reduxConnect: false,
      thirdParty: false,
      // [[Prototype]]: Object,
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              count: 1,
              depth: 0,
              error: "",
              expanded: false,
              fileName: "Great G-Baby One",
              filePath:
                "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
              id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
              importPath: "/",
              name: "Sidebar",
              parentList: [
                "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
              ],
              props: { propOne: true, propTwo: true },
              reactRouter: false,
              reduxConnect: false,
              thirdParty: false,
              // [[Prototype]]: Object,
            },
          ],
          count: 1,
          depth: 0,
          error: "",
          expanded: false,
          fileName: "GrandBaby Two",
          filePath:
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
          id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
          importPath: "/",
          name: "Sidebar",
          parentList: [
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
          ],
          props: { propOne: true, propTwo: true },
          reactRouter: false,
          reduxConnect: false,
          thirdParty: false,
          // [[Prototype]]: Object,
        },
        {
          children: [],
          count: 1,
          depth: 0,
          error: "",
          expanded: false,
          fileName: "GrandBaby Three",
          filePath:
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
          id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
          importPath: "/",
          name: "Sidebar",
          parentList: [
            "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
          ],
          props: { propOne: true, propTwo: true },
          reactRouter: false,
          reduxConnect: false,
          thirdParty: false,
          // [[Prototype]]: Object,
        },
      ],
      count: 1,
      depth: 0,
      error: "",
      expanded: false,
      fileName: "Child Two",
      filePath:
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
      id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
      importPath: "/",
      name: "Sidebar",
      parentList: [
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
      ],
      props: { propOne: true, propTwo: true },
      reactRouter: false,
      reduxConnect: false,
      thirdParty: false,
      // [[Prototype]]: Object,
    },
    {
      children: [],
      count: 1,
      depth: 0,
      error: "",
      expanded: false,
      fileName: "Child Three",
      filePath:
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
      id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
      importPath: "/",
      name: "Sidebar",
      parentList: [
        "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
      ],
      props: { propOne: true, propTwo: true },
      reactRouter: false,
      reduxConnect: false,
      thirdParty: false,
      // [[Prototype]]: Object,
    },
  ],
  count: 1,
  depth: 0,
  error: "",
  expanded: false,
  fileName: "index.tsx",
  filePath:
    "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
  id: "twJWgoTMrb7UkXQI8tC1iGPX9VpfK50I",
  importPath: "/",
  name: "index",
  parentList: [],
  props: {},
  reactRouter: false,
  reduxConnect: false,
  thirdParty: false,
  // [[Prototype]]: Object,
};

export const initialElements = [];

// create a node constructor func:
function NewNode(id, type, label, position, parentId) {
  this.id = id;
  this.type = type;
  this.label = label;
  this.position = position;
  this.parentId = parentId;
  this.class = "light";
}
// create an edge constructor func:
function NewEdge(id, source, target) {
  this.id = id;
  // this.type = 'smoothstep';
  this.label;
  this.source = source;
  this.target = target;
}

function createNodesAndEdges(tree) {
  // console.log(tree);
  const q = [tree];
  let nodeId = 1;
  let x = [0]; // []
  let y = [0]; // []

  while (q.length) {
    // initialize variables and save to respective values:
    const node = q.shift();
    let type = "";
    let newPos = { x: x.shift(), y: y.shift() }; // {x: 250, y: 0}
    let parentId = "";

    // change 'type' property based on if the node is a root node or leaf node:
    if (!initialElements.length) {
      type = "input";
    }
    if (!node.children.length) {
      type = "output";
    }
    if (node.parentId) {
      parentId = node.parentId;
    }

    // instantiate a new node and push to 'initialElements' array:
    const newNode = new NewNode(nodeId, type, node.fileName, newPos, parentId);
    initialElements.push(newNode);
    nodeId += 1;
    // console.log(initialElements);

    // push new values to x and y arrays for each child element of the current node:
    if (node.children.length) {
      // push all child nodes to 'q'
      q.push(...node.children);

      // create new x and y coordinates for child nodes and push to respective arrays:
      let nodeWidth = 200; // horizontal space between sibling nodes
      let nodeDepth = 150; // vertical space between parent/child nodes
      let newXPos = -((node.children.length * nodeWidth) / 2 - nodeWidth / 2);
      console.log(newXPos);

      for (let i = 0; i < node.children.length; i++) {
        x.push(newNode.position.x + newXPos);
        newXPos += nodeWidth;
        y.push(newNode.position.y + nodeDepth);
        // add a 'parentId' to the children of 'tree'
        node.children[i].parentId = newNode.id;
      }
    }

    if (newNode.parentId) {
      const id = `e${newNode.parentId}-${newNode.id}`;
      console.log(id);
      const newEdge = new NewEdge(id, `${newNode.parentId}`, `${newNode.id}`);
      initialElements.push(newEdge);
    }
    // console.log("Initial Elements:", initialElements);
  }
}

// nodeQ = [rootNode, child1, child2a, child2b];
// xQ = [250, 250, 150, 350];
// yQ = [0, 100, 200, 200];

createNodesAndEdges(tree);

// TO DO: FIX NODES RENDERING ON TOP OF EACH OTHER (GRANDBABY ONE AND TWO)!!!!!!!!!!!!!!!!
