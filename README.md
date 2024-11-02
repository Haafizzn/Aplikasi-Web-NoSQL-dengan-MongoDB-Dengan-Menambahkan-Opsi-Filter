Laporan Pengembangan Aplikasi Web NoSQL dengan MongoDB Dengan Menambahkan Opsi Filter
Hafiz Nasrullah 2021081067
1.	Pendahuluan
Laporan ini menjelaskan langkah-langkah pengembangan aplikasi web berbasis NoSQL menggunakan MongoDB untuk memproses dan menampilkan data dari file JSON produksi.json. Aplikasi ini memungkinkan pengguna untuk mengakses dan menyaring data produksi pertanian secara efisien.
2.	Stuktur Direktori
Berikut adalah struktuk folder proyek
SistemBasisDataLanjutan/
├── server.js        # File utama server
├── produksi.json    # File data JSON
├── controllers/     # Logika backend (opsional)
├── models/          # Model data untuk MongoDB
├── views/           # Folder untuk file HTML/CSS/JS
└── routes/          # Route aplikasi

3.	Koneksi Database dan Model MongoDB
3.1.	Membuat model data
File ini mendefinisikan skema data menggunakan Mongoose, yang mencakup kolom tahun, jenis, dan hasil. Berikut penjelasan kode:
•	const mongoose = require('mongoose'): Mengimpor modul Mongoose.
•	produksiSchema: Menentukan struktur data produksi untuk MongoDB.
•	module.exports: Menyediakan model untuk digunakan di seluruh proyek.
3.2.	Koneksi Database
Kode ini menghubungkan aplikasi ke MongoDB dan mengatur server agar mendengarkan permintaan pada port 3000.
•	mongoose.connect: Mencoba menghubungkan ke database dbcoba di MongoDB.
•	app.use: Middleware bodyParser.json() mem-parsing JSON dari body request.
•	app.use('/api/produksi', produksiRoutes): Menambahkan route API untuk mengakses data produksi.
•	app.listen(3000): Menjalankan server pada port 3000

4.	API Endpoint
4.1.	Endpoint untuk Mengambil dan Memfilter Data
File routes/produksi.js menangani permintaan data dari koleksi MongoDB. 
•	router.get('/all'): Mengambil semua data dari koleksi produksi.
•	router.get('/filter'): Mengambil data berdasarkan parameter tahun, jenis, atau hasil. Memeriksa parameter query dan menyusun objek query berdasarkan input.
4.2.	Endpoint Untuk CREATE Data
Endpoint POST /add memungkinkan pengguna untuk menambahkan data baru ke koleksi produksi.
•	req.body: Data yang dikirim dari permintaan POST diterima dalam req.body. Ini berisi nilai-nilai untuk properti tahun, jenis, dan hasil.
•	new Produksi(req.body): Membuat instance baru dari model Produksi menggunakan data yang dikirimkan oleh pengguna.
•	await newData.save(): Menyimpan data baru ke database MongoDB. Proses ini asinkron, sehingga await digunakan.
•	res.status(201).json(newData): Mengirim respons dengan status 201 Created dan data yang baru ditambahkan jika berhasil.
•	res.status(400).json({ message: "Error adding data" }): Mengirim respons dengan status 400 Bad Request jika terjadi kesalahan selama penambahan data.
4.3.	Endpoint Untuk UPDATE  Data
Endpoint PUT /update/:id memungkinkan pengguna untuk memperbarui data yang ada dalam koleksi produksi berdasarkan ID unik dari data tersebut.
•	req.params.id: Mengambil id dari URL untuk mengidentifikasi data mana yang akan diperbarui.
•	Produksi.findByIdAndUpdate(req.params.id, req.body, { new: true }): Menggunakan metode findByIdAndUpdate untuk menemukan data berdasarkan id dan memperbarui isinya sesuai dengan req.body.
•	{ new: true }: Menentukan bahwa objek yang diperbarui akan dikembalikan dalam respons, bukan objek sebelum diperbarui.
•	res.json(updatedData): Mengirim respons berisi data yang telah diperbarui.
•	res.status(400).json({ message: "Error updating data" }): Mengirim pesan error jika ada masalah dalam memperbarui data.
4.4.	Endpoint Untuk DELETE Data
Endpoint DELETE /delete/:id memungkinkan pengguna untuk menghapus data tertentu dari koleksi berdasarkan ID-nya.
•	req.params.id: Mengambil id dari URL untuk mengidentifikasi data yang akan dihapus.
•	Produksi.findByIdAndDelete(req.params.id): Menghapus data dari koleksi produksi berdasarkan ID yang diberikan.
•	res.json({ message: "Data deleted successfully" }): Mengirim pesan sukses jika data berhasil dihapus.
•	res.status(400).json({ message: "Error deleting data" }): Mengirim pesan error jika terjadi masalah dalam penghapusan data.
 
5.	Tampilan Antarmuka Pengguna
5.1.	HTML untuk Table Data
File HTML ini menampilkan tabel data dan menyediakan kolom input untuk filter
•	Button: Tombol untuk menampilkan, mengosongkan, dan memfilter data.
•	#dataTable: Tabel HTML untuk menampilkan data produksi.

6.	Interaksi Dengan JavaScript
Script JavaScript ini mengirim permintaan ke server dan menampilkan data di tabel HTML.
6.1.	File JavaScrip Untuk Filter Data
•	fetchAllData(): Mengambil seluruh data produksi dan menampilkan hasilnya di tabel.
•	clearTable(): Mengosongkan tabel data.
•	filterData(): Mengambil data berdasarkan filter tahun, jenis, dan hasil yang diinput pengguna.
•	renderTable(data): Menyusun baris tabel dari data yang diperoleh dan menampilkannya dalam tabel HTML.
6.2.	File JavaScript  Untuk Mengambil dan Menampilkan Semua Data
Fungsi fetchAllData digunakan untuk mengambil semua data dari database dan menampilkan data dalam tabel.
•	fetch('/api/produksi/all'): Mengirim permintaan GET ke endpoint /api/produksi/all untuk mengambil semua data dari server.
•	renderTable(data): Memanggil fungsi renderTable untuk menampilkan data yang diambil di tabel HTML.
•	Input Clearing: Mengosongkan input setelah data berhasil ditampilkan.
•	Error Handling: Jika terjadi kesalahan dalam pengambilan data, pesan kesalahan akan ditampilkan di konsol.
6.3.	File JavaSript Untuk Menampilkan Data dalam Table
Fungsi renderTable digunakan untuk menampilkan data yang diambil dari server ke dalam tabel HTML.
•	data.forEach: Melakukan iterasi untuk setiap item dalam data yang diambil dan menghasilkan baris <tr> dalam tabel.
•	onclick="updateData('${item._id}')": Menambahkan tombol "Edit" yang memanggil fungsi updateData dengan parameter ID untuk memperbarui data.
•	onclick="deleteData('${item._id}')": Menambahkan tombol "Delete" yang memanggil fungsi deleteData dengan parameter ID untuk menghapus data.
•	tbody.innerHTML += row: Menambahkan setiap baris data ke dalam tabel HTML.
6.4.	File JavaScript Untuk CREATE Data
Fungsi addData bertanggung jawab untuk mengirim data baru (tahun, jenis, hasil) ke server menggunakan metode POST.
•	document.getElementById: Mengambil nilai dari input HTML untuk tahun, jenis, dan hasil.
•	fetch('/api/produksi/add', {...}): Mengirim permintaan POST ke server pada endpoint /api/produksi/add dengan data yang dikonversi menjadi JSON.
•	fetchAllData(): Memanggil fungsi untuk memperbarui tabel data setelah data baru berhasil ditambahkan.
•	Error Handling: Jika ada kesalahan, error akan ditampilkan di konsol.
6.5.	File JavaScript Untuk UPDATE Data
Fungsi updateData digunakan untuk memperbarui data yang ada berdasarkan ID tertentu.
•	prompt: Memunculkan jendela untuk input nilai baru yang akan diperbarui untuk tahun, jenis, dan hasil.
•	fetch(/api/produksi/update/${id}, {...}): Mengirim permintaan PUT ke endpoint /api/produksi/update/:id dengan data yang dikirim dalam bentuk JSON. Parameter id digunakan untuk menentukan data yang akan diperbarui.
•	fetchAllData(): Memperbarui tabel setelah data berhasil diperbarui.
•	Error Handling: Jika terjadi kesalahan, pesan error akan ditampilkan di konsol.
6.6.	File JavaScript  Untuk DELETE Data
Fungsi deleteData digunakan untuk menghapus data dari database berdasarkan ID yang diberikan.
•	confirm: Menampilkan konfirmasi kepada pengguna sebelum menghapus data. Jika pengguna mengklik "OK", permintaan penghapusan akan dikirim.
•	fetch(/api/produksi/delete/${id}, {...}): Mengirim permintaan DELETE ke endpoint /api/produksi/delete/:id.
•	fetchAllData(): Memperbarui tabel data setelah data berhasil dihapus.
•	Error Handling: Kesalahan yang terjadi akan ditampilkan di konsol.
