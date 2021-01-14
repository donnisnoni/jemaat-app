/* -------------------- THIS SQL FILE JUST FOR TEST QUERY ------------------- */
SELECT
  rayon.id_rayon,
  rayon.nama,
  -- JUMLAH KEPALA KELUARGA --
  (
    SELECT
      COUNT(id_kk)
    FROM
      kepala_keluarga
    WHERE
      kepala_keluarga.id_rayon = rayon.id_rayon
  ) AS jumlah_kk,
  -- JUMLAH JEMAAT --
  (
    SELECT
      COUNT(id_anggota_kk)
    FROM
      anggota_kk
    WHERE
      kepala_keluarga.id_rayon = rayon.id_rayon
      AND anggota_kk.id_kk = kepala_keluarga.id_kk
  ) AS jumlah_jemaat,
  -- JUMLAH JEMAAT LAKI-LAKI --
  (
    SELECT
      COUNT(id_anggota_kk)
    FROM
      anggota_kk
    WHERE
      kepala_keluarga.id_rayon = rayon.id_rayon
      AND anggota_kk.id_kk = kepala_keluarga.id_kk
      AND anggota_kk.jk = 'L'
  ) AS jumlah_jemaat_l,
  -- JUMLAH JEMAAT PEREMPUAN --
  (
    SELECT
      COUNT(id_anggota_kk)
    FROM
      anggota_kk
    WHERE
      kepala_keluarga.id_rayon = rayon.id_rayon
      AND anggota_kk.id_kk = kepala_keluarga.id_kk
      AND anggota_kk.jk = 'P'
  ) AS jumlah_jemaat_p
FROM
  rayon
  LEFT JOIN kepala_keluarga ON rayon.id_rayon = kepala_keluarga.id_rayon
GROUP BY
  rayon.id_rayon;
