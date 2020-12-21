<template>
  <div class="block">
    <p>id: {{ id }}</p>
    <Pin />
    <div class="options" v-for="(value, key) in block.options" :key="key">
      <Option :key="key" :value="value" />
    </div>
  </div>
</template>

<script>
import Pin from "@/block/Pin";
import Option from "@/block/Option";
import { useStore } from "vuex";
//import { useGetters } from "@/helpers/store";

export default {
  props: ["id"],
  components: {
    Pin,
    Option,
  },
  setup(props) {
    //const {getBlock} = useGetters(["getBlock"]);
    console.log(props.id);
    const block = useStore().getters.getBlock(props.id);
    console.log(block);

    return { block };
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