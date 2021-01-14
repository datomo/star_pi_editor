<template>
  <div class="description">
    <h3>Name: {{ block.name }}</h3>
    <h3>Type: {{ block.typeBlock }}</h3>
    <div class="input-group">
      <h3>Command: </h3>
      <select name="commands" v-model="command">
        <option v-for="(key, value) in commands[block.module]" :value="key" :key="key">{{ key }}</option>
      </select>
      <div class="input">
        <input v-for="value in commands[block.module][command]" :key="value" type="text">
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useActions, useGetters} from "@/helpers/store";
import {computed, ref} from "vue";

export default {
  name: "Block",

  props: ["id"],
  setup(props) {
    const store = useStore();
    const block = store.getters.flowBlock(props.id);
    const isRoot = store.getters.isRoot(props.id);
    const commands = {
      "motor": {"clockwise": ["steps", "speed"], "counter-clockwise": ["steps", "speed"]},
      "scale": {"over":["amount"], "under":["amount"], "between":["amount", "amount"]},
      "button": {"press":[], "doublePress":[]}
    }

    const {colors, children, loops} = useGetters(["colors", "children", "loops"]);
    const {removeFlowBlock, setCommand} = useActions(["removeFlowBlock", "setCommand"]);
    const command = computed({
      get: () => store.getters.command(props.id),
      set: val => {
        setCommand({id: props.id, command: val})
      }
    })
    const childrenVisible = ref(true);

    return {
      block, colors, children, isRoot, childrenVisible, removeFlowBlock, command, loops, commands
    }
  }
}
</script>

<style lang="scss" scoped>
.block-arrow {
  display: flex;
}

.block-wrapper {
  display: grid;
  grid-template-columns: max-content 1fr;
  margin-bottom: 1rem;
  align-items: start;
}

.block {
  display: flex;
  width: 250px;
  justify-content: space-between;

  .arrow {
    align-self: center;
    justify-self: end;
  }


}

.input-group {
  display: flex;

  input {
    width: 100px;
  }
}
</style>
