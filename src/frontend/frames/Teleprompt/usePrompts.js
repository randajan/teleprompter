import info from "@randajan/simple-app/info";
import FileIO from "@randajan/browser-files";

const { version } = info;

const fileStore = new FileIO({
    defaultFileName: "teleprompt",
    mimeType: "application/json",
    extension: "json",
    serialize: (data) => JSON.stringify(data, null, 2),
    deserialize: JSON.parse,
});

const countWords = (str) => (str.match(/\b[\p{L}\p{N}]+\b/gu) || []).length;

export const buildPrompts = (list, onUpdate)=>{

    if (!Array.isArray(list)) { list = []; }
    else { list = list.filter(Boolean); }

    const lastId = list.length-1;

    const add = _=>{
        list.push({text:"Lorem ipsum", bpm:30, duration:20});
        onUpdate(list);
    }

    const update = (id, cfg)=>{
        list[id] = cfg;
        onUpdate(list);
    }

    const remove = id=>{
        list.splice(id, 1);
        onUpdate(list);
    }

    const move = (id, toId)=>{
        const [p] = list.splice(id, 1);
        list.splice(toId, 0, p);
        onUpdate(list);
    }

    const actions = { update, remove, move };
    
    const bindActions = (id)=>{
        const r = {};
        for (let i in actions) {
            const action = actions[i];
            r[i] = (...a)=>action(id, ...a);
        }
        return r;
    }

    let totalDuration = 0, wordsCount = 0, wordDuration = 0;

    for (const [id, p] of list.entries()) {
        p.actions = bindActions(id);
        p.duration = Number.jet.to(p.duration);
        p.wordsCount = countWords(p.text);
        p.wordDuration = p.duration / p.wordsCount;

        wordsCount += p.wordsCount;
        wordDuration += p.wordDuration;
        totalDuration += p.duration;
    }

    wordDuration /= list.length;

    return { list, lastId, totalDuration, wordsCount, wordDuration, add, update, remove, move }
}

export const useTeleprompt = (base)=>{
    
    const stored = (base.get() || { version });
    const prompts = buildPrompts(stored.prompts, list=>base.set("prompts", list));
    const state = stored.state || {};

    state.isRunning = state.startedAt != null;
    state.currentId = Number.jet.to(state.currentId);

    const save = ()=>{
        const { prompts } = stored;
        fileStore.save({ version, prompts });
    }

    const load = async ()=>{
        const loaded = await fileStore.load();
        base.set("", loaded);
    }

    const start = ()=>{
        if (state.isRunning) { return; }
        base.set("state", { startedAt:Date.now(), currentId:0 });
    };

    const stop = ()=>{
        if (!state.isRunning) { return; }
        base.remove("state");
    };

    const prev = ()=>{
        if (!state.isRunning) { return; }
        const currentId = state.currentId-1;
        if (currentId < 0) { return; }
        base.set("state", { startedAt:Date.now(), currentId });
    };

    const next = ()=>{
        if (!state.isRunning) { return; }
        const currentId = state.currentId+1;
        if (currentId >= prompts.list.length) { return; }
        base.set("state", { startedAt:Date.now(), currentId });
    };

    const repeat = ()=>{
        base.set("state.startedAt", Date.now());
    };

    const actions = {
        save, load, start, stop, prev, next, repeat
    };

    return { state, prompts, actions };
}