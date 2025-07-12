# Jurnal Pribadi Online (Personal Diary App)

Aplikasi jurnal pribadi online yang memungkinkan pengguna untuk menulis, menyimpan, dan mengelola catatan harian mereka dengan fitur keamanan dan mode gelap.

## Fitur Utama

### 🔐 Autentikasi
- **Login & Register**: Sistem autentikasi lengkap dengan email dan password
- **Keamanan**: Data pengguna disimpan secara lokal dengan enkripsi opsional
- **Sesi**: Pengguna tetap login sampai logout manual

### 📝 Manajemen Catatan
- **Tulis Catatan**: Editor teks yang nyaman untuk menulis catatan harian
- **Judul & Konten**: Setiap catatan memiliki judul dan konten yang terpisah
- **Tanggal Otomatis**: Timestamp otomatis untuk setiap catatan
- **Hitung Kata**: Fitur penghitung kata real-time

### 🔒 Keamanan
- **Enkripsi Opsional**: Fitur enkripsi data dengan toggle on/off
- **Penyimpanan Lokal**: Data disimpan di browser pengguna
- **Privasi**: Hanya pengguna yang login yang dapat mengakses catatan mereka

### 🌙 Mode Gelap
- **Toggle Mode**: Beralih antara mode terang dan gelap
- **Penyimpanan Preferensi**: Preferensi mode disimpan untuk sesi berikutnya
- **Desain Responsif**: Tampilan yang optimal di berbagai ukuran layar

## Cara Menggunakan

### 1. Memulai Aplikasi
1. Buka file `index.html` di browser web Anda
2. Aplikasi akan langsung memuat dan siap digunakan

### 2. Membuat Akun
1. Klik "Daftar" di halaman login
2. Isi formulir pendaftaran:
   - Nama Lengkap
   - Email
   - Password
   - Konfirmasi Password
3. Klik "Daftar" untuk membuat akun

### 3. Login
1. Masukkan email dan password yang sudah didaftarkan
2. Klik "Masuk" untuk mengakses jurnal pribadi

### 4. Menulis Catatan
1. Klik tombol "Catatan Baru" di sidebar
2. Isi judul catatan (opsional)
3. Tulis konten catatan di area editor
4. Klik "Simpan" untuk menyimpan catatan

### 5. Mengelola Catatan
- **Melihat Catatan**: Klik catatan di sidebar untuk membuka
- **Edit Catatan**: Ubah judul atau konten, lalu klik "Simpan"
- **Hapus Catatan**: Klik tombol "Hapus" untuk menghapus catatan

### 6. Fitur Tambahan
- **Mode Gelap**: Klik ikon bulan/matahari untuk beralih mode
- **Enkripsi**: Klik ikon kunci untuk mengaktifkan/menonaktifkan enkripsi
- **Keluar**: Klik tombol "Keluar" untuk logout

## Struktur File

```
jurnal-pribadi/
├── index.html          # File HTML utama
├── styles.css          # File CSS untuk styling
├── script.js           # File JavaScript untuk fungsionalitas
└── README.md           # Dokumentasi ini
```

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman web
- **CSS3**: Styling dan animasi
- **JavaScript (ES6+)**: Logika aplikasi dan interaktivitas
- **Local Storage**: Penyimpanan data lokal
- **Font Awesome**: Ikon-ikon aplikasi

## Keamanan

### Enkripsi Data
- Aplikasi menggunakan enkripsi XOR sederhana untuk demonstrasi
- **Catatan**: Untuk penggunaan produksi, gunakan metode enkripsi yang lebih kuat
- Data dienkripsi sebelum disimpan di local storage

### Privasi
- Semua data disimpan secara lokal di browser pengguna
- Tidak ada data yang dikirim ke server eksternal
- Setiap pengguna hanya dapat mengakses catatan mereka sendiri

## Kompatibilitas Browser

Aplikasi ini kompatibel dengan browser modern:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Pengembangan Lokal

### Menjalankan Aplikasi
1. Clone atau download semua file ke folder lokal
2. Buka file `index.html` di browser web
3. Aplikasi siap digunakan

### Modifikasi
- **Styling**: Edit file `styles.css` untuk mengubah tampilan
- **Fungsionalitas**: Edit file `script.js` untuk menambah fitur
- **Struktur**: Edit file `index.html` untuk mengubah layout

## Fitur yang Dapat Ditambahkan

- **Ekspor/Impor**: Kemampuan untuk mengekspor catatan ke file
- **Kategori**: Sistem tagging untuk mengorganisir catatan
- **Pencarian**: Fitur pencarian dalam catatan
- **Backup**: Sistem backup otomatis
- **Sinkronisasi**: Sinkronisasi dengan cloud storage

## Lisensi

Aplikasi ini dibuat untuk tujuan pembelajaran dan penggunaan pribadi.

## Kontribusi

Silakan berkontribusi dengan melaporkan bug atau menambahkan fitur baru melalui pull request.

---

**Dibuat dengan ❤️ untuk mencatat momen-momen berharga dalam hidup Anda.** 