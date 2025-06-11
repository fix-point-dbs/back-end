# 🚀 Back-End Project - Fix Point DBS

Selamat datang di repository backend dari **Fix Point DBS**!  
Project ini merupakan bagian utama dari sistem Fix Point DBS yang menangani logika server dan integrasi data.

---

## ⚙️ Langkah Instalasi

### 1. Clone Repository
Pertama, clone repository ini ke komputer Anda:

```bash
git clone https://github.com/fix-point-dbs/back-end.git
```

---

### 2. Masuk ke Folder Project

```bash
cd back-end
```

---

### 3. Install Dependency

Jalankan perintah berikut untuk menginstal semua package yang dibutuhkan:

```bash
npm install
```

---

### 4. Install Nodemon (Jika Belum Terpasang)

Jika Anda belum memiliki nodemon secara global, jalankan:

```bash
npm install -g nodemon
```

---

### 5. Download & Import Database

- Silakan download file database SQL melalui link berikut:  
  👉 [Download Database](https://drive.com/xxxxxxx)

- Buka **phpMyAdmin**, lalu:
  1. Buat database baru dengan nama: `fix_point`
  2. Import file SQL yang telah Anda download ke dalam database tersebut

---

### 6. Konfigurasi Database

Buka file berikut:

```
src/config/database.js
```

Sesuaikan konfigurasi koneksi database dengan pengaturan di laptop Anda.  
Jika Anda menggunakan password untuk MySQL, pastikan diisi sesuai.

---

### 7. Jalankan Aplikasi

Setelah semua siap, jalankan aplikasi dengan:

```bash
npm run dev
```

---

### 8. Akses Server

Buka browser dan akses API backend melalui:

```
http://localhost:3000/
```

---

## 📮 Dokumentasi API

Untuk melihat dokumentasi API, Anda dapat menggunakan koleksi Postman berikut:  
👉 [Download Postman Collection](https://drive.com/xxx)

---

## 🖼️ Frontend

Sudah download frontend-nya?  
Jika belum, Anda bisa download melalui link berikut:

👉 [Repository Frontend](https://github.com/fix-point-dbs/front-end)

---

## Production

jika ingin melihat langsung hasilnya tanpa harus mendowload dulu langsung bisa melihat link berikut
👉 [Link Production](https://fixpoint.adza-zarif.my.id)

💡 **Terima kasih telah menggunakan Fix Point DBS!  