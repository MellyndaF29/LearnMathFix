/* ═══════════════════════════════════════════════════════════
   MAP CONFIGURATIONS FOR GAME JELAJAH (STAGES 1 - 5)
   Setiap map memiliki:
   - Tema visual & background gradient unik
   - Tata letak kristal (CRYSTAL_SPOTS) berbeda
   - Jalur winding path SVG (pathD) berbeda
   - Tata letak rintangan & ornamen berbeda
   - Rute patroli musuh (enemyPatrols) berbeda
   - Posisi awal pemain (startPos) berbeda
   - Jenis partikel ambient unik
═══════════════════════════════════════════════════════════ */

export const MAPS = {
    /* ─────────────────────────────────────────────────────────
       STAGE 1: HUTAN MATEMATIKA (Operasi Hitung Dasar)
       Tema: Hutan Ajaib Rindang (Enchanted Forest)
    ───────────────────────────────────────────────────────── */
    1: {
        id: 1,
        title: 'Hutan Matematika',
        subtitle: 'Operasi Hitung Dasar',
        theme: 'forest',
        startPos: { x: 14, y: 82 },
        bgStyle: {
            background: 'radial-gradient(ellipse at 30% 40%, #1a4731 0%, #0d2a16 55%, #051209 100%)',
        },
        gridOpacity: 'opacity-[0.04]',
        ambientGlows: [
            { left: '30%', top: '38%', width: '30%', height: '30%', color: 'rgba(74,222,128,0.1)' },
            { left: '68%', top: '18%', width: '24%', height: '24%', color: 'rgba(167,139,250,0.1)' },
            { left: '8%',  top: '62%', width: '22%', height: '22%', color: 'rgba(96,165,250,0.08)' },
        ],
        pathD: 'M 16 78 C 20 65,28 60,34 57 C 40 54,36 42,22 38 C 14 35,42 18,46 22 C 50 26,60 30,64 32 C 70 35,78 20,80 18 C 82 16,90 42,88 48 C 86 54,76 64,72 68 C 68 72,60 76,55 78',
        pathColors: {
            shadow: 'rgba(0,0,0,0.6)',
            base: '#c8a96e',
            dash: 'rgba(255,255,255,0.3)',
        },
        crystals: [
            { x: 18, y: 73 }, { x: 36, y: 57 }, { x: 22, y: 38 },
            { x: 46, y: 22 }, { x: 64, y: 32 }, { x: 80, y: 18 },
            { x: 88, y: 48 }, { x: 72, y: 68 }, { x: 55, y: 78 },
        ],
        enemies: [
            {
                type: 'ghost',
                waypoints: [{ x: 32, y: 43 }, { x: 56, y: 43 }, { x: 56, y: 62 }, { x: 32, y: 62 }],
                wpIdx: 0, x: 32, y: 43,
            },
            {
                type: 'ghost',
                waypoints: [{ x: 65, y: 20 }, { x: 83, y: 36 }, { x: 83, y: 20 }],
                wpIdx: 0, x: 65, y: 20,
            },
        ],
        obstacles: [
            // Trees around borders and inner clearings
            { type: 'tree', x: 5,  y: 12, s: 1.3 }, { type: 'tree', x: 15, y: 8,  s: 1.0 }, { type: 'tree', x: 32, y: 5,  s: 1.2 },
            { type: 'tree', x: 52, y: 7,  s: 0.9 }, { type: 'tree', x: 72, y: 5,  s: 1.1 }, { type: 'tree', x: 92, y: 8,  s: 1.3 },
            { type: 'tree', x: 97, y: 28, s: 0.9 }, { type: 'tree', x: 96, y: 62, s: 1.2 }, { type: 'tree', x: 90, y: 84, s: 1.0 },
            { type: 'tree', x: 68, y: 92, s: 1.3 }, { type: 'tree', x: 42, y: 94, s: 0.9 }, { type: 'tree', x: 18, y: 92, s: 1.1 },
            { type: 'tree', x: 3,  y: 75, s: 1.2 }, { type: 'tree', x: 3,  y: 45, s: 0.9 }, { type: 'tree', x: 12, y: 22, s: 0.8 },
            { type: 'tree', x: 40, y: 72, s: 0.9 }, { type: 'tree', x: 58, y: 50, s: 0.8 }, { type: 'tree', x: 75, y: 38, s: 0.9 },
            // Mushrooms
            { type: 'mushroom', x: 25, y: 82 }, { type: 'mushroom', x: 48, y: 45 }, { type: 'mushroom', x: 70, y: 78 },
            { type: 'mushroom', x: 85, y: 70 }, { type: 'mushroom', x: 10, y: 40 }, { type: 'mushroom', x: 60, y: 13 },
            // Rocks
            { type: 'rock', x: 52, y: 60 }, { type: 'rock', x: 28, y: 48 }, { type: 'rock', x: 78, y: 55 }, { type: 'rock', x: 43, y: 82 },
        ],
        particleType: 'firefly',
        particleColor: '#fef08a',
    },

    /* ─────────────────────────────────────────────────────────
       STAGE 2: KASTIL PECAHAN (Pecahan & Desimal)
       Tema: Benteng & Halaman Kastil Kuno (Stone Castle Courtyard)
    ───────────────────────────────────────────────────────── */
    2: {
        id: 2,
        title: 'Kastil Pecahan',
        subtitle: 'Pecahan & Desimal',
        theme: 'castle',
        startPos: { x: 12, y: 28 },
        bgStyle: {
            background: 'radial-gradient(ellipse at 50% 50%, #1e293b 0%, #0f172a 60%, #020617 100%)',
        },
        gridOpacity: 'opacity-[0.07]',
        ambientGlows: [
            { left: '45%', top: '30%', width: '35%', height: '35%', color: 'rgba(245,158,11,0.12)' },
            { left: '15%', top: '20%', width: '25%', height: '25%', color: 'rgba(59,130,246,0.1)' },
            { left: '75%', top: '60%', width: '25%', height: '25%', color: 'rgba(239,68,68,0.1)' },
        ],
        // Gerbang Kastil -> Koridor Utara -> Aula Tengah -> Menara Timur -> Sayap Selatan -> Altar Singgasana -> Ruang Harta
        pathD: 'M 14 26 C 24 24,28 20,38 20 C 46 20,48 30,50 36 C 54 44,72 26,82 24 C 88 28,88 52,86 64 C 82 74,72 78,62 76 C 54 74,50 64,48 54 C 44 46,32 74,24 78',
        pathColors: {
            shadow: 'rgba(0,0,0,0.7)',
            base: '#94a3b8',
            dash: 'rgba(245,158,11,0.5)',
        },
        crystals: [
            { x: 14, y: 26 }, { x: 38, y: 20 }, { x: 50, y: 36 },
            { x: 82, y: 24 }, { x: 86, y: 64 }, { x: 62, y: 76 },
            { x: 48, y: 54 }, { x: 36, y: 68 }, { x: 24, y: 78 },
        ],
        enemies: [
            {
                type: 'knight_ghost',
                waypoints: [{ x: 35, y: 30 }, { x: 65, y: 30 }, { x: 65, y: 48 }, { x: 35, y: 48 }],
                wpIdx: 0, x: 35, y: 30,
            },
            {
                type: 'knight_ghost',
                waypoints: [{ x: 68, y: 60 }, { x: 80, y: 78 }, { x: 58, y: 78 }],
                wpIdx: 0, x: 68, y: 60,
            },
        ],
        obstacles: [
            // Castle Towers at corners & gates
            { type: 'castle_tower', x: 6,  y: 12 }, { type: 'castle_tower', x: 94, y: 12 },
            { type: 'castle_tower', x: 6,  y: 92 }, { type: 'castle_tower', x: 94, y: 92 },
            { type: 'castle_tower', x: 50, y: 12 },
            // Torches (glowing wall torches)
            { type: 'torch', x: 22, y: 16 }, { type: 'torch', x: 74, y: 16 },
            { type: 'torch', x: 92, y: 42 }, { type: 'torch', x: 8,  y: 50 },
            { type: 'torch', x: 40, y: 45 }, { type: 'torch', x: 60, y: 45 },
            { type: 'torch', x: 48, y: 88 },
            // Knight Statues
            { type: 'knight_statue', x: 26, y: 35 }, { type: 'knight_statue', x: 74, y: 35 },
            { type: 'knight_statue', x: 70, y: 68 },
            // Stone Pillars
            { type: 'stone_pillar', x: 18, y: 55 }, { type: 'stone_pillar', x: 34, y: 55 },
            { type: 'stone_pillar', x: 80, y: 45 }, { type: 'stone_pillar', x: 40, y: 85 },
            // Treasure Chests
            { type: 'treasure_chest', x: 88, y: 74 }, { type: 'treasure_chest', x: 16, y: 84 },
        ],
        particleType: 'torch_spark',
        particleColor: '#f59e0b',
    },

    /* ─────────────────────────────────────────────────────────
       STAGE 3: MENARA GEOMETRI (Bangun Datar & Ruang)
       Tema: Dimensi Poligon Astral & Menara Kosmik (Astral Geometry Void)
    ───────────────────────────────────────────────────────── */
    3: {
        id: 3,
        title: 'Menara Geometri',
        subtitle: 'Bangun Datar & Ruang',
        theme: 'geometry',
        startPos: { x: 18, y: 84 },
        bgStyle: {
            background: 'radial-gradient(ellipse at 50% 40%, #3b0764 0%, #1e1b4b 60%, #090518 100%)',
        },
        gridOpacity: 'opacity-[0.08]',
        ambientGlows: [
            { left: '45%', top: '25%', width: '38%', height: '38%', color: 'rgba(6,182,212,0.15)' },
            { left: '15%', top: '55%', width: '30%', height: '30%', color: 'rgba(236,72,153,0.12)' },
            { left: '72%', top: '50%', width: '28%', height: '28%', color: 'rgba(168,85,247,0.15)' },
        ],
        // Pola Geometri: Nexus Bawah -> Sayap Kiri -> Puncak Piramida -> Nexus Kanan -> Inti Bintang Kosmik
        pathD: 'M 20 80 C 12 60,14 48,18 40 C 24 28,42 16,50 16 C 58 16,76 28,82 40 C 86 50,88 65,80 80 C 70 86,58 70,50 60 C 44 54,34 60,35 64 C 40 48,58 38,65 38 C 68 40,56 46,50 44',
        pathColors: {
            shadow: 'rgba(0,0,0,0.7)',
            base: '#06b6d4',
            dash: 'rgba(244,114,182,0.6)',
        },
        crystals: [
            { x: 20, y: 80 }, { x: 18, y: 40 }, { x: 50, y: 16 },
            { x: 82, y: 40 }, { x: 80, y: 80 }, { x: 50, y: 60 },
            { x: 35, y: 64 }, { x: 65, y: 38 }, { x: 50, y: 44 },
        ],
        enemies: [
            {
                type: 'cosmic_orb',
                waypoints: [{ x: 50, y: 25 }, { x: 75, y: 48 }, { x: 25, y: 48 }],
                wpIdx: 0, x: 50, y: 25,
            },
            {
                type: 'cosmic_orb',
                waypoints: [{ x: 35, y: 68 }, { x: 65, y: 68 }, { x: 50, y: 82 }],
                wpIdx: 0, x: 35, y: 68,
            },
        ],
        obstacles: [
            // Floating Polyhedrons (Prisma & Dodecahedron)
            { type: 'polyhedron', x: 8,  y: 18, color: '#38bdf8' }, { type: 'polyhedron', x: 92, y: 18, color: '#f43f5e' },
            { type: 'polyhedron', x: 8,  y: 86, color: '#a855f7' }, { type: 'polyhedron', x: 92, y: 86, color: '#06b6d4' },
            { type: 'polyhedron', x: 50, y: 8,  color: '#fbbf24' },
            // Geometric Astral Pillars
            { type: 'crystal_spire', x: 32, y: 28 }, { type: 'crystal_spire', x: 68, y: 28 },
            { type: 'crystal_spire', x: 20, y: 62 }, { type: 'crystal_spire', x: 80, y: 62 },
            // Floating Pyramids
            { type: 'floating_pyramid', x: 50, y: 30 }, { type: 'floating_pyramid', x: 34, y: 80 },
            { type: 'floating_pyramid', x: 66, y: 80 },
            // Geometric Rune Rings
            { type: 'rune_ring', x: 50, y: 52 }, { type: 'rune_ring', x: 32, y: 45 },
            { type: 'rune_ring', x: 68, y: 45 },
        ],
        particleType: 'stardust',
        particleColor: '#38bdf8',
    },

    /* ─────────────────────────────────────────────────────────
       STAGE 4: LABIRIN POLA (Pola Bilangan)
       Tema: Labirin Gurun Pasir Kuno & Reruntuhan Piramida (Desert Labyrinth)
    ───────────────────────────────────────────────────────── */
    4: {
        id: 4,
        title: 'Labirin Pola',
        subtitle: 'Pola Bilangan',
        theme: 'labyrinth',
        startPos: { x: 12, y: 18 },
        bgStyle: {
            background: 'radial-gradient(ellipse at 50% 50%, #78350f 0%, #451a03 60%, #1c0a02 100%)',
        },
        gridOpacity: 'opacity-[0.06]',
        ambientGlows: [
            { left: '40%', top: '40%', width: '40%', height: '40%', color: 'rgba(249,115,22,0.14)' },
            { left: '10%', top: '20%', width: '25%', height: '25%', color: 'rgba(234,179,8,0.12)' },
            { left: '80%', top: '70%', width: '30%', height: '30%', color: 'rgba(251,146,60,0.1)' },
        ],
        // Labirin Zig-Zag: Gerbang Masuk -> Lorong 1 -> Tikungan 2 -> Koridor Barat -> Lorong Selatan -> Pusat Labirin -> Koridor Timur -> Oasis Rahasia
        pathD: 'M 14 18 C 22 18,28 18,36 18 C 36 28,36 38,36 46 C 26 46,20 46,16 48 C 16 60,16 72,16 82 C 28 82,42 82,52 82 C 52 70,52 60,52 50 C 64 50,74 50,84 50 C 84 62,84 72,84 82',
        pathColors: {
            shadow: 'rgba(0,0,0,0.7)',
            base: '#d97706',
            dash: 'rgba(254,240,138,0.5)',
        },
        crystals: [
            { x: 14, y: 18 }, { x: 36, y: 18 }, { x: 36, y: 46 },
            { x: 16, y: 48 }, { x: 16, y: 82 }, { x: 52, y: 82 },
            { x: 52, y: 50 }, { x: 84, y: 50 }, { x: 84, y: 82 },
        ],
        enemies: [
            {
                type: 'scarab',
                waypoints: [{ x: 45, y: 20 }, { x: 75, y: 20 }, { x: 75, y: 38 }, { x: 45, y: 38 }],
                wpIdx: 0, x: 45, y: 20,
            },
            {
                type: 'scarab',
                waypoints: [{ x: 26, y: 64 }, { x: 72, y: 64 }],
                wpIdx: 0, x: 26, y: 64,
            },
        ],
        obstacles: [
            // Sandstone Labyrinth Walls (Membentuk sekat labirin nyata)
            { type: 'sandstone_wall', x: 25, y: 32, w: 22, h: 4 },
            { type: 'sandstone_wall', x: 45, y: 35, w: 4,  h: 22 },
            { type: 'sandstone_wall', x: 68, y: 22, w: 22, h: 4 },
            { type: 'sandstone_wall', x: 34, y: 68, w: 24, h: 4 },
            { type: 'sandstone_wall', x: 68, y: 68, w: 4,  h: 24 },
            // Desert Cacti
            { type: 'cactus', x: 8,  y: 35 }, { type: 'cactus', x: 88, y: 20 },
            { type: 'cactus', x: 26, y: 92 }, { type: 'cactus', x: 72, y: 90 },
            { type: 'cactus', x: 92, y: 62 },
            // Ancient Hieroglyph Obelisks
            { type: 'obelisk', x: 6,  y: 12 }, { type: 'obelisk', x: 94, y: 12 },
            { type: 'obelisk', x: 60, y: 30 }, { type: 'obelisk', x: 40, y: 60 },
            // Desert Urns & Relics
            { type: 'urn', x: 22, y: 12 }, { type: 'urn', x: 24, y: 52 },
            { type: 'urn', x: 60, y: 84 }, { type: 'urn', x: 92, y: 84 },
        ],
        particleType: 'sand_drift',
        particleColor: '#fbbf24',
    },

    /* ─────────────────────────────────────────────────────────
       STAGE 5: MENARA ANGKA (Campuran Soal & Tantangan Final)
       Tema: Puncak Gunung Api Obsidian & Citadel Lava (Volcanic Citadel)
    ───────────────────────────────────────────────────────── */
    5: {
        id: 5,
        title: 'Menara Angka',
        subtitle: 'Campuran Soal & Tantangan Final',
        theme: 'volcano',
        startPos: { x: 14, y: 86 },
        bgStyle: {
            background: 'radial-gradient(ellipse at 50% 50%, #450a0a 0%, #1f0407 60%, #0a0103 100%)',
        },
        gridOpacity: 'opacity-[0.06]',
        ambientGlows: [
            { left: '42%', top: '40%', width: '42%', height: '42%', color: 'rgba(239,68,68,0.2)' },
            { left: '15%', top: '25%', width: '30%', height: '30%', color: 'rgba(249,115,22,0.16)' },
            { left: '70%', top: '65%', width: '32%', height: '32%', color: 'rgba(220,38,38,0.18)' },
        ],
        // Spiral Menanjak Kawah: Kaki Menara -> Lereng Barat -> Teras Barat Laut -> Jembatan Lava Utara -> Teras Timur Laut -> Lereng Timur -> Jembatan Selatan -> Gerbang Kawah -> Singgasana Magma
        pathD: 'M 16 86 C 12 68,14 54,16 46 C 18 34,26 24,34 22 C 42 20,48 18,54 18 C 66 18,74 22,78 26 C 84 34,86 52,84 62 C 82 74,74 84,66 84 C 58 84,50 78,50 68 C 50 62,50 54,50 48',
        pathColors: {
            shadow: 'rgba(0,0,0,0.8)',
            base: '#ef4444',
            dash: 'rgba(254,240,138,0.7)',
        },
        crystals: [
            { x: 16, y: 86 }, { x: 16, y: 46 }, { x: 34, y: 22 },
            { x: 54, y: 18 }, { x: 78, y: 26 }, { x: 84, y: 62 },
            { x: 66, y: 84 }, { x: 50, y: 68 }, { x: 50, y: 48 },
        ],
        enemies: [
            {
                type: 'fire_demon',
                waypoints: [{ x: 30, y: 40 }, { x: 70, y: 40 }, { x: 70, y: 60 }, { x: 30, y: 60 }],
                wpIdx: 0, x: 30, y: 40,
            },
            {
                type: 'fire_demon',
                waypoints: [{ x: 36, y: 28 }, { x: 64, y: 28 }],
                wpIdx: 0, x: 36, y: 28,
            },
        ],
        obstacles: [
            // Obsidian Spires
            { type: 'obsidian_spire', x: 6,  y: 12 }, { type: 'obsidian_spire', x: 94, y: 12 },
            { type: 'obsidian_spire', x: 6,  y: 92 }, { type: 'obsidian_spire', x: 94, y: 92 },
            { type: 'obsidian_spire', x: 44, y: 12 }, { type: 'obsidian_spire', x: 64, y: 12 },
            // Lava Vents (Celah magma menyala)
            { type: 'lava_vent', x: 30, y: 52 }, { type: 'lava_vent', x: 70, y: 52 },
            { type: 'lava_vent', x: 50, y: 32 }, { type: 'lava_vent', x: 38, y: 78 },
            // Inferno Braziers
            { type: 'brazier', x: 24, y: 36 }, { type: 'brazier', x: 76, y: 36 },
            { type: 'brazier', x: 32, y: 84 }, { type: 'brazier', x: 80, y: 82 },
            // Magma Rocks
            { type: 'magma_rock', x: 10, y: 66 }, { type: 'magma_rock', x: 90, y: 44 },
            { type: 'magma_rock', x: 60, y: 60 },
        ],
        particleType: 'magma_ember',
        particleColor: '#f97316',
    },
};
