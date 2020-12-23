import { createStore } from "vuex";

export default createStore({
  state: {
    root: [],
    //blocks
    blocks: {},
    children: {},
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
      state.children[id] = [];
      console.log(state)

      console.log(state.children[id])
    },
    addChild(state, {parent, id}) {
      console.log(state.children[parent])
      state.children[parent] += id;
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
    async addBlock({ state, commit }, parent) {
      const id = state.id;
      console.log(parent)
      commit("incrementId");

      await commit("addBlock", id);

      console.log(state.children[parent])

      if (parent == null) {
        commit("addRoot", id);
      }else {
        commit("addChild", {parent, id})
      }
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
      return state.blocks[id];
    },
    getChildren: (state) => (id) => {
      return state.children[id].map((id) => state.blocks[id]);
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
