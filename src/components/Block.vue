<template>
  <div class="block-wrapper">
    <div class="block" :style="{ backgroundColor : colors[block.options.type]}">
      <h3>Name: {{ block.name }}</h3>
      <h3>type: {{ block.options.type }}</h3>
    </div>
    <div class="children">
      <Block v-for="child in children[id]" :id="child" :key="child" @openPopup="(passedId) => $emit('openPopup', passedId)"/>
      <Adder @click="$emit('openPopup', id)" />
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useActions, useGetters} from "@/helpers/store";
import Adder from "@/components/Adder";

export default {
  name: "Block",
  components: {
    Adder
  },
  props: ["id"],
  setup(props) {
    const store = useStore();
    const block = store.getters.flowBlock(props.id)
    const {colors, children} = useGetters(["colors", "children"]);
    const {addFlow} = useActions(["addFlow"])

    return {
      block, colors, addFlow, children
    }
  }
}
</script>

<style lang="scss" scoped>
.block-wrapper {
  display: grid;
  grid-template-columns: max-content 1fr;
  margin-bottom: 1rem;
  align-items: start;
}

.block {
  display: inline-block;
  width: 200px;
}
</style>
