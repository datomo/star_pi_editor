<template>
  <div class="home">
    <div class="flow">
      <Block v-for="block in root" :id="block.id" :key="block.id"/>
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
  grid-template-areas: "flow" "arsenal";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.8fr;

  .blocks {
    grid-area: blocks;
  }

}

h1, h2, h3 {
  font-weight: normal;
}
</style>
