import {createStore} from "vuex";
import * as fs from "fs";

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
        colors: {
            type: {
                action: "red",
                trigger: "blue"
            }
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

            Object.entries(state.options).forEach(([key, value]) => {
                block.options[key] = value[0];
            });

            state.blocks[id] = block;
            state.children[id] = [];
            console.log(state)

            console.log(state.children[id])
        },
        addChild(state, {parent, id}) {
            console.log("adding child")
            state.children[parent].push(id);
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
        async addBlock({state, commit}, parent) {
            const id = state.id;
            commit("incrementId");

            await commit("addBlock", id);


            if (parent == null) {
                commit("addRoot", id);
            } else {
                commit("addChild", {parent, id})
            }
        },
        setOption({commit}, payload) {
            commit("setOption", payload)
        },
        clear({commit}) {
            commit("resetId");
            commit("clearBlocks");
        },
        async saveConfig({state, dispatch}) {
            const result = {}
            for (const id of state.root) {
                result[id] = await dispatch("parseBlock", id)

            }
            dispatch("saveFile", {fileName: "test.json", content: result});
        },
        async parseBlock({state, dispatch}, id) {
            const result = JSON.parse(JSON.stringify(state.blocks[id]));

            result["children"] = {};
            console.log(state.children[id])
            // no need to check if exist as it has to be creation on initation
            for (const child of state.children[id]) {
                result["children"][child] = await dispatch("parseBlock", child);
            }

            return result;
        },
        saveFile(_, {fileName, content}) {
            fs.writeFile(fileName, JSON.stringify(content), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("saving successfull")
                }
            })
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
        },
        allChildren: (state) => {
            return state.children;
        },
        types: (state) => {
            return state.options.type;
        }
    },
    modules: {},
});

