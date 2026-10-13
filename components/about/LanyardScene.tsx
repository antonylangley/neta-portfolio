// Adapted from React Bits / David Haz. See public/lanyard/LICENSE.react-bits.
'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, events, extend, useFrame, useThree, type ThreeElement, type ThreeEvent } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
  type RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// replace with your own imports, see the usage snippet for details
const cardGLB = '/lanyard/card.glb';
const lanyard = '/lanyard/strap.svg';

import type { GLTF } from 'three-stdlib';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  anchor?: number;
  active?: boolean;
  reduced?: boolean;
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

export default function Lanyard({
  anchor = 0,
  active = true,
  reduced = false,
  position = [0, 0, 10],
  gravity = [0, -40, 0],
  fov = 28,
  transparent = true,
  frontImage = '/about/id-front.png',
  backImage = '/lanyard/back.svg',
  imageFit = 'contain',
  lanyardImage = null,
  lanyardWidth = 0.65
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        frameloop={active ? (reduced ? "demand" : "always") : "never"}
        style={{ pointerEvents: "none" }}
        eventSource={document.body}
        events={(state) => ({ ...events(state), compute: (event, root) => {
          const bounds = root.gl.domElement.getBoundingClientRect();
          root.pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
          root.raycaster.setFromCamera(root.pointer, root.camera);
        } })}
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <StageCamera anchor={anchor} />
        <ambientLight intensity={0.8} />
        <Physics paused={!active || reduced} gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            dropIn={!reduced}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

// A wider transparent canvas retains the card's original pixel size and anchor.
function StageCamera({ anchor }: { anchor: number }) {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    const worldHeight = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(perspective.fov / 2));
    camera.position.setX((size.width / 2 - anchor) * worldHeight / size.height);
    camera.updateMatrixWorld();
    invalidate();
  }, [anchor, camera, size.width, size.height, invalidate]);
  return null;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  dropIn?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

type LanyardRigidBody = RapierRigidBody & {
  lerped?: THREE.Vector3;
};

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  dropIn = false,
  frontImage = null,
  backImage = null,
  imageFit = 'contain',
  lanyardImage = null,
  lanyardWidth = 0.65
}: BandProps) {
  const entranceOffset = dropIn ? 7 : 0;
  const [entrance] = useState(() => ({ x: 2.2 + Math.random() * 0.8, twist: (Math.random() - 0.5) * 0.5 }));
  const entranceStarted = useRef<number | null>(null);
  const entranceComplete = useRef(!dropIn);
  const size = useThree(state => state.size);
  const lineParameters = useMemo(() => ({ resolution: new THREE.Vector2(size.width, size.height) }), [size.width, size.height]);
  const band = useRef<THREE.Mesh<InstanceType<typeof MeshLineGeometry>, InstanceType<typeof MeshLineMaterial>>>(null!);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<LanyardRigidBody>(null!);
  const j2 = useRef<LanyardRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2.6,
    linearDamping: 2.6
  };

  const getLerped = (body: LanyardRigidBody): THREE.Vector3 => {
    if (!body.lerped) {
      body.lerped = new THREE.Vector3().copy(body.translation());
    }

    return body.lerped;
  };

  const { nodes, materials } = useGLTF(cardGLB) as unknown as GLTF & { nodes: Record<'card' | 'clip' | 'clamp', THREE.Mesh>; materials: { base: THREE.MeshStandardMaterial; metal: THREE.MeshStandardMaterial } };
  const texture = useTexture(lanyardImage || lanyard, (loaded) => {
    const strap = loaded as THREE.Texture;
    strap.wrapS = strap.wrapT = THREE.RepeatWrapping;
  });
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image as HTMLImageElement;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);
    ctx.fillStyle = '#f6dce0';
    ctx.fillRect(0, 0, W, H * 0.76);

    const drawFitted = (img: HTMLImageElement, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  useEffect(() => () => { if (cardMap !== materials.base.map) cardMap.dispose(); }, [cardMap, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], false, 'chordal')
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered || dragged) {
      const previousSelection = document.body.style.userSelect;
      document.body.style.userSelect = "none";
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
        document.body.style.userSelect = previousSelection;
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dropIn && !entranceComplete.current && fixed.current) {
      if (entranceStarted.current === null) entranceStarted.current = state.clock.elapsedTime;
      const progress = THREE.MathUtils.clamp((state.clock.elapsedTime - entranceStarted.current) / 0.9, 0, 1);
      const remaining = 1 - progress;
      fixed.current.setNextKinematicTranslation({ x: entrance.x * remaining ** 2, y: 4 + entranceOffset * remaining ** 3, z: 0 });
      if (progress === 1) entranceComplete.current = true;
    }

    if (dragged && typeof dragged !== 'boolean') {
      state.raycaster.setFromCamera(state.pointer, state.camera);
      state.raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), vec);
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: THREE.MathUtils.clamp(vec.x - dragged.x, state.camera.position.x - state.viewport.width / 2 + 0.8, state.camera.position.x + state.viewport.width / 2 - 0.8),
        y: THREE.MathUtils.clamp(vec.y - dragged.y, -state.viewport.height / 2 + 1.25, state.viewport.height / 2 - 1.5),
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        const lerped = getLerped(ref.current);
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())));
        lerped.lerp(ref.current.translation(), Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(getLerped(j2.current));
      curve.points[2].copy(getLerped(j1.current));
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });



  return (
    <>
      <group position={[dropIn ? entrance.x : 0, 4 + entranceOffset, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={dropIn ? 'kinematicPosition' : 'fixed'} />
        <RigidBody position={[0, -1, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -3, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -4.45, 0]}
          rotation={dropIn ? [0.12, entrance.twist, -0.35] : [0, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
            onPointerCancel={() => drag(false)}
          >
            <mesh geometry={nodes.card.geometry}>
              {/* Unlit print preserves the supplied artwork; the hardware remains lit metal. */}
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>
            <mesh geometry={nodes.clip.geometry}><meshStandardMaterial color="#b9b9b9" metalness={0.65} roughness={0.25} /></mesh>
            <mesh geometry={nodes.clamp.geometry}><meshStandardMaterial color="#b9b9b9" metalness={0.65} roughness={0.25} /></mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[lineParameters]}
          color="white"
          depthTest={false}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
