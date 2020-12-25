<template>
  <div class="home">
    <div class="flow">
      <Block v-for="block in root" :id="block.id" :key="block.id"/>
    </div>
    <div class="controls">
      <div @click="addBlock(null)" class="btn">Add Block</div>
      <div @click="saveConfig" class="btn">Save Config</div>
      <div @click="clear" class="btn">Clear</div>
    </div>
  </div>
</template>

<script>
import {useGetters, useActions} from "@/helpers/store";
import Block from "@/components/Description";

export default {
  name: 'Home',
  components: {
    Block,
  },
  setup() {
    const {root} = useGetters(["root", "types"]);
    const {addBlock, clear, saveConfig} = useActions(["addBlock", "clear", "saveConfig"])

    return {
      addBlock, clear, root, saveConfig
    }
  },
}
</script>

<style lang="scss">


.home {
  height: 100%;
  display: grid;
  grid-template-areas: "flow" "arsenal" "controls";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.8fr auto;

  .blocks {
    grid-area: blocks;
  }

  .controls {
    grid-area: controls;
  }
}

.btn {
  background-color: #4a72ca;
  color: black;
  display: inline-block;
  padding: 1rem;
  margin: 0.2rem;
  border-radius: 2px;
  cursor: pointer;
}

h1, h2, h3 {
  font-weight: normal;
}
</style>
