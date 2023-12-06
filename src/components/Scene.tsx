import { animated, useSpring } from "@react-spring/three";
import {
    Environment,
    OrbitControls,
    OrthographicCamera,
    Plane,
    useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Box3, Vector3 } from "three";
import Loader from "./Loader";

// Ground : y=0, Wall : z=0
function SemiWallMountedPostH2400({ position = [0, 0, 0] }) {
    const gltf = useGLTF("/model/semi_wall_mounted_post_h2400_draco.glb", true);
    const box = new Box3().setFromObject(gltf.scene);

    // Attach to the ground
    const offset = new Vector3(0, -box.min.y, 0);
    const clonedScene = gltf.scene.clone();
    clonedScene.position.set(...position);
    clonedScene.position.add(offset);
    clonedScene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    return <primitive object={clonedScene} />;
}
function ShelfW800D400({ position = [0, 1, 0] }) {
    const gltf = useGLTF("/model/shelf_w800_d400-v1.glb", true);
    const clonedScene = gltf.scene.clone();
    const box = new Box3().setFromObject(clonedScene);
    const offsetToSemiWallMountedPostOffset = 0.017;
    const offsetToWall = -box.min.z;
    // FIXME : set as -box.min.y + (offsetToGround)
    const offsetMiscAdjust = 0.3; // offset for assemble line
    const offset = new Vector3(
        0,
        offsetMiscAdjust,
        offsetToWall + offsetToSemiWallMountedPostOffset
    );

    // Attach to the wall
    clonedScene.position.set(...position);
    clonedScene.position.add(offset);
    clonedScene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    return <primitive object={clonedScene} />;
}

function DisplayShelfW400D200({ position = [0, 1, 0] }) {
    const gltf = useGLTF("/model/display_shelf_w400_d200-v1.glb", true);
    const clonedScene = gltf.scene.clone();
    const box = new Box3().setFromObject(clonedScene);
    const offsetToSemiWallMountedPostOffset = 0.017;
    const offsetToWall = -box.min.z;
    const offsetToGround = 0.012;
    const offset = new Vector3(
        0,
        offsetToGround,
        offsetToWall + offsetToSemiWallMountedPostOffset
    );

    // Attach to the wall
    clonedScene.position.set(...position);
    clonedScene.position.add(offset);
    clonedScene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    return <primitive object={clonedScene} />;
}

// TODO - Scene 밖으로 button 을 빼야하는데
export default function Scene({ model, setModel, distance, setDistance }) {
    const ref = useRef();
    // For animated
    const AnimatedSemiWallMountedPostH2400 = animated(SemiWallMountedPostH2400);
    const { leftPosition, rightPosition } = useSpring({
        leftPosition: [-distance / 2, 0, 0],
        rightPosition: [distance / 2, 0, 0],
        config: { tension: 170, friction: 26 },
    });
    const cameraCenter = [0, 1.5, 0];

    return (
        <div
            ref={ref}
            className="p-8"
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <Canvas shadows>
                <OrthographicCamera
                    makeDefault
                    position={[5, 3, 5]}
                    zoom={200}
                    onUpdate={(self) => self.lookAt(...cameraCenter)}
                />
                <color attach="background" args={["#F2F2F2"]} />
                <Environment files="/model/keyshot.hdr" />
                <Suspense fallback={<Loader />}></Suspense>
                {/* <GridComponent /> */}
                <OrbitControls target={cameraCenter} />
                <SemiWallMountedPostH2400 position={[-distance / 2, 0, 0]} />
                <SemiWallMountedPostH2400 position={[distance / 2, 0, 0]} />
                {/* For animated */}
                {/* <AnimatedSemiWallMountedPostH2400 position={leftPosition} />
                <AnimatedSemiWallMountedPostH2400 position={rightPosition} /> */}
                <Plane
                    args={[5, 5]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                    receiveShadow
                    castShadow
                >
                    <meshStandardMaterial color={"white"} />
                </Plane>
                <directionalLight
                    castShadow
                    position={[0, 6, 5]} // Adjust the position to be closer to the objects
                    intensity={2} // Increase intensity for darker shadows
                    shadow-mapSize-width={1024} // Higher resolution for better shadow quality
                    shadow-mapSize-height={1024}
                    // shadow-radius={0} // Sharper shadows
                    shadow-bias={-0.0001} // Adjust bias to avoid artefacts
                />
                {model === "DisplayShelfW400D200" && <DisplayShelfW400D200 />}
                {model === "ShelfW800D400" && <ShelfW800D400 />}
            </Canvas>
        </div>
    );
}
