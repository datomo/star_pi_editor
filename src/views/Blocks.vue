<template>
  <div class="blocks">
    <h1>Blocks</h1>
    <div v-for="block in blocks" class="type" :key="block.id">
      <Description :id="block.id"></Description>
    </div>
    <Adder class="adder" @click="addType"/>
  </div>
</template>


<script>
import {useGetters, useActions} from "@/helpers/store";
import Adder from "@/components/Adder";
import Description from "@/components/Description";

export default {
  name: 'Blocks',
  components: {
    Adder,
    Description
  },
  setup() {
    const {blocks} = useGetters(["blocks"]);
    const {addType} = useActions(["addType"])

    return {
      blocks, addType
    }
  },
}
</script>


<style lang="scss" scoped>
.adder {
  left: 50%;
  position: relative;
  transform: translateX(-50%);
}


</style>
