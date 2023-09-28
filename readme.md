# Entity Relational Diagram

https://dbdiagram.io/d/Novel_Writer-651282ebffbf5169f07fdf20

# Technology Stack
* Node.js
* Express
* Postgres (DBMS)
* Many To Many 
* Sequelize (ORM)
* Tailwind

# API Documentation

| Method | Route | Keterangan|
| --- | --- | ---|
|GET| `/` | Menampilkan homepage |
|GET| `/novels` | Menampilkan semua novel yang ada dalam database |
|GET| `/writers` | Menampilkan semua penulis yang ada dalam database |
|GET| `/novels/add` | Menampilkan halaman form untuk menambahkan data novel |
|GET| `/writers/add` | Menampilkan halaman form untuk menambahkan data writer |
|POST| `/novels/add` | Menerima data yang dikirim dari halaman `/novels/add` untuk menambahkan data novel ke database |
|POST| `/writers/add` | Menerima data yang dikirim dari halaman `/writers/add` untuk menambahkan data writer ke database |
|GET| `/novels/delete/:id` | Menghapus data novel berdasarkan `id` yang dikirimkan dan redirect ke `/novels` |
|GET| `/writers/delete/:id` | Menghapus data writer berdasarkan `id` yang dikirimkan dan redirect ke `/writers` |
|GET| `/novels/update/:id` | Menampilkan halaman form untuk mengubah data novel berdasarkan `id` |
|GET| `/writers/update/:id` | Menampilkan halaman form untuk mengubah data writer berdasarkan `id` |
|POST| `/novels/update/:id` | Menerima data yang dikirim dari halaman `/novels/update/:id` untuk mengubah data novel di database |
|POST| `/writers/update/:id` | Menerima data yang dikirim dari halaman `/writers/update/:id` untuk mengubah data writer di database |

