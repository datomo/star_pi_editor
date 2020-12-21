<template>
  <div class="option">
    <div class="key">{{ key }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
//import { useGetters } from "@/helpers/store";

export default {
  setup(props) {
    const key = ref(props.key);
    const value = ref(props.value);

    return {
      key, value
    };
  },
};
</script>

<style lang="scss">
.option {
  display: flex;
}
</style>