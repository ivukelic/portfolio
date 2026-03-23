import * as THREE from "three";
import { SceneElement } from "./core";

class computer extends SceneElement {
    mesh;

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

class spellbook extends SceneElement {
    mesh;

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

class cup extends SceneElement {
    mesh;

    onInit({ meshes }) {
        this.mesh = meshes.cup.clone();
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

class quill extends SceneElement {
    mesh;

    onInit({ meshes }) {
        this.mesh = meshes.quill.clone();
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

// Defined here to easily map to HTML elements, avoids minification in production:
const Scenes = { computer, spellbook, cup, quill };
export { Scenes };
