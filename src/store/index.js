import {createStore} from "vuex";
import * as fs from "fs";

export default createStore({
    state: {
        root: [],
        //blocks
        blocks: {},
        flowBlocks: {},
        children: {},
        default: {
            id: null,
            name: "",
            options: {}
        },
        options: {
            type: ["action", "trigger"],
            module: ["motor", "button"]
        },
        colors: {
            action: "red",
            trigger: "blue"
        },
        id: 0,
        flowId: 0,
        fileName: "config.json"
    },
    mutations: {
        incrementId(state) {
            state.id++;
        },
        incrementFlowId(state) {
            state.flowId++;
        },
        addRoot(state, id) {
            state.root.push(id);
        },
        addBlock(state, id) {
            const block = JSON.parse(JSON.stringify(state.default));
            block.id = id;
            block.name = "block" + id;
            block.options = {};

            Object.entries(state.options).forEach(([key, value]) => {
                block.options[key] = value[0];
            });

            state.blocks[id] = block;
            state.children[id] = [];
            console.log(state)

            console.log(state.children[id])
        },
        addFlow(state, {flowId, id}){
          state.flowBlocks[flowId] = id;
          state.children[flowId] = [];
        },
        addChild(state, {parentId, id}) {
            state.children[parentId].push(id);
        },
        resetId(state) {
            state.id = 0;
        },
        setOption(state, {id, name, value}) {
            state.blocks[id].options[name] = value;
        },
        setName(state, {id, name}) {
            state.blocks[id].name = name;
        },
        clearBlocks(state) {
            state.root = [];
            state.blocks = {};
        }
    },
    actions: {
        async addType({state, commit}) {
            const id = state.id;
            commit("incrementId");

            await commit("addBlock", id);
        },
        async addFlow({state, commit}, {id, parentId}) {
            // each new flow block has a hidden id behind it
            // this needs to be stored;
            const flowId = state.flowId;
            commit("incrementFlowId");

            console.log("addedflow: " + flowId)

            await commit("addFlow", {flowId, id});
            console.log(state.children)

            if (parentId === null || parentId === undefined) {
                commit("addRoot", flowId);
            }else {
                commit("addChild", {parentId, id: flowId});
            }
        },
        setOption({commit}, payload) {
            commit("setOption", payload)
        },
        setName({commit}, payload) {
            commit("setName", payload)
        },
        clear({commit}) {
            commit("resetId");
            commit("clearBlocks");
        },
        async saveConfig({dispatch, state}) {

            dispatch("saveFile", {fileName: state.fileName, content: state});
        },
        saveFile(_, {fileName, content}) {
            console.log(content)
            fs.writeFile(fileName, JSON.stringify(content), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("saving successfull")
                }
            })
        },
        async loadFile(_, {fileName}) {
            return JSON.parse(fs.readFileSync(fileName).toString());
        },
        async loadConfig({state, dispatch}) {
            dispatch("loadFile", {fileName: state.fileName}).then((result) => {
                Object.keys(result).forEach(k => state[k] = result[k])
                //state.id = Math.max(...Object.keys(state.blocks).map(Number)) + 1;
            })

        }
    },
    getters: {
        root: (state) => {
            return state.root;
        },
        block: (state) => (id) => {
            return state.blocks[id];
        },
        flowBlock: (state) => (id) => {
            return state.blocks[state.flowBlocks[id]];
        },
        getChildren: (state) => (id) => {
            return state.children[id].map((id) => state.blocks[id]);
        },
        options: (state) => (name) => {
            return state.options[name];
        },
        option: (state) => ({id, name}) => {
            return state.blocks[id].options[name];
        },
        children: (state) => {
            return state.children;
        },
        types: (state) => {
            return state.options.type;
        },
        blocks: (state) => {
            return state.blocks;
        },
        colors: (state) => {
            return state.colors;
        }
    },
    modules: {},
});

