<template>
  <div class="block" :style="{ backgroundColor : colors[block.options.type]}">
    <p>id: {{ id }}</p>
    <div class="input-group">
      <p>name:</p>
      <input type="text" v-model="name">
    </div>

    <Pin/>
    <div class="options">
      <Option :id="id" :key="key" :name="key" v-for="(value, key) in block.options"/>
    </div>

  </div>
</template>

<script>
import Pin from "@/block/Pin";
import Option from "@/block/Option";
import {useStore} from "vuex";
import { useGetters } from "@/helpers/store";
import {computed} from "vue";

export default {
  props: ["id"],
  components: {
    Pin,
    Option,
  },
  watch: {
    colors() {
      console.log("new color")
    },
  },
  setup(props) {
    const store = useStore()
    const block = store.getters.block(props.id);
    const { colors } = useGetters(["colors"]);

    const name = computed({
      get: () => store.getters.block(props.id).name,
      set: name => store.dispatch("setName", {id: props.id, name})
    })

    return {block, name, colors};
  },
};
</script>

<style lang="scss">


.block {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  border-radius: 2px;
}

.children {
  border: 2px solid black;
}

.input-group {
  display: flex;
}
</style>
