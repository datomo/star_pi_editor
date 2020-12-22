<template>
  <div class="option">
    <div class="key">{{ name }}:</div>
    <div class="values" :class="{'selected': option == value}" v-for="value in options" :key="value">{{ value }}</div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: ["name", "id"],
  setup(props) {
    const options = useStore().getters.options(props.name);

    const option = useStore().getters.option({id: props.id, name: props.name});
    console.log(option)
    return { options, option };
  },
};
</script>

<style lang="scss">
.option {
  display: flex;
  padding: 0.2rem;

  * {
    padding: 0.4rem;
    margin: 0 0.2rem;
  }
}

.selected {
  background-color: black;
}

.value {
  background: black;
  border-radius: 8px;
}
</style>