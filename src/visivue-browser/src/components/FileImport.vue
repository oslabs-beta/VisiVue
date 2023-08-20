<template>
  <div id="container">
      <div id="button">Import File</div>
      <input id="file-input" type="file" @change="handleFileUpload" />
    </div>
</template>

<script setup lang="ts">
// use inside input element in template --> :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"

import { Parser } from './Parser.vue';
import { createNodesAndEdges } from './CreateNodesAndEdges.vue';


defineProps(['modelValue']);
defineEmits(['update:modelValue']);

	const handleFileUpload = async (event: any) => {
    event.preventDefault();
    const filePath = event.target.files[0].path;
    event.target.value = null;
    if (filePath) {
      const parser = await new Parser(filePath);
      const tree = parser.entryFileParse();
      const vueFlowArray = createNodesAndEdges(tree);
		}
	}

  // THIS IS ONE OPTION PER VUE DOCS: https://vuejs.org/guide/components/v-model.html#v-model-arguments
  
  // const value = computed({
  //   get() {
  //     return props.elements;
  //   },
  //   set(value) {
  //     emit('update:elements', value);
  //   }
  // })


</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap');

  #container {
    position: relative;
    overflow: hidden;
    width: 7rem;
    height: 3.5rem;
    background: #3c3c3c;
    border: 1px solid rgb(105, 105, 105);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: strong;
    min-width: 12rem;
    min-height: 4rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  }
  #container:hover {
  box-shadow: rgba(66, 211, 146, .2) 0px 1px 2px, rgba(66, 211, 146, .2) 0px 2px 4px,
  rgba(66, 211, 146, .4) 0px 4px 8px, rgba(66, 211, 146, .4) 0px 8px 16px,
  rgba(66, 211, 146, .5) 0px 12px 32px, rgba(100, 126, 255, .8) 0px 18px 64px;
  transition-duration: .5s;
  transition-timing-function: ease;
  cursor: pointer;
  } 
  #button {
    background: -webkit-linear-gradient(315deg,rgb(66, 211, 146) 25%,rgb(100, 126, 255));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    position: absolute;
    top: 0p;
    width: 8rem;
    height: 3.4rem;
    text-align: center;
    margin-top: 2.2rem;
    cursor: pointer;
    padding-top: 0;
    padding-bottom: .2rem;
    text-shadow: 0 4px 12px rgba(0, 0, 0, .3);
    cursor: pointer;
  }
  #file-input/*::file-selector-button*/ {
    width: 7rem;
    height: 3.5rem;
    opacity: 0.0;
    margin-top: 1rem;
    cursor: pointer;
  }
  #file-input::file-selector-button {
    cursor: pointer;
  }
</style>