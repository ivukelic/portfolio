import { createRenderer, loadResources } from "./core";
import { computerScene } from "./scenes";

import "./style.css";

window.addEventListener("load", () => {
    const renderer = createRenderer("#canvas");

    const scenes = [];

    loadResources(
        {
            meshes: {
                computer: "models/computer.glb",
            },
        },
        (resources) => {
            document.querySelectorAll(".scene").forEach((element) => {
                const view = new computerScene(element);
                if (view) {
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
