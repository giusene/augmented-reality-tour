import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';

document.addEventListener("DOMContentLoaded", async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./assets/marker-target.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  // Anchor = oggetto che appare quando il marker è rilevato
  const anchor = mindarThree.addAnchor(0);

  // Modello semplice (cubo) — così non servono file .glb
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(geometry, material);
  anchor.group.add(cube);

  // Luce
  scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1));

  // Avvio AR
  await mindarThree.start();
  renderer.setAnimationLoop(() => renderer.render(scene, camera));
});
