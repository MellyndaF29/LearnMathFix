<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

/**
 * Converts old hand-written HTML (div.eyebrow, h3, div.example) to
 * clean Quill-compatible HTML (h2, p, blockquote).
 *
 * Safe to run multiple times — it skips sections that are already clean.
 */
class MigrateOldSectionContentSeeder extends Seeder
{
    /** @var array<int, string> */
    private array $cleanContent = [
        1 => '<h2>Apa Itu Bilangan Rasional?</h2><p>Bilangan rasional adalah bilangan yang dapat ditulis dalam bentuk a/b, dengan a dan b bilangan bulat dan b tidak sama dengan 0.</p><blockquote>Contoh: 1/2, -3/4, 5, dan 0,25 merupakan bilangan rasional karena dapat ditulis sebagai pecahan.</blockquote>',
        2 => '<h2>Bentuk Bilangan Rasional</h2><p>Bilangan rasional dapat berbentuk pecahan biasa, pecahan campuran, bilangan bulat, desimal berhingga, atau desimal berulang.</p><blockquote>2 = 2/1, 0,5 = 1/2, dan 0,333... = 1/3.</blockquote>',
        3 => '<h2>Mengenali Bilangan Rasional</h2><p>Untuk menentukan apakah suatu bilangan rasional, periksa apakah bilangan tersebut dapat dinyatakan sebagai perbandingan dua bilangan bulat dengan penyebut bukan nol.</p><blockquote>&#x221A;4 = 2 adalah rasional, sedangkan &#x221A;2 tidak dapat dinyatakan sebagai a/b dengan a dan b bulat.</blockquote>',
        4 => '<h2>Penjumlahan Bilangan Rasional</h2><p>Jika penyebut sama, jumlahkan pembilangnya. Jika penyebut berbeda, samakan penyebut terlebih dahulu.</p><blockquote>1/4 + 2/4 = 3/4. Untuk 1/2 + 1/3, samakan penyebut menjadi 6: 3/6 + 2/6 = 5/6.</blockquote>',
        5 => '<h2>Pengurangan Bilangan Rasional</h2><p>Pengurangan dilakukan dengan prinsip yang sama: penyebut harus sama sebelum pembilang dikurangkan.</p><blockquote>3/4 - 1/4 = 2/4 = 1/2.</blockquote>',
        6 => '<h2>Menyederhanakan Hasil</h2><p>Setelah menjumlahkan atau mengurangkan, sederhanakan pecahan dengan membagi pembilang dan penyebut menggunakan FPB.</p><blockquote>6/8 = 3/4 karena 6 dan 8 sama-sama dibagi 2.</blockquote>',
        7 => '<h2>Perkalian Bilangan Rasional</h2><p>Kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Hasilnya kemudian dapat disederhanakan.</p><blockquote>2/3 &times; 3/5 = 6/15 = 2/5.</blockquote>',
        8 => '<h2>Pembagian Bilangan Rasional</h2><p>Untuk membagi pecahan, ubah menjadi perkalian dengan membalik pecahan kedua.</p><blockquote>3/4 &divide; 2/5 = 3/4 &times; 5/2 = 15/8.</blockquote>',
        9 => '<h2>Menyederhanakan Hasil Perkalian &amp; Pembagian</h2><p>Sebelum atau sesudah menghitung, faktor yang sama dapat disederhanakan agar perhitungan lebih mudah.</p><blockquote>2/3 &times; 9/4 = 18/12 = 3/2.</blockquote>',
        10 => '<h2>Memahami Operasi Campuran</h2><p>Dalam operasi campuran, kerjakan perkalian dan pembagian terlebih dahulu, kemudian penjumlahan dan pengurangan.</p><blockquote>1 + 1/2 &times; 2/3 = 1 + 1/3 = 4/3.</blockquote>',
        11 => '<h2>Operasi dengan Tanda Kurung</h2><p>Tanda kurung dikerjakan terlebih dahulu. Setelah itu ikuti urutan operasi seperti biasa.</p><blockquote>(1/2 + 1/4) &times; 2 = 3/4 &times; 2 = 3/2.</blockquote>',
        12 => '<h2>Menyelesaikan Operasi Campuran</h2><p>Tuliskan setiap langkah secara berurutan agar tidak tertukar antara operasi yang harus dikerjakan lebih dahulu.</p><blockquote>1 - 1/2 &times; 2/3 = 1 - 1/3 = 2/3.</blockquote>',
    ];

    public function run(): void
    {
        foreach ($this->cleanContent as $id => $html) {
            $section = Section::find($id);

            if (! $section) {
                $this->command->warn("Section ID {$id} tidak ditemukan, dilewati.");

                continue;
            }

            if (! str_contains($section->content, 'eyebrow') && ! str_contains($section->content, 'class="example"')) {
                $this->command->info("Section ID {$id} ({$section->title}) sudah bersih, dilewati.");

                continue;
            }

            $section->update(['content' => $html]);
            $this->command->info("Migrated Section ID {$id}: {$section->title}");
        }

        $this->command->info('Migrasi konten selesai.');
    }
}
