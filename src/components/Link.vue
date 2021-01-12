<template>
  <div class="link" :style="{ backgroundColor : 'pink'}">
    <h1>{{ loops[id].target }}</h1>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";

export default {
  props: ["id"],
  name: "Link",
  setup() {
    const {loops} = useGetters(["loops"])

    return {
      loops
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  display: inline-block;
}
</style>
