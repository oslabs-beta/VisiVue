<template>
    <div id="file-import" >
      <label for="file-input" id="file-input-label">
        S
      </label>
      <input id="file-input" type="file" @change="handleFileUpload">
      <!-- <div >{{ string }}</div> -->
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  const string = ref('statar')

  const vscode = acquireVsCodeApi();
  
	function handleFileUpload(event) {
    event.preventDefault();
    const filePath = event.target.value;
    event.target.value = null;
    string.value = filePath;
    if (filePath) {
      vscode.postMessage({
        type: "onFile",
        value: filePath
      });
		}
	}

</script>

<!-- <style>
    #file-import {
        background-color: rgb(104, 104, 104);
        color: black;
        transform-origin: top left;
        width: 10rem;
        height: 5rem;
        border: 1px solid black;
        border-radius: 0 1rem 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 5rem;
    }
    #file-input {
      display: none;
      
    }
    #file-input-label {
      display: flex;
      align-self: center;
      justify-self: center;
      width: 10rem;
      height: 5rem;
      border-radius: 0 1rem 1rem 0;
      font-family: sans-serif;
      font-size: 1.5rem;
      text-shadow: 0 1.5rem 2rem 2rem rgba(3, 3, 3, .8);
    }
    #file-input-label:hover {
      background-color: blueviolet;
      border: 1px solid black;
      cursor: grab;
    }
</style> -->
  
