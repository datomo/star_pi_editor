<template>
  <div class="flow-selector">
    <div class="popup">
      <div class="close" @click="$emit('close')">X</div>
      <div class="tab-header">
        <h2 v-for="(type, index) in types" :key="type" :class="{'active': index === active}" @click="active = index">
          {{ type + "s" }}</h2>
      </div>
      <div class="blocks">
        <div v-if="types[active] === 'loop'">
          <div class="block" @click="commitLoop">
            <div class="btn">LOOP</div>
          </div>
        </div>
        <div v-else>
          <div v-for="block of selectedBlocks" :key="block.id" class="block" @click="commit(block.id)">
            <div class="btn">Name: {{ block.name }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {useActions, useGetters} from "@/helpers/store";
import {computed, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "FlowSelector",
  props: ["parentId"],
  setup(props, context) {
    const store = useStore();
    const {blocks, types} = useGetters(["blocks", "types"]);
    const {addFlow, addLoop} = useActions(["addFlow", "addLoop"]);
    const active = ref(0);
    const selectedBlocks = computed(() => Object.values(blocks.value).filter(b => store.getters.typeBlock(b.id) === types.value[active.value]));


    const commit = (id) => {
      addFlow({id, parentId: props.parentId, command: ""});
      context.emit("close");
    }

    const commitLoop = () => {
      addLoop(props.parentId);
      context.emit("close");
    }


    return {
      blocks, types, active, selectedBlocks, commit, commitLoop
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-selector {
  position: fixed;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: black;
  top: 0;
  left: 0vw;
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
