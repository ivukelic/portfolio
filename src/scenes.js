import * as THREE from "three";
import { SceneElement, floatMesh } from "./core";

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
        floatMesh(this.mesh, time, { rotation: 0.1 });

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
        floatMesh(this.mesh, time, {
            speed: 1.1,
            amplitude: 0.2,
            rotation: 0.3,
        });

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
        floatMesh(this.mesh, time, { phase: 12, speed: 1.25 });

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
        floatMesh(this.mesh, time, { phase: 6, rotation: 0.1 });

        this.mesh.position.z = lerp(this.mesh.position.z, -0.5, 0.025);
    }
}

// Defined here to easily map to HTML elements, avoids minification in production:
const Scenes = { computer, spellbook, cup, quill };
export { Scenes };
