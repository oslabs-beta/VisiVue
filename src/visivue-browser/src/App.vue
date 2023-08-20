<script setup>
import {
  Panel,
  PanelPosition,
  VueFlow,
  isNode,
  useVueFlow,
} from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import { ref } from "vue";
import { tree } from "./components/Elements.vue";
import FileImport from "./components/FileImport.vue"
import Node from "./components/NodeTemplate.vue";
import ColorKey from "./components/ColorKey.vue";
// import { createNodesAndEdges } from "./components/CreateNodesAndEdges.vue";
import { createNodesAndEdges } from "./components/TSCreate.vue";

// Create an array of nodes and edges objects:
// function createNodesAndEdges(tree) {
//   // create a node constructor func:
//   function NewNode(id, type, label, position, parentId, data) {
//     this.id = id;
//     this.type = type;
//     this.label = label;
//     this.position = position;
//     this.parentId = parentId;
//     this.data = data;
//     this.class = "light";
//   }
//   // Edge constructor function
//   function NewEdge(id, source, target, style, animated) {
//     this.id = id;
//     this.label;
//     this.source = source;
//     this.target = target;
//     this.style = style;
//     this.animated = animated;
//   }

//   // initialize variables
//   const result = [];
//   const initialElements = [];
//   const edges = [];

//   const levels = [];
//   const q = [];
//   if (tree) {
//     q.push(tree);
//   }

//   let nodeId = 1;

//   const pos = {
//     lastNode: 1,
//     1: { x: 0, y: 0 },
//   };

//   // traverse the tree and build node and edge objects
//   while (q.length) {
//     const level = [];
//     const l = q.length;

//     for (let i = 0; i < l; i++) {
//       // initialize variables and save to respective values:
//       const node = q.shift();
//       let type = "template";
//       let newPos = pos[nodeId];
//       let parentId = "";

//       // Add oneway and twoway props from AST to 'data' to be passed into a new instance of NewNode:
//       const oneway = node.props.oneWay;
//       const twoway = node.props.twoWay;
//       const data = { oneway, twoway };

//       // change 'type' property based on if the node is a root node or leaf node:
//       if (!initialElements.length) {
//         type = "input";
//       }

//       // if the current node in the AST has a parentId property, assign it to 'parentId'
//       if (node.parentId) {
//         parentId = node.parentId;
//       }

//       // instantiate a new node and push to 'initialElements' array:
//       const newNode = new NewNode(
//         nodeId,
//         type,
//         node.name,
//         newPos,
//         parentId,
//         data
//       );
//       level.push(newNode);

//       // If the current node has children, push its children to the 'q' and create x and y postions for each child and push them to 'xQ' and 'yQ' respectively
//       if (node.children.length) {
//         // push all child nodes to 'q'
//         q.push(...node.children);

//         // intialize variable to calculate x and y positions:
//         let horizontalSpace = 250; // horizontal space between sibling nodes
//         let verticalSpace = 150; // vertical space between parent/child nodes
//         let newXPos = -(
//           (node.children.length * horizontalSpace) / 2 -
//           horizontalSpace / 2
//         );

//         // create new x and y positions for each child node:

//         // find the id of the last sibling node:
//         let childId = pos.lastNode + 1;

//         for (let i = 0; i < node.children.length; i++) {
//           // initialize x and y positions
//           let x = newNode.position.x + newXPos;
//           let y = newNode.position.y + verticalSpace;

//           let prevNode = pos[childId - 1];

//           // assign 'x' position based on if the current node is the first in a level or not:
//           if (prevNode.y === y) x = Math.max(prevNode.x + horizontalSpace, x);

//           // assign a new property to 'pos' for the current child node
//           pos[childId] = { x, y };

//           // update lastNode property on 'pos'
//           pos.lastNode = childId;
//           // update newXPos
//           newXPos += horizontalSpace;
//           // containers[newNode.id].children.push(childId);

//           // add a 'parentId' to all children of the current node in the AST:
//           node.children[i].parentId = newNode.id;
//           // increment 'childId'
//           childId += 1;
//         }
//       }

//       // Instantiate a new edge object and push to 'initialElements' array
//       if (newNode.parentId) {
//         const id = `e${newNode.parentId}-${newNode.id}`;

//         // assign edge width and animation based on stateful variables:
//         let animated = false;
//         let strokeWidth;
//         if (newNode.data.oneway.length || newNode.data.twoway.length) {
//           animated = true;
//           strokeWidth = "4px";
//         } else {
//           strokeWidth = "2px";
//         }

//         // assign edge color based on stateful variables:
//         let color;
//         if (newNode.data.oneway.length && newNode.data.twoway.length)
//           color = "rgb(244, 102, 102)";
//         // else if (newNode.data.oneway.length) color = 'rgb(255, 72, 72)';
//         // else if (newNode.data.twoway.length) color = 'rgb(0, 102, 255)';
//         else if (newNode.data.oneway.length) color = "rgb(66, 136, 242)";
//         else if (newNode.data.twoway.length) color = "rgb(66, 211, 146)";

//         const style = { stroke: `${color}`, strokeWidth: `${strokeWidth}` };

//         // instantiate a new edge and push to 'initialElements'
//         const newEdge = new NewEdge(
//           id,
//           `${newNode.parentId}`,
//           `${newNode.id}`,
//           style,
//           animated
//         );
//         edges.push(newEdge);
//       }

//       // increment node ID:
//       nodeId += 1;
//     }
//     if (level.length) {
//       initialElements.push(level);
//     }
//   }

//   // Add node objects to 'result' array
//   for (let i = 0; i < initialElements.length; i++) {
//     for (let j = 0; j < initialElements[i].length; j++) {
//       result.push(initialElements[i][j]);
//     }
//   }

//   // push edge object into 'result' array
//   result.push(...edges);

//   return result;
// }

/* uncomment to get AST from elements.js: */
const initialElements = createNodesAndEdges(tree);

// Pass vueFlowOutput into wherever we pass into VueFlow

const elements = ref(initialElements);

/* Uncomment to get AST from panel.ts: */
// let parsedTree;
// const elements = ref([]);

// window.addEventListener("message", async (event) => {
//   const message = await event.data;
//   if (message.type === "parsed-data") {
//     parsedTree = message.value;
//   }
//   const initialElementsArr = createNodesAndEdges(parsedTree);
//   elements.value = initialElementsArr;
// });

const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
  setTransform,
  toObject,
} = useVueFlow();

onPaneReady(({ fitView }) => {
  fitView();
});

onNodeDragStop((e) => console.log("drag stop", e));

onConnect((params) => addEdges(params));
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div style="position: fixed; z-index: 2">
      <FileImport />
    </div>
  </div>

  <VueFlow
    v-model="elements"
    class="basicflow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <template #node-template="{ data, label }">
      <Node
        :data="data"
        :oneway="data.oneway"
        :twoway="data.twoway"
        :label="label"
      />
    </template>

    <Background :pattern-color="'#134c84'" :variant="true" />

    <MiniMap />

    <Controls />

    <div id="color-key" style="z-index: 1">
      <ColorKey />
    </div>
  </VueFlow>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.20.2/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.20.2/dist/theme-default.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap");

html,
body {
  height: 100vh;
  width: 100%;
  margin: 0;
  height: 100%;
  /* Do not set a background color for VS Code Extension, by not setting a color, the background will be the same color as the user's VS Code theme */
  background-color: #272727;
  /* this is for VS Code ---> */
  overflow-x: hidden;
  margin-left: -0.8%;
  /* <--- this is for VS Code */
}

.fileImport {
  position: fixed;
  top: 0;
  left: 0;
}
.fileInput {
  position: fixed;
  top: 0px;
  left: 0px;
  color: black;
}

#app {
  /* this is for VS Code ---> */
  height: inherit;
  width: inherit;
  /* <--- this is for VS Code */
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.2);
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
  background-color: #494949;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.vue-flow__controls {
  color: #494949;
}

.vue-flow #color-key {
  display: flex;
  justify-content: end;
}

.basicflow .vue-flow__node {
  background: #3c3c3c;
  color: rgb(230, 230, 230);
  border: 1px solid rgb(105, 105, 105);
  font-size: 1rem;
  font-weight: strong;
  min-width: 12rem;
  min-height: 4rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}

.basicflow .vue-flow__node:hover {
  /* box-shadow: 0 .1rem 1rem .2rem rgba(255, 255, 255, 0.4); */
  box-shadow: rgba(66, 211, 146, 0.3) 0px 1px 2px,
    rgba(66, 211, 146, 0.2) 0px 2px 4px, rgba(66, 211, 146, 0.3) 0px 4px 8px,
    rgba(66, 211, 146, 0.3) 0px 8px 16px, rgba(100, 126, 255, 0.8) 0px 8px 18px;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  /* transition-timing-function: ease-in-out; */
}

.basicflow .controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8;
}
.basicflow .controls button {
  padding: 4px;
  border-radius: 5px;
  font-weight: 600;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 10px #0000004d;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #494949;
  color: #494949;
  fill: #494949;
}

.basicflow .controls button:hover {
  transform: scale(102%);
  transition: 0.25s all ease;
}

.basicflow .vue-flow__controls .vue-flow__controls-button {
  background: #494949;
  fill: rgb(171, 171, 171);
  border-color: #272727;
}
</style>
