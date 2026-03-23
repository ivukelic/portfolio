import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function createRenderer(canvasSelector) {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector(canvasSelector),
        alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setScissorTest(true);

    return renderer;
}

function loadResources(resourcesToLoad, callback) {
    const loadAsync = (loader, url) => {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, null, reject);
        });
    };

    const promises = [];
    const resources = { meshes: {} };

    const loader = new GLTFLoader();
    for (const [key, url] of Object.entries(resourcesToLoad.meshes)) {
        promises.push(
            loadAsync(loader, url).then((gltf) => {
                resources.meshes[key] = gltf.scene;
            }),
        );
    }

    // Resolve all promises and then notify that resource loading is complete:
    Promise.all(promises)
        .then(() => callback(resources))
        .catch(console.error);
}

export { createRenderer, loadResources };
