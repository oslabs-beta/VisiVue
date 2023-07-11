<script setup>
  import { Handle, Position } from '@vue-flow/core'
  // somehow I need to get access to stateful variables and dynamically create p tags for each one.  See CustomNode.vue and presets.js at https://vueflow.dev/examples/nodes/ 'Custom Node'

  // I think the flow of data goes: presets.js --> CustomNode.vue --> App.vue

</script>

<template>
  <div>Custom Node</div>

  <div
    style="display: flex; flex-direction: row; align-self: center; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
  >

    <template >
      <p title="Variable" type="text"></p>
    </template>
  </div>

  <Handle id="a" type="source" :position="Position.Top" />

  <Handle id="b" type="source" :position="Position.Bottom" />
</template>