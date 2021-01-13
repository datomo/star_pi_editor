<template>
  <div class="block-wrapper">
    <div class="block-arrow">
      <Arrow v-if="!isRoot"/>
      <div class="block" :style="{ backgroundColor : colors[type]}">
        <h2 @click="removeFlowBlock(id)">x</h2>
        <div class="content">
          <div>
            <Link :id="id" v-if="type === 'loop'"/>
            <Block :id="id" v-else/>
          </div>

          <div @click="childrenVisible = !childrenVisible" v-if="children[id].length > 0" class="btn">Toggle
            {{ children[id].length }} Children
          </div>
        </div>

        <Adder class="arrow" @click="$emit('openPopup', id)"/>
      </div>
    </div>
    <div class="children" v-if="childrenVisible">
      <div v-for="child in children[id]" class="child" :key="child">
        <BlockWrapper :id="child" @openPopup="(passedId) => $emit('openPopup', passedId)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useActions, useGetters} from "@/helpers/store";
import Adder from "@/components/Adder";
import Arrow from "@/components/Arrow";
import Link from "@/components/Link";
import {ref} from "vue";
import Block from "@/components/Block";

export default {
  name: "BlockWrapper",
  components: {
    Adder,
    Arrow,
    Link,
    Block
  },
  props: ["id"],
  setup(props) {
    const store = useStore();
    const isRoot = store.getters.isRoot(props.id);
    const isLoop = store.getters.isLoop(props.id);

    const {colors, children} = useGetters(["colors", "children"]);
    const {removeFlowBlock} = useActions(["removeFlowBlock"]);

    const childrenVisible = ref(true);

    console.log("id: " + props.id)
    console.log(store.getters.blocks)
    let type = "";
    if (isLoop) {
      type = "loop";
    } else {
      type = store.getters.flowBlock(props.id).options.type;
      console.log();
    }

    return {
      colors, children, isRoot, childrenVisible, removeFlowBlock, isLoop, type
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
