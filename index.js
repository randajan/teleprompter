import sapp from "@randajan/simple-app";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';
import { sassPlugin } from 'esbuild-sass-plugin';
import { argv } from "@randajan/simple-app/argv";

const { isBuild, env } = argv;

sapp({
    isBuild,
    include:["yarn.lock", "README.md"],
    env:{
        name:env
    },
    be:{
        plugins:[
            ImportGlobPlugin.default()
        ]
    },
    fe:{
        loader:{
            ".js":"jsx",
            '.png': 'file',
            ".jpg": "file",
            ".gif": "file",
            ".eot": "file",
            ".woff": "file",
            ".ttf": "file",
            ".svg": "file"
        },
        plugins:[
            ImportGlobPlugin.default(),
            sassPlugin(),
        ]
    }
})