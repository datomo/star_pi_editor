<template>
  <div class="option">
    <div class="key">{{ name }}:</div>
    <div
      class="values"
      :class="{ selected: option == value }"
      v-for="value in options"
      :key="value"
      @click="setOption({ id, name, value })"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useActions } from "@/helpers/store";

export default {
  props: ["name", "id"],
  setup(props) {
    const options = useStore().getters.options(props.name);

    const { setOption } = useActions(["setOption"]);

    return { options, setOption };
  },
  computed: {
    option() {
      return this.$store.getters.option({ id: this.id, name: this.name });
    },
  },
};
</script>

<style lang="scss">
.option {
  display: flex;
  padding: 0.2rem;

  * {
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