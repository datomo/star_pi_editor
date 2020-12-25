<template>
  <div class="blocks">
    <div v-for="block in blocks" class="type" :key="block.id">
      <Description :id="block.id"></Description>
    </div>
    <Adder/>
  </div>
</template>


<script>
import {useGetters} from "@/helpers/store";
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

    return {
      blocks
    }
  },
}
</script>


<style lang="scss">
.blocks {
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;

  * {
    flex-grow: 1;
  }

}

</style>
