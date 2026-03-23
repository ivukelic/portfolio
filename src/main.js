import { createRenderer, loadResources } from "./core";
import { Scenes } from "./scenes";

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
        },
        (resources) => {
            document.querySelectorAll(".scene").forEach((htmlElement) => {
                console.log(htmlElement);
                const view = new Scenes[htmlElement.id](htmlElement);
                console.log(view);
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
