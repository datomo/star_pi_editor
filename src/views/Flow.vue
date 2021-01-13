<template>
  <div class="flow">
    <h1>Flow</h1>
    <div class="flow-blocks">

      <BlockWrapper v-for="block in root" :id="block" @openPopup="openPopup" :key="block"/>
    </div>
    <Adder @click="openAdder"/>
    <FlowSelector :parentId="parentId" @close="popupVisible = false" v-if="popupVisible"/>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";
import Adder from "@/components/Adder";
import FlowSelector from "@/components/FlowSelector";
import {ref} from "vue";
import BlockWrapper from "@/components/BlockWrapper";

export default {
  name: 'Flow',
  components: {
    BlockWrapper,
    Adder,
    FlowSelector
  },
  setup() {
    const {root, state} = useGetters(["root", "state"]);
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
      root, openAdder, popupVisible, openPopup, parentId, state
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
