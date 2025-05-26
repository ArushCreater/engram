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
    const radius = Math.min(canvas.width, canvas.height) * 0.7;
    
    // Create points
    const points: { x: number; y: number; z: number; radius: number }[] = [];
    
    // Create a sphere of points with more density
    for (let i = 0; i < 150; i++) { // Increased from 80 to 150 points
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
    const maxConnections = 4; // Increased from 2 to 4 for more connections
    const maxDistance = radius * 0.6; // Increased from 0.5 to 0.6 to connect more points
    
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
      rotationX += 0.0008; // Slightly slower rotation for larger dome
      rotationY += 0.0004; // Slightly slower rotation for larger dome
      
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
          
          // Create gradient for each point
          const gradient = ctx.createRadialGradient(
            point.x, 
            point.y, 
            0, 
            point.x, 
            point.y, 
            point.radius * 2
          );
          gradient.addColorStop(0, `rgba(77, 139, 249, ${opacity})`);
          gradient.addColorStop(1, `rgba(77, 139, 249, ${opacity * 0.2})`);
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(point.x, point.y, point.radius * 1.5, 0, Math.PI * 2);
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
