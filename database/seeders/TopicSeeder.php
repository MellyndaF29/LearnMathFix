<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    public function run(): void
    {
        $topics = [
            [
                'title' => 'Bagian 1: Mengenal Bilangan Rasional',
                'slug' => 'mengenal-bilangan-rasional',
                'icon' => '1️⃣',
                'category' => 'Bilangan',
                'description' => 'Memahami pengertian, bentuk, dan cara mengenali bilangan rasional.',
                'color' => '#1768bd',
                'difficulty' => 'mudah',
                'total_materi' => 3,
                'total_kuis' => 3,
                'order' => 1,
                'sections' => [
                    ['Materi 1', 'Apa Itu Bilangan Rasional?', 'Bilangan rasional adalah bilangan yang dapat ditulis dalam bentuk a/b, dengan a dan b bilangan bulat dan b tidak sama dengan 0.', 'Contoh: 1/2, -3/4, 5, dan 0,25 merupakan bilangan rasional karena dapat ditulis sebagai pecahan.'],
                    ['Materi 2', 'Bentuk Bilangan Rasional', 'Bilangan rasional dapat berbentuk pecahan biasa, pecahan campuran, bilangan bulat, desimal berhingga, atau desimal berulang.', '2 = 2/1, 0,5 = 1/2, dan 0,333... = 1/3.'],
                    ['Materi 3', 'Mengenali Bilangan Rasional', 'Untuk menentukan apakah suatu bilangan rasional, periksa apakah bilangan tersebut dapat dinyatakan sebagai perbandingan dua bilangan bulat dengan penyebut bukan nol.', '√4 = 2 adalah rasional, sedangkan √2 tidak dapat dinyatakan sebagai a/b dengan a dan b bulat.'],
                ],
                'levels' => [
                    [
                        'name' => 'Kuis 1 — Pengertian',
                        'questions' => [
                            ['Bilangan rasional adalah bilangan yang dapat ditulis dalam bentuk ...', ['a/b dengan a,b bilangan bulat dan b ≠ 0', 'a/b dengan b = 0', 'a+b dengan a,b sembarang', 'a²'], 0, 'Bilangan rasional dapat ditulis sebagai a/b dengan a dan b bilangan bulat serta b tidak boleh 0.'],
                            ['Manakah yang merupakan bilangan rasional?', ['√2', 'π', '3/5', '√3'], 2, '3/5 sudah berbentuk perbandingan dua bilangan bulat dengan penyebut bukan nol.'],
                            ['Bilangan 7 dapat ditulis sebagai ...', ['7/0', '0/7', '7/1', '1/7'], 2, 'Setiap bilangan bulat dapat ditulis sebagai bilangan tersebut dibagi 1, jadi 7 = 7/1.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 2 — Bentuk Bilangan',
                        'questions' => [
                            ['Bentuk pecahan dari 0,5 adalah ...', ['1/5', '1/2', '5/2', '2/5'], 1, '0,5 = 5/10 = 1/2 setelah disederhanakan.'],
                            ['Bentuk pecahan dari 2 adalah ...', ['2/0', '2/1', '1/2', '0/2'], 1, 'Bilangan bulat 2 dapat ditulis sebagai 2/1.'],
                            ['Bilangan 0,75 setara dengan ...', ['1/4', '2/3', '3/4', '4/5'], 2, '0,75 = 75/100 = 3/4 setelah disederhanakan.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 3 — Mengenali',
                        'questions' => [
                            ['Manakah yang bukan bilangan rasional?', ['4', '-2/3', '√2', '0,25'], 2, '√2 adalah bilangan irasional karena tidak dapat dinyatakan sebagai a/b dengan a dan b bilangan bulat.'],
                            ['Apakah √9 merupakan bilangan rasional?', ['Ya, karena √9 = 3', 'Tidak, karena semua akar irasional', 'Tidak, karena 9 bukan pecahan', 'Ya, karena √9 = 9/0'], 0, '√9 = 3 dan 3 = 3/1, sehingga √9 merupakan bilangan rasional.'],
                            ['Manakah pasangan yang keduanya rasional?', ['√2 dan π', '1/3 dan 0,2', '√5 dan √7', 'π dan √3'], 1, '1/3 dan 0,2 keduanya dapat ditulis sebagai perbandingan bilangan bulat.'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Bagian 2: Penjumlahan & Pengurangan',
                'slug' => 'penjumlahan-pengurangan',
                'icon' => '➕',
                'category' => 'Bilangan',
                'description' => 'Memahami cara menjumlahkan dan mengurangkan bilangan rasional.',
                'color' => '#2f9461',
                'difficulty' => 'sedang',
                'total_materi' => 3,
                'total_kuis' => 3,
                'order' => 2,
                'sections' => [
                    ['Materi 1', 'Penjumlahan Bilangan Rasional', 'Jika penyebut sama, jumlahkan pembilangnya. Jika penyebut berbeda, samakan penyebut terlebih dahulu.', '1/4 + 2/4 = 3/4. Untuk 1/2 + 1/3, samakan penyebut menjadi 6: 3/6 + 2/6 = 5/6.'],
                    ['Materi 2', 'Pengurangan Bilangan Rasional', 'Pengurangan dilakukan dengan prinsip yang sama: penyebut harus sama sebelum pembilang dikurangkan.', '3/4 - 1/4 = 2/4 = 1/2.'],
                    ['Materi 3', 'Menyederhanakan Hasil', 'Setelah menjumlahkan atau mengurangkan, sederhanakan pecahan dengan membagi pembilang dan penyebut menggunakan FPB.', '6/8 = 3/4 karena 6 dan 8 sama-sama dibagi 2.'],
                ],
                'levels' => [
                    [
                        'name' => 'Kuis 1 — Penjumlahan',
                        'questions' => [
                            ['1/4 + 2/4 = ...', ['2/4', '3/4', '3/8', '1/2'], 1, 'Penyebut sama, jadi pembilang dijumlahkan: 1 + 2 = 3, sehingga hasilnya 3/4.'],
                            ['1/2 + 1/2 = ...', ['1/2', '1', '2', '1/4'], 1, '1/2 + 1/2 = 2/2 = 1.'],
                            ['1/3 + 1/6 = ...', ['2/9', '1/2', '2/6', '1/3'], 1, 'Samakan penyebut menjadi 6: 1/3 = 2/6, lalu 2/6 + 1/6 = 3/6 = 1/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 2 — Pengurangan',
                        'questions' => [
                            ['3/5 - 1/5 = ...', ['2/5', '2/10', '1/5', '4/5'], 0, 'Penyebut sama, jadi 3 - 1 = 2. Hasilnya 2/5.'],
                            ['3/4 - 1/2 = ...', ['1/4', '2/4', '1/2', '3/2'], 0, '1/2 = 2/4, sehingga 3/4 - 2/4 = 1/4.'],
                            ['5/6 - 1/3 = ...', ['4/3', '1/2', '2/6', '1/6'], 1, '1/3 = 2/6, sehingga 5/6 - 2/6 = 3/6 = 1/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 3 — Penyederhanaan',
                        'questions' => [
                            ['4/8 jika disederhanakan menjadi ...', ['1/2', '2/3', '4/4', '1/4'], 0, '4 dan 8 dibagi FPB 4, sehingga 4/8 = 1/2.'],
                            ['2/3 + 1/6 = ...', ['3/9', '5/6', '2/6', '1'], 1, '2/3 = 4/6, sehingga 4/6 + 1/6 = 5/6.'],
                            ['7/8 - 1/4 = ...', ['6/8', '5/8', '3/4', '1/2'], 1, '1/4 = 2/8, sehingga 7/8 - 2/8 = 5/8.'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Bagian 3: Perkalian & Pembagian',
                'slug' => 'perkalian-pembagian',
                'icon' => '✖️',
                'category' => 'Bilangan',
                'description' => 'Memahami aturan perkalian, pembagian, dan penyederhanaan bilangan rasional.',
                'color' => '#d0553a',
                'difficulty' => 'susah',
                'total_materi' => 3,
                'total_kuis' => 3,
                'order' => 3,
                'sections' => [
                    ['Materi 1', 'Perkalian Bilangan Rasional', 'Kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Hasilnya kemudian dapat disederhanakan.', '2/3 × 3/5 = 6/15 = 2/5.'],
                    ['Materi 2', 'Pembagian Bilangan Rasional', 'Untuk membagi pecahan, ubah menjadi perkalian dengan membalik pecahan kedua.', '3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8.'],
                    ['Materi 3', 'Menyederhanakan Hasil Perkalian & Pembagian', 'Sebelum atau sesudah menghitung, faktor yang sama dapat disederhanakan agar perhitungan lebih mudah.', '2/3 × 9/4 = 18/12 = 3/2.'],
                ],
                'levels' => [
                    [
                        'name' => 'Kuis 1 — Perkalian',
                        'questions' => [
                            ['2/3 × 3/5 = ...', ['2/5', '6/15', '3/8', '5/2'], 0, '2×3/(3×5) = 6/15 = 2/5.'],
                            ['1/2 × 4 = ...', ['1', '2', '4', '8'], 1, '1/2 × 4 = 4/2 = 2.'],
                            ['3/4 × 2/3 = ...', ['1/2', '6/7', '2/3', '3/2'], 0, '3×2/(4×3) = 6/12 = 1/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 2 — Pembagian',
                        'questions' => [
                            ['4/5 ÷ 2/5 = ...', ['2', '2/5', '8/25', '1/2'], 0, '4/5 × 5/2 = 20/10 = 2.'],
                            ['1/2 ÷ 1/4 = ...', ['1/8', '2', '1/2', '4'], 1, '1/2 × 4/1 = 4/2 = 2.'],
                            ['3/4 ÷ 1/2 = ...', ['3/8', '3/2', '1/2', '2/3'], 1, '3/4 × 2/1 = 6/4 = 3/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 3 — Sederhanakan',
                        'questions' => [
                            ['2/3 × 9/4 = ...', ['3/2', '18/7', '2/3', '6/4'], 0, '18/12 disederhanakan menjadi 3/2.'],
                            ['5/6 ÷ 5/12 = ...', ['1/2', '2', '5/2', '10'], 1, '5/6 × 12/5 = 12/6 = 2.'],
                            ['3/5 × 10/9 = ...', ['2/3', '30/45', '3/2', '5/6'], 0, '30/45 disederhanakan dengan 15 menjadi 2/3.'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Bagian 4: Operasi Campuran',
                'slug' => 'operasi-campuran',
                'icon' => '🧮',
                'category' => 'Bilangan',
                'description' => 'Menyelesaikan operasi campuran bilangan rasional dengan urutan operasi yang tepat.',
                'color' => '#c9a45c',
                'difficulty' => 'susah',
                'total_materi' => 3,
                'total_kuis' => 3,
                'order' => 4,
                'sections' => [
                    ['Materi 1', 'Memahami Operasi Campuran', 'Dalam operasi campuran, kerjakan perkalian dan pembagian terlebih dahulu, kemudian penjumlahan dan pengurangan.', '1 + 1/2 × 2/3 = 1 + 1/3 = 4/3.'],
                    ['Materi 2', 'Operasi dengan Tanda Kurung', 'Tanda kurung dikerjakan terlebih dahulu. Setelah itu ikuti urutan operasi seperti biasa.', '(1/2 + 1/4) × 2 = 3/4 × 2 = 3/2.'],
                    ['Materi 3', 'Menyelesaikan Operasi Campuran', 'Tuliskan setiap langkah secara berurutan agar tidak tertukar antara operasi yang harus dikerjakan lebih dahulu.', '1 - 1/2 × 2/3 = 1 - 1/3 = 2/3.'],
                ],
                'levels' => [
                    [
                        'name' => 'Kuis 1 — Urutan Operasi',
                        'questions' => [
                            ['1 + 1/2 × 2/3 = ...', ['2/3', '1', '4/3', '5/3'], 2, 'Kerjakan perkalian dulu: 1/2 × 2/3 = 1/3. Lalu 1 + 1/3 = 4/3.'],
                            ['2 - 1/2 × 2 = ...', ['1', '0', '2', '3'], 0, 'Perkalian dulu: 1/2 × 2 = 1. Kemudian 2 - 1 = 1.'],
                            ['1/2 + 1/3 × 3 = ...', ['5/6', '3/2', '1/2', '3/2?'], 1, 'Perkalian dulu: 1/3 × 3 = 1. Kemudian 1/2 + 1 = 3/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 2 — Tanda Kurung',
                        'questions' => [
                            ['(1/2 + 1/4) × 2 = ...', ['3/4', '1', '3/2', '2'], 2, 'Kerjakan kurung: 1/2 + 1/4 = 3/4. Lalu 3/4 × 2 = 3/2.'],
                            ['(3/4 - 1/4) ÷ 2/3 = ...', ['1/3', '3/4', '2/3', '1/2'], 1, 'Kurung: 3/4 - 1/4 = 1/2. Lalu 1/2 ÷ 2/3 = 1/2 × 3/2 = 3/4.'],
                            ['(2/3 + 1/3) - 1/2 = ...', ['1/2', '2/3', '1', '3/2'], 0, 'Kurung menghasilkan 1, lalu 1 - 1/2 = 1/2.'],
                        ],
                    ],
                    [
                        'name' => 'Kuis 3 — Operasi Campuran',
                        'questions' => [
                            ['1 - 1/2 × 2/3 = ...', ['2/3', '1/3', '1/2', '1/6'], 0, 'Perkalian dulu: 1/2 × 2/3 = 1/3. Kemudian 1 - 1/3 = 2/3.'],
                            ['2/3 + 1/2 × 4/3 = ...', ['1', '4/3', '5/3', '2'], 2, 'Perkalian: 1/2 × 4/3 = 2/3. Kemudian 2/3 + 2/3 = 4/3.'],
                            ['(1 - 1/3) ÷ 2/3 = ...', ['1/3', '1', '2/3', '3/2'], 1, 'Kurung: 1 - 1/3 = 2/3. Lalu 2/3 ÷ 2/3 = 1.'],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($topics as $topicData) {
            $sectionsData = $topicData['sections'];
            $levelsData = $topicData['levels'];
            unset($topicData['sections'], $topicData['levels']);

            $topic = Topic::create($topicData);

            // Add sections (materi)
            foreach ($sectionsData as $index => $section) {
                $topic->sections()->create([
                    'title' => $section[1],
                    'content' => "<div class=\"eyebrow\">{$section[0]}</div><h3>{$section[1]}</h3><p>{$section[2]}</p><div class=\"example\">{$section[3]}</div>",
                    'order' => $index + 1,
                    'type' => 'materi',
                ]);
            }

            // Add questions (kuis)
            $qOrder = 1;
            foreach ($levelsData as $levelIndex => $level) {
                foreach ($level['questions'] as $qIndex => $question) {
                    $options = [
                        'A' => $question[1][0],
                        'B' => $question[1][1],
                        'C' => $question[1][2],
                        'D' => $question[1][3],
                    ];
                    $correctKeys = ['A', 'B', 'C', 'D'];
                    $topic->questions()->create([
                        'question_text' => $question[0],
                        'options' => $options,
                        'correct_answer' => $correctKeys[$question[2]],
                        'explanation' => $question[3],
                        'difficulty' => $topicData['difficulty'],
                        'order' => $qOrder++,
                        'quiz_level' => $levelIndex + 1,
                    ]);
                }
            }
        }
    }
}
