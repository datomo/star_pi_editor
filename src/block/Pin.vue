<template>
  <div class="controls">
    <div class="pin-toggle btn" @click="toggleAll">{{ pinsVisible ? "Hide Pins" : "Show Pins" }}</div>
    <div class="gpio-toggle btn" @click="gpio_map = !gpio_map">{{ gpio_map ? "GPIO" : "No GPIO" }}</div>
  </div>

  <div class="pins" v-if="pinsVisible">
    <div @click="toggle(pin)" class="pin" v-for="pin in layout" :key="pin"
         :class="{'selected': pins.includes(pin), 'blocked': !(pin in normal_gpio)}">
      {{ translate_gpio(pin) }}
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useActions} from "@/helpers/store";
import {gpio_2_normal, normal_2_gpio, normal_gpio} from "@/helpers/pin";

export default {
  props: ["id"],
  setup(props) {
    const layout = [...Array(20).keys()].map(k => (k+1)*2).concat([...Array(20).keys()].map(k => (k+1)*2-1))
    const store = useStore();
    const {removePin, addPin} = useActions(["removePin", "addPin"]);
    const pins = computed(() => store.getters.pins(props.id).map(pin => gpio_2_normal(pin)));

    const gpio_map = ref(true);
    const translate_gpio = (pin) => {
      if (gpio_map.value) {
        return normal_2_gpio(pin);
      } else {
        if (pin in normal_gpio) {
          return pin;
        } else {
          return "";
        }
      }
    };
    const pinsVisible = ref(true);


    const toggle = (pin) => {
      if (pins.value.includes(pin)) {
        removePin({id: props.id, pin})
      } else if (pin in normal_gpio) {
        //pins.value.push(pin);
        addPin({id: props.id, pin: normal_2_gpio(pin)})
      }
    }
    const toggleAll = () => {
      pinsVisible.value = !pinsVisible.value
    }

    return {
      pinsVisible, toggle, toggleAll, translate_gpio, normal_gpio, gpio_map, pins, layout
    }
  },
}
</script>

<style lang="scss">
.pin-toggle {
  display: inline-block;
}

.controls {
  display: flex;
}

.pins {
  display: grid;
  grid-template-columns: repeat(20, min-content);
  grid-template-rows: repeat(2, max-content);
  grid-gap: 0.2rem;
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
