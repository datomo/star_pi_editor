import { computed } from 'vue';
import { useStore } from 'vuex';

export const useGetters = (arr) => {
    const store = useStore();
    const keypair = arr.map(g => [g, computed(() => store.getters[g])]);
    return Object.fromEntries(keypair);
} 


export const useActions = arr => {
    const store = useStore();
    const keypair = arr.map(a => [a, payload => store.dispatch(a, payload)]);
    return Object.fromEntries(keypair);
}