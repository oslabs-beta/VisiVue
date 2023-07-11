<template>
    <label class="btn btn-xs btn-primary">
      <input type="file" name="attachment[]" id="fileId" @change="handleFileUpload" multiple/>
    </label>
    <input id="file-input" type="file" @change="handleFileUpload">
    <!-- <div >{{ string }}</div> -->
  </div>
  <div>{{ string }}</div>
</template>

<script setup>
  import { ref } from 'vue';
  // note that state using ref are objects so u have to access the value prop to get the value
  let string = ref('statar')

  const vscode = acquireVsCodeApi();
  
	function handleFileUpload(event) {
    event.preventDefault();
    const filePath = event.target.files[0].path;
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

<style>
  #file-import {
      background-color: #e5e4df;
      color: black;
      /* transform-origin: top left; */
      width: 7rem;
      height: 3.5rem;
      border: 1px solid #d2d1cc;
      border-radius: 0 1rem 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 5rem;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  #file-input {
    display: none;
    
  }
  #file-input-label {
    display: flex;
    align-self: center;
    justify-self: center;
    width: 7rem;
    height: 3.5rem;
    border-radius: 0 1rem 1rem 0;
    font-family: "JetBrains Mono", monospace;
    font-size: 1.5rem;
    text-shadow: 0 1.5rem 2rem 2rem rgba(3, 3, 3, .8);
  }
  /* #file-input-label:hover {
    background-color: blueviolet;
    border: 1px solid black;
    cursor: grab;
  } */
</style>
