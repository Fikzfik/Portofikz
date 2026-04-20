"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// --- GLSL SHADER CODE (AWWWARDS STYLE VERTICAL PIXEL BLEED) ---
const vertexShader = `
uniform float u_time;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_intensity;
uniform vec3 u_colorTheme;
varying vec2 vUv;

// Simple 1D noise for vertical lines
float rand(float n){return fract(sin(n) * 43758.5453123);}
float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

void main() {
    // 1. ASPECT RATIO CORRECTION (CONTAINER MAPPING)
    vec2 p = vUv;
    float screenAspect = u_resolution.x / u_resolution.y;
    float imageAspect = 1.0; // Rasio gambar asli 
    
    vec2 uv = p;
    if (screenAspect > imageAspect) {
        uv.x = (p.x - 0.5) * screenAspect + 0.5;
    } else {
        uv.y = (p.y - 0.5) / screenAspect + 0.5;
    }
    
    // Potong batasan UV agar tidak repeat tekstur di pinggiran
    if(uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // 2. ISOLASI MASKING WAJAH (VERTICAL)
    // Area bawah (0.0-0.2) dan atas (0.7-1.0) dikunci mati agar tidak terpengaruh efek (FaceMask = 0).
    // Hanya tengah (wajah) yang tembus efek secara smooth (FaceMask = 1).
    float faceMask = smoothstep(0.2, 0.4, uv.y) * (1.0 - smoothstep(0.65, 0.85, uv.y));

    // 3. EFEK WAJAH: Distorsi & Melt (Sedikit)
    vec2 sampleUv = uv;
    
    // Distorsi asimetris menyamping dan sedikit meleleh ke bawah khusus di wajah
    float distortX = noise(uv.y * 30.0 + u_time * 1.5) * 0.02 * faceMask;
    float meltY = noise(uv.x * 20.0 + u_time) * 0.02 * faceMask;
    
    sampleUv.x += distortX;
    sampleUv.y += max(0.0, meltY);

    // Ambil warna dengan sampel UV yang terdistorsi
    vec4 color = texture2D(u_texture, sampleUv);

    // 4. EFEK WAJAH: Glitch, Noise, dan Blur (Sedikit)
    if (color.a > 0.1 && faceMask > 0.05) {
        // Blur statis & Glitch Chromatic Aberration (membelah warna merah/biru tipis untuk ilusi blur)
        float blurPower = 0.005 * faceMask;
        float cr = texture2D(u_texture, sampleUv + vec2(blurPower, 0.0)).r;
        float cb = texture2D(u_texture, sampleUv - vec2(blurPower, 0.0)).b;
        color.r = cr;
        color.b = cb;
        
        // Digital Noise / Bintik semut tipis hanya di wajah
        float faceNoise = fract(sin(dot(p, vec2(12.9898, 78.233)) + u_time) * 43758.5453) * 0.15 * faceMask;
        color.rgb -= faceNoise;
    }

    gl_FragColor = color;
}
`;

interface HeroGlitchCanvasProps {
  themeColor: "red" | "blue";
}

export default function HeroGlitchCanvas({ themeColor }: HeroGlitchCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      if (materialRef.current) {
        materialRef.current.uniforms.u_resolution.value.set(width, height);
      }
    };
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // --- TEXTURE ---
    const textureLoader = new THREE.TextureLoader();
    // Path menggunakan .png sesuai file siluet transparan kotak yang Anda sebutkan
    const portraitTexture = textureLoader.load("/image/glitch.png");
    portraitTexture.generateMipmaps = false;
    portraitTexture.minFilter = THREE.LinearFilter;
    portraitTexture.magFilter = THREE.LinearFilter;

    // --- MATERIAL ---
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_texture: { value: portraitTexture },
      u_intensity: { value: 1.0 }, // Standar distorsi
    };

    materialRef.current = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, materialRef.current);
    scene.add(mesh);

    // --- RENDER LOOP ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Spike glitch sesekali agar kesan "merobek" lebih kuat seperti referensi
      if (Math.random() > 0.95) {
        uniforms.u_intensity.value = 1.8;
      } else {
        uniforms.u_intensity.value += (0.8 - uniforms.u_intensity.value) * 0.1;
      }
      
      uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", onWindowResize);
    render();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      if (materialRef.current) materialRef.current.dispose();
      portraitTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      // Spotlight terang di belakang tubuh lalu pudar ke hitam
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      style={{ 
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 50%, #909090 0%, #050505 65%)'
      }}
    />
  );
}
