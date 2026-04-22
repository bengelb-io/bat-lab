import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { BatPreset } from "../data/batPresets";

export default function BaseballBat({ preset }: { preset: BatPreset }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const getSize = () => ({
      width: mount.clientWidth || 400,
      height: mount.clientHeight || 400,
    });

    const { width, height } = getSize();

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const points = preset.profile.map(([r, y]) => new THREE.Vector2(r, y));
    const geometry = new THREE.LatheGeometry(points, 96);
    geometry.computeVertexNormals();

    const { wood } = preset;

    const makeWoodTexture = () => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 1024;
      const ctx = c.getContext("2d")!;

      const baseGrad = ctx.createLinearGradient(0, 0, c.width, 0);
      baseGrad.addColorStop(0, wood.edgeColor);
      baseGrad.addColorStop(0.5, wood.baseColor);
      baseGrad.addColorStop(1, wood.edgeColor);
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      for (let i = 0; i < 180; i++) {
        const x = Math.random() * c.width;
        const alpha = 0.04 + Math.random() * 0.12;
        const w = 0.5 + Math.random() * 2.5;
        ctx.strokeStyle = `rgba(${wood.grainColor}, ${alpha})`;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y <= c.height; y += 20) {
          const offset = Math.sin(y * 0.01 + i) * 3;
          ctx.lineTo(x + offset, y);
        }
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const x = Math.random() * c.width;
        const y = Math.random() * c.height;
        const r = 3 + Math.random() * 6;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${wood.knotColor}, 0.5)`);
        g.addColorStop(1, `rgba(${wood.knotColor}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const handleGrad = ctx.createLinearGradient(0, c.height, 0, c.height * 0.55);
      handleGrad.addColorStop(0, `rgba(${wood.handleTint}, 0.55)`);
      handleGrad.addColorStop(1, `rgba(${wood.handleTint}, 0)`);
      ctx.fillStyle = handleGrad;
      ctx.fillRect(0, c.height * 0.55, c.width, c.height * 0.45);

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = 8;
      return tex;
    };

    const woodTexture = makeWoodTexture();

    const makeRoughnessMap = () => {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 512;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, "#555");
      grad.addColorStop(0.4, "#6a6a6a");
      grad.addColorStop(0.55, "#c0c0c0");
      grad.addColorStop(1, "#d0d0d0");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    const roughMap = makeRoughnessMap();

    const material = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughnessMap: roughMap,
      roughness: preset.material.roughness,
      metalness: preset.material.metalness,
      envMapIntensity: preset.material.envMapIntensity,
    });

    const bat = new THREE.Mesh(geometry, material);
    bat.rotation.z = Math.PI / 6;

    const batGroup = new THREE.Group();
    batGroup.add(bat);
    batGroup.position.y = -0.15;
    batGroup.scale.setScalar(preset.scale ?? 1.0);
    scene.add(batGroup);

    const ambient = new THREE.AmbientLight(0x404050, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffe8c4, 1.6);
    key.position.set(4, 3, 5);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xff7a3d, 1.2);
    rim.position.set(-5, 1, -4);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0x6a9cff, 0.35);
    fill.position.set(-3, -2, 3);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 16;

    let raf = 0;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const { width: w, height: h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(mount);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      woodTexture.dispose();
      roughMap.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [preset.id]);

  return <div ref={mountRef} className="w-full h-full" />;
}
