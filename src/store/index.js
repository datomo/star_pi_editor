import { createStore } from "vuex";

export default createStore({
  state: {
    root: [],
    //blocks
    blocks: {},
    default: {
      id: null,
      parent: null,
      options: {}
    },
    options: {
      type: ["action", "trigger"],
      module: ["motor", "button"]
    },
    id: 0,
  },
  mutations: {
    incrementId(state) {
      state.id++;
    },
    addRoot(state, id) {
      state.root.push(id);
    },
    addBlock(state, id) {
      const block = JSON.parse(JSON.stringify(state.default));
      block.id = id;

      block.options = {};

      Object.entries(state.options).forEach(([key,value]) => {
        block.options[key] = value[0];
      });

      state.blocks[id] = block;
    },
    resetId(state) {
      state.id = 0;
    },
    setOption(state, {id, name, value}) {
      state.blocks[id].options[name] = value;
    },
    clearBlocks(state) {
      state.root = [];
      state.dynamic = {};
      state.static = {};
    }
  },
  actions: {
    addBlock({ state, commit }, { parent }) {
      const id = state.id;
      commit("incrementId");

      commit("addBlock", id);

      if (parent == null) {
        commit("addRoot", id);
      }
      console.log(state.blocks)
    },
    setOption({commit}, payload) {
      commit("setOption", payload)
    },
    clear({commit}) {
      commit("resetId");
      commit("clearBlocks");
    }
  },
  getters: {
    root: (state) => {
      return state.root.map((id) => state.blocks[id]);
    },
    getBlock: (state) => (id) => {
      console.log(id)
      return state.blocks[id];
    },
    options: (state) => (name) => {
      return state.options[name];
    },
    option: (state) => ({id, name}) => {
      return state.blocks[id].options[name];
    }
  },
  modules: {},
});
