const { literal } = require('sequelize')

const includes = [
  [
    literal(
      `(SELECT 
          COUNT(id_kk)
        FROM
          kepala_keluarga
        WHERE kepala_keluarga.id_rayon = rayon.id_rayon)`
    ),
    'jumlah_kk',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon)`
    ),
    'jumlah_jemaat',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'L')`
    ),
    'jumlah_jemaat_l',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'P')`
    ),
    'jumlah_jemaat_p',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'L' AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi_l',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'P' AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi_p',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN
          kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'L' AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi_l',
  ],
  [
    literal(
      `(SELECT
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk
        WHERE 
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'P' AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi_p',
  ],
  [
    literal(
      `(SELECT 
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk 
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) <= 15)`
    ),
    'jumlah_anak_par',
  ],
  [
    literal(
      `(SELECT 
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk 
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE()) >= 65)`
    ),
    'jumlah_jemaat_lansia',
  ],
  [
    literal(
      `(SELECT 
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk 
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.sudah_nikah = 1 AND anggota_kk.jk = 'L')`
    ),
    'jumlah_kaum_bapak',
  ],
  [
    literal(
      `(SELECT 
          COUNT(id_anggota_kk)
        FROM
          anggota_kk
        LEFT JOIN kepala_keluarga ON anggota_kk.id_kk = kepala_keluarga.id_kk 
        WHERE
          kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.sudah_nikah = 1 AND anggota_kk.jk = 'P')`
    ),
    'jumlah_kaum_ibu',
  ],
]

module.exports = includes
