"use client";

import { cn } from "../../lib/utils";
import { useRef, useEffect, useCallback } from "react";

const DEFAULT_MARKERS = [
    { lat: 37.78, lng: -122.42, label: "San Francisco" },
    { lat: 51.51, lng: -0.13, label: "London" },
    { lat: 35.68, lng: 139.69, label: "Tokyo" },
    { lat: -33.87, lng: 151.21, label: "Sydney" },
    { lat: 1.35, lng: 103.82, label: "Singapore" },
    { lat: 55.76, lng: 37.62, label: "Moscow" },
    { lat: -23.55, lng: -46.63, label: "São Paulo" },
    { lat: 19.43, lng: -99.13, label: "Mexico City" },
    { lat: 28.61, lng: 77.21, label: "Delhi" },
    { lat: 36.19, lng: 44.01, label: "Erbil" },
];

const DEFAULT_CONNECTIONS = [
    { from: [37.78, -122.42], to: [51.51, -0.13] },   // SF → London
    { from: [51.51, -0.13], to: [55.76, 37.62] },      // London → Moscow
    { from: [55.76, 37.62], to: [28.61, 77.21] },      // Moscow → Delhi
    { from: [28.61, 77.21], to: [1.35, 103.82] },      // Delhi → Singapore
    { from: [1.35, 103.82], to: [35.68, 139.69] },     // Singapore → Tokyo
    { from: [35.68, 139.69], to: [-33.87, 151.21] },   // Tokyo → Sydney
    { from: [-33.87, 151.21], to: [-23.55, -46.63] },  // Sydney → São Paulo
    { from: [-23.55, -46.63], to: [19.43, -99.13] },   // São Paulo → Mexico City
    { from: [19.43, -99.13], to: [37.78, -122.42] },   // Mexico City → SF
    { from: [51.51, -0.13], to: [36.19, 44.01] },      // London → Erbil
    { from: [36.19, 44.01], to: [35.68, 139.69] },     // Erbil → Tokyo
    { from: [37.78, -122.42], to: [-23.55, -46.63] },  // SF → São Paulo
];

function latLngToXYZ(lat, lng, radius) {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;
    return [
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
    ];
}

function rotateY(x, y, z, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x, y, z, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x, y, z, cx, cy, fov) {
    const scale = fov / (fov + z);
    return [x * scale + cx, y * scale + cy, z];
}

export function Globe({
    className,
    size = 600,
    dotColor = "rgba(178, 133, 27, ALPHA)",
    arcColor = "rgba(178, 133, 27, 0.5)",
    markerColor = "rgba(178, 133, 27, 1)",
    autoRotateSpeed = 0.0005,
    connections = DEFAULT_CONNECTIONS,
    markers = DEFAULT_MARKERS,
}) {
    const canvasRef = useRef(null);
    const rotYRef = useRef(0.4);
    const rotXRef = useRef(0);
    const animRef = useRef(0);
    const timeRef = useRef(0);
    const dotsRef = useRef([]);
    const visibleRef = useRef(true);
    const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

    useEffect(() => {
        const dots = [];
        const numDots = 600;
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        for (let i = 0; i < numDots; i++) {
            const theta = (2 * Math.PI * i) / goldenRatio;
            const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.cos(phi);
            const z = Math.sin(theta) * Math.sin(phi);
            dots.push([x, y, z]);
        }
        dotsRef.current = dots;
    }, []);

    // Resize canvas only when dimensions actually change
    const syncCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === sizeRef.current.w && h === sizeRef.current.h && dpr === sizeRef.current.dpr) {
            return false;
        }
        sizeRef.current = { w, h, dpr };
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        return true;
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        syncCanvasSize();
        const { w, h, dpr } = sizeRef.current;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.38;
        const fov = 600;

        rotYRef.current += autoRotateSpeed;

        timeRef.current += 0.015;
        const time = timeRef.current;

        ctx.clearRect(0, 0, w, h);

        // Outer ring only (skip expensive radial gradient glow)
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(178, 133, 27, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();

        const ry = rotYRef.current;
        const rx = rotXRef.current;

        // Batch dots into a single path per alpha bucket for fewer draw calls
        const dots = dotsRef.current;
        for (let i = 0; i < dots.length; i++) {
            let [x, y, z] = dots[i];
            x *= radius; y *= radius; z *= radius;
            [x, y, z] = rotateX(x, y, z, rx);
            [x, y, z] = rotateY(x, y, z, ry);
            if (z > 0) continue;
            const [sx, sy] = project(x, y, z, cx, cy, fov);
            const depthAlpha = Math.max(0.1, 1 - (z + radius) / (2 * radius));
            ctx.beginPath();
            ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = dotColor.replace("ALPHA", depthAlpha.toFixed(2));
            ctx.fill();
        }

        for (const conn of connections) {
            const [lat1, lng1] = conn.from;
            const [lat2, lng2] = conn.to;
            let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
            let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);
            [x1, y1, z1] = rotateX(x1, y1, z1, rx);
            [x1, y1, z1] = rotateY(x1, y1, z1, ry);
            [x2, y2, z2] = rotateX(x2, y2, z2, rx);
            [x2, y2, z2] = rotateY(x2, y2, z2, ry);
            if (z1 > radius * 0.6 && z2 > radius * 0.6) continue;
            const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
            const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const midZ = (z1 + z2) / 2;
            const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
            const arcHeight = radius * 1.25;
            const elevX = (midX / midLen) * arcHeight;
            const elevY = (midY / midLen) * arcHeight;
            const elevZ = (midZ / midLen) * arcHeight;
            const [scx, scy] = project(elevX, elevY, elevZ, cx, cy, fov);
            ctx.beginPath();
            ctx.moveTo(sx1, sy1);
            ctx.quadraticCurveTo(scx, scy, sx2, sy2);
            ctx.strokeStyle = arcColor;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
            const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
            const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
            ctx.beginPath();
            ctx.arc(tx, ty, 2, 0, Math.PI * 2);
            ctx.fillStyle = markerColor;
            ctx.fill();
        }

        for (const marker of markers) {
            let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
            [x, y, z] = rotateX(x, y, z, rx);
            [x, y, z] = rotateY(x, y, z, ry);
            if (z > radius * 0.5) continue;
            const [sx, sy] = project(x, y, z, cx, cy, fov);
            const pulse = Math.sin(time * 2 + marker.lat) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
            ctx.strokeStyle = markerColor.replace("1)", `${0.2 + pulse * 0.15})`);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = markerColor;
            ctx.fill();
        }

        if (visibleRef.current) {
            animRef.current = requestAnimationFrame(draw);
        } else {
            animRef.current = 0;
        }
    }, [dotColor, arcColor, markerColor, autoRotateSpeed, connections, markers, syncCanvasSize]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Handle resize
        const ro = new ResizeObserver(() => syncCanvasSize());
        ro.observe(canvas);

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting && !animRef.current) {
                    animRef.current = requestAnimationFrame(draw);
                }
            },
            { threshold: 0 }
        );
        observer.observe(canvas);
        animRef.current = requestAnimationFrame(draw);
        return () => {
            ro.disconnect();
            observer.disconnect();
            cancelAnimationFrame(animRef.current);
        };
    }, [draw, syncCanvasSize]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("w-full pointer-events-none", className)}
            style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1" }}
        />
    );
}
