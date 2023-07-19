<template>

    <div id="container">
      <div id="button">Import File</div>
      <input id="file-input" type="file" />
    </div>

</template>

<script setup>
  // import { ref } from 'vue';
  // note that state using ref are objects so u have to access the value prop to get the value
 

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
    // console.log('Import file button clicked');
	}

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
  /* box-shadow: 0 .1rem 1rem .2rem rgba(65, 184, 131, .4); */
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