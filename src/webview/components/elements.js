// import node from './NodeTemplate';

export const tree = {
  children: [{
    children: [
      {
        children: [
          {
            children: [],
            count: 1,
            depth: 0,
            error: "",
            expanded: false,
            fileName: "GrandBaby One-A",
            filePath:
              "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
            id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
            importPath: "/",
            name: "Sidebar",
            parentList: [
              "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
            ],
            oneWayProps: ['p-1'],
            twoWayProps: [],
            reactRouter: false,
            reduxConnect: false,
            thirdParty: false,
            // [[Prototype]]: Object,
          },
          {
            children: [
              {
                children: [],
                count: 1,
                depth: 0,
                error: "",
                expanded: false,
                fileName: "G-G-Baby 1",
                filePath:
                  "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
                id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
                importPath: "/",
                name: "Sidebar",
                parentList: [
                  "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
                ],
                oneWayProps: ['p-3'],
                twoWayProps: [],
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
            fileName: "GrandBaby One-B",
            filePath:
              "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
            id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
            importPath: "/",
            name: "Sidebar",
            parentList: [
              "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
            ],
            oneWayProps: ['p-3'],
            twoWayProps: ['p-2'],
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
        oneWayProps: ['p-1'],
        twoWayProps: ['p-2'],
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
        fileName: "Child Two",
        filePath:
          "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
        id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
        importPath: "/",
        name: "Sidebar",
        parentList: [
          "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
        ],
        oneWayProps: [],
        twoWayProps: [],
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
    fileName: "Parent",
    filePath:
      "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
    id: "twJWgoTMrb7UkXQI8tC1iGPX9VpfK50I",
    importPath: "/",
    name: "index",
    parentList: [],
    oneWayProps: [],
    twoWayProps: [],
    reactRouter: false,
    reduxConnect: false,
    thirdParty: false,
    // [[Prototype]]: Object,
  }],
  count: 1,
  depth: 0,
  error: "",
  expanded: false,
  fileName: "Index.tsx",
  filePath:
    "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/components/Sidebar.tsx",
  id: "FA6sF8JbqMloijRT6QOxHh3i5p1v29bJ",
  importPath: "/",
  name: "Sidebar",
  parentList: [
    "/Users/abehenderson/Documents/Codesmith/ReacTree/src/webview/index.tsx",
  ],
  oneWayProps: [],
  twoWayProps: [],
  reactRouter: false,
  reduxConnect: false,
  thirdParty: false,
  // [[Prototype]]: Object,
};

export const initialElements = [];

// const customNode = new NewNode('0', 'custom', '', {x:0,y:-150}, '', {oneway: 'Variable One', twoway: 'Variable Two'});
// initialElements.push(customNode);
// console.log(initialElements);

// create a node constructor func:
function NewNode(id, type, label, position, parentId, data) {
  this.id = id;
  this.type = type;
  this.label = label;
  this.position = position;
  this.parentId = parentId;
  this.data = data;
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
    // if the current node in the AST has a parentId property, assign it to 'parentId'
    if (node.parentId) {
      parentId = node.parentId;
    }

    // instantiate a new node and push to 'initialElements' array:
    const newNode = new NewNode(nodeId, type, node.fileName, newPos, parentId);
    initialElements.push(newNode);
    nodeId += 1;
    // console.log(initialElements);

    // If the current node has children, push its children to the 'q' and create x and y postions for each child and push them to 'xQ' and 'yQ' respectively
    if (node.children.length) {
      // push all child nodes to 'q'
      q.push(...node.children);

      // intialize variable to calculate x and y positions:
      let horizontalSpace = 200; // horizontal space between sibling nodes
      let verticalSpace = 150; // vertical space between parent/child nodes
      let newXPos = -((node.children.length * horizontalSpace) / 2 - horizontalSpace / 2);
      console.log(newXPos);

      // create new x and y positions for each child node and push to respective arrays:
      for (let i = 0; i < node.children.length; i++) {
        x.push(newNode.position.x + newXPos);
        newXPos += horizontalSpace;
        y.push(newNode.position.y + verticalSpace);

        // add a 'parentId' to all children of the current node 5in the AST:
        node.children[i].parentId = newNode.id;
      }
    }

    // Instantiate a new edge object and push to 'initialElements' array
    if (newNode.parentId) {
      const id = `e${newNode.parentId}-${newNode.id}`;
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
// the number of child nodes must trigger a re-assignment of parent sibling nodes - this means they should not be held in a queue but probably an object?  How do I do this without lots of iterating?????

// Can create a horizontal button!!!