/**
 * You can pass elements together as a v-model value
 * or split them up into nodes and edges and pass them to the `nodes` and `edges` props of Vue Flow (or useVueFlow composable)
 */

// need to figure out how to dynamically create the 'x' and 'y' positions based on the node's position in the tree

export const initialElements = [
  {
    id: "1",
    type: "input",
    label: "monday.js",
    position: { x: 250, y: 0 },
    class: "light",
    parentId: 0,
  },
  {
    id: "2",
    // type: "output", // specifies handles.  'default' or none, is two handles (top and bottom). 'input' has a bottom handle.  'output' has a top handle
    label: "App.vue",
    position: { x: 250, y: 100 },
    class: "light",
    parentId: "1",
  },
  {
    id: "3",
    label: "MainContainer.vue",
    position: { x: 250, y: 200 },
    class: "light",
    parentId: "2",
  },
  {
    id: "4",
    label: "MainDisplay.vue",
    position: { x: 150, y: 300 },
    class: "light",
    parentId: "3",
  },
  {
    id: "5",
    type: "output",
    label: "Content.vue",
    position: { x: 350, y: 300 },
    class: "light",
    parentId: "3",
  },
  { 
    id: "e1-2", 
    source: "1", 
    target: "2", 
    // animated: false 
  },
  {
    id: "e2-3",
    type: "smoothstep",
    label: "one-way",
    source: "2",
    target: "3",
    animated: false,
    // markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: "e3-4",
    type: "smoothstep",
    label: "smoothstep-edge",
    source: "3",
    target: "4",
  },
  {
    id: "e3-5",
    type: "step",
    label: "step-edge",
    source: "3",
    target: "5",
    style: { stroke: "orange" },
    labelBgStyle: { fill: "orange" },
  },
];