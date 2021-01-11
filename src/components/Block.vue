<template>
  <div class="block-wrapper">
    <div class="block-arrow">
      <Arrow v-if="!isRoot"/>
      <div class="block" :style="{ backgroundColor : colors[block.options.type]}">
        <h2 @click="removeFlowBlock(id)">x</h2>
        <div class="description">
          <h3>Name: {{ block.name }}</h3>
          <h3>Type: {{ block.options.type }}</h3>
          <div class="input-group">
            <h3>Command: </h3>
            <input type="text" v-model="command">
          </div>

          <div @click="childrenVisible = !childrenVisible" v-if="children[id].length > 0" class="btn">Toggle
            {{ children[id].length }} Children
          </div>
        </div>
        <Adder class="arrow" @click="$emit('openPopup', id)"/>
      </div>
    </div>
    <div class="children" v-if="childrenVisible">
      <Block v-for="child in children[id]" :id="child" :key="child"
             @openPopup="(passedId) => $emit('openPopup', passedId)"/>

      // TODO insert component
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useActions, useGetters} from "@/helpers/store";
import Adder from "@/components/Adder";
import Arrow from "@/components/Arrow";
import {computed, ref} from "vue";

export default {
  name: "Block",
  components: {
    Adder,
    Arrow
  },
  props: ["id"],
  setup(props) {
    const store = useStore();
    const block = store.getters.flowBlock(props.id);
    const isRoot = store.getters.isRoot(props.id);

    const {colors, children} = useGetters(["colors", "children"]);
    const {removeFlowBlock, setCommand} = useActions(["removeFlowBlock", "setCommand"]);
    const command = computed({
      get: () => store.getters.command(props.id),
      set: val => {
        setCommand({id: props.id, command: val})
      }
    })
    const childrenVisible = ref(true);

    return {
      block, colors, children, isRoot, childrenVisible, removeFlowBlock, command
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
