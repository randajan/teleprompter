import be, { app, http, io, info } from "@randajan/simple-app/be/koa";
import env from "@randajan/simple-app/env";
import jet from "@randajan/jet-core";

import serve from "koa-static";
import send from 'koa-send';



app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) { await send(ctx, info.dir.fe+"/index.html"); }
});

app.use(serve(info.dir.fe));

be.start(env.port);