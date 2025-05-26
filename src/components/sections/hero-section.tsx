"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement || { clientWidth: 0, clientHeight: 0 };
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial size
    setTimeout(handleResize, 0);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server-side rendering
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Create points for geodesic dome
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Set the radius to be large but with safe margins
    const radius = Math.min(canvas.width, canvas.height) * 0.8; // Slightly reduced to prevent clipping
    
    // Create points with animation parameters
    const points: { x: number; y: number; z: number; radius: number; originalX: number; originalY: number; originalZ: number; phase: number; amplitude: number; speed: number }[] = [];
    
    // Create a sphere of points with more density
    for (let i = 0; i < 180; i++) { // Slightly more points for better coverage
      // Create points in a spherical arrangement
      const theta = Math.random() * Math.PI * 2; // Longitude
      const phi = Math.acos(2 * Math.random() - 1); // Better distribution than random phi
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Add animation parameters for each point
      const phase = Math.random() * Math.PI * 2; // Random starting phase
      const amplitude = Math.random() * 0.1 * radius; // Random movement amplitude (10% of radius)
      const speed = 0.5 + Math.random() * 1.5; // Random movement speed
      
      points.push({
        x, y, z,
        originalX: x,
        originalY: y,
        originalZ: z,
        radius: Math.random() * 1.2 + 0.8, // Slightly larger nodes
        phase,
        amplitude,
        speed,
      });
    }
    
    // Create connections between nearby points with more complexity
    let connections: { a: number; b: number; distance: number }[] = [];
    const maxConnections = 5; // Slightly more connections
    const maxDistance = radius * 0.7; // Increased connection distance
    const minDistance = radius * 0.3; // Prevent connections that are too close
    
    // Create some special connection patterns
    const connectionPatterns: number[][] = [];
    for (let i = 0; i < 6; i++) {
      const pattern = [];
      for (let j = 0; j < 8; j++) {
        pattern.push(Math.floor(Math.random() * points.length));
      }
      connectionPatterns.push(pattern);
    }
    
    for (let i = 0; i < points.length; i++) {
      const pointConnections = [];
      
      for (let j = 0; j < points.length; j++) {
        if (i === j) continue;
        
        const distance = Math.sqrt(
          Math.pow(points[i].x - points[j].x, 2) +
          Math.pow(points[i].y - points[j].y, 2) +
          Math.pow(points[i].z - points[j].z, 2)
        );
        
        if (distance < maxDistance) {
          pointConnections.push({ index: j, distance });
        }
      }
      
      // Sort by distance and take closest ones
      pointConnections.sort((a, b) => a.distance - b.distance);
      const closeConnections = pointConnections.slice(0, maxConnections);
      
      for (const conn of closeConnections) {
        connections.push({
          a: i,
          b: conn.index,
          distance: conn.distance,
        });
      }
    }
    
    // Remove duplicate connections
    connections = connections.filter((conn, index) => {
      const duplicate = connections.findIndex(
        c => (c.a === conn.b && c.b === conn.a) || (c.a === conn.a && c.b === conn.b)
      );
      return duplicate === index;
    });
    
    // Animation loop with smoother rotation
    let rotationX = 0.2; // Start with a more front-facing angle
    let rotationY = 0;
    let rotationZ = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let animationFrameId: number;
    let lastTime = 0;
    
    // Add some organic movement
    let time = 0;
    const rotationSpeed = 0.2; // Slower rotation
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Faster, more dynamic rotation
      time += 0.01;
      targetRotationY += 0.001; // Increased rotation speed
      // Add subtle vertical movement
      targetRotationX = 0.2 + Math.sin(time * 0.05) * 0.1;
      
      // Snappier interpolation
      rotationX += (targetRotationX - rotationX) * 0.02;
      rotationY += (targetRotationY - rotationY) * 0.02;
      // Add subtle Z rotation for more dynamism
      rotationZ = Math.sin(time * 0.03) * 0.05;
      
      // Animate point positions
      points.forEach((point, i) => {
        // Calculate dynamic movement based on time and point's parameters
        const pointTime = time * point.speed;
        
        // Create organic movement in 3D space
        const xOffset = Math.sin(pointTime + point.phase) * point.amplitude;
        const yOffset = Math.cos(pointTime + point.phase * 0.7) * point.amplitude;
        const zOffset = Math.sin(pointTime * 0.8 + point.phase * 1.3) * point.amplitude;
        
        // Update point position with dynamic movement
        point.x = point.originalX + xOffset;
        point.y = point.originalY + yOffset;
        point.z = point.originalZ + zOffset;
      });
      
      // Transform points with rotation
      const transformedPoints = points.map(point => {
        // Apply 3D rotation (Y, then X, then Z)
        let x = point.x, y = point.y, z = point.z;
        
        // Rotate around Y axis
        let x1 = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        let z1 = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        
        // Rotate around X axis
        let y2 = y * Math.cos(rotationX) + z1 * Math.sin(rotationX);
        let z2 = -y * Math.sin(rotationX) + z1 * Math.cos(rotationX);
        
        // Rotate around Z axis
        let x3 = x1 * Math.cos(rotationZ) - y2 * Math.sin(rotationZ);
        let y3 = x1 * Math.sin(rotationZ) + y2 * Math.cos(rotationZ);
        
        // Project to 2D with perspective
        const fov = 4000; // Increased field of view to prevent clipping
        // Add more distance to prevent z-clipping
        const distance = 3000;
        // More gradual scaling to prevent extreme perspective
        const scale = fov / (fov + distance - z2) * 1.2;
        
        // Remove pulsing for now to prevent movement
        const pulse = 1;
        
        return {
          // Apply non-linear scaling to keep points within bounds
          x: centerX + x3 * scale * 0.9, // Slightly reduced scale
          y: centerY + y3 * scale * 0.9,
          z: z2,
          // Scale radius more aggressively to maintain point visibility
          radius: point.radius * scale * 1.5 // Increased point size
        };
      });
      
      // Draw connections with varying opacity and width
      ctx.lineWidth = 0.5; // Thinner lines for cleaner look
      
      // Draw special pattern connections with straight lines
      const now = Date.now();
      connectionPatterns.forEach((pattern, patternIndex) => {
        for (let i = 0; i < pattern.length - 1; i++) {
          const idx1 = pattern[i];
          const idx2 = pattern[(i + 1) % pattern.length];
          if (idx1 >= 0 && idx2 >= 0 && idx1 < transformedPoints.length && idx2 < transformedPoints.length) {
            const pointA = transformedPoints[idx1];
            const pointB = transformedPoints[idx2];
            
            if (pointA && pointB && pointA.z < radius && pointB.z < radius) {
              // Pulsing opacity effect
              const opacity = (Math.sin(now * 0.001 + patternIndex) * 0.5 + 0.5) * 0.3 + 0.1;
              
              // Draw straight connection
              ctx.beginPath();
              ctx.strokeStyle = `rgba(124, 179, 255, ${opacity})`;
              ctx.moveTo(pointA.x, pointA.y);
              ctx.lineTo(pointB.x, pointB.y);
              ctx.stroke();
            }
          }
        }
      });
      
      // Regular connections
      ctx.strokeStyle = 'rgba(77, 139, 249, 0.15)'; // Light blue connections
      
      connections.forEach(conn => {
        const pointA = transformedPoints[conn.a];
        const pointB = transformedPoints[conn.b];
        
        // Only draw if both points are visible (in front)
        if (pointA.z < radius && pointB.z < radius) {
          // Calculate opacity based on z position
          const opacityA = Math.max(0, (radius - pointA.z) / (radius * 2));
          const opacityB = Math.max(0, (radius - pointB.z) / (radius * 2));
          const opacity = (opacityA + opacityB) / 2;
          
          // Draw straight connection
          ctx.beginPath();
          ctx.strokeStyle = `rgba(77, 139, 249, ${opacity * 0.2})`;
          ctx.moveTo(pointA.x, pointA.y);
          ctx.lineTo(pointB.x, pointB.y);
          ctx.stroke();
        }
      });
      
      // Draw points
      transformedPoints.forEach(point => {
        // Only draw if point is in front
        if (point.z < radius) {
          // Calculate opacity based on z position
          const opacity = Math.max(0, (radius - point.z) / (radius * 2));
          
          // Create glowing point effect with vibrant colors
          const gradient = ctx.createRadialGradient(
            point.x, 
            point.y, 
            0, 
            point.x, 
            point.y, 
            point.radius * 3
          );
          
          // More vibrant color variation based on position and time
          const hue1 = (point.x / canvas.width * 30 + time * 20) % 360;
          const hue2 = (point.y / canvas.height * 30 + time * 10) % 360;
          const hue = (hue1 + hue2) / 2;
          const saturation = 80 + Math.sin(time * 0.5) * 15;
          const lightness = 70 + Math.cos(time * 0.3) * 10;
          
          const color1 = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity * 0.9})`;
          const color2 = `hsla(${(hue + 60) % 360}, ${saturation}%, ${lightness}%, ${opacity * 0.2})`;
          
          gradient.addColorStop(0, color1);
          gradient.addColorStop(1, color2);
          
          // Draw glow
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(point.x, point.y, point.radius * 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw core point with vibrant color
          const coreGradient = ctx.createRadialGradient(
            point.x, 
            point.y, 
            0, 
            point.x, 
            point.y, 
            point.radius * 1.2
          );
          coreGradient.addColorStop(0, `hsla(${hue}, ${saturation}%, 95%, 0.95)`);
          coreGradient.addColorStop(1, `hsla(${hue}, ${saturation}%, 70%, 0.9)`);
          
          ctx.beginPath();
          ctx.fillStyle = coreGradient;
          ctx.arc(point.x, point.y, point.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function to cancel animation frame
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [dimensions]);
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background py-16 md:py-24">
      {/* Subtle Geodesic dome visualization */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-40">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full" 
          style={{ opacity: 0.3 }}
        />
      </div>
      
      {/* Hero content */}
      <div className="relative notion-container z-10 max-w-6xl flex flex-col items-center">
        {/* Two-column layout for desktop */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left column - Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Small badge */}
            <div className="mb-8 notion-fade-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span>New in engram</span>
              </div>
            </div>
            
            {/* Main heading with animation */}
            <div className="overflow-hidden mb-6">
              <h1 className="notion-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground animate-in-slide-up">
                <span className="block mb-2">
                  Capture knowledge
                </span>
                <span className="block">
                  <span className="text-foreground/80">and make it </span>
                  <span>timeless.</span>
                </span>
              </h1>
            </div>
            
            {/* Description with animation */}
            <div className="mb-8 max-w-2xl animate-in-fade delay-100">
              <p className="notion-paragraph text-foreground/70">
                Studio helps you organize and transfer knowledge effortlessly. Create your personal neural network that adapts, learns, and grows with your thinking.  
              </p>
            </div>
            
            {/* Call to actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in-fade delay-200">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-base font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              >
                Get started for free
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-base font-medium rounded-md bg-background text-foreground border border-border hover:bg-secondary transition-all duration-200"
              >
                See how it works
              </Button>
            </div>
            
            {/* Testimonial/social proof */}
            <div className="mt-12 flex items-center gap-2 animate-in-fade delay-300">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background"></div>
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                <span className="font-medium text-foreground/80">10,000+</span> knowledge workers trust Studio
              </p>
            </div>
          </div>
          
          {/* Right column - Visual with Animated Dome */}
          <div className="lg:col-span-5 flex justify-center items-center notion-fade-in">
            <div className="relative max-w-md w-full aspect-square">
              {/* Revolving dome animation */}
              <div className="absolute inset-0 opacity-90 hover:opacity-100 transition-opacity duration-1000">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              
              {/* Glowing backdrop for the dome */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
              
              {/* Logo centered on dome */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-40 z-10 hover:scale-110 transition-transform duration-1000">
                <Image 
                  src="/image 94.png" 
                  alt="engram Logo" 
                  width={160} 
                  height={160} 
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Floating particles to enhance dome effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/80"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${30 + Math.random() * 40}%`,
                      animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite alternate`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - more subtle and Notion-like */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60">
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L10 9L19 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
          100% { transform: translateY(0px) rotate(6deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
