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
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Create points
    const points: { x: number; y: number; z: number; radius: number }[] = [];
    
    // Create a sphere of points - fewer points for better performance
    for (let i = 0; i < 80; i++) {
      // Create points in a spherical arrangement
      const theta = Math.random() * Math.PI * 2; // Longitude
      const phi = Math.random() * Math.PI; // Latitude
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      points.push({
        x,
        y,
        z,
        radius: Math.random() * 1.5 + 0.5, // Random node size (smaller for better performance)
      });
    }
    
    // Create connections between nearby points
    let connections: { a: number; b: number; distance: number }[] = [];
    const maxConnections = 2; // Fewer connections for better performance
    const maxDistance = radius * 0.5; // Max distance for connection
    
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
    
    // Animation loop
    let rotationX = 0;
    let rotationY = 0;
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Rotate slowly
      rotationX += 0.001;
      rotationY += 0.0005;
      
      // Transform points with rotation
      const transformedPoints = points.map(point => {
        // Rotate around Y axis
        const x1 = point.x * Math.cos(rotationY) - point.z * Math.sin(rotationY);
        const z1 = point.x * Math.sin(rotationY) + point.z * Math.cos(rotationY);
        
        // Rotate around X axis
        const y2 = point.y * Math.cos(rotationX) + z1 * Math.sin(rotationX);
        const z2 = -point.y * Math.sin(rotationX) + z1 * Math.cos(rotationX);
        
        // Project to 2D with a simple perspective division
        const scale = 800 / (800 - z2); // Perspective division
        
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          radius: point.radius * scale,
        };
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(77, 139, 249, 0.15)'; // Light blue connections
      ctx.lineWidth = 0.5;
      
      connections.forEach(conn => {
        const pointA = transformedPoints[conn.a];
        const pointB = transformedPoints[conn.b];
        
        // Only draw if both points are visible (in front)
        if (pointA.z < radius && pointB.z < radius) {
          // Calculate opacity based on z position
          const opacityA = Math.max(0, (radius - pointA.z) / (radius * 2));
          const opacityB = Math.max(0, (radius - pointB.z) / (radius * 2));
          const opacity = (opacityA + opacityB) / 2;
          
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
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(77, 139, 249, ${opacity})`;
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-foreground overflow-hidden bg-gradient-to-b from-[#0f1219] to-[#070a10] py-20 md:py-0">
      {/* Animated Geodesic dome visualization */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full" 
          style={{ opacity: 0.8 }}
        />
      </div>
      
      {/* Hero content */}
      <div className="relative container mx-auto px-4 z-10 pt-20 max-w-5xl">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="relative h-28 w-28 transform hover:scale-110 transition-all duration-700">
            <Image 
              src="/image 94.png" 
              alt="Logo" 
              width={112} 
              height={112} 
              className="opacity-100"
              priority
            />
          </div>
        </div>
        
        {/* Main heading with animation */}
        <div className="overflow-hidden mb-16">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase animate-in-slide-up" 
          >
            <span className="block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              WE'RE RUNNING OUT
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              OF TIME
            </span>
          </h1>
        </div>
        
        {/* Description with animation */}
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed animate-in-fade">
            Discover a new way to connect with and transfer knowledge across dimensions.
          </p>
        </div>
        
        {/* Call to action */}
        <div className="animate-in-fade delay-300">
          <Button 
            variant="glass"
            size="lg" 
            className="px-10 py-7 text-lg font-medium text-white rounded-md bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300"
          >
            Create your own brain
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
