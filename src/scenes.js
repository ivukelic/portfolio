import * as THREE from "three";

class computerScene {
    constructor(htmlElement) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        this.element = htmlElement;
    }

    getRect() {
        return this.element.getBoundingClientRect();
    }

    onRender(renderer, time) {
        const { top, bottom, left, width, height } = this.getRect();
        if (bottom < 0 || top > window.innerHeight) {
            return;
        }

        const posY = window.innerHeight - bottom;

        renderer.setViewport(left, posY, width, height);
        renderer.setScissor(left, posY, width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        renderer.render(this.scene, this.camera);
    }
}

export { computerScene };
