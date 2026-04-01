import * as THREE from "three";
import {
    SceneElement,
    floatMesh,
    createBackgroundPlane,
    TextGroup,
    cursor,
} from "./core";
import gsap from "gsap";

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

    onClick(event) {
        gsap.to(this.mesh.rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            y: this.mesh.rotation.y + Math.PI * 2,
        });
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;
        floatMesh(this.mesh, time, { rotation: 0.1 });

        const viewProgress = this.getViewProgress();
        if (viewProgress > 0.3 && viewProgress < 0.7) {
            this.mesh.position.z = lerp(this.mesh.position.z, -0.5, 0.025);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 1, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 1, 0.025);
        } else {
            this.mesh.position.z = lerp(this.mesh.position.z, -2, 0.05);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 0.5, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 0.5, 0.025);
        }
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

    onClick(event) {
        gsap.to(this.mesh.rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            x: this.mesh.rotation.x + Math.PI * 2,
        });
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;
        floatMesh(this.mesh, time, {
            speed: 1.1,
            amplitude: 0.2,
            rotation: 0.3,
        });

        const viewProgress = this.getViewProgress();
        if (viewProgress > 0.2 && viewProgress < 0.8) {
            this.mesh.position.z = lerp(this.mesh.position.z, 0, 0.025);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 1, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 1, 0.025);
        } else {
            this.mesh.position.z = lerp(this.mesh.position.z, -1, 0.05);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 0.5, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 0.5, 0.025);
        }
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

    onClick(event) {
        gsap.to(this.mesh.rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            x: this.mesh.rotation.x + Math.PI * 2,
            y: this.mesh.rotation.y + Math.PI * 2,
        });
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;
        floatMesh(this.mesh, time, { phase: 12, speed: 1.25 });

        const viewProgress = this.getViewProgress();
        if (viewProgress > 0.2 && viewProgress < 0.8) {
            this.mesh.position.z = lerp(this.mesh.position.z, 0, 0.025);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 1, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 1, 0.025);
        } else {
            this.mesh.position.z = lerp(this.mesh.position.z, -1, 0.05);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 0.5, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 0.5, 0.025);
        }
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

    onClick(event) {
        gsap.to(this.mesh.rotation, {
            duration: 1.5,
            ease: "power2.inOut",
            y: this.mesh.rotation.y + Math.PI * 2,
        });
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;
        floatMesh(this.mesh, time, { phase: 6, rotation: 0.1 });

        const viewProgress = this.getViewProgress();
        if (viewProgress > 0.2 && viewProgress < 0.8) {
            this.mesh.position.z = lerp(this.mesh.position.z, 0, 0.025);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 1, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 1, 0.025);
        } else {
            this.mesh.position.z = lerp(this.mesh.position.z, -1, 0.05);
            this.bgPlane.scale.y = lerp(this.bgPlane.scale.y, 0.5, 0.025);
            this.bgPlane.scale.x = lerp(this.bgPlane.scale.x, 0.5, 0.025);
        }
    }
}

class welcome extends SceneElement {
    text;

    onInit({ fonts }) {
        this.text = new TextGroup({
            text: "WELCOME",
            font: fonts.primary,
            material: new THREE.MeshToonMaterial(),
            size: 4,
            depth: 2,
        });
        this.text.group.scale.y = 1.5;

        this.camera.position.set(0, 4, this.text.group.position.z + 20);
        this.frameObject(this.text.group);

        const light = new THREE.DirectionalLight(0xff0000, 5);
        light.position.set(0, 4, this.camera.position.z - 10);

        this.scene.add(light);
        this.scene.add(this.text.group);
        this.scene.fog = new THREE.Fog(0x0000ff, 0.5, 40);
    }

    onTick(time) {
        const lerp = THREE.MathUtils.lerp;

        const floatOptions = { phase: 0, amplitude: 0.3 };
        for (const letter of this.text) {
            floatMesh(letter, time, floatOptions);
            floatOptions.phase += 1;

            const ssPos = this.getScreenspaceOf(letter);
            const ssDistance = cursor.getDistance(ssPos.x + 20, ssPos.y + 40);
            if (ssDistance.x < 80 && ssDistance.y < 80) {
                letter.position.z = lerp(letter.position.z, 1.5, 0.05);
            } else {
                letter.position.z = lerp(letter.position.z, 0, 0.08);
            }
        }

        if (this.getRect().width < 800) {
            this.text.setSquish(0.2);
        } else {
            this.text.setSquish(0);
        }
    }
}

// Defined here to easily map to HTML elements, avoids minification in production:
const Scenes = { computer, spellbook, cup, quill, welcome };
export { Scenes };
