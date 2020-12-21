import { useStore } from 'vuex';
import { useActions } from 'vuex-composition-helpers';


export function useRoot() {
    return useStore().getters.root;
}

export function addBlock(store, parent) {

    console.log("hi")
    store.commit("addBlock", {parent});
}