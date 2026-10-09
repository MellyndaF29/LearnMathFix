<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        $gameQuestions = [
            1 => [
                ['Jika ada 5 apel di keranjang dan penyihir memasukkan 7 apel lagi, berapa jumlah apel sekarang?', ['10', '12', '14', '15'], 'B'],
                ['Di hutan matematika, kamu menemukan 15 koin emas. Kemudian kamu harus membayar 6 koin untuk melewati jembatan. Sisa koinmu adalah?', ['8', '9', '10', '11'], 'B'],
                ['Seorang ksatria memiliki 3 ramuan penyembuh. Ia menemukan peti berisi ramuan sehingga jumlah ramuannya menjadi 8. Berapa ramuan di dalam peti?', ['4', '5', '6', '7'], 'B'],
                ['Jika kamu melangkah 4 langkah ke utara, lalu 5 langkah lagi ke utara, berapa total langkahmu?', ['8', '9', '10', '7'], 'B'],
                ['Seekor naga memiliki 20 butir telur, tapi 5 butir dicuri. Telur yang tersisa adalah?', ['10', '12', '15', '20'], 'C'],
            ],
            2 => [
                ['Kamu membelah sebuah roti ajaib menjadi 4 bagian. Jika kamu makan 1 bagian, berapa bagian yang tersisa?', ['1/4', '1/2', '3/4', '1'], 'C'],
                ['Setengah (1/2) dari kekuatan pedang telah pulih. Jika kamu menggunakan ramuan yang memulihkan 1/4 kekuatan lagi, berapa total kekuatannya?', ['3/4', '1/2', '1', '2/3'], 'A'],
                ['Penyihir mencampur 0,5 liter ramuan biru dengan 0,25 liter ramuan merah. Berapa liter campuran ramuannya?', ['0,65', '0,75', '0,8', '1'], 'B'],
                ['Kamu memiliki 3/5 bagian emas dari harta karun. Temanmu mengambil 1/5 bagian. Sisa bagianmu?', ['1/5', '2/5', '4/5', '1'], 'B'],
                ['Sebuah tongkat sihir membutuhkan energi sebesar 1/2. Jika kamu memiliki energi 4/8, apakah energimu cukup?', ['Tidak', 'Ya, pas', 'Lebih', 'Kurang'], 'B'],
            ],
            3 => [
                ['Kamu memiliki 3 tas, masing-masing berisi 4 kristal. Berapa total kristalmu?', ['7', '10', '12', '15'], 'C'],
                ['Sebuah jembatan panjangnya 12 meter dan kamu harus menempatkan 4 obor dengan jarak yang sama. Berapa jarak antar obor?', ['2 meter', '3 meter', '4 meter', '6 meter'], 'B'],
                ['Seekor naga terbang 5 mil setiap jam. Berapa jauh dia terbang dalam 3 jam?', ['8 mil', '12 mil', '15 mil', '20 mil'], 'C'],
                ['Kamu menemukan 20 permata dan membagikannya secara adil kepada 5 temanmu. Berapa yang didapat setiap teman?', ['3', '4', '5', '6'], 'B'],
                ['Jika 1 ramuan harganya 3 koin, berapa harga 6 ramuan?', ['15 koin', '18 koin', '20 koin', '9 koin'], 'B'],
            ],
            4 => [
                ['Untuk membuka pintu rahasia, kamu harus menghitung: 2 + 3 × 4. Jawabannya adalah?', ['20', '14', '10', '24'], 'B'],
                ['Pecahkan teka-teki: (5 + 3) × 2 = ?', ['11', '13', '16', '10'], 'C'],
                ['Seorang penjaga bertanya: 10 - 4 ÷ 2 = ?', ['3', '5', '8', '6'], 'C'],
                ['Sandi peti harta karun: 3 × (4 + 2) - 5 = ?', ['13', '11', '15', '18'], 'A'],
                ['Berapa hasil dari: 20 ÷ (2 + 3) × 2?', ['2', '8', '10', '16'], 'B'],
            ],
            5 => [
                ['Jika pola koin adalah 2, 4, 6, 8, koin berikutnya adalah?', ['10', '12', '14', '9'], 'A'],
                ['Langkah pada batu ajaib: 1, 3, 6, 10, ... Angka selanjutnya adalah?', ['12', '14', '15', '16'], 'C'],
                ['Kode kombinasi: 1, 4, 9, 16. Berapakah angka selanjutnya?', ['20', '24', '25', '30'], 'C'],
                ['Deret mantra: 3, 6, 12, 24, ... Selanjutnya?', ['30', '36', '48', '60'], 'C'],
                ['Pola bintang: 100, 50, 25, ... Selanjutnya?', ['10', '12,5', '15', '20'], 'B'],
            ],
        ];

        $topics = Topic::orderBy('order')->get();

        foreach ($topics as $index => $topic) {
            $topicOrder = $index + 1;
            if (isset($gameQuestions[$topicOrder])) {
                foreach ($gameQuestions[$topicOrder] as $qIndex => $q) {
                    $topic->questions()->create([
                        'question_text' => $q[0],
                        'options' => [
                            'A' => $q[1][0],
                            'B' => $q[1][1],
                            'C' => $q[1][2],
                            'D' => $q[1][3],
                        ],
                        'correct_answer' => $q[2],
                        'explanation' => 'Penjelasan untuk soal game jelajah.',
                        'difficulty' => 'sedang',
                        'order' => $qIndex + 1,
                        'type' => 'game',
                    ]);
                }
            }
        }
    }
}
