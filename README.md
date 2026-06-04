# QuoteFlow App

## Informasi Mahasiswa
- Nama : Muhammad Prayogo Pangestu
- Nim : 24105010456
- Prodi : D3 Sistem Informasi

## Description
QuoteFlow adalah aplikasi React Native berbasis Expo yang menampilkan quote inspiratif dari API eksternal.

## Features

- Animated Card
- Swipe Gesture
- Delete Quote
- Archive Quote
- AsyncStorage
- Background Task
- React Navigation
- Quote API Integration

## Tech Stack

- React Native
- Expo SDK 54
- Reanimated
- Gesture Handler
- AsyncStorage
- React Navigation

## Screenshots
1. Halaman Quete
<img width="200" alt="WhatsApp Image 2026-06-04 at 08 48 13 (2)" src="https://github.com/user-attachments/assets/b1df150e-72fb-4033-90cc-7660d92bd3fa" />
<img width="200" alt="WhatsApp Image 2026-06-04 at 08 48 13" src="https://github.com/user-attachments/assets/5abea947-cc05-427d-bd5a-41f51d14a6c8" />

2. Halman Acrchive
<img width="200" alt="WhatsApp Image 2026-06-04 at 08 48 13 (1)" src="https://github.com/user-attachments/assets/c117566c-8d7d-432f-8039-510fbd09881c" />


## Cara menjalankan 
npm install
npx expo start

## Refleksi
1. Kapan sebaiknya menggunakan Animated API vs Reanimated 2? Apa trade-off-nya?
  - Animated API cocok untuk animasi sederhana seperti fade, scale, slide.
  - Reanimated 2 cocok untuk animasi kompleks, gesture, drag & drop, swipe.
  
  Trade-off:
  - Animated API lebih mudah dipelajari.
  - eanimated 2 lebih cepat dan smooth karena berjalan di UI thread, tetapi setup dan sintaksnya lebih kompleks.

2. Mengapa background task di iOS tidak dapat dijamin tepat waktu? Apa implikasinya untuk desain aplikasi?
   
  Karena iOS mengatur sendiri kapan background task dijalankan untuk menghemat baterai dan performa perangkat.
  Implikasi:
  - Aplikasi tidak boleh bergantung pada waktu yang presisi.
  - Data harus tetap valid meskipun task dijalankan lebih lambat dari jadwal.

3. Mengapa background task di iOS tidak dapat dijamin tepat waktu? Apa implikasinya untuk desain aplikasi?
   
  Karena client-side validation dapat dimodifikasi atau dipalsukan oleh pengguna.

  Server-side validation: 
  - Memverifikasi transaksi langsung ke server resmi (misalnya Apple atau Google).
  - Lebih sulit dimanipulasi.
  - Mengurangi risiko pembelian palsu dan pembajakan.

4. Bagaimana lazy loading image dapat meningkatkan performa aplikasi secara signifikan?

  Lazy loading cuma memuat gambar saat diperlukan misal saat gambar muncul di layar.
  
  Manfaat:
  - Mengurangi penggunaan memori.
  - Mempercepat waktu loading awal aplikasi.
  - Menghemat bandwidth internet.
