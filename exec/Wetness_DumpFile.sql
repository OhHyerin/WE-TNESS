-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: wetness
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `award` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `event_name` varchar(45) NOT NULL COMMENT '도전과제명',
  `detail` varchar(100) NOT NULL COMMENT '도전과제 내용',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  `target_id` bigint(20) unsigned zerofill NOT NULL,
  `ban_date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_block_1` (`user_id`),
  KEY `FK_user_TO_block_2` (`target_id`),
  CONSTRAINT `FK_user_TO_block_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_block_2` FOREIGN KEY (`target_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code` (
  `code` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`code`,`category`),
  KEY `FK_common_code_type_TO_common_code_1` (`category`),
  CONSTRAINT `FK_common_code_type_TO_common_code_1` FOREIGN KEY (`category`) REFERENCES `common_code_type` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `common_code_type`
--

DROP TABLE IF EXISTS `common_code_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code_type` (
  `category` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dongcode`
--

DROP TABLE IF EXISTS `dongcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dongcode` (
  `dongCode` varchar(10) NOT NULL,
  `sidoName` varchar(30) DEFAULT NULL,
  `gugunName` varchar(30) DEFAULT NULL,
  `dongName` varchar(30) DEFAULT NULL,
  `lng` varchar(30) DEFAULT NULL,
  `lat` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`dongCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fitness_record`
--

DROP TABLE IF EXISTS `fitness_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fitness_record` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `game_cnt` int NOT NULL DEFAULT '0',
  `calorie` double NOT NULL DEFAULT '0',
  `reg_date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fitness_record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follower_id` bigint(20) unsigned zerofill NOT NULL,
  `following_id` bigint(20) unsigned zerofill NOT NULL,
  `follow_date` timestamp NOT NULL,
  PRIMARY KEY (`follower_id`,`following_id`),
  KEY `FK_user_TO_follow_2` (`following_id`),
  CONSTRAINT `FK_user_TO_follow_1` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_follow_2` FOREIGN KEY (`following_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `room_id` bigint(20) unsigned zerofill NOT NULL,
  `create_date` timestamp NOT NULL,
  `terminate_date` timestamp NULL DEFAULT NULL,
  `is_playing` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_room_TO_game_1` (`room_id`),
  CONSTRAINT `FK_room_TO_game_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `game_record`
--

DROP TABLE IF EXISTS `game_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_record` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned zerofill NOT NULL COMMENT 'user 테이블의 id 참조',
  `game_id` bigint(20) unsigned zerofill NOT NULL COMMENT 'game 테이블의 id 참조',
  `workout_id` int(10) unsigned zerofill NOT NULL COMMENT 'workout 테이블의 id 참조',
  `score` double NOT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_game_record_1` (`user_id`),
  KEY `FK_game_TO_game_record_1` (`game_id`),
  KEY `FK_workout_TO_game_record_1` (`workout_id`),
  CONSTRAINT `FK_game_TO_game_record_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `FK_user_TO_game_record_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_workout_TO_game_record_1` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logged_continue`
--

DROP TABLE IF EXISTS `logged_continue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logged_continue` (
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  `consecutively` int NOT NULL,
  `max_consecutively` int NOT NULL,
  `recent_date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_user_TO_logged_continue` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `logged_in`
--

DROP TABLE IF EXISTS `logged_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logged_in` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_logged_in_1` (`user_id`),
  CONSTRAINT `FK_user_TO_logged_in_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `medal`
--

DROP TABLE IF EXISTS `medal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medal` (
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  `gold` int DEFAULT NULL,
  `silver` int DEFAULT NULL,
  `bronze` int DEFAULT NULL,
  `total_cnt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_user_TO_medal_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint(20) unsigned zerofill NOT NULL,
  `sender_id` bigint(20) unsigned zerofill DEFAULT NULL,
  `notify_date` timestamp NOT NULL,
  `checked` bit(1) NOT NULL,
  `notify_type` varchar(45) NOT NULL,
  `room_code` varchar(45) DEFAULT NULL,
  `badge_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_notification_1` (`receiver_id`),
  KEY `FK_user_TO_notification_2` (`sender_id`),
  CONSTRAINT `FK_user_TO_notification_1` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_notification_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranking` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned zerofill DEFAULT NULL,
  `workout_id` int(10) unsigned zerofill DEFAULT NULL,
  `sido_code` varchar(45) DEFAULT NULL,
  `gugun_code` varchar(45) DEFAULT NULL,
  `calorie` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `rankingcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_today_rank_1` (`user_id`),
  CONSTRAINT `FK_user_TO_today_rank_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `reporter_id` bigint(20) unsigned zerofill NOT NULL,
  `accused_id` bigint(20) unsigned zerofill NOT NULL,
  `content` varchar(45) NOT NULL,
  `report_date` timestamp NOT NULL,
  `process` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_report_1` (`reporter_id`),
  KEY `FK_user_TO_report_2` (`accused_id`),
  CONSTRAINT `FK_user_TO_report_1` FOREIGN KEY (`reporter_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_user_TO_report_2` FOREIGN KEY (`accused_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `workout_id` int(10) unsigned zerofill NOT NULL,
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` timestamp NOT NULL,
  `terminate_date` timestamp NULL DEFAULT NULL,
  `manager_id` bigint(20) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_workout_TO_room_1` (`workout_id`),
  CONSTRAINT `FK_workout_TO_room_1` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_user`
--

DROP TABLE IF EXISTS `room_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_user` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `room_id` bigint(20) unsigned zerofill NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `enter_time` timestamp NOT NULL,
  `leave_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_room_TO_room_user_1` (`room_id`),
  CONSTRAINT `FK_room_TO_room_user_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `nickname` varchar(45) NOT NULL,
  `sido_code` varchar(45) DEFAULT NULL,
  `gugun_code` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `social` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `ban_state` bit(1) DEFAULT b'0',
  `ban_date` datetime DEFAULT NULL,
  `social_id` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_award`
--

DROP TABLE IF EXISTS `user_award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_award` (
  `award_id` bigint(20) unsigned zerofill NOT NULL,
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  `receive_date` timestamp NOT NULL,
  PRIMARY KEY (`award_id`,`user_id`),
  KEY `FK_user_TO_user_award_1` (`user_id`),
  CONSTRAINT `FK_award_TO_user_award_1` FOREIGN KEY (`award_id`) REFERENCES `award` (`id`),
  CONSTRAINT `FK_user_TO_user_award_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout` (
  `id` int(10) unsigned zerofill NOT NULL,
  `type` varchar(45) NOT NULL,
  `met` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workout_diary`
--

DROP TABLE IF EXISTS `workout_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_diary` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned zerofill NOT NULL,
  `file_name` varchar(100) NOT NULL COMMENT 'TIMESTAMP + USERID',
  `reg_date` timestamp NOT NULL,
  `game_record_id` bigint(20) unsigned zerofill NOT NULL COMMENT 'user_game테이블 참조',
  `is_valid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_workout_diary_1` (`user_id`),
  KEY `FK_user_game_TO_workout_diary_1` (`game_record_id`),
  CONSTRAINT `FK_user_TO_workout_diary_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `workout_diary_ibfk_1` FOREIGN KEY (`game_record_id`) REFERENCES `game_record` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:09:43
