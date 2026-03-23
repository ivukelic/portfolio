import * as THREE from "three";
import { SceneElement, floatMesh, createBackgroundPlane } from "./core";

class computer extends SceneElement {
    mesh;
    bgPlane;

    onInit({ meshes }) {
        this.mesh = meshes.computer.clone();
        this.mesh.scale.setScalar(6);
        this.mesh.rotation.y = 2;

        this.frameObject(this.mesh);

        this.bgPlane = createBackgroundPlane(8, 6, 0x336699);
        this.bgPlane.rotation.y = -0.5;

        this.scene.add(new THREE.AmbientLight(0xdddddd, 3));
        this.scene.add(this.mesh);
        this.scene.add(this.bgPlane);
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
        this.mesh.rotation.x += 0.4;
        this.mesh.rotation.y -= 1.5;
        this.mesh.scale.setScalar(2);

        this.frameObject(this.mesh);

        this.bgPlane = createBackgroundPlane(8, 6, 0x880000);
        this.bgPlane.rotation.y = 0.5;

        this.scene.add(new THREE.AmbientLight(0xffffff, 4));
        this.scene.add(this.mesh);
        this.scene.add(this.bgPlane);
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
        this.mesh.scale.setScalar(13);
        this.mesh.rotation.x += 0.5;
        this.mesh.position.z = -1;

        this.frameObject(this.mesh);

        this.bgPlane = createBackgroundPlane(8, 6, 0xddee00);
        this.bgPlane.rotation.y = -0.5;

        this.scene.add(new THREE.AmbientLight(0xffffff, 8));
        this.scene.add(this.mesh);
        this.scene.add(this.bgPlane);
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;
        floatMesh(this.mesh, time, { phase: 12, speed: 1.25 });

        this.mesh.position.z = lerp(this.mesh.position.z, -0.5, 0.025);
    }
}

class quill extends SceneElement {
    mesh;
    bgPlane;

    onInit({ meshes }) {
        this.mesh = meshes.quill.clone();
        this.mesh.rotation.x += 0.4;
        this.mesh.rotation.y += 0.4;
        this.mesh.scale.setScalar(5);

        this.frameObject(this.mesh);

        this.bgPlane = createBackgroundPlane(8, 6, 0x00aadd);
        this.bgPlane.rotation.y = 0.5;

        this.scene.add(new THREE.AmbientLight(0xffffff, 5));
        this.scene.add(this.mesh);
        this.scene.add(this.bgPlane);
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
