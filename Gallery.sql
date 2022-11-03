-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:3306
-- 生成日時: 2022 年 11 月 02 日 16:38
-- サーバのバージョン： 10.3.34-MariaDB-0ubuntu0.20.04.1
-- PHP のバージョン: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `Photos`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `Gallery`
--

CREATE TABLE `Gallery` (
  `ID` int(11) NOT NULL,
  `FILE` varchar(255) NOT NULL,
  `UPLOAD_TIME` datetime NOT NULL,
  `UPLOADER` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `Gallery`
--

INSERT INTO `Gallery` (`ID`, `FILE`, `UPLOAD_TIME`, `UPLOADER`) VALUES
(1, 'test.png', '1970-01-01 01:00:00', 'test'),
(2, 'test.png', '1970-01-01 01:00:00', 'test'),
(3, 'test.png', '1970-01-01 00:00:00', 'test'),
(4, '213.txt', '2022-10-22 04:29:13', 'test'),
(5, '213.txt', '2022-10-22 04:36:40', 'test'),
(6, '213.txt', '2022-10-22 04:38:31', 'test'),
(7, 'Screenshot from 2022-10-22 00-05-41.png', '2022-10-22 04:48:13', 'screenshot'),
(8, 'Screenshot from 2022-10-30 18-22-38.png', '2022-11-02 08:26:42', 'test');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `Gallery`
--
ALTER TABLE `Gallery`
  ADD PRIMARY KEY (`ID`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `Gallery`
--
ALTER TABLE `Gallery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
