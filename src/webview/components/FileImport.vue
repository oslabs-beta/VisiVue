<template>
    <label class="btn btn-xs btn-primary">
      <input type="file" name="attachment[]" id="fileId" @change="handleFileUpload" multiple/>
      Upload file
    </label>
    <div>{{ string }}</div>
</template>
  
<script setup>
  import { ref } from 'vue';
  // test to see file path because our console.log() is not showing up
  const string = ref('starter');

  const vscode = acquireVsCodeApi();
  
	function handleFileUpload(event) {
    event.preventDefault();
    // real entire complete full voluptuous robust file path
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
