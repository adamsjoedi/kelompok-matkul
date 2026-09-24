/**
 * DATA KELOMPOK STUDI MAHASISWA
 * 
 * Anda dapat mengedit, menambah, atau menghapus mata kuliah,
 * judul project, dan daftar anggota mahasiswa langsung di file ini.
 * 
 * File ini adalah JavaScript murni (Vanilla JS) tanpa build tools / tanpa bundler,
 * sehingga langsung jalan di GitHub Pages atau dibuka langsung di browser.
 */

const COURSES_DATA = [
  {
    id: "sistem-basis-data",
    nama: "SISTEM BASIS DATA",
    kelompok: [
      {
        nomor: 1,
        nama: "Kelompok 1",
        judul: "?",
        anggota: [
          { nama: "Renal Ali Syahid", nim: "17250313" },
          { nama: "Glen Justin Maringan Simarmata", nim: "17250323" },
          { nama: "Fernando Hasudungan Siregar", nim: "17250232" }
        ]
      },
      {
        nomor: 2,
        nama: "Kelompok 2",
        judul: "?",
        anggota: [
          { nama: "Adriyan Sahpitran", nim: "17250049" },
          { nama: "Rangga Aji Pramudya", nim: "17250206" },
          { nama: "Ridho Firmansyah", nim: "17250199" }
        ]
      },
      {
        nomor: 3,
        nama: "Kelompok 3",
        judul: "?",
        anggota: [
          { nama: "Ali Muslih Alfauzan", nim: "17250654" },
          { nama: "Widya Putri Rahayu", nim: "17250072" },
          { nama: "Arla Maulana Eza Nugraha", nim: "17250371" },
          { nama: "Sefti Jikas Mu’afari", nim: "17250513" }
        ]
      },
      {
        nomor: 4,
        nama: "Kelompok 4",
        judul: "?",
        anggota: [
          { nama: "Ahmad Fauzan Rizki", nim: "17250400" },
          { nama: "Duta Arrasyid", nim: "17250278" },
          { nama: "Intan Purnamasari", nim: "17250561" }
        ]
      },
      {
        nomor: 5,
        nama: "Kelompok 5",
        judul: "?",
        anggota: [
          { nama: "Abdillah", nim: "17250571" },
          { nama: "Kevin Nabil Noor Rahman", nim: "17250374" },
          { nama: "Ahmad Abu Jihad Bilhaq", nim: "17250439" }
        ]
      }
    ]
  },

  // ============================================================================================================

  {
    id: "web-programming-1",
    nama: "WEB PROGRAMMING I",
    kelompok: [
      {
        nomor: 1,
        nama: "Kelompok 1",
        judul: "Toko",
        anggota: [
          { nama: "Ahmad Fauzan Rizki", nim: "17250400" },
          { nama: "Duta Arrasyid", nim: "17250278" },
          { nama: "Intan Purnamasari", nim: "17250561" },
          { nama: "Rangga Aji Pramudya", nim: "17250206" }
        ]
      },
      {
        nomor: 2,
        nama: "Kelompok 2",
        judul: "Rental",
        anggota: [
          { nama: "Renal Ali Syahid", nim: "17250313" },
          { nama: "Ali Muslih Alfauzan", nim: "17250654" },
          { nama: "Adriyan Sahpitran", nim: "17250049" },
          { nama: "Kevin Nabil Noor Rahman", nim: "17250374" }
        ]
      },
      {
        nomor: 3,
        nama: "Kelompok 3",
        judul: "Perpustakaan",
        anggota: [
          { nama: "Widya Putri Rahayu", nim: "17250072" },
          { nama: "Fernando Hasudungan Siregar", nim: "17250232" },
          { nama: "Glen Justin Maringan Simarmata", nim: "17250323" },
          { nama: "Ridho Firmansyah", nim: "17250199" }
        ]
      },
      {
        nomor: 4,
        nama: "Kelompok 4",
        judul: "Universitas",
        anggota: [
          { nama: "Abdillah", nim: "17250571" },
          { nama: "Arla Maulana Eza Nugraha", nim: "17250371" },
          { nama: "Sefti Jikas Mu’afari", nim: "17250513" },
          { nama: "Ahmad Abu Jihad Bilhaq", nim: "17250439" }
        ]
      }
    ]
  },

  // ============================================================================================================

  {
    id: "komputer-jaringan",
    nama: "KOMPUTER JARINGAN",
    kelompok: [
      // Data kelompok akan menyusul. Silakan isi kelompok di sini ketika sudah ada.
    ]
  }
];

// Ekspos ke global window
window.COURSES_DATA = COURSES_DATA;
