/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE /*!32312 IF NOT EXISTS*/ `jemaat` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `jemaat`;
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id_admin` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `sandi` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `anggota_kk`;
CREATE TABLE `anggota_kk` (
  `id_anggota_kk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_kk` int(10) unsigned NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `status` enum('Suami','Istri','Anak','Saudara Kandung','Saudara Ipar','Orang Tua','Mertua','Lainnya') NOT NULL,
  `golongan_darah` enum('A','B','AB','O') NOT NULL,
  `sudah_baptis` tinyint(4) NOT NULL,
  `tanggal_baptis` date DEFAULT NULL,
  `tempat_baptis` varchar(255) DEFAULT NULL,
  `nama_pelayan_baptis` varchar(255) DEFAULT NULL,
  `sudah_sidi` tinyint(4) NOT NULL,
  `tanggal_sidi` date DEFAULT NULL,
  `tempat_sidi` varchar(255) DEFAULT NULL,
  `nama_pelayan_sidi` varchar(255) DEFAULT NULL,
  `sudah_nikah` tinyint(4) NOT NULL,
  `tanggal_nikah` date DEFAULT NULL,
  `tempat_nikah` varchar(255) DEFAULT NULL,
  `nama_pelayan_nikah` varchar(255) DEFAULT NULL,
  `pendidikan` enum('Tidak/Belum Sekolah','PAUD/TK','SD','SMP','SMA','D2','D3','S1/D4','S2','S3') NOT NULL,
  `kedudukan_di_jemaat` enum('Jemaat','Jemaat Tamu','Diaken','Penatua','Pendeta') NOT NULL,
  `pekerjaan` enum('Tidak/Belum Ada','Pendeta','PNS','Pegawai Swasta','Wirawasta','TNI/Polri','Dokter','Bidan','Perawat','Apoteker','Pensiunan','Petani','Pembantu Rumah Tangga','Sopir','Tukang','Buruh','Pegawai Gereja','Pelajar','Mahasiswa','Pedagang','Ibu Rumah Tangga','Pegawai Kontrak/Honor','Lainnya') NOT NULL,
  `penghasilan` enum('Tidak Ada','sd. Rp. 750.000','Rp. 750.000 - Rp. 1.500.000','Rp. 1.500.000 - Rp. 2.500.000','Rp. 2.500.000 - Rp. 5.000.000','> Rp. 5.000.000') NOT NULL,
  `jaminan_kesehatan` enum('Tidak Ada','BPJS/ASKES','Asuransi Lain') NOT NULL,
  `keterangan` enum('Tidak Ada','Janda','Duda','Yatim/Piatu','Penyandang Cacat') NOT NULL,
  `tgl_buat` timestamp NOT NULL DEFAULT current_timestamp(),
  `tgl_terakhir_update` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_anggota_kk`),
  KEY `id_kk` (`id_kk`),
  CONSTRAINT `anggota_kk_ibfk_1` FOREIGN KEY (`id_kk`) REFERENCES `kepala_keluarga` (`id_kk`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `kepala_keluarga`;
CREATE TABLE `kepala_keluarga` (
  `id_kk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_rayon` int(10) unsigned NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `status_nikah` enum('Belum Menikah/Bujang','Nikah Gereja','Belum Nikah Gereja','Duda Janda') NOT NULL,
  `no_hp` varchar(255) NOT NULL,
  `kategori_rumah` enum('Permanen','Semi Permanen','Darurat','Lainnya') NOT NULL,
  `status_rumah` enum('Milik Sendiri','Kontrak','Menumpang','Lainnya') NOT NULL,
  `tgl_buat` timestamp NOT NULL DEFAULT current_timestamp(),
  `tgl_terakhir_update` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_kk`),
  KEY `id_rayon` (`id_rayon`),
  CONSTRAINT `kepala_keluarga_ibfk_1` FOREIGN KEY (`id_rayon`) REFERENCES `rayon` (`id_rayon`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `mutasi`;
CREATE TABLE `mutasi` (
  `id_mutasi` int(11) unsigned NOT NULL,
  `id_anggota_kk` int(11) unsigned NOT NULL,
  `tipe_mutasi` enum('Meninggal Dunia','Pindah Jemaat') NOT NULL DEFAULT 'Pindah Jemaat',
  `tanggal` date NOT NULL,
  `keterangan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_mutasi`) USING BTREE,
  KEY `FK_ANGGOTA_KK2` (`id_anggota_kk`),
  CONSTRAINT `FK_ANGGOTA_KK2` FOREIGN KEY (`id_anggota_kk`) REFERENCES `anggota_kk` (`id_anggota_kk`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `rayon`;
CREATE TABLE `rayon` (
  `id_rayon` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `tgl_buat` timestamp NOT NULL DEFAULT current_timestamp(),
  `tgl_terakhir_update` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_rayon`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

INSERT INTO `admin` (`id_admin`,`username`,`sandi`,`nama`) VALUES (3,'admin','$2y$10$TproOxiUNHEMZpU3.eam2uWOM9r/J15q8T28SWRSYI.y6BFl5JZVC','');

INSERT INTO `anggota_kk` (`id_anggota_kk`,`id_kk`,`nama`,`jk`,`tempat_lahir`,`tanggal_lahir`,`status`,`golongan_darah`,`sudah_baptis`,`tanggal_baptis`,`tempat_baptis`,`nama_pelayan_baptis`,`sudah_sidi`,`tanggal_sidi`,`tempat_sidi`,`nama_pelayan_sidi`,`sudah_nikah`,`tanggal_nikah`,`tempat_nikah`,`nama_pelayan_nikah`,`pendidikan`,`kedudukan_di_jemaat`,`pekerjaan`,`penghasilan`,`jaminan_kesehatan`,`keterangan`,`tgl_buat`,`tgl_terakhir_update`) VALUES (7,15,'Don Nisnoni','L','Kupang','1994-09-18','Suami','AB',1,'1997-11-19','Gereja Sion','Markus Banusu',1,'2015-05-06','Gereja Koinonia','Alex Iga',1,'2019-06-11','Gereja Koinonia','Alex Iga','D3','Jemaat','Pegawai Swasta','Rp. 2.500.000 - Rp. 5.000.000','Asuransi Lain','Yatim/Piatu','2021-01-14 20:53:44','2021-01-14 20:53:44'),(8,15,'Septyana Florence Balla','P','Kupang','1994-09-18','Suami','B',1,'1996-07-16','Gereja Sion','Markus Banusu',1,'2011-01-07','Gereja Koinonia','Alex Iga',0,NULL,NULL,NULL,'S1/D4','Jemaat','Bidan','Rp. 1.500.000 - Rp. 2.500.000','BPJS/ASKES','Tidak Ada','2021-01-14 20:53:44','2021-01-14 20:53:44'),(9,15,'Andi Kore','L','Sabu','2005-01-13','Anak','O',1,'2009-01-15','GMIT Ebenhezer Sabu','Simon Gaek',1,'2015-01-30','GMIT Ebenhezer Sabu','Simon Gaek',0,NULL,NULL,NULL,'SMA','Jemaat','Mahasiswa','Tidak Ada','Asuransi Lain','Tidak Ada','2021-01-14 20:53:44','2021-01-14 20:53:44'),(10,15,'Ariel Dillak','L','Rote','1995-01-14','Saudara Ipar','B',0,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,'S2','Jemaat','Dokter','Rp. 750.000 - Rp. 1.500.000','BPJS/ASKES','Tidak Ada','2021-01-14 20:53:44','2021-01-14 20:53:44'),(13,15,'Ignasius Levi','P','Rote','2021-01-28','Saudara Ipar','A',0,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,'Tidak/Belum Sekolah','Jemaat','Tidak/Belum Ada','Tidak Ada','Tidak Ada','Tidak Ada','2021-01-14 20:53:44','2021-01-14 20:53:44'),(14,16,'Xilong Sinatra','L','Kupang','2020-12-29','Suami','A',0,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,'Tidak/Belum Sekolah','Jemaat','Tidak/Belum Ada','Tidak Ada','Tidak Ada','Tidak Ada','2021-01-14 20:58:34','2021-01-14 20:58:34'),(15,16,'El Nino','P','Rote','2021-01-11','Suami','A',0,NULL,NULL,NULL,0,NULL,NULL,NULL,0,NULL,NULL,NULL,'Tidak/Belum Sekolah','Jemaat','Tidak/Belum Ada','Tidak Ada','Tidak Ada','Tidak Ada','2021-01-14 20:58:34','2021-01-14 20:58:34');

INSERT INTO `kepala_keluarga` (`id_kk`,`id_rayon`,`nama`,`alamat`,`status_nikah`,`no_hp`,`kategori_rumah`,`status_rumah`,`tgl_buat`,`tgl_terakhir_update`) VALUES (15,1,'Don Nisnoni','Amnesi','Nikah Gereja','1111111111111111','Permanen','Milik Sendiri','2021-01-14 20:53:44','2021-01-14 20:53:44'),(16,1,'El Nino','USA','Nikah Gereja','222222222222222','Permanen','Milik Sendiri','2021-01-14 20:58:34','2021-01-14 20:58:34'),(17,1,'Vivo El Sadde','Oebufu','Belum Nikah Gereja','88888888888888','Lainnya','Kontrak','2021-01-16 18:53:29','2021-01-16 18:53:29');


INSERT INTO `rayon` (`id_rayon`,`nama`,`tgl_buat`,`tgl_terakhir_update`) VALUES (1,'Kasih','2020-09-06 03:28:47','2020-12-21 20:32:21'),(2,'Sukacita','2020-12-13 21:28:43','2020-12-21 23:04:39'),(3,'Damai Sejahtera','2020-12-13 21:29:03','2020-12-21 23:04:52'),(4,'Kesabaran','2020-12-13 21:29:18','2020-12-21 23:04:55'),(5,'Kemurahan','2020-12-13 21:31:40','2020-12-21 23:04:58'),(6,'Kebaikan','2021-01-07 08:11:41','2021-01-07 08:11:41'),(7,'Kesetiaan','2020-12-13 21:32:00','2020-12-21 23:05:07'),(8,'Kelemahlembutan','2020-12-13 21:32:37','2020-12-21 23:05:21');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
