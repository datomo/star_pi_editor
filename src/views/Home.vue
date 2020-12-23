<template>
  <div class="home">
    <div class="blocks">
      <Block v-for="block in root" :id="block.id" :key="block.id" />
    </div>
    <div class="controls">
      <div @click="addBlock(null)" class="btn">Add Block</div>
      <div @click="clear" class="btn">Clear</div>
    </div>
  </div>
</template>

<script>
import { useGetters, useActions } from "@/helpers/store";
import Block from "@/components/Block";

export default {
  name: 'Home',
  components: {
    Block
  },
  setup() {
    const { root } = useGetters(["root"]);
    const { addBlock, clear } = useActions(["addBlock", "clear"])

    return {
      addBlock, clear, root
    }
  },
}
</script>

<style lang="scss">
  .home {
    height: 100vh;
    display: grid;
    grid-template-areas: "blocks" "controls";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;

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
</style>
