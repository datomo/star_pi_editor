import { useStore } from 'vuex';
import { useActions } from 'vuex-composition-helpers';


export function useRoot() {
    return useStore().getters.root;
}

export function addBlock(store, parent) {

    store.commit("addBlock", {parent});
}