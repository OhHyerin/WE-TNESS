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
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `id` bigint NOT NULL,
  `event_name` varchar(45) NOT NULL COMMENT '도전과제명',
  `detail` varchar(100) NOT NULL COMMENT '도전과제 내용',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `target_id` bigint NOT NULL,
  `ban_date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `block_user_user_id_idx` (`target_id`),
  KEY `block_user_id_user_id` (`user_id`),
  CONSTRAINT `block_target_id_user_id` FOREIGN KEY (`target_id`) REFERENCES `user` (`id`),
  CONSTRAINT `block_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `follower_id` bigint NOT NULL,
  `following_id` bigint NOT NULL,
  `follow_date` timestamp NOT NULL,
  PRIMARY KEY (`follower_id`,`following_id`),
  KEY `follow_following_id_user_id_idx` (`following_id`),
  CONSTRAINT `follow_follower_id_user_id` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_following_id_user_id` FOREIGN KEY (`following_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` bigint NOT NULL,
  `room_id` bigint NOT NULL,
  `workout_id` bigint NOT NULL,
  `create_date` timestamp NOT NULL,
  `terminate_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `game_room_id_room_id_idx` (`room_id`),
  KEY `game_workout_id_workout_id_idx` (`workout_id`),
  CONSTRAINT `game_room_id_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `game_workout_id_workout_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gugun_code`
--

DROP TABLE IF EXISTS `gugun_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gugun_code` (
  `gugun_code` varchar(10) NOT NULL,
  `gugun_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`gugun_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gugun_code`
--

LOCK TABLES `gugun_code` WRITE;
/*!40000 ALTER TABLE `gugun_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `gugun_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logged_in`
--

DROP TABLE IF EXISTS `logged_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logged_in` (
  `id` bigint NOT NULL,
  `date` varchar(30) NOT NULL,
  `user_id` bigint NOT NULL,
  `consecutively` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `logged_in_user_id_user_id_idx` (`user_id`),
  CONSTRAINT `logged_in_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logged_in`
--

LOCK TABLES `logged_in` WRITE;
/*!40000 ALTER TABLE `logged_in` DISABLE KEYS */;
/*!40000 ALTER TABLE `logged_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `follower_id` bigint NOT NULL,
  `notify_date` timestamp NOT NULL,
  `check` bit(1) NOT NULL,
  `notify_type` varchar(45) NOT NULL,
  `Field` bit(1) DEFAULT NULL,
  `room_code` varchar(45) DEFAULT NULL,
  `badge_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notification_user_id_user_id_idx` (`user_id`),
  KEY `notification_follower_id_user_id` (`follower_id`),
  CONSTRAINT `notification_follower_id_user_id` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`),
  CONSTRAINT `notification_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `sido_code` varchar(45) DEFAULT NULL,
  `workout_id` bigint DEFAULT NULL,
  `score` double DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rank_user_id_user_id_idx` (`user_id`),
  KEY `rank_sido_code_sido_code_sido_code'_idx` (`sido_code`),
  CONSTRAINT `rank_sido_code_sido_code_sido_code'` FOREIGN KEY (`sido_code`) REFERENCES `sido_code` (`sido_code`),
  CONSTRAINT `rank_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank`
--

LOCK TABLES `rank` WRITE;
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` bigint NOT NULL,
  `reporter_id` bigint NOT NULL,
  `accused_id` bigint NOT NULL,
  `content` varchar(45) NOT NULL,
  `report_date` timestamp NOT NULL,
  `process` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `report_reporter_id_user_id_idx` (`reporter_id`),
  KEY `report_reporter_id_user_id_idx1` (`accused_id`),
  CONSTRAINT `report_accused_id_user_id` FOREIGN KEY (`accused_id`) REFERENCES `user` (`id`),
  CONSTRAINT `report_reporter_id_user_id` FOREIGN KEY (`reporter_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `workout_id` bigint NOT NULL,
  `scope` enum('public','private') NOT NULL,
  `create_date` timestamp NOT NULL,
  `terminate_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_workout_id_workout_id_idx` (`workout_id`),
  CONSTRAINT `room_workout_id_workout_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sido_code`
--

DROP TABLE IF EXISTS `sido_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sido_code` (
  `sido_code` varchar(10) NOT NULL,
  `sido_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`sido_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sido_code`
--

LOCK TABLES `sido_code` WRITE;
/*!40000 ALTER TABLE `sido_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `sido_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `today_rank`
--

DROP TABLE IF EXISTS `today_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `today_rank` (
  `id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `sido_code` varchar(45) DEFAULT NULL,
  `workout_id` bigint DEFAULT NULL,
  `total_score` double DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `today_rank_user_id_user_id_idx` (`user_id`),
  KEY `today_rank_sido_code_sido_code_sido_code_idx` (`sido_code`),
  KEY `today_rank_workout_id_workout_id_idx` (`workout_id`),
  CONSTRAINT `today_rank_sido_code_sido_code_sido_code` FOREIGN KEY (`sido_code`) REFERENCES `sido_code` (`sido_code`),
  CONSTRAINT `today_rank_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `today_rank_workout_id_workout_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `today_rank`
--

LOCK TABLES `today_rank` WRITE;
/*!40000 ALTER TABLE `today_rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `today_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `si_code` varchar(45) DEFAULT NULL,
  `gun_code` varchar(45) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `social` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `social_code` varchar(100) DEFAULT NULL,
  `ban_state` bit(1) DEFAULT b'0',
  `ban_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_si_code_sido_code_sido_code_idx` (`si_code`),
  KEY `user_gun_code_gun_code_gun_code_idx` (`gun_code`),
  CONSTRAINT `user_gun_code_gun_code_gun_code` FOREIGN KEY (`gun_code`) REFERENCES `gugun_code` (`gugun_code`),
  CONSTRAINT `user_si_code_sido_code_sido_code` FOREIGN KEY (`si_code`) REFERENCES `sido_code` (`sido_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badge`
--

DROP TABLE IF EXISTS `user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_badge` (
  `user_id` bigint NOT NULL,
  `badge_id` bigint NOT NULL,
  `receive_date` timestamp NOT NULL,
  PRIMARY KEY (`user_id`,`badge_id`),
  KEY `user_badge_badge_id_badge_id_idx` (`badge_id`),
  CONSTRAINT `user_badge_badge_id_badge_id` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`),
  CONSTRAINT `user_badge_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badge`
--

LOCK TABLES `user_badge` WRITE;
/*!40000 ALTER TABLE `user_badge` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_game`
--

DROP TABLE IF EXISTS `user_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_game` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL COMMENT 'user 테이블의 id 참조',
  `game_id` bigint NOT NULL COMMENT 'game 테이블의 id 참조',
  `workout_id` bigint NOT NULL COMMENT 'workout 테이블의 id 참조',
  `score` double NOT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_game_game_id_idx` (`game_id`),
  KEY `user_game_user_id_user_id_idx` (`user_id`),
  KEY `user_game_workout_id_workout_id_idx` (`workout_id`),
  CONSTRAINT `user_game_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `user_game_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_game_workout_id_workout_id` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_game`
--

LOCK TABLES `user_game` WRITE;
/*!40000 ALTER TABLE `user_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout` (
  `id` bigint NOT NULL,
  `type` varchar(45) NOT NULL,
  `calorie` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_diary`
--

DROP TABLE IF EXISTS `workout_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_diary` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `file_name` varchar(100) NOT NULL COMMENT 'TIMESTAMP + USERID',
  `date` timestamp NOT NULL,
  `user_game_id` bigint NOT NULL COMMENT 'user_game테이블 참조',
  PRIMARY KEY (`id`),
  KEY `workout_diary_user_id_user_id_idx` (`user_id`),
  KEY `workout_diary_user_game_id_user_game_id_idx` (`user_game_id`),
  CONSTRAINT `workout_diary_user_game_id_user_game_id` FOREIGN KEY (`user_game_id`) REFERENCES `user_game` (`game_id`),
  CONSTRAINT `workout_diary_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_diary`
--

LOCK TABLES `workout_diary` WRITE;
/*!40000 ALTER TABLE `workout_diary` DISABLE KEYS */;
/*!40000 ALTER TABLE `workout_diary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-18 16:44:28
