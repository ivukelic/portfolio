import { createRenderer, loadResources } from "./core";
import { Scenes } from "./scenes";
import { inject } from "@vercel/analytics";

import "./style.css";

window.addEventListener("load", () => {
    const renderer = createRenderer("#canvas");

    const scenes = [];

    loadResources(
        {
            meshes: {
                computer: "models/computer.glb",
                cup: "models/office-cup.glb",
                spellbook: "models/spellbook.glb",
                quill: "models/quill.glb",
            },
            fonts: {
                primary: "fonts/DynaPuff-SemiBold.json",
            },
        },
        (resources) => {
            document.querySelectorAll(".scene").forEach((htmlElement) => {
                const view = new Scenes[htmlElement.id](htmlElement);
                if (view) {
                    scenes.push(view);
                } else {
                    console.log("error");
                }
            });
            scenes.forEach((scene) => scene.onInit(resources));
        },
    );

    function tick(time) {
        renderer.domElement.style.transform = `translateY(${window.scrollY}px)`;
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        scenes.forEach((view) => {
            view.onRender(renderer, time * 0.002);
        });
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
});

// Vercel
inject();
