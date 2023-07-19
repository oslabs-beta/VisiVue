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
  if (oneway.length && twoway.length) handleColor = "#A219FF";
  else if (oneway.length) handleColor = "rgb(255, 72, 72)";
  else if (twoway.length) handleColor = "rgb(0, 102, 255)";

</script>

<template>
  <div style="padding-top: .5rem;">{{ label }}</div>

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

  <Handle id="a" type="target" :style="{ '--vf-handle': handleColor }" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<style>
.oneway {
  font-size: .7rem;
  color: rgb(152, 0, 0);
}
.twoway {
  font-size: .7rem;
  color: rgb(3, 0, 152);
}
</style>