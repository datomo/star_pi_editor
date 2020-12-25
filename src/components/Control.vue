<template>
  <div class="controls">
    <div @click="addBlock(null)" class="control btn">Add Block</div>
    <div @click="saveConfig" class="control btn">Save Config</div>
    <div @click="clear" class="control btn">Clear</div>
  </div>
</template>

<script>
import {useActions} from "@/helpers/store";

export default {
  name: 'Control',
  setup() {
    const {addBlock, clear, saveConfig} = useActions(["addBlock", "clear", "saveConfig"])

    return {
      addBlock, clear, saveConfig
    }
  },
}
</script>

<style lang="scss" scoped>
.control {
  display: inline-block;
}

</style>
