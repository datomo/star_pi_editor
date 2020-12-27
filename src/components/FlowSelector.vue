<template>
  <div class="flow-selector">
    <div class="popup">
      <div class="tab-header">
        <h2 v-for="(type, index) in types" :key="type" :class="{'active': index === active}" @click="active = index">
          {{ type + "s" }}</h2>
      </div>
      <div class="blocks">
        <div v-for="block of selectedBlocks" :key="block.id" class="block" @click="commit(block.id)">
          <div class="btn">Name: {{ block.name }}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {useGetters, useActions} from "@/helpers/store";
import {computed, ref} from "vue";

export default {
  name: "FlowSelector",
  props: ["parentId"],
  setup(props, context) {
    const {blocks, types} = useGetters(["blocks", "types"]);
    const {addFlow} = useActions(["addFlow"]);
    const active = ref(0);
    const selectedBlocks = computed(() => Object.values(blocks.value).filter(b => b.options.type === types.value[active.value]));


    const commit = (id) => {
      addFlow({id, parentId: props.parentId});
      context.emit("close");
    }


    return {
      blocks, types, active, selectedBlocks, commit
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

.active {
  opacity: 0.7;
}

.blocks {
  display: flex;
  flex-direction: column;
}

.tab-header {
  display: flex;
  margin-bottom: 1rem;

  * {
    margin: 0 0.4rem;
  }
}
</style>
