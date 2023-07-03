<template>
    <div>
      <input type="file" @change="handleFileUpload">
      <div >{{ string }}</div>
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

<!-- handleFileUpload(event) {
    this.selectedFile = event.target.files[0];
    console.log('event.target from FileImport', event.target)
    vscode.window.showInformationMessage(event.target)
    const fileMessage = (event) => {
        const filePath = event.target.files[0].path;
        console.log('filePath from FileImport', filePath);
        event.target.value = null;
        if (filePath) {
            vscode.postMessage({
                type: "onFile",
                value: filePath
            });
        }
    } -->