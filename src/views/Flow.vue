<template>
  <div class="home">
    <h1>Flow</h1>
    <div class="flow">
      <Block v-for="block in root" :id="block.id" :key="block.id"/>
    </div>
    <Adder/>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";
import Block from "@/components/Description";
import Adder from "@/components/Adder";

export default {
  name: 'Flow',
  components: {
    Block,
    Adder
  },
  setup() {
    const {root} = useGetters(["root"]);

    return {
      root
    }
  },
}
</script>

<style lang="scss">

h1, h2, h3 {
  font-weight: normal;
}
</style>
