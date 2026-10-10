<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class QuizLevel2And3Seeder extends Seeder
{
    public function run()
    {
        // Topic 1
        $t1 = Topic::where('id', 1)->first();
        if ($t1) {
            $this->seedTopic1($t1->id);
        }

        // Topic 2
        $t2 = Topic::where('id', 2)->first();
        if ($t2) {
            $this->seedTopic2($t2->id);
        }

        // Topic 3
        $t3 = Topic::where('id', 3)->first();
        if ($t3) {
            $this->seedTopic3($t3->id);
        }

        // Topic 4
        $t4 = Topic::where('id', 4)->first();
        if ($t4) {
            $this->seedTopic4($t4->id);
        }
    }

    private function seedTopic1($topicId)
    {
        $questions = [
            // Level 2
            [
                'quiz_level' => 2,
                'question_text' => 'Bentuk desimal dari pecahan campuran 2 1/4 adalah...',
                'options' => ['A' => '2.14', 'B' => '2.25', 'C' => '2.40', 'D' => '2.50'],
                'correct_answer' => 'B',
                'explanation' => '1/4 sama dengan 0.25, jadi 2 + 0.25 = 2.25',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Manakah di antara pecahan berikut yang nilainya paling besar?',
                'options' => ['A' => '2/3', 'B' => '5/6', 'C' => '3/4', 'D' => '7/12'],
                'correct_answer' => 'B',
                'explanation' => 'Ubah semua ke penyebut 12: 8/12, 10/12, 9/12, 7/12. Yang terbesar adalah 10/12 = 5/6.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Bentuk paling sederhana dari pecahan 18/24 adalah...',
                'options' => ['A' => '2/3', 'B' => '3/4', 'C' => '4/5', 'D' => '9/12'],
                'correct_answer' => 'B',
                'explanation' => 'Masing-masing dibagi FPB-nya yaitu 6. 18:6 = 3, 24:6 = 4. Jadi 3/4.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Urutan bilangan 0.4 ; 1/2 ; 3/8 dari yang terkecil hingga terbesar adalah...',
                'options' => ['A' => '0.4 ; 3/8 ; 1/2', 'B' => '3/8 ; 0.4 ; 1/2', 'C' => '1/2 ; 0.4 ; 3/8', 'D' => '3/8 ; 1/2 ; 0.4'],
                'correct_answer' => 'B',
                'explanation' => '3/8 = 0.375. Urutannya: 0.375 ; 0.400 ; 0.500',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Bilangan rasional mana yang letaknya tepat di antara 1/4 dan 1/2 pada garis bilangan?',
                'options' => ['A' => '1/3', 'B' => '3/8', 'C' => '2/5', 'D' => '5/12'],
                'correct_answer' => 'B',
                'explanation' => 'Rata-rata dari 1/4 dan 1/2 adalah (1/4 + 1/2) / 2 = (3/4) / 2 = 3/8.',
                'difficulty' => 'medium',
            ],

            // Level 3
            [
                'quiz_level' => 3,
                'question_text' => 'Bentuk pecahan biasa dari desimal berulang 0.3333... adalah...',
                'options' => ['A' => '1/3', 'B' => '3/10', 'C' => '33/100', 'D' => '1/4'],
                'correct_answer' => 'A',
                'explanation' => '0.333... adalah 1/3. Misal x = 0.333..., maka 10x = 3.333..., 9x = 3, x = 3/9 = 1/3.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Jika 125%, 1.2, dan 5/4 diubah menjadi bentuk desimal, pernyataan mana yang benar?',
                'options' => ['A' => '125% paling besar', 'B' => '1.2 adalah yang terbesar', 'C' => '125% = 5/4', 'D' => 'Semua bernilai beda'],
                'correct_answer' => 'C',
                'explanation' => '125% = 1.25. Dan 5/4 = 1.25. Keduanya sama, dan lebih besar dari 1.2.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Nilai dari pecahan bersusun 1 / (1 + 1/2) adalah...',
                'options' => ['A' => '1/2', 'B' => '2/3', 'C' => '3/2', 'D' => '1'],
                'correct_answer' => 'B',
                'explanation' => '1 + 1/2 = 3/2. Lalu 1 / (3/2) = 2/3.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Sebuah baju didiskon 20% kemudian didiskon lagi 25% dari harga yang baru. Total diskon terhadap harga awal adalah...',
                'options' => ['A' => '45%', 'B' => '40%', 'C' => '35%', 'D' => '50%'],
                'correct_answer' => 'B',
                'explanation' => 'Sisa setelah diskon 20% adalah 80% (atau 4/5). Diskon lagi 25% (1/4), sisa = 4/5 * 3/4 = 3/5 (60%). Berarti total diskon 40%.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Manakah pernyataan yang TIDAK benar mengenai bilangan rasional?',
                'options' => ['A' => 'Bilangan bulat selalu rasional', 'B' => 'Akar kuadrat dari 2 adalah rasional', 'C' => 'Desimal berhingga adalah rasional', 'D' => 'Pecahan p/q dengan q ≠ 0 adalah rasional'],
                'correct_answer' => 'B',
                'explanation' => 'Akar kuadrat dari 2 tidak dapat dinyatakan sebagai p/q, sehingga merupakan bilangan irasional.',
                'difficulty' => 'hard',
            ],
        ];

        foreach ($questions as $q) {
            $q['topic_id'] = $topicId;
            $q['type'] = 'multiple_choice';
            Question::create($q);
        }
    }

    private function seedTopic2($topicId)
    {
        $questions = [
            // Level 2
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 1/3 + 1/4 adalah...',
                'options' => ['A' => '2/7', 'B' => '7/12', 'C' => '5/12', 'D' => '1/12'],
                'correct_answer' => 'B',
                'explanation' => 'KPK 3 dan 4 adalah 12. 1/3 = 4/12. 1/4 = 3/12. 4/12 + 3/12 = 7/12.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 3 1/2 - 1 3/4 adalah...',
                'options' => ['A' => '1 3/4', 'B' => '2 1/4', 'C' => '1 1/4', 'D' => '2 3/4'],
                'correct_answer' => 'A',
                'explanation' => '3 1/2 = 7/2 = 14/4. 1 3/4 = 7/4. 14/4 - 7/4 = 7/4 = 1 3/4.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Andi memiliki pita 2.5 meter. Ia menggunakan 1 1/4 meter untuk mengikat kado. Sisa pita Andi adalah...',
                'options' => ['A' => '1.25 meter', 'B' => '1.5 meter', 'C' => '1 meter', 'D' => '1.75 meter'],
                'correct_answer' => 'A',
                'explanation' => '2.5 = 2 1/2 = 2.50. 1 1/4 = 1.25. 2.50 - 1.25 = 1.25 meter.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Nilai dari 0.85 - 2/5 adalah...',
                'options' => ['A' => '0.45', 'B' => '0.35', 'C' => '0.65', 'D' => '0.25'],
                'correct_answer' => 'A',
                'explanation' => '2/5 = 4/10 = 0.40. Jadi 0.85 - 0.40 = 0.45.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 5 - 2 2/3 adalah...',
                'options' => ['A' => '3 1/3', 'B' => '2 1/3', 'C' => '2 2/3', 'D' => '3 2/3'],
                'correct_answer' => 'B',
                'explanation' => '5 = 4 3/3. Maka 4 3/3 - 2 2/3 = 2 1/3.',
                'difficulty' => 'medium',
            ],

            // Level 3
            [
                'quiz_level' => 3,
                'question_text' => 'Nilai dari 1/4 - 2/3 adalah...',
                'options' => ['A' => '-5/12', 'B' => '5/12', 'C' => '-1/12', 'D' => '1/12'],
                'correct_answer' => 'A',
                'explanation' => 'KPK = 12. 1/4 = 3/12. 2/3 = 8/12. 3/12 - 8/12 = -5/12.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Sebuah bak air terisi 3/4 bagian. Karena bocor, air berkurang 1/5 bagian dari volume total bak. Setelah diisi lagi 0.3 bagian, berapa isi bak sekarang?',
                'options' => ['A' => '17/20', 'B' => '0.8', 'C' => '19/20', 'D' => '0.85'],
                'correct_answer' => 'A',
                'explanation' => '3/4 = 0.75. Berkurang 1/5 = 0.2, sisa 0.55. Ditambah 0.3 = 0.85. 0.85 = 85/100 = 17/20.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Berapakah nilai x yang memenuhi x + 1.25 = 3/2 ?',
                'options' => ['A' => '0.25', 'B' => '1/4', 'C' => '0.50', 'D' => 'A dan B benar'],
                'correct_answer' => 'D',
                'explanation' => '3/2 = 1.50. x = 1.50 - 1.25 = 0.25. Bentuk pecahan 0.25 adalah 1/4.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Hasil dari 5.4 - 2 1/3 + 0.6 adalah...',
                'options' => ['A' => '3 2/3', 'B' => '3 1/3', 'C' => '4', 'D' => '2 2/3'],
                'correct_answer' => 'A',
                'explanation' => '5.4 + 0.6 = 6.0. Lalu 6 - 2 1/3 = 5 3/3 - 2 1/3 = 3 2/3.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Ibu membeli gula 5 kg. Hari pertama dipakai 1 1/2 kg, hari kedua dipakai 1.75 kg. Berapa sisa gula Ibu?',
                'options' => ['A' => '1 3/4 kg', 'B' => '2 1/4 kg', 'C' => '1 1/2 kg', 'D' => '2 kg'],
                'correct_answer' => 'A',
                'explanation' => '1 1/2 = 1.5. Dipakai 1.5 + 1.75 = 3.25 kg. Sisa = 5 - 3.25 = 1.75 = 1 3/4 kg.',
                'difficulty' => 'hard',
            ],
        ];

        foreach ($questions as $q) {
            $q['topic_id'] = $topicId;
            $q['type'] = 'multiple_choice';
            Question::create($q);
        }
    }

    private function seedTopic3($topicId)
    {
        $questions = [
            // Level 2
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 2/3 x 3/4 adalah...',
                'options' => ['A' => '1/2', 'B' => '2/4', 'C' => '5/12', 'D' => '1/3'],
                'correct_answer' => 'A',
                'explanation' => '(2 x 3) / (3 x 4) = 6/12 = 1/2.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 1/2 : 1/4 adalah...',
                'options' => ['A' => '1/8', 'B' => '2', 'C' => '1/2', 'D' => '4'],
                'correct_answer' => 'B',
                'explanation' => '1/2 : 1/4 sama dengan 1/2 x 4/1 = 4/2 = 2.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 1.5 x 2 1/3 adalah...',
                'options' => ['A' => '3.5', 'B' => '3', 'C' => '3 1/2', 'D' => 'A dan C benar'],
                'correct_answer' => 'D',
                'explanation' => '1.5 = 3/2. 2 1/3 = 7/3. (3/2) x (7/3) = 21/6 = 7/2 = 3.5 atau 3 1/2.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Resep kue membutuhkan 1/4 liter susu. Jika ingin membuat 3 resep, berapa susu yang dibutuhkan?',
                'options' => ['A' => '3/4 liter', 'B' => '1 liter', 'C' => '1/2 liter', 'D' => '1 1/4 liter'],
                'correct_answer' => 'A',
                'explanation' => '3 x 1/4 = 3/4 liter.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Berapa banyak potongan tali sepanjang 2/5 meter yang dapat diperoleh dari tali 4 meter?',
                'options' => ['A' => '8', 'B' => '10', 'C' => '12', 'D' => '5'],
                'correct_answer' => 'B',
                'explanation' => '4 : (2/5) = 4 x (5/2) = 20/2 = 10 potongan.',
                'difficulty' => 'medium',
            ],

            // Level 3
            [
                'quiz_level' => 3,
                'question_text' => 'Hasil dari 15 x 2/5 x (-1/3) adalah...',
                'options' => ['A' => '-2', 'B' => '2', 'C' => '-3', 'D' => '3'],
                'correct_answer' => 'A',
                'explanation' => '15 x (2/5) = 6. Lalu 6 x (-1/3) = -2.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Sebuah mobil menempuh jarak 75 km dalam 1 1/2 jam. Kecepatan rata-rata mobil tersebut adalah... km/jam.',
                'options' => ['A' => '40', 'B' => '50', 'C' => '60', 'D' => '45'],
                'correct_answer' => 'B',
                'explanation' => 'Kecepatan = Jarak / Waktu = 75 : (3/2) = 75 x 2/3 = 50 km/jam.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Nilai dari (1/2)² : 1/8 adalah...',
                'options' => ['A' => '1/4', 'B' => '2', 'C' => '1/2', 'D' => '4'],
                'correct_answer' => 'B',
                'explanation' => '(1/2)² = 1/4. Maka 1/4 : 1/8 = 1/4 x 8/1 = 8/4 = 2.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Hasil dari 0.05 : (1/4 x 0.2) adalah...',
                'options' => ['A' => '1', 'B' => '0.1', 'C' => '10', 'D' => '0.01'],
                'correct_answer' => 'A',
                'explanation' => '1/4 x 0.2 = 0.25 x 0.2 = 0.05. Maka 0.05 : 0.05 = 1.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Budi mempunyai 4 1/2 karung beras. Setiap karung beratnya 10.5 kg. Total beras Budi adalah...',
                'options' => ['A' => '45.25 kg', 'B' => '47.25 kg', 'C' => '46.5 kg', 'D' => '48 kg'],
                'correct_answer' => 'B',
                'explanation' => '4.5 x 10.5 = 47.25 kg.',
                'difficulty' => 'hard',
            ],
        ];

        foreach ($questions as $q) {
            $q['topic_id'] = $topicId;
            $q['type'] = 'multiple_choice';
            Question::create($q);
        }
    }

    private function seedTopic4($topicId)
    {
        $questions = [
            // Level 2
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari (1/2 + 1/3) x 12 adalah...',
                'options' => ['A' => '8', 'B' => '10', 'C' => '12', 'D' => '14'],
                'correct_answer' => 'B',
                'explanation' => '(5/6) x 12 = 5 x 2 = 10.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Nilai dari 5/8 x 16 - 1/2 adalah...',
                'options' => ['A' => '9 1/2', 'B' => '9', 'C' => '10', 'D' => '10 1/2'],
                'correct_answer' => 'A',
                'explanation' => 'Perkalian dulu: 5/8 x 16 = 10. Lalu 10 - 1/2 = 9 1/2.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Andi punya Rp 50.000. Setengahnya untuk buku, dan 1/5 dari SISAnya untuk jajan. Sisa uang Andi sekarang?',
                'options' => ['A' => 'Rp 15.000', 'B' => 'Rp 20.000', 'C' => 'Rp 25.000', 'D' => 'Rp 10.000'],
                'correct_answer' => 'B',
                'explanation' => 'Buku = 25.000, sisa = 25.000. Jajan = 1/5 x 25.000 = 5.000. Sisa akhir = 25.000 - 5.000 = 20.000.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Langkah mana yang pertama kali dilakukan untuk menghitung: 2 + 3/4 x (1.5 - 1/2) ?',
                'options' => ['A' => 'Mengerjakan (1.5 - 1/2)', 'B' => 'Menghitung 2 + 3/4', 'C' => 'Mengalikan 3/4 dengan 1.5', 'D' => 'Semua salah'],
                'correct_answer' => 'A',
                'explanation' => 'Operasi di dalam tanda kurung selalu dikerjakan lebih dahulu.',
                'difficulty' => 'medium',
            ],
            [
                'quiz_level' => 2,
                'question_text' => 'Hasil dari 0.4 + 2/5 x 1.5 adalah...',
                'options' => ['A' => '1.2', 'B' => '1', 'C' => '0.8', 'D' => '1.5'],
                'correct_answer' => 'B',
                'explanation' => 'Perkalian dulu: 2/5 = 0.4. Maka 0.4 x 1.5 = 0.6. Kemudian 0.4 + 0.6 = 1.0.',
                'difficulty' => 'medium',
            ],

            // Level 3
            [
                'quiz_level' => 3,
                'question_text' => 'Nilai dari [ (2/3 + 1/4) x 1.2 ] - (1/2)² adalah...',
                'options' => ['A' => '1.1', 'B' => '0.85', 'C' => '0.75', 'D' => '1.25'],
                'correct_answer' => 'B',
                'explanation' => '2/3+1/4 = 11/12. 11/12 x 12/10 = 11/10 = 1.1. (1/2)² = 0.25. 1.1 - 0.25 = 0.85.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Jika 2/3 x (x + 1/4) = 1/2, maka nilai x adalah...',
                'options' => ['A' => '1/2', 'B' => '1/4', 'C' => '3/4', 'D' => '1/3'],
                'correct_answer' => 'A',
                'explanation' => 'x + 1/4 = (1/2) / (2/3) = 1/2 x 3/2 = 3/4. x = 3/4 - 1/4 = 2/4 = 1/2.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Nilai dari 1.5 : (-0.25) + 3 1/3 x 0.9 adalah...',
                'options' => ['A' => '-2', 'B' => '-3', 'C' => '3', 'D' => '4'],
                'correct_answer' => 'B',
                'explanation' => '1.5 / -0.25 = -6. Lalu 10/3 x 9/10 = 3. Maka -6 + 3 = -3.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Sebuah kue dimakan Ali 1/3 bagian, lalu Budi memakan 1/4 dari SISA kue tersebut. Sisa kue sekarang adalah...',
                'options' => ['A' => '1/2 bagian', 'B' => '5/12 bagian', 'C' => '1/4 bagian', 'D' => '2/3 bagian'],
                'correct_answer' => 'A',
                'explanation' => 'Sisa Ali = 2/3. Budi memakan 1/4 x 2/3 = 1/6. Sisa = 2/3 - 1/6 = 4/6 - 1/6 = 3/6 = 1/2.',
                'difficulty' => 'hard',
            ],
            [
                'quiz_level' => 3,
                'question_text' => 'Bentuk sederhana dari (1 - 1/2) x (1 - 1/3) x (1 - 1/4) adalah...',
                'options' => ['A' => '1/4', 'B' => '1/3', 'C' => '1/2', 'D' => '3/4'],
                'correct_answer' => 'A',
                'explanation' => '(1/2) x (2/3) x (3/4). Coret angka 2 dan 3, hasilnya = 1/4.',
                'difficulty' => 'hard',
            ],
        ];

        foreach ($questions as $q) {
            $q['topic_id'] = $topicId;
            $q['type'] = 'multiple_choice';
            Question::create($q);
        }
    }
}
