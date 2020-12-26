<template>
  <div class="flow">
    <h1>Flow</h1>
    <div class="flow-blocks">
      <Block v-for="block in root" :id="block.id" :key="block.id"/>
    </div>
    <Adder @click="openAdder"/>
    <FlowSelector v-if="popupVisible"/>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";
import Block from "@/components/Description";
import Adder from "@/components/Adder";
import FlowSelector from "@/components/FlowSelector";
import {ref} from "vue";

export default {
  name: 'Flow',
  components: {
    Block,
    Adder,
    FlowSelector
  },
  setup() {
    const {root} = useGetters(["root"]);
    const popupVisible = ref(false)

    const openAdder = () => {
      popupVisible.value = !popupVisible.value;
    }

    return {
      root, openAdder, popupVisible
    }
  },
}
</script>

<style lang="scss">

h1, h2, h3 {
  font-weight: normal;
}

.flow {
  position: relative;
  height: 100%;
}

</style>
