<template>
  <div class="flow">
    <h1>Flow</h1>
    <div class="flow-blocks">
      <Block v-for="block in root" :id="block" @openPopup="openPopup" :key="block"/>
    </div>
    <Adder @click="openAdder"/>
    <FlowSelector :parentId="parentId" @close="popupVisible = false" v-if="popupVisible"/>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";
import Block from "@/components/Block";
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
    const parentId = ref(null);

    const openAdder = () => {
      parentId.value = null;
      popupVisible.value = true;
    }

    const openPopup = (id) => {
      console.log(id)
      parentId.value = id;
      popupVisible.value = true;
    }

    return {
      root, openAdder, popupVisible, openPopup, parentId
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
