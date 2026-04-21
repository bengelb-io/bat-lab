import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function BaseballBat() {
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

    // Lathe profile for the bat — points (radius, y) from knob bottom to barrel tip.
    const profile: [number, number][] = [
      [0.00, -1.85],
      [0.08, -1.84],
      [0.16, -1.82],
      [0.21, -1.78],
      [0.22, -1.74],
      [0.20, -1.70],
      [0.15, -1.66],
      [0.12, -1.60],
      [0.105, -1.50],
      [0.10, -1.30],
      [0.10, -0.90],
      [0.10, -0.50],
      [0.105, -0.20],
      [0.115, 0.05],
      [0.14, 0.30],
      [0.18, 0.55],
      [0.22, 0.80],
      [0.26, 1.05],
      [0.295, 1.25],
      [0.315, 1.45],
      [0.32, 1.60],
      [0.318, 1.72],
      [0.30, 1.80],
      [0.22, 1.84],
      [0.12, 1.855],
      [0.00, 1.86],
    ];
    const points = profile.map(([r, y]) => new THREE.Vector2(r, y));

    const geometry = new THREE.LatheGeometry(points, 96);
    geometry.computeVertexNormals();

    // --- Procedural wood-grain texture ---
    const makeWoodTexture = () => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 1024;
      const ctx = c.getContext("2d")!;

      const baseGrad = ctx.createLinearGradient(0, 0, c.width, 0);
      baseGrad.addColorStop(0, "#a8733f");
      baseGrad.addColorStop(0.5, "#c4914f");
      baseGrad.addColorStop(1, "#a8733f");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      for (let i = 0; i < 180; i++) {
        const x = Math.random() * c.width;
        const alpha = 0.04 + Math.random() * 0.12;
        const w = 0.5 + Math.random() * 2.5;
        ctx.strokeStyle = `rgba(60, 35, 15, ${alpha})`;
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
        g.addColorStop(0, "rgba(50, 25, 10, 0.5)");
        g.addColorStop(1, "rgba(50, 25, 10, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const handleGrad = ctx.createLinearGradient(0, c.height, 0, c.height * 0.55);
      handleGrad.addColorStop(0, "rgba(25, 15, 8, 0.55)");
      handleGrad.addColorStop(1, "rgba(25, 15, 8, 0)");
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
      roughness: 1.0,
      metalness: 0.0,
      envMapIntensity: 0.6,
    });

    const bat = new THREE.Mesh(geometry, material);
    bat.rotation.z = Math.PI / 6;

    const batGroup = new THREE.Group();
    batGroup.add(bat);
    batGroup.position.y = -0.15;
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
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
