import { createRenderer, loadResources } from "./core";
import { computerScene, spellbookScene } from "./scenes";

import "./style.css";

window.addEventListener("load", () => {
    const renderer = createRenderer("#canvas");

    const scenes = [];
    const sceneClasses = { computer: computerScene, spellbook: spellbookScene };

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
            document.querySelectorAll(".scene").forEach((element) => {
                const sceneClass = sceneClasses[element.id];
                if (sceneClass) {
                    const view = new sceneClass(element);
                    scenes.push(view);
                } else {
                    console.log("error");
                }
            });
            console.log(scenes);
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
