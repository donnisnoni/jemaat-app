const pekerjaan = [
  'Tidak Ada',
  'Pendeta',
  'Pegawai Negeri Sipil',
  'Pegawai Swasta',
  'Wirawasta',
  'TNI/Polri',
  'Dokter',
  'Bidan',
  'Perawat',
  'Apoteker',
  'Pensiunan',
  'Petani',
  'Pembantu Rumah Tangga',
  'Sopir',
  'Tukang',
  'Buruh',
  'Pegawai Gereja',
  'Pelajar',
  'Mahasiswa',
  'Pedagang',
  'Ibu Rumah Tangga',
  'Pegawai Kontrak/Honor',
  'Lainnya',
]

const kedudukan_di_jemaat = ['Pendeta', 'Penatua', 'Diaken', 'Jemaat', 'Jemaat Tamu']

const pendidikan = ['Tidak Sekolah', 'SD', 'SMP', 'SMA', 'Diploma', 'Strata 1', 'Strata 2', 'Strata 3']

const status_dalam_keluarga = [
  'Suami',
  'Istri',
  'Anak',
  'Saudara Kandung',
  'Saudara Ipar',
  'Orang Tua',
  'Mertua',
  'Lainnya',
]

const keterangan = ['Janda', 'Duda', 'Yatim', 'Piatu', 'Penyandang Cacat']
const jaminan_kesehatan = ['BPJS/ASKES', 'Asuransi Lain']
const penghasilan = [
  'Tidak Ada',
  'sd. Rp. 750.000',
  'Rp. 750.000 - Rp. 1.500.000',
  'Rp. 1.500.000 - Rp. 2.500.000',
  'Rp. 2.500.000 - Rp. 5.000.000',
  '> Rp. 5.000.000',
]

module.exports = {
  kedudukan_di_jemaat,
  keterangan,
  jaminan_kesehatan,
  penghasilan,
  pekerjaan,
  pendidikan,
  status_dalam_keluarga,
}
