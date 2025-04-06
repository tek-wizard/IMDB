"use client";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "/home/prateeksingh/Desktop/IMDB/CineVault/src/utils.jsx";

export const WavyBackground = ({
  children,
  className,
  containerClassName = "w-[400px] h-[300px]", // default size
  colors,
  waveWidth,
  backgroundFill,
  blur = 20,
  speed = "slow",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.003;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  let w, h, nt, ctx;
  let animationId;

  const drawWave = (n) => {
    nt += getSpeed();
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 40;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };

  const init = () => {
    const canvas = canvasRef.current;
    const bounds = canvas.parentElement.getBoundingClientRect();
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = bounds.width;
    h = ctx.canvas.height = bounds.height;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    render();
    window.addEventListener("resize", handleResize);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    const bounds = canvas.parentElement.getBoundingClientRect();
    ctx.canvas.width = bounds.width;
    ctx.canvas.height = bounds.height;
  };

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10 text-white text-center", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
