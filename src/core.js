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

class SceneElement {
    constructor(htmlElement) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        this.element = htmlElement;
    }

    // get position + size on website
    getRect() {
        return this.element.getBoundingClientRect();
    }

    onRender(renderer, time) {
        const { top, bottom, left, width, height } = this.getRect();
        if (bottom < 0 || top > window.innerHeight) {
            return;
        }

        this.onTick(time);
        const posY = window.innerHeight - bottom;

        renderer.setViewport(left, posY, width, height);
        renderer.setScissor(left, posY, width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        renderer.render(this.scene, this.camera);
    }

    // Functions for subclasses to implement:
    onInit(resources) {}
    onTick(time) {}
}

export { createRenderer, loadResources, SceneElement };
