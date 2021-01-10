import {createStore} from "vuex";
import * as fs from "fs";
import {normal_2_gpio} from "@/helpers/pin";

export default createStore({
    state: {
        root: [],
        //blocks
        blocks: {},
        flowBlocks: {},
        children: {},
        default: {
            id: null,
            pins: [],
            gpio_pins: [],
            name: "",
            options: {}
        },
        options: {
            type: ["action", "trigger", "observer"],
            module: ["motor", "button", "scale"]
        },
        colors: {
            action: "red",
            trigger: "blue",
            observer: "yellow"
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
        addDescription(state, id) {
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
        addFlow(state, {flowId, id, command}) {
            state.flowBlocks[flowId] = {id, command};
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
        },
        removeDescription(state, id) {
            delete state.blocks[id];
        },
        removeRoot(state, id) {
            console.log("remove " + id)
            state.root = state.root.filter(el => el !== id)
        },
        removeParent(state, id) {
            delete state.children[id]
        },
        removeChild(state, {id, parentId}) {
            state.children[parentId] = state.children[parentId].filter(el => el != id)
        },
        removeFlow(state, id) {
            delete state.flowBlocks[id];
        },
        setCommand(state, {id, command}) {
            state.flowBlocks[id].command = command;
        },
        setPins(state, {id, pins}) {
            state.blocks[id].pins = pins;
        },
    },
    actions: {
        async addDescription({state, commit}) {
            const id = state.id;
            commit("incrementId");

            await commit("addDescription", id);
        },
        async addFlow({state, commit}, {id, parentId, command}) {
            // each new flow block has a hidden id behind it
            // this needs to be stored;
            const flowId = state.flowId;
            commit("incrementFlowId");

            await commit("addFlow", {flowId, id, command});
            console.log(state.children)

            if (parentId === null || parentId === undefined) {
                commit("addRoot", flowId);
            } else {
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
                    console.log("saving successful")
                }
            })
        },
        async loadFile(_, {fileName}) {
            return JSON.parse(fs.readFileSync(fileName).toString());
        },
        async loadConfig({state, dispatch}) {
            dispatch("loadFile", {fileName: state.fileName}).then((result) => {
                Object.keys(result).forEach(k => state[k] = result[k])
            })

        },
        removeDescription({state, dispatch, commit}, id) {
            Object.keys(state.flowBlocks).forEach((_, flowId) => {
                if (state.flowBlocks[flowId].id === id) {
                    console.log("removing flow")
                    dispatch("removeFlowBlock", Number(flowId));
                }
            })
            commit("removeDescription", id);
        },
        async removeFlowBlock({state, dispatch, commit}, id) {
            if (state.root.includes(id)) {
                commit("removeRoot", id);
            }
            if (id in state.children) {
                console.log(state.children[id]);
                for (const childId of state.children[id]) {
                    console.log(childId);
                    await dispatch("removeFlowBlock", childId);
                }
                commit("removeParent", id);
            }

            Object.keys(state.children).forEach(parentId => {
                if (state.children[parentId].includes(id)) {
                    commit("removeChild", {id, parentId});
                }
            })

            commit("removeFlow", id);
            console.log(state);
        },
        setCommand({commit}, payload) {
            commit("setCommand", payload);
        },
        async setPins({commit}, {id, pins}) {
            let trans = await pins.map(pin => normal_2_gpio(pin))
            commit("setGpio", {id, pins: trans})
            await commit("setPins", {id, pins});
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
            return state.blocks[state.flowBlocks[id].id];
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
        },
        isRoot: (state) => (id) => {
            return state.root.includes(id);
        },
        command: (state) => (flowId) => {
            return state.flowBlocks[flowId].command;
        },
        pins: (state) => (id) => {
            return state.blocks[id].pins;
        }
    },
    modules: {},
});

