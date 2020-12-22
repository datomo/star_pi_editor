<template>
  <div class="block">
    <p>id: {{ id }}</p>
    <Pin />
    <div class="options" >
      <Option :id="id" :key="key" :name="key" v-for="(value, key) in block.options" />
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
    const block = useStore().getters.getBlock(props.id);

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