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
import { createNodesAndEdges } from "./components/CreateNodesAndEdges.vue";
// import { Parser } from "./components/Parser.vue";

const test = ref([]);

const msg = JSON.stringify(test.value);
console.log('Test:', msg);

/* uncomment to get AST from elements.js: */
const initialElements = createNodesAndEdges(tree);
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
      <FileImport v-model="test" />
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
  box-shadow: rgba(66, 211, 146, 0.3) 0px 1px 2px,
    rgba(66, 211, 146, 0.2) 0px 2px 4px, rgba(66, 211, 146, 0.3) 0px 4px 8px,
    rgba(66, 211, 146, 0.3) 0px 8px 16px, rgba(100, 126, 255, 0.8) 0px 8px 18px;
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
