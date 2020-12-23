<template>
  <div class="block">
    <p>id: {{ id }}</p>
    <Pin />
    <div class="options" >
      <Option :id="id" :key="key" :name="key" v-for="(value, key) in block.options" />
    </div>
    <div class="children">
      <Block v-for="block in children" :key="block" :id="block.id" />

      <p>{{children}}}</p>
      <div @click="addBlock(id)" class="btn">Add Button</div>
    </div>
  </div>
</template>

<script>
import Pin from "@/block/Pin";
import Option from "@/block/Option";
import { useStore } from "vuex";
//import { useGetters } from "@/helpers/store";
import { useActions } from "@/helpers/store";
import { computed } from "vue";

export default {
  props: ["id"],
  components: {
    Pin,
    Option,
  },
  watch: {
    children(newChild) {
      console.log("child changed")
      console.log(newChild)
    }
  },
  setup(props) {
    const store = useStore()
    const block = store.getters.getBlock(props.id);

    const children = computed(() => store.getters.getChildren(props.id));

    const {addBlock} = useActions(["addBlock"]);

    return { block, children, addBlock};
  },
};
</script>

<style lang="scss">
.block {
  background: red;
  width: 100%;
  padding: 0.4rem;
  margin: 0.4rem;
  border-radius: 2px;
}
</style>
