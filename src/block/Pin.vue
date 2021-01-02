<template>
  <div class="pin-toggle btn" @click="toggleAll">{{ pinsVisible ? "Hide Pins" : "Show Pins" }}</div>
  <div class="pins" v-if="pinsVisible">
    <div @click="toggle(pin)" class="pin" v-for="pin in 40" :key="pin"
         :class="{'selected': pins.includes(pin), 'blocked': blocked.includes(pin)}">
      {{ pin }}
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useActions} from "@/helpers/store";

export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    const {setPins} = useActions(["setPins"]);
    const pins = computed({
      get: () => store.getters.pins(props.id),
      set: pins => setPins({id: props.id, pins})
    });
    const blocked = [1, 2, 4, 6, 9, 14, 17, 20, 25, 27, 28, 30, 34, 39]
    const pinsVisible = ref(true)

    const toggle = (pin) => {
      if (pins.value.includes(pin)) {
        pins.value.splice(pins.value.indexOf(pin), 1);
      } else if (!blocked.includes(pin)) {
        pins.value.push(pin);
      }
    }
    const toggleAll = () => {
      pinsVisible.value = !pinsVisible.value
    }

    return {
      pins, blocked, pinsVisible, toggle, toggleAll
    }
  }
}
</script>

<style lang="scss">
.pin-toggle {
  display: inline-block;
}

.pins {
  display: grid;
  grid-template-columns: repeat(20, min-content);
  grid-template-rows: repeat(2, max-content);
  grid-gap: 0.2rem;
  grid-auto-flow: column;
  text-align: center;
}

.pin {
  margin: 0.4rem;
  padding: 0.2rem;
  height: 1.4rem;
  width: 1.4rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: black;

  &.selected {
    background-color: blue;
  }

  &.blocked {
    background-color: grey;
  }
}

</style>
