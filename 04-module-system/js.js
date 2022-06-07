const cetakNama = (nama) => {
    return `Hai Nama Saya ${nama}`;
}
const mahasiswa = {
    nama: 'Udin',
    umur: 12,
    cetaKMahasiswa() {
        return `Halo, Nama Saya ${this.nama}, Umur ${this.umur}`;
    }
}
const PI = 3.14;


class Orang {
    constructor() {
        console.log('Class Orang Telah Di Panggik');
    }
}

//Cara 1 Modul Export

// module.exports.PI = PI
// module.exports.cetakNama = cetakNama
// module.exports.mahasiswa = mahasiswa
// module.exports.Orang = Orang

// Cara 2
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

// Cara 3
module.exports = {
    cetakNama,
    PI,
    mahasiswa,
    Orang
}