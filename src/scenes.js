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

        this.onTick(time);

        const posY = window.innerHeight - bottom;

        renderer.setViewport(left, posY, width, height);
        renderer.setScissor(left, posY, width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        renderer.render(this.scene, this.camera);
    }

    onInit({ meshes }) {
        this.mesh = meshes.computer.clone();
        this.mesh.scale.setScalar(6);
        this.mesh.rotation.y = 2;

        this.scene.add(new THREE.AmbientLight(0xdddddd, 3));
        this.scene.add(this.mesh);
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;

        this.mesh.position.z = lerp(this.mesh.position.z, -0.5, 0.025);
    }
}

class spellbookScene {
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

        this.onTick(time);

        const posY = window.innerHeight - bottom;

        renderer.setViewport(left, posY, width, height);
        renderer.setScissor(left, posY, width, height);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        renderer.render(this.scene, this.camera);
    }

    onInit({ meshes }) {
        this.mesh = meshes.spellbook.clone();
        this.mesh.scale.setScalar(6);
        this.mesh.rotation.y = 2;

        this.scene.add(new THREE.AmbientLight(0xdddddd, 3));
        this.scene.add(this.mesh);
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;

        this.mesh.position.z = lerp(this.mesh.position.z, -0.5, 0.025);
    }
}

export { computerScene, spellbookScene };
