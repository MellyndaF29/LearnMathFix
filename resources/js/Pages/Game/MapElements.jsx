import React from 'react';

/* ═══════════════════════════════════════════════════════════
   STAGE 1: FOREST ELEMENTS
═══════════════════════════════════════════════════════════ */

export function TreeSVG({ s = 1 }) {
    return (
        <svg width={50 * s} height={66 * s} viewBox="0 0 50 66" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
            <ellipse cx="25" cy="64" rx="11" ry="3.5" fill="black" opacity="0.22" />
            <rect x="21" y="46" width="8" height="20" rx="3" fill="#4b2d10" />
            <polygon points="25,4 3,46 47,46" fill="#15803d" />
            <polygon points="25,14 5,46 45,46" fill="#16a34a" opacity="0.6" />
            <polygon points="25,26 8,46 42,46" fill="#22c55e" opacity="0.35" />
            <polygon points="25,4 22,46 28,46" fill="#4ade80" opacity="0.2" />
        </svg>
    );
}

export function MushroomSVG() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
            <rect x="11" y="15" width="6" height="12" rx="2" fill="#fde68a" />
            <ellipse cx="14" cy="15" rx="12" ry="9" fill="#dc2626" />
            <ellipse cx="8"  cy="12" rx="3" ry="2" fill="white" opacity="0.8" />
            <ellipse cx="19" cy="10" rx="2.5" ry="2" fill="white" opacity="0.8" />
            <ellipse cx="14" cy="7"  rx="1.8" ry="1.4" fill="white" opacity="0.6" />
        </svg>
    );
}

export function RockSVG() {
    return (
        <svg width="34" height="24" viewBox="0 0 34 24" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="17" cy="22" rx="15" ry="3.5" fill="black" opacity="0.2" />
            <path d="M 4 20 Q 2 10 10 5 Q 18 0 25 3 Q 32 7 32 15 Q 30 20 22 22 L 6 22 Z" fill="#64748b" />
            <path d="M 10 5 Q 18 0 25 3 Q 32 7 28 13 Q 22 8 15 6 Q 11 5 10 5 Z" fill="#94a3b8" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   STAGE 2: CASTLE ELEMENTS
═══════════════════════════════════════════════════════════ */

export function CastleTowerSVG() {
    return (
        <svg width="52" height="74" viewBox="0 0 52 74" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="26" cy="72" rx="18" ry="4" fill="black" opacity="0.25" />
            {/* Tower Base */}
            <rect x="10" y="24" width="32" height="48" rx="2" fill="#334155" />
            <rect x="13" y="26" width="26" height="44" fill="#475569" opacity="0.6" />
            {/* Brick Lines */}
            <line x1="10" y1="36" x2="42" y2="36" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="10" y1="48" x2="42" y2="48" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="10" y1="60" x2="42" y2="60" stroke="#1e293b" strokeWidth="1.2" />
            {/* Crenellations (Top battlements) */}
            <rect x="7" y="16" width="38" height="9" fill="#1e293b" rx="1" />
            <rect x="9" y="10" width="8" height="8" fill="#334155" />
            <rect x="22" y="10" width="8" height="8" fill="#334155" />
            <rect x="35" y="10" width="8" height="8" fill="#334155" />
            {/* Arched Window */}
            <path d="M 23 38 Q 26 33 29 38 L 29 48 L 23 48 Z" fill="#0f172a" />
            {/* Blue Castle Roof Spire */}
            <polygon points="26,0 12,12 40,12" fill="#1d4ed8" />
            <polygon points="26,0 26,12 40,12" fill="#2563eb" />
            <circle cx="26" cy="1" r="2" fill="#fbbf24" />
        </svg>
    );
}

export function TorchSVG() {
    return (
        <svg width="24" height="34" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="12" cy="10" rx="10" ry="10" fill="rgba(245,158,11,0.25)" style={{ filter: 'blur(4px)' }} />
            {/* Bracket */}
            <path d="M 8 20 L 12 28 L 12 34" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Torch Head */}
            <polygon points="8,16 16,16 14,23 10,23" fill="#92400e" />
            {/* Flame */}
            <path d="M 12 4 Q 16 10 15 16 Q 12 18 9 16 Q 8 10 12 4 Z" fill="#f59e0b" />
            <path d="M 12 7 Q 14 11 13 15 Q 12 16 11 15 Q 10 11 12 7 Z" fill="#fef08a" />
        </svg>
    );
}

export function KnightStatueSVG() {
    return (
        <svg width="34" height="48" viewBox="0 0 34 48" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="17" cy="46" rx="11" ry="3" fill="black" opacity="0.22" />
            {/* Pedestal */}
            <rect x="8" y="40" width="18" height="6" rx="1" fill="#475569" />
            {/* Body */}
            <rect x="11" y="20" width="12" height="20" rx="2" fill="#64748b" />
            {/* Helmet */}
            <circle cx="17" cy="14" r="6" fill="#94a3b8" />
            <rect x="14" y="13" width="6" height="2" fill="#1e293b" />
            {/* Shield */}
            <path d="M 6 22 L 12 22 L 12 34 Q 9 37 6 34 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="1" />
            {/* Sword */}
            <line x1="24" y1="14" x2="24" y2="38" stroke="#e2e8f0" strokeWidth="1.8" />
            <line x1="21" y1="20" x2="27" y2="20" stroke="#f59e0b" strokeWidth="1.8" />
        </svg>
    );
}

export function StonePillarSVG() {
    return (
        <svg width="26" height="50" viewBox="0 0 26 50" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="13" cy="48" rx="9" ry="3" fill="black" opacity="0.2" />
            <rect x="5" y="42" width="16" height="6" rx="1" fill="#334155" />
            <rect x="7" y="8" width="12" height="34" fill="#475569" />
            <line x1="11" y1="8" x2="11" y2="42" stroke="#64748b" strokeWidth="1" />
            <rect x="5" y="4" width="16" height="5" rx="1" fill="#334155" />
            {/* Banner */}
            <path d="M 8 14 L 18 14 L 18 28 L 13 25 L 8 28 Z" fill="#dc2626" opacity="0.8" />
        </svg>
    );
}

export function TreasureChestSVG() {
    return (
        <svg width="32" height="26" viewBox="0 0 32 26" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="24" rx="12" ry="3" fill="black" opacity="0.25" />
            {/* Body */}
            <rect x="4" y="10" width="24" height="14" rx="2" fill="#854d0e" />
            {/* Lid */}
            <path d="M 4 10 Q 16 4 28 10 Z" fill="#a16207" />
            {/* Gold Straps */}
            <rect x="8" y="7" width="2.5" height="17" fill="#fbbf24" />
            <rect x="21" y="7" width="2.5" height="17" fill="#fbbf24" />
            {/* Lock */}
            <rect x="14" y="11" width="4" height="4" rx="1" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="16" cy="13" r="0.8" fill="#1c1917" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   STAGE 3: GEOMETRY TOWER ELEMENTS
═══════════════════════════════════════════════════════════ */

export function PolyhedronSVG({ color = '#38bdf8' }) {
    return (
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <circle cx="19" cy="19" r="16" fill={color} opacity="0.15" style={{ filter: 'blur(6px)' }} />
            {/* Polyhedron Facets (Isometric Octahedron) */}
            <polygon points="19,3 33,14 19,25" fill={color} opacity="0.85" />
            <polygon points="19,3 5,14 19,25" fill={color} opacity="0.55" />
            <polygon points="5,14 19,25 19,35" fill={color} opacity="0.35" />
            <polygon points="33,14 19,25 19,35" fill={color} opacity="0.7" />
            {/* Highlight Line */}
            <line x1="19" y1="3" x2="19" y2="25" stroke="white" strokeWidth="1.2" opacity="0.6" />
        </svg>
    );
}

export function CrystalSpireSVG() {
    return (
        <svg width="30" height="58" viewBox="0 0 30 58" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="15" cy="55" rx="10" ry="3" fill="black" opacity="0.2" />
            {/* Tall Crystal Cluster */}
            <polygon points="15,2 7,42 15,54" fill="#a855f7" />
            <polygon points="15,2 23,42 15,54" fill="#c084fc" opacity="0.8" />
            <polygon points="21,18 27,48 21,54" fill="#7e22ce" opacity="0.7" />
            <polygon points="9,24 3,48 9,54" fill="#6b21a8" opacity="0.6" />
            {/* Neon Glow Spike */}
            <line x1="15" y1="4" x2="15" y2="46" stroke="#f0abfc" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
        </svg>
    );
}

export function FloatingPyramidSVG() {
    return (
        <svg width="40" height="42" viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="20" cy="40" rx="12" ry="3" fill="black" opacity="0.18" />
            {/* Inverted Floating Cosmic Pyramid */}
            <polygon points="20,6 4,32 20,38" fill="#06b6d4" opacity="0.75" />
            <polygon points="20,6 36,32 20,38" fill="#22d3ee" opacity="0.9" />
            <polygon points="4,32 36,32 20,38" fill="#0891b2" opacity="0.6" />
            {/* Inner Glowing Core */}
            <circle cx="20" cy="24" r="3.5" fill="#fef08a" style={{ filter: 'drop-shadow(0 0 6px #fef08a)' }} />
        </svg>
    );
}

export function RuneRingSVG() {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <circle cx="18" cy="18" r="14" stroke="#ec4899" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="4,3" />
            <circle cx="18" cy="18" r="9" stroke="#38bdf8" strokeWidth="1.2" fill="none" opacity="0.8" />
            <polygon points="18,10 24,22 12,22" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.7" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   STAGE 4: LABYRINTH / DESERT ELEMENTS
═══════════════════════════════════════════════════════════ */

export function SandstoneWallSVG({ w = 20, h = 4 }) {
    return (
        <div
            className="rounded-md border border-amber-800/40 shadow-lg pointer-events-none relative overflow-hidden"
            style={{
                width: `${w * 10}px`,
                height: `${h * 10}px`,
                background: 'linear-gradient(135deg, #b45309 0%, #78350f 50%, #451a03 100%)',
                boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 1px 1px rgba(254,240,138,0.3)',
            }}
        >
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
                }}
            />
            {/* Top bevel highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-300/40" />
        </div>
    );
}

export function CactusSVG() {
    return (
        <svg width="32" height="46" viewBox="0 0 32 46" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="44" rx="10" ry="3" fill="black" opacity="0.2" />
            {/* Main stem */}
            <rect x="12" y="10" width="8" height="34" rx="4" fill="#15803d" />
            <line x1="16" y1="12" x2="16" y2="42" stroke="#166534" strokeWidth="1.5" />
            {/* Left arm */}
            <path d="M 12 28 L 5 28 L 5 18" stroke="#15803d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Right arm */}
            <path d="M 20 22 L 27 22 L 27 14" stroke="#15803d" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Desert flower */}
            <circle cx="16" cy="8" r="2.5" fill="#f43f5e" />
        </svg>
    );
}

export function AncientObeliskSVG() {
    return (
        <svg width="26" height="56" viewBox="0 0 26 56" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="13" cy="54" rx="10" ry="3" fill="black" opacity="0.25" />
            {/* Base */}
            <rect x="5" y="46" width="16" height="8" rx="1" fill="#78350f" />
            {/* Shaft */}
            <polygon points="8,12 18,12 20,46 6,46" fill="#b45309" />
            <polygon points="13,12 18,12 20,46 13,46" fill="#92400e" opacity="0.6" />
            {/* Pyramidion Tip */}
            <polygon points="13,2 8,12 18,12" fill="#f59e0b" />
            {/* Glowing Glyphs */}
            <text x="13" y="24" textAnchor="middle" fontSize="6" fill="#fef08a" opacity="0.8">Δ</text>
            <text x="13" y="34" textAnchor="middle" fontSize="6" fill="#fef08a" opacity="0.8">∞</text>
            <text x="13" y="44" textAnchor="middle" fontSize="6" fill="#fef08a" opacity="0.8">π</text>
        </svg>
    );
}

export function AncientUrnSVG() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="22" rx="8" ry="2.5" fill="black" opacity="0.2" />
            <path d="M 6 10 Q 4 18 12 20 Q 20 18 18 10 Q 15 7 12 7 Q 9 7 6 10 Z" fill="#9a3412" />
            <ellipse cx="12" cy="7" rx="4" ry="1.5" fill="#c2410c" />
            {/* Handles */}
            <path d="M 5 11 Q 2 13 6 16" stroke="#7c2d12" strokeWidth="1.5" fill="none" />
            <path d="M 19 11 Q 22 13 18 16" stroke="#7c2d12" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   STAGE 5: VOLCANO / CITADEL ELEMENTS
═══════════════════════════════════════════════════════════ */

export function ObsidianSpireSVG() {
    return (
        <svg width="34" height="64" viewBox="0 0 34 64" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="17" cy="62" rx="12" ry="3.5" fill="black" opacity="0.3" />
            {/* Main Obsidian Needle */}
            <polygon points="17,2 6,48 17,60" fill="#171717" />
            <polygon points="17,2 28,48 17,60" fill="#262626" />
            <polygon points="24,20 31,52 24,60" fill="#0a0a0a" />
            {/* Magma Vein Crack */}
            <path d="M 17 8 L 19 22 L 15 35 L 18 48" stroke="#ef4444" strokeWidth="1.8" fill="none" style={{ filter: 'drop-shadow(0 0 4px #ef4444)' }} />
            <circle cx="17" cy="8" r="2" fill="#fbbf24" />
        </svg>
    );
}

export function LavaVentSVG() {
    return (
        <svg width="46" height="28" viewBox="0 0 46 28" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="23" cy="14" rx="20" ry="10" fill="rgba(239,68,68,0.2)" style={{ filter: 'blur(6px)' }} />
            {/* Cracked Crust */}
            <ellipse cx="23" cy="14" rx="18" ry="8" fill="#171717" stroke="#450a0a" strokeWidth="2" />
            {/* Molten Lava Center */}
            <ellipse cx="23" cy="14" rx="12" ry="4.5" fill="#f97316" />
            <ellipse cx="23" cy="14" rx="7" ry="2" fill="#fef08a" />
        </svg>
    );
}

export function InfernoBrazierSVG() {
    return (
        <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="14" cy="36" rx="9" ry="3" fill="black" opacity="0.3" />
            {/* Metal Tripod */}
            <line x1="7" y1="24" x2="4" y2="36" stroke="#1f2937" strokeWidth="2.5" />
            <line x1="21" y1="24" x2="24" y2="36" stroke="#1f2937" strokeWidth="2.5" />
            <line x1="14" y1="24" x2="14" y2="36" stroke="#111827" strokeWidth="2.5" />
            {/* Basin */}
            <path d="M 4 18 Q 14 26 24 18 L 22 24 Q 14 28 6 24 Z" fill="#374151" stroke="#111827" strokeWidth="1" />
            {/* Roaring Inferno */}
            <path d="M 14 2 Q 22 10 20 18 Q 14 20 8 18 Q 6 10 14 2 Z" fill="#dc2626" />
            <path d="M 14 6 Q 19 12 17 18 Q 14 19 11 18 Q 9 12 14 6 Z" fill="#f97316" />
            <path d="M 14 10 Q 17 14 15 18 Q 14 18 13 18 Q 11 14 14 10 Z" fill="#fef08a" />
        </svg>
    );
}

export function MagmaRockSVG() {
    return (
        <svg width="38" height="26" viewBox="0 0 38 26" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="19" cy="24" rx="16" ry="3.5" fill="black" opacity="0.3" />
            <path d="M 4 20 Q 2 10 12 5 Q 22 1 30 6 Q 36 11 34 19 Q 28 24 18 24 L 6 23 Z" fill="#1c1917" />
            {/* Magma Cracks */}
            <path d="M 8 16 L 14 12 L 20 17 L 28 10" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.85" />
            <circle cx="14" cy="12" r="1.5" fill="#fef08a" />
            <circle cx="20" cy="17" r="1.5" fill="#fef08a" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   ENEMY SVGS (PER THEME)
═══════════════════════════════════════════════════════════ */

export function ForestGhostSVG() {
    return (
        <svg width="46" height="54" viewBox="0 0 46 54" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="23" cy="52" rx="12" ry="3.5" fill="black" opacity="0.18" />
            <path d="M 4 28 Q 4 4 23 4 Q 42 4 42 28 L 42 46 Q 34 38 23 46 Q 12 38 4 46 Z" fill="rgba(240,230,255,0.9)" />
            <path d="M 4 28 Q 4 4 23 4 Q 42 4 42 28 L 42 46 Q 34 38 23 46 Q 12 38 4 46 Z" fill="#7c3aed" opacity="0.25" />
            <ellipse cx="16" cy="25" rx="5.5" ry="6.5" fill="#dc2626" />
            <ellipse cx="30" cy="25" rx="5.5" ry="6.5" fill="#dc2626" />
            <ellipse cx="16" cy="26" rx="2.5" ry="3.5" fill="#1c1917" />
            <ellipse cx="30" cy="26" rx="2.5" ry="3.5" fill="#1c1917" />
            <ellipse cx="15" cy="24" rx="1.2" ry="1.5" fill="white" opacity="0.7" />
            <ellipse cx="29" cy="24" rx="1.2" ry="1.5" fill="white" opacity="0.7" />
        </svg>
    );
}

export function KnightGhostSVG() {
    return (
        <svg width="48" height="56" viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="24" cy="53" rx="14" ry="4" fill="black" opacity="0.2" />
            {/* Spectral Armor Aura */}
            <path d="M 10 20 Q 24 2 38 20 L 42 46 Q 32 40 24 48 Q 16 40 6 46 Z" fill="rgba(59,130,246,0.25)" style={{ filter: 'blur(4px)' }} />
            {/* Helmet */}
            <path d="M 14 18 Q 24 8 34 18 L 34 30 Q 24 34 14 30 Z" fill="#334155" />
            {/* Glowing Visor Slit */}
            <rect x="18" y="21" width="12" height="3" rx="1.5" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
            {/* Pauldrons / Armor Body */}
            <path d="M 12 30 L 36 30 L 38 46 Q 24 40 10 46 Z" fill="#1e293b" opacity="0.85" />
            {/* Spectral Sword */}
            <line x1="38" y1="14" x2="44" y2="44" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="38" cy="14" r="3" fill="#0284c7" />
        </svg>
    );
}

export function CosmicOrbSVG() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <circle cx="24" cy="24" r="20" fill="rgba(168,85,247,0.2)" style={{ filter: 'blur(6px)' }} />
            {/* Orbiting Ring */}
            <ellipse cx="24" cy="24" rx="22" ry="8" stroke="#38bdf8" strokeWidth="1.8" fill="none" opacity="0.75" transform="rotate(-25 24 24)" />
            {/* Core Orb */}
            <circle cx="24" cy="24" r="14" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
            {/* Central Glowing Eye */}
            <ellipse cx="24" cy="24" rx="6" ry="8" fill="#f43f5e" />
            <circle cx="24" cy="24" r="3" fill="#1e1b4b" />
            <circle cx="25" cy="23" r="1.2" fill="white" />
        </svg>
    );
}

export function ScarabSVG() {
    return (
        <svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="23" cy="23" rx="16" ry="16" fill="rgba(245,158,11,0.2)" style={{ filter: 'blur(4px)' }} />
            {/* Golden Beetle Body */}
            <ellipse cx="23" cy="25" rx="12" ry="15" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />
            {/* Elytra Line */}
            <line x1="23" y1="12" x2="23" y2="39" stroke="#78350f" strokeWidth="1.5" />
            {/* Head & Horn */}
            <circle cx="23" cy="12" r="5" fill="#a16207" />
            <path d="M 23 8 L 23 3 M 20 5 L 26 5" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
            {/* Glowing Ruby Eyes */}
            <circle cx="20" cy="11" r="1.8" fill="#dc2626" />
            <circle cx="26" cy="11" r="1.8" fill="#dc2626" />
            {/* Spread Wings (Translucent gold) */}
            <path d="M 12 18 Q 2 10 4 28 Q 12 26 14 22 Z" fill="#fef08a" opacity="0.6" />
            <path d="M 34 18 Q 44 10 42 28 Q 34 26 32 22 Z" fill="#fef08a" opacity="0.6" />
        </svg>
    );
}

export function FireDemonSVG() {
    return (
        <svg width="50" height="54" viewBox="0 0 50 54" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <ellipse cx="25" cy="27" rx="20" ry="22" fill="rgba(239,68,68,0.25)" style={{ filter: 'blur(6px)' }} />
            {/* Flame Body */}
            <path d="M 25 2 Q 40 18 38 36 Q 30 48 25 52 Q 20 48 12 36 Q 10 18 25 2 Z" fill="#ea580c" />
            <path d="M 25 8 Q 35 22 33 34 Q 28 42 25 45 Q 22 42 17 34 Q 15 22 25 8 Z" fill="#f97316" />
            <path d="M 25 16 Q 31 25 29 34 Q 25 40 25 40 Q 25 40 21 34 Q 19 25 25 16 Z" fill="#fef08a" />
            {/* Horns */}
            <path d="M 16 16 Q 10 8 8 10 Q 12 16 17 20 Z" fill="#7f1d1d" />
            <path d="M 34 16 Q 40 8 42 10 Q 38 16 33 20 Z" fill="#7f1d1d" />
            {/* Glowing Eyes */}
            <ellipse cx="20" cy="25" rx="3.5" ry="4" fill="#450a0a" />
            <ellipse cx="30" cy="25" rx="3.5" ry="4" fill="#450a0a" />
            <circle cx="20" cy="25" r="2" fill="#fbbf24" />
            <circle cx="30" cy="25" r="2" fill="#fbbf24" />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   DYNAMIC OBSTACLE DISPATCHER
═══════════════════════════════════════════════════════════ */

export function RenderObstacle({ obstacle }) {
    switch (obstacle.type) {
        case 'tree':
            return <TreeSVG s={obstacle.s} />;
        case 'mushroom':
            return <MushroomSVG />;
        case 'rock':
            return <RockSVG />;
        case 'castle_tower':
            return <CastleTowerSVG />;
        case 'torch':
            return <TorchSVG />;
        case 'knight_statue':
            return <KnightStatueSVG />;
        case 'stone_pillar':
            return <StonePillarSVG />;
        case 'treasure_chest':
            return <TreasureChestSVG />;
        case 'polyhedron':
            return <PolyhedronSVG color={obstacle.color} />;
        case 'crystal_spire':
            return <CrystalSpireSVG />;
        case 'floating_pyramid':
            return <FloatingPyramidSVG />;
        case 'rune_ring':
            return <RuneRingSVG />;
        case 'sandstone_wall':
            return <SandstoneWallSVG w={obstacle.w} h={obstacle.h} />;
        case 'cactus':
            return <CactusSVG />;
        case 'obelisk':
            return <AncientObeliskSVG />;
        case 'urn':
            return <AncientUrnSVG />;
        case 'obsidian_spire':
            return <ObsidianSpireSVG />;
        case 'lava_vent':
            return <LavaVentSVG />;
        case 'brazier':
            return <InfernoBrazierSVG />;
        case 'magma_rock':
            return <MagmaRockSVG />;
        default:
            return null;
    }
}

export function RenderEnemy({ type }) {
    switch (type) {
        case 'knight_ghost':
            return <KnightGhostSVG />;
        case 'cosmic_orb':
            return <CosmicOrbSVG />;
        case 'scarab':
            return <ScarabSVG />;
        case 'fire_demon':
            return <FireDemonSVG />;
        case 'ghost':
        default:
            return <ForestGhostSVG />;
    }
}
