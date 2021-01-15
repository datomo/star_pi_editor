<template>
  <div class="link" :style="{ backgroundColor : 'pink'}">
    <div class="option-group">
      <h2>Target: </h2>
      <select name="cars" id="cars" v-model="target">
        <option v-for="parent in parents" :value="parent" :key="parent">{{ parent }}</option>
      </select>
    </div>
    <div class="option-group">
      <h2>Repeat: </h2>
      <input width="48" class="input" v-model="repeat" placeholder="edit me">
    </div>
  </div>
</template>

<script>
import {useGetters} from "@/helpers/store";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  props: ["id"],
  name: "Link",
  setup(props) {
    const store = useStore();
    const {loops} = useGetters(["loops"])
    const parents = computed(() => store.getters.parents(props.id))

    const repeat = computed({
      get: () => {
        // we have to change the infinite loop 0 to -1
        let rep = loops.value[props.id].repeat
        if( rep === -1){
          rep = 0;
        }
        return rep;
      },
      set: repeat => {
        // we have to change the infinite loop 0 to -1
        let rep = repeat;
        if(rep === 0){
          rep = -1
        }
        store.dispatch("setRepeat", {id: props.id, repeat: rep});
      }
    })

    const target = computed({
      get: () => loops.value[props.id].target,
      set: target => {
        store.dispatch("setTarget", {id: props.id, target});
      }
    })

    return {
      loops, parents, repeat, target
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  display: inline-block;
}

.option-group {
  display: flex;
}

.input {
  width: 40px;
}
</style>
