import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/loaders/GLTFLoader.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Inizializzazione MindAR
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./assets/marker-target.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  // Luce per illuminare il modello
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 1);
  scene.add(hemiLight);

  // Anchor = punto in cui appare il modello quando il marker è riconosciuto
  const anchor = mindarThree.addAnchor(0);

  // Caricamento del modello GLB
  const loader = new GLTFLoader();

  loader.load(
    "./assets/model.glb",
    (gltf) => {
      const model = gltf.scene;

      // Scalalo a piacimento
      model.scale.set(0.5, 0.5, 0.5);

      // Se necessario, alza/abbassa il modello
      model.position.set(0, 0, 0);

      anchor.group.add(model);
    },
    undefined,
    (error) => {
      console.error("Errore nel caricamento del modello GLB:", error);
    }
  );

  // Avvio AR
  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
});
