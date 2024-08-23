"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PrismScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Set a gradient background
    const canvas = renderer.domElement;
    canvas.style.background =
      "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";

    // Add lighting to create a premium look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // Point light for dynamic shading
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.7); // Spotlight for focused lighting
    spotLight.position.set(-5, 10, 5);
    scene.add(spotLight);

    // Define the vertices of the triangular prism
    const vertices = new Float32Array([
      // Bottom face
      -1, 0, 1, 1, 0, 1, 0, 0, -1,
      // Top face
      -1, 2, 1, 1, 2, 1, 0, 2, -1,
    ]);

    // Define the indices (faces) of the prism
    const indices = [
      0,
      1,
      2, // Bottom face
      3,
      5,
      4, // Top face
      0,
      2,
      5,
      0,
      5,
      3, // Side faces
      1,
      4,
      5,
      1,
      5,
      2,
      0,
      3,
      4,
      0,
      4,
      1,
    ];

    // Create the geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    // Create a glass-like material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transmission: 0.9, // Add transparency for the glass effect
      thickness: 0.5, // Control the thickness of the glass
      envMapIntensity: 1, // Reflectivity
    });
    const prism = new THREE.Mesh(geometry, material);
    scene.add(prism);

    // Position the camera
    camera.position.z = 5;

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the prism slowly
      prism.rotation.x += 0.005;
      prism.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef}></div>;
}
