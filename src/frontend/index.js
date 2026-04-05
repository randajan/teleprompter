import React from "react";
import { createRoot } from 'react-dom/client';

import fe, { info } from "@randajan/simple-app/fe";


import { Modal } from "@randajan/jet-react/dom/modal";
import "@randajan/jet-react/dom/link/css";
import "@randajan/jet-react/dom/modal/css";
import "@randajan/jet-react/dom/block/css";
import "@randajan/jet-react/dom/caption/css";
import "@randajan/jet-react/dom/tile/css";
import "@randajan/jet-react/dom/menu/css";
import "@randajan/jet-react/dom/pane/css";
import "@randajan/jet-react/dom/form/css";

import screen from "@randajan/jet-react/base/screen";


import "./styles/*";
import { Teleprompt } from "./frames/Teleprompt/Teleprompt";


const root = document.getElementById("root");
screen.watch("", _=>root.setAttribute("data-screen", screen.getList().join(" ")), true);

createRoot(root).render(
    <Modal className="App" closeOnBlur>
        <Teleprompt/>
    </Modal>
);
