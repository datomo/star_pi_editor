<template>
  <div class="flow-selector">
    <div class="popup">
      <div class="select">
        <select name="cars" id="cars">
          <option v-for="block in blocks" :value="block.id" :key="block.id">{{block.name}}</option>
        </select>
      </div>
      <div class="blocks">

      </div>
    </div>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";

export default {
  name: "FlowSelector",
  setup() {
    const {blocks} = useGetters(["blocks"]);

    return {
      blocks
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-selector {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: black;
  top: 0;
  left: 0;
  display: grid;

  .popup {
    background-color: gray;
    display: inline-block;
    padding: 1rem;
    align-self: center;
    justify-self: center;
  }
}
</style>
