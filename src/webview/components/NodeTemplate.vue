<script setup>
  import { Handle, Position } from '@vue-flow/core'
  import { customNode } from './elements'
  // somehow I need to get access to stateful variables and dynamically create p tags for each one.  See CustomNode.vue and presets.js at https://vueflow.dev/examples/nodes/ 'Custom Node'

  // I think the flow of data goes: presets.js --> CustomNode.vue --> App.vue

 

  let oneway, twoway;
  if (customNode.data.oneway) {oneway = customNode.data.oneway;}
  if (customNode.data.twoway) {twoway = customNode.data.twoway;}

  const n = JSON.stringify(customNode);
  console.log(n);


</script>

<template>
  <div style="padding-top: .5rem;">{{ props.data.label }}</div>

  <div
    style="display: flex; flex-direction: row; align-self: center; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
  >

  <template v-for="vars of oneway" >
      <div class="oneway">
        <p type="text">{{ vars }}</p>
      </div>
    </template>

    <template v-for="vars of twoway" >
      <div class="twoway">
        <p type="text">{{ vars }}</p>
      </div>
    </template>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />

  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<style>
.oneway {
  font-size: .6rem;
  color: rgb(152, 0, 0);
}
.twoway {
  font-size: .6rem;
  color: rgb(3, 0, 152);
}
</style>