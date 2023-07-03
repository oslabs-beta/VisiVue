<template>
    <div>
      <input type="file" @change="handleFileUpload">
      <button @click="uploadFile">Upload</button>
    </div>
  </template>
  
  <script>
    export default {
        data() {
            return {
                selectedFile: null
            };
        },
        methods: {
            handleFileUpload(event) {
                this.selectedFile = event.target.files[0];
                console.log(event.target)
            },
            uploadFile() {
                if (this.selectedFile) {
                // Perform file upload logic here
                console.log("Uploading file:", this.selectedFile);
                } else {
                console.log("No file selected");
                }
            }
        }
    }
  </script>
  
