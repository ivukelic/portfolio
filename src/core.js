import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function createRenderer(canvasSelector) {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector(canvasSelector),
        alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // cutting out a piece of canvas to display
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
    const resources = { meshes: {}, fonts: {} };

    if (resourcesToLoad.meshes) {
        const loader = new GLTFLoader();
        for (const [key, url] of Object.entries(resourcesToLoad.meshes)) {
            promises.push(
                loadAsync(loader, url).then((gltf) => {
                    resources.meshes[key] = gltf.scene;
                }),
            );
        }
    }

    if (resourcesToLoad.fonts) {
        const loader = new FontLoader();
        for (const [key, url] of Object.entries(resourcesToLoad.fonts)) {
            promises.push(
                loadAsync(loader, url).then((font) => {
                    resources.fonts[key] = font;
                }),
            );
        }
    }
    // Resolve all promises and then notify that resource loading is complete:
    Promise.all(promises)
        .then(() => callback(resources))
        .catch(console.error);
}

function floatMesh(mesh, time, options = {}) {
    const {
        amplitude = 0.15,
        rotation = 0.08,
        speed = 1.0,
        phase = 0,
    } = options;

    if (mesh.userData._floatBaseY === undefined) {
        mesh.userData._floatBaseY = mesh.position.y;
        mesh.userData._floatBaseRotZ = mesh.rotation.z;
    }

    const t = time * speed + phase;
    mesh.position.y = mesh.userData._floatBaseY + Math.sin(t) * amplitude;
    mesh.rotation.z =
        mesh.userData._floatBaseRotZ + Math.sin(t * 0.8) * rotation;
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

    // centering the 3d object within a scene
    frameObject(object) {
        const box = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        box.getCenter(center);

        object.position.sub(center);
        this.camera.lookAt(0, 0, 0);
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

export { createRenderer, loadResources, floatMesh, SceneElement };
