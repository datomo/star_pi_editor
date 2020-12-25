<template>
  <div class="home">
    <div class="flow">
      <Block v-for="block in root" :id="block.id" :key="block.id"/>
    </div>
    <div class="arsenal">
      <div v-for="type in types" class="type" :key="type">
        <h2 class="title">{{ type + "s" }}</h2>
        <Adder/>
      </div>
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
import Block from "@/components/Block";
import Adder from "@/components/Adder";

export default {
  name: 'Home',
  components: {
    Block,
    Adder
  },
  setup() {
    const {root, types} = useGetters(["root", "types"]);
    const {addBlock, clear, saveConfig} = useActions(["addBlock", "clear", "saveConfig"])

    return {
      addBlock, clear, root, types, saveConfig
    }
  },
}
</script>

<style lang="scss">
.arsenal {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;

  * {
    flex-grow: 1;
  }
  .title {
    text-align: center;
    background: #42b983;
    color: black;
    padding: 0.2rem;
    margin: 0.2rem;
    border-radius: 4px;
    text-transform: capitalize;
  }
}

.home {
  height: 100vh;
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
