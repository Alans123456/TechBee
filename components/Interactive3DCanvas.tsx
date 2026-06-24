'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCw, 
  RefreshCw, 
  Gauge, 
  Activity
} from 'lucide-react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  label: string;
  color: string;
  courseCode: string;
  desc: string;
}

type ColorTheme = 'azure' | 'amber' | 'emerald' | 'crimson';

// Tech courses keywords defined statically outside component to optimize rendering cycles and dependencies
const techNodesList = [
  { label: "AWS Cloud", code: "DS-DEV-AWS", desc: "SysOps, Arching & AWS Deployments" },
  { label: "Ethical Hack", code: "DS-SEC-CEH", desc: "CEH v12 ANSI Penetration drills" },
  { label: "MERN Stack", code: "DS-DEV-MERN", desc: "MongoDB, Express, React, Node Labs" },
  { label: "Cisco net", code: "DS-NET-CCNA", desc: "CCNA 200-301 physical hardware sandboxes" },
  { label: "Python AI", code: "DS-AI-PY", desc: "Data structures, machine learning and scripting" },
  { label: "Flutter App", code: "DS-DEV-FLUTTER", desc: "Cross-platform mobile apps for iOS & Android" },
  { label: "Linux Admin", code: "DS-SYS-LINUX", desc: "Enterprise RedHat Linux administrative sandboxes" },
  { label: "IoT Stem", code: "ROBO-IOT", desc: "Arduino Microcontrollers and hardware sensors" },
  { label: "UI / UX", code: "DS-DSN-UIUX", desc: "Figma wireframing, layout systems & corporate design" },
  { label: "Cyber Defense", code: "CYBER-SEC", desc: "Infrastructure protection, SIEM & SOC audits" },
  { label: "Docker Hub", code: "DS-OPS-DOCKER", desc: "Microservices containerization & Kubernetes cluster" },
  { label: "British Diploma", code: "NCC-DIP-L4", desc: "UK-affiliated University computing Foundation Path" }
];

export default function Interactive3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Simulation & Customization Parameters
  const [theme, setTheme] = useState<ColorTheme>('azure');
  const [speed, setSpeed] = useState<number>(1); // Speed multiplier: 0.5 to 2.5
  const [isImploded, setIsImploded] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeNode, setActiveNode] = useState<Node3D | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node3D | null>(null);

  // Math State
  const rotationX = useRef<number>(0.005);
  const rotationY = useRef<number>(0.008);
  const targetRotationX = useRef<number>(0.005);
  const targetRotationY = useRef<number>(0.008);
  const currentAngleX = useRef<number>(0);
  const currentAngleY = useRef<number>(0);

  // Coordinate projection params
  const radius = 125; 
  const cameraDistance = 340;

  // Interactivity references
  const isDragging = useRef<boolean>(false);
  const lastMouseX = useRef<number>(0);
  const lastMouseY = useRef<number>(0);
  const nodesRef = useRef<Node3D[]>([]);
  const physicalWidth = useRef<number>(400);
  const physicalHeight = useRef<number>(400);
  
  // Temporary physics state (for explode/implode animations)
  const physicsForce = useRef<number>(1.0); // scale multiplier

  // Initialize nodes structurally on an interactive spherical Fibonacci grid once
  useEffect(() => {
    const initialized: Node3D[] = [];
    const count = techNodesList.length;

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere surface
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      // Spherical coordinates converted to 3D Cartesian space
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      initialized.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        label: techNodesList[i].label,
        courseCode: techNodesList[i].code,
        desc: techNodesList[i].desc,
        color: '' 
      });
    }

    nodesRef.current = initialized;
  }, [radius]);

  // Theme color definitions mapped to canvas gradients
  const getThemeColors = useCallback(() => {
    switch (theme) {
      case 'amber':
        return {
          core: '#f59e0b',
          accent: '#d97706',
          bgGlow: 'rgba(245, 158, 11, 0.08)',
          lineColor: 'rgba(245, 158, 11, 0.25)'
        };
      case 'emerald':
        return {
          core: '#10b981',
          accent: '#059669',
          bgGlow: 'rgba(16, 185, 129, 0.08)',
          lineColor: 'rgba(16, 185, 129, 0.25)'
        };
      case 'crimson':
        return {
          core: '#ef4444',
          accent: '#dc2626',
          bgGlow: 'rgba(239, 68, 68, 0.08)',
          lineColor: 'rgba(239, 68, 68, 0.25)'
        };
      case 'azure':
      default:
        return {
          core: '#2563eb',
          accent: '#1d4ed8',
          bgGlow: 'rgba(37, 99, 235, 0.08)',
          lineColor: 'rgba(37, 99, 235, 0.25)'
        };
    }
  }, [theme]);

  // ResizeObserver handles physical bounds accurately
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        const width = entry.contentRect.width || 400;
        const height = entry.contentRect.height || 400;

        physicalWidth.current = width;
        physicalHeight.current = height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Frame Update Render Loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const w = physicalWidth.current;
      const h = physicalHeight.current;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      const colors = getThemeColors();

      // Outer bounding structure ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(220, 225, 235, 0.25)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!isDragging.current) {
        rotationX.current += (targetRotationX.current - rotationX.current) * 0.05;
        rotationY.current += (targetRotationY.current - rotationY.current) * 0.05;

        const baseVal = isRotating ? 0.003 * speed : 0;
        currentAngleX.current += rotationX.current * baseVal * 100;
        currentAngleY.current += rotationY.current * baseVal * 100;
      }

      const cosX = Math.cos(currentAngleX.current);
      const sinX = Math.sin(currentAngleX.current);
      const cosY = Math.cos(currentAngleY.current);
      const sinY = Math.sin(currentAngleY.current);

      const targetForce = isImploded ? 0.25 : 1.0;
      physicsForce.current += (targetForce - physicsForce.current) * 0.12;

      interface ProjectedNode {
        node: Node3D;
        x2d: number;
        y2d: number;
        z: number;
        size: number;
        opacity: number;
      }

      const projected: ProjectedNode[] = [];

      nodesRef.current.forEach((n) => {
        const localX = n.baseX * physicsForce.current;
        const localY = n.baseY * physicsForce.current;
        const localZ = n.baseZ * physicsForce.current;

        // Cartesian rotations
        let x1 = localX * cosY - localZ * sinY;
        let z1 = localX * sinY + localZ * cosY;

        let y2 = localY * cosX - z1 * sinX;
        let z2 = localY * sinX + z1 * cosX;

        const perspective = cameraDistance / (cameraDistance + z2);
        const x2d = centerX + x1 * perspective;
        const y2d = centerY + y2 * perspective;

        const opacity = Math.max(0.15, Math.min(1.0, (cameraDistance - z2) / (cameraDistance + radius)));
        const size = Math.max(1.5, 4 * perspective);

        projected.push({
          node: n,
          x2d,
          y2d,
          z: z2,
          size,
          opacity
        });
      });

      // Depth sort
      projected.sort((a, b) => b.z - a.z);

      // Draw connection vectors
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3d < radius * 1.5) {
            const avgOpacity = (p1.opacity + p2.opacity) / 2 * 0.3;
            ctx.strokeStyle = colors.lineColor.replace('0.25', avgOpacity.toFixed(2));
            ctx.beginPath();
            ctx.moveTo(p1.x2d, p1.y2d);
            ctx.lineTo(p2.x2d, p2.y2d);
            ctx.stroke();
          }
        }
      }

      // Draw capsules and text
      projected.forEach((p) => {
        const isHovered = hoveredNode && hoveredNode.courseCode === p.node.courseCode;
        const isActive = activeNode && activeNode.courseCode === p.node.courseCode;

        ctx.beginPath();
        ctx.arc(p.x2d, p.y2d, p.size * (isHovered || isActive ? 1.8 : 1), 0, Math.PI * 2);
        
        ctx.save();
        if (isHovered || isActive) {
          ctx.fillStyle = colors.core;
          ctx.shadowColor = colors.accent;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = p.z > 0 ? '#cbd5e1' : colors.accent;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.restore();

        // Capsule rendering for foreground items
        ctx.font = `bold ${p.z > 0 ? '8.5px' : '10px'} sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const labelWidth = ctx.measureText(p.node.label).width + 6;
        const labelHeight = 15;
        
        ctx.save();
        ctx.translate(p.x2d, p.y2d - 12);
        
        if (p.z < 30) {
          ctx.beginPath();
          ctx.roundRect(-labelWidth / 2, -labelHeight / 2, labelWidth, labelHeight, 4);
          
          if (isHovered || isActive) {
            ctx.fillStyle = colors.core;
            ctx.fill();
            ctx.fillStyle = '#ffffff';
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.strokeStyle = 'rgba(220, 225, 235, 0.9)';
            ctx.lineWidth = 0.5;
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#1e293b';
          }
        } else {
          ctx.fillStyle = `rgba(100, 116, 139, ${p.opacity * 0.7})`;
        }
        
        ctx.fillText(p.node.label, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [getThemeColors, speed, isImploded, isRotating, hoveredNode, activeNode, radius]);

  // Mouse inputs
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = x - lastMouseX.current;
      const deltaY = y - lastMouseY.current;

      currentAngleY.current += deltaX * 0.007;
      currentAngleX.current -= deltaY * 0.007;

      lastMouseX.current = x;
      lastMouseY.current = y;
      return;
    }

    const w = physicalWidth.current;
    const h = physicalHeight.current;
    const centerX = w / 2;
    const centerY = h / 2;

    const cosX = Math.cos(currentAngleX.current);
    const sinX = Math.sin(currentAngleX.current);
    const cosY = Math.cos(currentAngleY.current);
    const sinY = Math.sin(currentAngleY.current);

    let closestNode: Node3D | null = null;
    let minDistance = 20;

    nodesRef.current.forEach((n) => {
      const localX = n.baseX * physicsForce.current;
      const localY = n.baseY * physicsForce.current;
      const localZ = n.baseZ * physicsForce.current;

      let x1 = localX * cosY - localZ * sinY;
      let z1 = localX * sinY + localZ * cosY;
      let y2 = localY * cosX - z1 * sinX;
      let z2 = localY * sinX + z1 * cosX;

      const perspective = cameraDistance / (cameraDistance + z2);
      const x2d = centerX + x1 * perspective;
      const y2d = centerY + y2 * perspective;

      const dist = Math.hypot(x - x2d, y - y2d);
      if (dist < minDistance) {
        minDistance = dist;
        closestNode = n;
      }
    });

    setHoveredNode(closestNode);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    isDragging.current = true;
    lastMouseX.current = e.clientX - rect.left;
    lastMouseY.current = e.clientY - rect.top;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    if (hoveredNode) {
      setActiveNode(hoveredNode);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    isDragging.current = true;
    lastMouseX.current = e.touches[0].clientX - rect.left;
    lastMouseY.current = e.touches[0].clientY - rect.top;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isDragging.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    const deltaX = x - lastMouseX.current;
    const deltaY = y - lastMouseY.current;

    currentAngleY.current += deltaX * 0.01;
    currentAngleX.current -= deltaY * 0.01;

    lastMouseX.current = x;
    lastMouseY.current = y;
  };

  const colors = getThemeColors();

  return (
    <div className="w-full space-y-5 flex flex-col items-center justify-center p-2 rounded-2xl bg-stone-50/45 border border-stone-150 relative">
      <div 
        className="absolute inset-0 rounded-2xl transition-all duration-700 blur-2xl opacity-60 pointer-events-none -z-10" 
        style={{ backgroundColor: colors.bgGlow }}
      />

      <div className="w-full flex items-center justify-between px-3 py-1.5 border-b border-stone-200">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse" style={{ color: colors.core }} />
          <span className="text-[10px] font-mono tracking-widest text-slate-800 uppercase font-black">
            3D IT LEARNING CONSTELLATION
          </span>
        </div>
        <span className="text-[8px] font-black uppercase text-stone-400 tracking-wider">
          Drag to Rotate
        </span>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full aspect-square max-w-[320px] max-h-[320px] bg-transparent cursor-grab active:cursor-grabbing select-none"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          className="block mx-auto"
        />

        <AnimatePresence>
          {(hoveredNode || activeNode) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-2 inset-x-2 bg-white/95 border border-stone-200 p-2.5 rounded-lg shadow-sm z-20 backdrop-blur-xs flex items-center gap-2"
            >
              <div 
                className="w-1 h-8 rounded-full shrink-0" 
                style={{ backgroundColor: colors.core }}
              />
              <div className="text-left space-y-0.5">
                <span className="text-[8px] font-mono tracking-tight font-black uppercase text-stone-400 block">
                  {(hoveredNode || activeNode)!.courseCode}
                </span>
                <p className="text-[11px] font-black text-[#132a57] leading-none">
                  {(hoveredNode || activeNode)!.label}
                </p>
                <p className="text-[9px] text-stone-500 font-semibold leading-tight">
                  {(hoveredNode || activeNode)!.desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full bg-white border border-stone-200 rounded-xl p-3 space-y-3.5 shadow-3xs text-left">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-[8px] font-black text-stone-400 uppercase tracking-widest block font-mono">
              3D Matrix Theme
            </span>
            <div className="flex gap-1">
              {[
                { class: 'bg-[#2563eb]', id: 'azure' },
                { class: 'bg-[#f59e0b]', id: 'amber' },
                { class: 'bg-[#10b981]', id: 'emerald' },
                { class: 'bg-[#ef4444]', id: 'crimson' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as any)}
                  className={`w-5 h-5 rounded-full ${t.class} transition-all relative cursor-pointer ${
                    theme === t.id ? 'ring-2 ring-stone-900 ring-offset-1' : 'hover:opacity-80'
                  }`}
                  aria-label={`Switch theme to ${t.id}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[8px] font-black text-stone-400 uppercase tracking-widest block font-mono">
              Physics State
            </span>
            <button
              onClick={() => setIsImploded(!isImploded)}
              className={`w-full text-[9px] font-black uppercase tracking-wider py-1 px-2 rounded-lg border transition-all cursor-pointer ${
                isImploded 
                ? 'bg-amber-450 border-amber-500 text-stone-900' 
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {isImploded ? "Expand Sphere" : "Implode Core"}
            </button>
          </div>
        </div>

        <div className="space-y-1 border-t border-stone-100 pt-2.5">
          <div className="flex justify-between items-center text-[8px] font-black tracking-widest uppercase text-stone-400 font-mono">
            <span>Rotation Speed</span>
            <span className="text-stone-700 font-bold">{speed.toFixed(1)}x</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-stone-150 rounded-lg appearance-none cursor-pointer accent-[#132a57]"
            />
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-stone-100 pt-2 text-[9px] text-stone-450 font-bold">
          <button 
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1 hover:text-[#132a57] transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>{isRotating ? "Pause Spin" : "Spin"}</span>
          </button>

          <button 
            onClick={() => {
              currentAngleX.current = 0;
              currentAngleY.current = 0;
              setSpeed(1);
              setIsImploded(false);
              setIsRotating(true);
            }}
            className="flex items-center gap-1 hover:text-[#132a57] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
