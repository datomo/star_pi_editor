<template>
  <div class="description">
    <h3>Name: {{ block.name }}</h3>
    <h3>Type: {{ block.typeBlock }}</h3>
    <div class="inputs">
      <h3>Command: </h3>
      <select name="commands" v-model="cmd">
        <option v-for="key in Object.keys(commands[block.module])" :value="key" :key="key">{{ key }}</option>
      </select>
      <div v-for="(value, index) in commands[block.module][cmd]" :key="value">
        <p>{{ value }}</p>
        <input type="text" v-model="amounts[index]">
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useActions, useGetters} from "@/helpers/store";
import {computed, ref, watch} from "vue";

export default {
  name: "Block",

  props: ["id"],
  setup(props) {
    const store = useStore();
    const block = store.getters.flowBlock(props.id);
    const task = store.getters.task(props.id);
    const isRoot = store.getters.isRoot(props.id);
    const cmd = ref("");

    const amounts = ref([]);

    const commands = {
      "motor": {"clockwise": ["steps", "speed"], "counter-clockwise": ["steps", "speed"]},
      "scale": {"over": ["amount"], "under": ["amount"], "between": ["over", "under"]},
      "button": {"press": [], "doublePress": []}
    }

    console.log(task)
    const splits = task.command.split("_");
    if(splits.length >= 1) {
      cmd.value = splits[0];
    }

    if(splits.length > 1){
      amounts.value = splits.slice(1);
    }



    const {colors, children, loops} = useGetters(["colors", "children", "loops"]);
    const {removeFlowBlock, setCommand} = useActions(["removeFlowBlock", "setCommand"]);

    const updateCommand = () => {
      let res = [cmd.value].concat(amounts.value);
      res = res.join("_");
      console.log("trigger")
      setCommand({id: props.id, command: res})
    }

    watch(amounts, () => updateCommand(), {deep: true});
    watch(cmd, () => updateCommand(), {deep: true})

    const command = computed({
      get: () => store.getters.command(props.id),
      set: val => {
        setCommand({id: props.id, command: val})
      }
    })
    const childrenVisible = ref(true);

    return {
      block, colors, children, isRoot, childrenVisible, removeFlowBlock, command, loops, commands, cmd, amounts
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

.inputs {
  display: flex;
  flex-direction: column;
}
</style>
