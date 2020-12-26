<template>
  <div class="controls">
    <div @click="saveConfig" class="control btn">Save Config</div>
    <div @click="loadConfig" class="control btn">Load Config</div>
    <div @click="clear" class="control btn">Clear</div>
  </div>
</template>

<script>
import {useActions} from "@/helpers/store";

export default {
  name: 'Control',
  setup() {
    const {addBlock, clear, saveConfig, loadConfig} = useActions(["addBlock", "clear", "saveConfig", "loadConfig"])

    return {
      addBlock, clear, saveConfig, loadConfig
    }
  },
}
</script>

<style lang="scss" scoped>
.control {
  display: inline-block;
}

</style>
