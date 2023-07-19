<script setup>
  import { Handle, Position } from '@vue-flow/core'

  const props = defineProps({
    data: {
      type: Object,
    },
    oneway: {
      type: Array,
    },
    twoway: {
      type: Array,
    },
    label: {
      type: String,
    }
  })

  const oneway = props.oneway;
  const twoway = props.twoway;
  const label = props.label;

  let handleColor;
  if (oneway.length && twoway.length) handleColor = "rgb(244, 102, 102)";
  else if (oneway.length) handleColor = "rgb(66, 136, 242)";
  else if (twoway.length) handleColor = "rgb(66, 211, 146)";

  // const c = JSON.stringify(props);
  // console.log('NodeTemplate: props.node:', c);

</script>

<template>
  <div id="label">{{ label }}</div>

<div
  style="display: flex; flex-direction: row; align-self: center; justify-content: center; max-width: 90%; margin: auto; gap: 3px"
>
  <div id="variable-container">
    <div class="oneway">
      <template v-for="vars of oneway" >
        <p class="p-one" type="text">{{ vars }}</p>
      </template>
    </div>

    
    <div class="twoway">
      <template v-for="vars of twoway" >
        <p class="p-two" type="text">{{ vars }}</p>
      </template>
    </div>
    
  </div>
</div>

  <Handle id="a" type="target" :style="{ '--vf-handle': handleColor }" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

#label {
  padding-top: .5rem;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 3px 5px rgba(0, 0, 0, .4);
}
#variable-container {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
}
.oneway {
  font-size: .9rem;
  color: rgb(66, 136, 242);
  font-weight: bold;
  width: 10rem;
  padding-right: 5px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-shadow: 0 3px 6px rgba(0, 0, 0, .4);
  
}
.twoway {
  font-size: .9rem;
  color: rgb(65, 184, 131);
  font-weight: bold;
  width: 10rem;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-shadow: 0 3px 5px rgba(0, 0, 0, .4);
}
.p-one {
  margin: 0;
  padding: .3rem .4rem .1rem .2rem;
}
.p-two {
  margin: 0;
  padding: 0 .4rem .4rem .2rem;
}
</style>