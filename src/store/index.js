import {createStore} from "vuex";
import * as fs from "fs";

export default createStore({
    state: {
        root: [],
        //blocks
        blocks: {},
        flowBlocks: {},
        children: {},
        loops: {},
        default: {
            id: null,
            pins: [],
            name: "",
            module: "",
            options: {}
        },
        relations: {
            "action": ["motor"],
            "trigger": ["button"],
            "observer": ["scale"],
            "loop": []
        },
        options: {},
        colors: {
            action: "red",
            trigger: "blue",
            observer: "yellow",
            loop: "pink"
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

            block.module = state.relations["trigger"][0]

            state.blocks[id] = block;
            state.children[id] = [];
        },
        addFlow(state, {flowId, id, command}) {
            console.log("added flow")
            state.flowBlocks[flowId] = {id, command};
            state.children[flowId] = [];
            console.log(state.flowBlocks)
        },
        addLoop(state, flowId) {
            state.loops[flowId] = {repeat: 0, target: flowId}
            state.children[flowId] = [];
        },
        addChild(state, {parentId, id}) {
            state.children[parentId].push(id);
        },
        resetId(state) {
            state.id = 0;
        },
        setModule(state, {id, value}) {
          state.blocks[id].module = value;
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
            state.children[parentId] = state.children[parentId].filter(el => el !== id)
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
        addPin(state, {id, pin}) {
            state.blocks[id].pins.push(pin);
        },
        removePin(state, {id, pin}) {
            state.blocks[id].pins.splice(state.blocks[id].pins.indexOf(pin), 1);
        },
        setTarget(state, {id, target}) {
            state.loops[id].target = Number(target);
        },
        setRepeat(state, {id, repeat}) {
            state.loops[id].repeat = Number(repeat);
        }
    },
    actions: {
        async addDescription({state, commit}) {
            const id = state.id;
            commit("incrementId");

            await commit("addDescription", id);
        },
        async addFlow({state, commit}, {id, parentId, command}) {
            console.log("adding")
            // each new flow block has a hidden id behind it
            // this needs to be stored;
            const flowId = state.flowId;
            await commit("incrementFlowId");

            await commit("addFlow", {flowId, id, command});

            if (parentId === null || parentId === undefined) {
                commit("addRoot", flowId);
            } else {
                commit("addChild", {parentId, id: flowId});
            }
        },
        async addLoop({state, commit}, parentId) {
            const flowId = state.flowId;
            commit("incrementFlowId");

            await commit("addLoop", flowId);
            console.log(state.children)

            if (parentId === null || parentId === undefined) {
                await commit("addRoot", flowId);
            } else {
                await commit("addChild", {parentId, id: flowId});
            }
        },
        setOption({commit}, {id, name, value}) {
            if (name === "module"){
                commit("setModule", {id, value});
            }else{
                commit("setOption", {id, name, value});
            }
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
        async setPins({commit}, payload) {
            await commit("setPins", payload);
        },
        addPin({commit}, payload) {
            commit("addPin", payload);
        },
        removePin({commit}, payload) {
            commit("removePin", payload);
        },
        async setTarget({commit}, payload) {
            await commit("setTarget", payload);
        },
        async setRepeat({commit}, payload) {
            await commit("setRepeat", payload);
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
        modules: (state) => {
            const res = []
            Object.keys(state.relations).forEach(key => res.push(...state.relations[key]))
            return res;
        },
        options: (state, getters) => (name) => {
            if (name === "module") {
                return getters.modules
            }

            return state.options[name];
        },
        option: (state, getters) => ({id, name}) => {
            if (name === "module") {
                return getters.block(id).module;
            }

            return state.blocks[id].options[name];
        },
        children: (state) => {
            return state.children;
        },
        types: (state) => {
            return Object.keys(state.relations);
        },
        blocks: (state) => {
            return state.blocks;
        },
        colors: (state) => {
            // not only return type colors but also module colors
            const colors = state.colors;
            Object.keys(state.relations).forEach(key => {
                state.relations[key].forEach(module => colors[module] = state.colors[key]);
            })

            return state.colors;
        },
        isRoot: (state) => (id) => {
            return state.root.includes(Number(id));
        },
        command: (state) => (flowId) => {
            return state.flowBlocks[flowId].command;
        },
        pins: (state) => (id) => {
            return state.blocks[id].pins;
        },
        loops: (state) => {
            return state.loops;
        },
        isLoop: (state) => (id) => {
            return id in state.loops
        },
        parent: (state) => (id) => {
            let res = Object.keys(state.children).find(key => {
                // use number as we have numbers saved
                return state.children[key].includes(Number(id))
            })
            console.log(res)


            return res

        },
        parents: (state, getters) => (id) => {

            // all passed as String apparently
            if (getters.isRoot(id)) {
                return [];
            } else {
                const parentId = getters.parent(id);
                return getters.parents(parentId) + parentId;
            }
        },
        relation: (state) => {
            return state.options.relation;
        },
        type: (state) => (module) => {
            //return Object.entries(state.relations).find(([key, value]) => value.includes(module))[0];
            return Object.keys(state.relations).find(key => state.relations[key].includes(module));
        },
        typeFlow: (state, getters) => (id) => {
            const module = getters.flowBlock(id).module;
            return getters.type(module);
        },
        typeBlock: (state, getters) => (id) => {
            const module = getters.block(id).module;
            return getters.type(module);
        }
    },
    modules: {},
});

