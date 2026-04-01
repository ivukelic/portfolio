import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

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

function createBackgroundPlane(width, height, color, y = 0, z = -5) {
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
            color,
        }),
    );

    plane.position.set(0, y, z);
    return plane;
}

class SceneElement {
    constructor(htmlElement) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        this.element = htmlElement;
        this.element.addEventListener("click", (event) => {
            this.onClick(event);
        });
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

    // for hover effect on the banner letters
    getScreenspaceOf(object) {
        const worldPosition = new THREE.Vector3();
        object.getWorldPosition(worldPosition);
        worldPosition.project(this.camera);

        const { width, height } = this.getRect();
        return {
            x: (worldPosition.x * 0.5 + 0.5) * width,
            y: (-worldPosition.y * 0.5, 0.5) * height,
        };
    }

    // for the scrolling effect
    getViewProgress() {
        const { top, height } = this.getRect();
        const viewport = window.innerHeight;

        let progress = (viewport - top) / (viewport + height);

        return THREE.MathUtils.clamp(progress, 0, 1);
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
    onClick(event) {}
}

class TextGroup {
    constructor({
        text,
        size,
        font,
        spaceWidth = size,
        depth = size / 4,
        material,
    }) {
        this.group = new THREE.Group();
        this.letters = [];
        this.baseOffsets = [];
        this.totalWidth = 0;
        this.squish = 0;

        let offsetX = 0;

        for (const char of text) {
            if (char !== " ") {
                const charGeometry = new TextGeometry(char, {
                    font: font,
                    size: size,
                    depth: depth,
                    curveSegments: 4,
                });

                charGeometry.computeBoundingBox();

                const charWidth =
                    charGeometry.boundingBox.max.x -
                    charGeometry.boundingBox.min.x;

                const charMesh = new THREE.Mesh(charGeometry, material);

                this.baseOffsets.push(offsetX);
                charMesh.position.x = offsetX;

                offsetX += charWidth;

                this.group.add(charMesh);
                this.letters.push(charMesh);
            } else {
                offsetX += spaceWidth;
            }
        }

        this.totalWidth = offsetX;

        for (const letter of this.letters) {
            letter.position.x -= offsetX / 2;
        }
    }

    setSquish(amount) {
        if (this.squish == amount) return;

        const xScale = 1 - amount;
        const yScale = 1 + amount;
        this.squish = amount;

        const scaledWidth = this.totalWidth * xScale;
        let index = 0;
        for (const letter of this.letters) {
            letter.scale.x = xScale;
            letter.scale.y = yScale;
            letter.position.x =
                this.baseOffsets[index] * xScale - scaledWidth / 2;
            ++index;
        }
    }

    [Symbol.iterator]() {
        return this.letters[Symbol.iterator]();
    }
}

const cursor = {
    x: 0,
    y: 0,

    initialize() {
        window.addEventListener("mousemove", (event) => {
            cursor.x = event.clientX;
            cursor.y = event.clientY;
        });
    },

    getDistance(px, py) {
        return { x: Math.abs(px - cursor.x), y: Math.abs(py - cursor.y) };
    },
};

export {
    createRenderer,
    loadResources,
    floatMesh,
    createBackgroundPlane,
    SceneElement,
    TextGroup,
    cursor,
};
