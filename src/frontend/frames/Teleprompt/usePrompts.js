

export const buildPrompts = (list, onUpdate)=>{

    if (!Array.isArray(list)) { list = []; }
    else { list = list.filter(Boolean); }

    const lastId = list.length-1;

    const add = _=>{
        list.push({text:"Lorem ipsum", bpm:50, duration:20});
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
        Array.jet.swap(list, id, toId);
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

    return { list, lastId, add, update, remove, move, bindActions }
}

export const useTeleprompt = (base)=>{
    
    const stored = (base.get() || {});
    const prompts = buildPrompts(stored.prompts, list=>base.set("prompts", list));
    const state = stored.state || {};

    state.isRunning = state.startedAt != null;
    state.currentId = Number.jet.to(state.currentId);

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
        start, stop, prev, next, repeat
    };

    return { state, prompts, actions };
}