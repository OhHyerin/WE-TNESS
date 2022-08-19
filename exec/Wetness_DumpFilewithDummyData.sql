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
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
INSERT INTO `award` VALUES (00000000000000000001,'login_1','첫 출석'),(00000000000000000002,'login_3','연속 3일 로그인'),(00000000000000000003,'login_5','연속 5일 로그인'),(00000000000000000004,'login_10','연속 10일 로그인'),(00000000000000000005,'gold_1','1등 1번 달성'),(00000000000000000006,'gold_10','1등 10번 달성'),(00000000000000000007,'silver_1','2등 1번 달성'),(00000000000000000008,'silver_22','2등 22번 달성'),(00000000000000000009,'bronze_1','3등 1번 달성'),(00000000000000000010,'bronze_33','3등 33번 달성'),(00000000000000000011,'pushup_20','푸시업 20번 달성'),(00000000000000000012,'pushup_40','푸시업 40번 달성'),(00000000000000000013,'burpee_20','버피 20번 달성'),(00000000000000000014,'burpee_40','버피 40번 달성'),(00000000000000000015,'squat_20','스쿼트 20번 달성'),(00000000000000000016,'squat_40','스쿼트 40번 달성'),(00000000000000000017,'lunge_20','런지 20번 달성'),(00000000000000000018,'lunge_40','런지 40번 달성'),(00000000000000000019,'follower_1','팔로워 1명 달성'),(00000000000000000020,'follower_10','팔로워 10명 달성'),(00000000000000000021,'follower_100','팔로워 100명 달성');
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES ('1100000000','301','서울특별시'),('1111000000','302','종로구'),('1114000000','302','중구'),('1117000000','302','용산구'),('1120000000','302','성동구'),('1121500000','302','광진구'),('1123000000','302','동대문구'),('1126000000','302','중랑구'),('1129000000','302','성북구'),('1130500000','302','강북구'),('1132000000','302','도봉구'),('1135000000','302','노원구'),('1138000000','302','은평구'),('1141000000','302','서대문구'),('1144000000','302','마포구'),('1147000000','302','양천구'),('1150000000','302','강서구'),('1153000000','302','구로구'),('1154500000','302','금천구'),('1156000000','302','영등포구'),('1159000000','302','동작구'),('1162000000','302','관악구'),('1165000000','302','서초구'),('1168000000','302','강남구'),('1171000000','302','송파구'),('1174000000','302','강동구'),('2600000000','301','부산광역시'),('2611000000','302','중구'),('2614000000','302','서구'),('2617000000','302','동구'),('2620000000','302','영도구'),('2623000000','302','부산진구'),('2626000000','302','동래구'),('2629000000','302','남구'),('2632000000','302','북구'),('2635000000','302','해운대구'),('2638000000','302','사하구'),('2641000000','302','금정구'),('2644000000','302','강서구'),('2647000000','302','연제구'),('2650000000','302','수영구'),('2653000000','302','사상구'),('2671000000','302','기장군'),('2700000000','301','대구광역시'),('2711000000','302','중구'),('2714000000','302','동구'),('2717000000','302','서구'),('2720000000','302','남구'),('2723000000','302','북구'),('2726000000','302','수성구'),('2729000000','302','달서구'),('2771000000','302','달성군'),('2800000000','301','인천광역시'),('2811000000','302','중구'),('2814000000','302','동구'),('2817700000','302','미추홀구'),('2818500000','302','연수구'),('2820000000','302','남동구'),('2823700000','302','부평구'),('2824500000','302','계양구'),('2826000000','302','서구'),('2871000000','302','강화군'),('2872000000','302','옹진군'),('2900000000','301','광주광역시'),('2911000000','302','동구'),('2914000000','302','서구'),('2915500000','302','남구'),('2917000000','302','북구'),('2920000000','302','광산구'),('3000000000','301','대전광역시'),('3011000000','302','동구'),('3014000000','302','중구'),('3017000000','302','서구'),('3020000000','302','유성구'),('3023000000','302','대덕구'),('3100000000','301','울산광역시'),('3111000000','302','중구'),('3114000000','302','남구'),('3117000000','302','동구'),('3120000000','302','북구'),('3171000000','302','울주군'),('3611000000','302','세종특별자치시'),('4100000000','301','경기도'),('4111000000','302','수원시'),('4111100000','302','수원시 장안구'),('4111300000','302','수원시 권선구'),('4111500000','302','수원시 팔달구'),('4111700000','302','수원시 영통구'),('4113000000','302','성남시'),('4113100000','302','성남시 수정구'),('4113300000','302','성남시 중원구'),('4113500000','302','성남시 분당구'),('4115000000','302','의정부시'),('4117000000','302','안양시'),('4117100000','302','안양시 만안구'),('4117300000','302','안양시 동안구'),('4119000000','302','부천시'),('4121000000','302','광명시'),('4122000000','302','평택시'),('4125000000','302','동두천시'),('4127000000','302','안산시'),('4127100000','302','안산시 상록구'),('4127300000','302','안산시 단원구'),('4128000000','302','고양시'),('4128100000','302','고양시 덕양구'),('4128500000','302','고양시 일산동구'),('4128700000','302','고양시 일산서구'),('4129000000','302','과천시'),('4131000000','302','구리시'),('4136000000','302','남양주시'),('4137000000','302','오산시'),('4139000000','302','시흥시'),('4141000000','302','군포시'),('4143000000','302','의왕시'),('4145000000','302','하남시'),('4146000000','302','용인시'),('4146100000','302','용인시 처인구'),('4146300000','302','용인시 기흥구'),('4146500000','302','용인시 수지구'),('4148000000','302','파주시'),('4150000000','302','이천시'),('4155000000','302','안성시'),('4157000000','302','김포시'),('4159000000','302','화성시'),('4161000000','302','광주시'),('4163000000','302','양주시'),('4165000000','302','포천시'),('4167000000','302','여주시'),('4180000000','302','연천군'),('4182000000','302','가평군'),('4183000000','302','양평군'),('4200000000','301','강원도'),('4211000000','302','춘천시'),('4213000000','302','원주시'),('4215000000','302','강릉시'),('4217000000','302','동해시'),('4219000000','302','태백시'),('4221000000','302','속초시'),('4223000000','302','삼척시'),('4272000000','302','홍천군'),('4273000000','302','횡성군'),('4275000000','302','영월군'),('4276000000','302','평창군'),('4277000000','302','정선군'),('4278000000','302','철원군'),('4279000000','302','화천군'),('4280000000','302','양구군'),('4281000000','302','인제군'),('4282000000','302','고성군'),('4283000000','302','양양군'),('4300000000','301','충청북도'),('4311000000','302','청주시'),('4311100000','302','청주시 상당구'),('4311200000','302','청주시 서원구'),('4311300000','302','청주시 흥덕구'),('4311400000','302','청주시 청원구'),('4313000000','302','충주시'),('4315000000','302','제천시'),('4372000000','302','보은군'),('4373000000','302','옥천군'),('4374000000','302','영동군'),('4374500000','302','증평군'),('4375000000','302','진천군'),('4376000000','302','괴산군'),('4377000000','302','음성군'),('4380000000','302','단양군'),('4400000000','301','충청남도'),('4413000000','302','천안시'),('4413100000','302','천안시 동남구'),('4413300000','302','천안시 서북구'),('4415000000','302','공주시'),('4418000000','302','보령시'),('4420000000','302','아산시'),('4421000000','302','서산시'),('4423000000','302','논산시'),('4425000000','302','계룡시'),('4427000000','302','당진시'),('4471000000','302','금산군'),('4476000000','302','부여군'),('4477000000','302','서천군'),('4479000000','302','청양군'),('4480000000','302','홍성군'),('4481000000','302','예산군'),('4482500000','302','태안군'),('4500000000','301','전라북도'),('4511000000','302','전주시'),('4511100000','302','전주시 완산구'),('4511300000','302','전주시 덕진구'),('4513000000','302','군산시'),('4514000000','302','익산시'),('4518000000','302','정읍시'),('4519000000','302','남원시'),('4521000000','302','김제시'),('4571000000','302','완주군'),('4572000000','302','진안군'),('4573000000','302','무주군'),('4574000000','302','장수군'),('4575000000','302','임실군'),('4577000000','302','순창군'),('4579000000','302','고창군'),('4580000000','302','부안군'),('4600000000','301','전라남도'),('4611000000','302','목포시'),('4613000000','302','여수시'),('4615000000','302','순천시'),('4617000000','302','나주시'),('4623000000','302','광양시'),('4671000000','302','담양군'),('4672000000','302','곡성군'),('4673000000','302','구례군'),('4677000000','302','고흥군'),('4678000000','302','보성군'),('4679000000','302','화순군'),('4680000000','302','장흥군'),('4681000000','302','강진군'),('4682000000','302','해남군'),('4683000000','302','영암군'),('4684000000','302','무안군'),('4686000000','302','함평군'),('4687000000','302','영광군'),('4688000000','302','장성군'),('4689000000','302','완도군'),('4690000000','302','진도군'),('4691000000','302','신안군'),('4700000000','301','경상북도'),('4711000000','302','포항시'),('4711100000','302','포항시 남구'),('4711300000','302','포항시 북구'),('4713000000','302','경주시'),('4715000000','302','김천시'),('4717000000','302','안동시'),('4719000000','302','구미시'),('4721000000','302','영주시'),('4723000000','302','영천시'),('4725000000','302','상주시'),('4728000000','302','문경시'),('4729000000','302','경산시'),('4772000000','302','군위군'),('4773000000','302','의성군'),('4775000000','302','청송군'),('4776000000','302','영양군'),('4777000000','302','영덕군'),('4782000000','302','청도군'),('4783000000','302','고령군'),('4784000000','302','성주군'),('4785000000','302','칠곡군'),('4790000000','302','예천군'),('4792000000','302','봉화군'),('4793000000','302','울진군'),('4794000000','302','울릉군'),('4800000000','301','경상남도'),('4812000000','302','창원시'),('4812100000','302','창원시 의창구'),('4812300000','302','창원시 성산구'),('4812500000','302','창원시 마산합포구'),('4812700000','302','창원시 마산회원구'),('4812900000','302','창원시 진해구'),('4817000000','302','진주시'),('4822000000','302','통영시'),('4824000000','302','사천시'),('4825000000','302','김해시'),('4827000000','302','밀양시'),('4831000000','302','거제시'),('4833000000','302','양산시'),('4872000000','302','의령군'),('4873000000','302','함안군'),('4874000000','302','창녕군'),('4882000000','302','고성군'),('4884000000','302','남해군'),('4885000000','302','하동군'),('4886000000','302','산청군'),('4887000000','302','함양군'),('4888000000','302','거창군'),('4889000000','302','합천군'),('5000000000','301','제주특별자치도'),('5011000000','302','제주시'),('5013000000','302','서귀포시');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `common_code_type`
--

LOCK TABLES `common_code_type` WRITE;
/*!40000 ALTER TABLE `common_code_type` DISABLE KEYS */;
INSERT INTO `common_code_type` VALUES ('301','시도코드'),('302','구군코드');
/*!40000 ALTER TABLE `common_code_type` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `dongcode`
--

LOCK TABLES `dongcode` WRITE;
/*!40000 ALTER TABLE `dongcode` DISABLE KEYS */;
INSERT INTO `dongcode` VALUES ('1100000000','서울특별시',NULL,NULL,'126.978652258309','37.566826004661'),('2600000000','부산광역시',NULL,NULL,'129.075087492149','35.1798200522868'),('2700000000','대구광역시',NULL,NULL,'128.601805491072','35.8713802646197'),('2800000000','인천광역시',NULL,NULL,'126.705258070068','37.4560044656444'),('2900000000','광주광역시',NULL,NULL,'126.851629955742','35.1601037626662'),('3000000000','대전광역시',NULL,NULL,'127.38483484675','36.3505388992836'),('3100000000','울산광역시',NULL,NULL,'129.311603446508','35.5395955247058'),('4100000000','경기도',NULL,NULL,'127.00892996953','37.2749769872425'),('4200000000','강원도',NULL,NULL,'127.729829010354','37.8853257858209'),('4300000000','충청북도',NULL,NULL,'127.491457326501','36.6353581959954'),('4400000000','충청남도',NULL,NULL,'126.672776193822','36.6588292532864'),('4500000000','전라북도',NULL,NULL,'127.108976712011','35.8201963639272'),('4600000000','전라남도',NULL,NULL,'126.462788333376','34.8160821478848'),('4700000000','경상북도',NULL,NULL,'128.505799255401','36.5759962255808'),('4800000000','경상남도',NULL,NULL,'128.69189688916','35.2377742104522'),('5000000000','제주특별자치도',NULL,NULL,'126.498229141199','33.4889179032603');
/*!40000 ALTER TABLE `dongcode` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `fitness_record`
--

LOCK TABLES `fitness_record` WRITE;
/*!40000 ALTER TABLE `fitness_record` DISABLE KEYS */;
INSERT INTO `fitness_record` VALUES (00000000000000000001,33,1,10,'2022-08-09'),(00000000000000000002,33,1,24,'2022-08-08'),(00000000000000000003,33,3,42,'2022-08-07'),(00000000000000000004,33,5,0,'2022-08-12');
/*!40000 ALTER TABLE `fitness_record` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (00000000000000000004,00000000000000000123,'2012-12-05 18:20:25','2012-12-11 21:20:24',0),(00000000000000000005,00000000000000000129,'2022-07-14 03:43:45',NULL,1);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `game_record`
--

LOCK TABLES `game_record` WRITE;
/*!40000 ALTER TABLE `game_record` DISABLE KEYS */;
INSERT INTO `game_record` VALUES (00000000000000000001,00000000000000000033,00000000000000000004,0000000001,30,1),(00000000000000000002,00000000000000000033,00000000000000000004,0000000001,30,1),(00000000000000000003,00000000000000000033,00000000000000000004,0000000001,30,1),(00000000000000000004,00000000000000000033,00000000000000000004,0000000001,30,1),(00000000000000000005,00000000000000000033,00000000000000000004,0000000001,30,1);
/*!40000 ALTER TABLE `game_record` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `logged_continue`
--

LOCK TABLES `logged_continue` WRITE;
/*!40000 ALTER TABLE `logged_continue` DISABLE KEYS */;
INSERT INTO `logged_continue` VALUES (00000000000000000029,1,3,'2022-07-27'),(00000000000000000031,2,2,'2022-08-02'),(00000000000000000033,1,3,'2022-08-19'),(00000000000000000034,2,2,'2022-08-15'),(00000000000000000035,1,1,'2022-08-04'),(00000000000000000036,5,5,'2022-08-19'),(00000000000000000037,1,1,'2022-08-14'),(00000000000000000039,1,1,'2022-08-12'),(00000000000000000040,2,2,'2022-08-15');
/*!40000 ALTER TABLE `logged_continue` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `logged_in`
--

LOCK TABLES `logged_in` WRITE;
/*!40000 ALTER TABLE `logged_in` DISABLE KEYS */;
INSERT INTO `logged_in` VALUES (00000000000000000001,'2022-08-10 11:43:17',00000000000000000033),(00000000000000000002,'2022-08-10 11:43:19',00000000000000000033),(00000000000000000003,'2022-08-10 11:49:45',00000000000000000033),(00000000000000000004,'2022-08-10 13:18:23',00000000000000000033),(00000000000000000005,'2022-08-10 13:18:32',00000000000000000033),(00000000000000000006,'2022-08-09 13:19:27',00000000000000000033),(00000000000000000007,'2022-08-08 13:45:27',00000000000000000033),(00000000000000000008,'2022-08-12 13:29:29',00000000000000000033),(00000000000000000009,'2022-08-12 14:18:35',00000000000000000033),(00000000000000000010,'2022-08-12 14:37:34',00000000000000000033),(00000000000000000011,'2022-08-12 16:43:50',00000000000000000037),(00000000000000000012,'2022-08-12 16:53:40',00000000000000000039),(00000000000000000013,'2022-08-14 14:29:13',00000000000000000034),(00000000000000000014,'2022-08-14 14:31:26',00000000000000000040),(00000000000000000015,'2022-08-14 21:29:26',00000000000000000033),(00000000000000000016,'2022-08-14 21:35:26',00000000000000000037),(00000000000000000017,'2022-08-14 22:52:42',00000000000000000033),(00000000000000000018,'2022-08-15 02:08:24',00000000000000000033),(00000000000000000019,'2022-08-15 02:08:49',00000000000000000034),(00000000000000000020,'2022-08-15 02:09:34',00000000000000000036),(00000000000000000021,'2022-08-15 02:15:10',00000000000000000033),(00000000000000000022,'2022-08-15 02:22:47',00000000000000000040),(00000000000000000023,'2022-08-16 13:18:17',00000000000000000033),(00000000000000000024,'2022-08-16 15:14:39',00000000000000000036),(00000000000000000025,'2022-08-17 21:40:41',00000000000000000036),(00000000000000000026,'2022-08-18 16:13:10',00000000000000000036),(00000000000000000027,'2022-08-19 01:52:57',00000000000000000036),(00000000000000000028,'2022-08-19 02:21:34',00000000000000000036),(00000000000000000029,'2022-08-19 04:54:33',00000000000000000036),(00000000000000000030,'2022-08-19 05:10:40',00000000000000000033),(00000000000000000031,'2022-08-19 05:12:19',00000000000000000033);
/*!40000 ALTER TABLE `logged_in` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `medal`
--

LOCK TABLES `medal` WRITE;
/*!40000 ALTER TABLE `medal` DISABLE KEYS */;
INSERT INTO `medal` VALUES (00000000000000000033,5,0,0,5);
/*!40000 ALTER TABLE `medal` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (00000000000000000002,00000000000000000033,NULL,'2022-08-10 02:43:17',_binary '\0','award',NULL,18),(00000000000000000003,00000000000000000033,NULL,'2022-08-12 04:29:29',_binary '\0','award',NULL,1),(00000000000000000004,00000000000000000033,NULL,'2022-08-12 05:21:55',_binary '\0','award',NULL,14),(00000000000000000005,00000000000000000033,NULL,'2022-08-12 05:26:44',_binary '\0','award',NULL,4),(00000000000000000006,00000000000000000037,NULL,'2022-08-12 07:43:50',_binary '','award',NULL,1),(00000000000000000007,00000000000000000039,NULL,'2022-08-12 07:53:40',_binary '\0','award',NULL,1),(00000000000000000008,00000000000000000034,NULL,'2022-08-14 05:29:13',_binary '\0','award',NULL,1),(00000000000000000009,00000000000000000039,NULL,'2022-08-14 05:29:56',_binary '\0','award',NULL,19),(00000000000000000010,00000000000000000039,00000000000000000034,'2022-08-14 05:29:56',_binary '\0','follow',NULL,NULL),(00000000000000000011,00000000000000000040,NULL,'2022-08-14 05:31:03',_binary '\0','award',NULL,19),(00000000000000000012,00000000000000000040,00000000000000000034,'2022-08-14 05:31:03',_binary '\0','follow',NULL,NULL),(00000000000000000013,00000000000000000040,NULL,'2022-08-14 05:31:26',_binary '\0','award',NULL,1),(00000000000000000014,00000000000000000033,NULL,'2022-08-14 12:29:26',_binary '\0','award',NULL,1),(00000000000000000015,00000000000000000037,NULL,'2022-08-14 12:35:26',_binary '\0','award',NULL,1),(00000000000000000016,00000000000000000036,NULL,'2022-08-14 17:09:34',_binary '\0','award',NULL,1),(00000000000000000017,00000000000000000033,NULL,'2022-08-16 04:18:17',_binary '\0','award',NULL,2),(00000000000000000018,00000000000000000036,NULL,'2022-08-17 12:40:41',_binary '\0','award',NULL,2),(00000000000000000019,00000000000000000033,NULL,'2022-08-18 07:14:13',_binary '\0','award',NULL,19),(00000000000000000020,00000000000000000033,00000000000000000036,'2022-08-18 07:14:13',_binary '\0','follow',NULL,NULL),(00000000000000000021,00000000000000000033,00000000000000000036,'2022-08-18 07:33:20',_binary '\0','follow',NULL,NULL),(00000000000000000022,00000000000000000033,00000000000000000036,'2022-08-18 07:33:22',_binary '\0','follow',NULL,NULL),(00000000000000000023,00000000000000000033,00000000000000000036,'2022-08-18 07:34:01',_binary '\0','follow',NULL,NULL),(00000000000000000024,00000000000000000033,00000000000000000036,'2022-08-18 07:43:13',_binary '\0','follow',NULL,NULL),(00000000000000000025,00000000000000000036,NULL,'2022-08-18 16:52:57',_binary '\0','award',NULL,3),(00000000000000000026,00000000000000000033,00000000000000000036,'2022-08-18 19:54:46',_binary '\0','follow',NULL,NULL),(00000000000000000027,00000000000000000033,00000000000000000036,'2022-08-18 19:54:48',_binary '\0','follow',NULL,NULL),(00000000000000000028,00000000000000000033,00000000000000000036,'2022-08-18 20:00:19',_binary '\0','follow',NULL,NULL);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (00000000000000000001,00000000000000000034,00000000000000000033,'게임을 할때 방해해요','2022-08-14 17:09:26',_binary '\0'),(00000000000000000002,00000000000000000036,00000000000000000033,'너무 말이 많아요','2022-08-14 17:09:55',_binary '\0');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (00000000000000000123,'dd','dd',0000000001,0,'2022-02-01 15:00:00','2022-02-01 15:00:00',00000000000000000000),(00000000000000000124,'dsfa','',0000000001,0,'2022-08-14 12:29:31',NULL,00000000000000000033),(00000000000000000125,'dsfa','',0000000001,0,'2022-08-14 12:29:34',NULL,00000000000000000033),(00000000000000000126,'test','',0000000001,0,'2022-08-14 12:33:35',NULL,00000000000000000033),(00000000000000000127,'testr','',0000000001,0,'2022-08-14 12:35:33',NULL,00000000000000000037),(00000000000000000128,'testr','',0000000001,0,'2022-08-14 12:41:32',NULL,00000000000000000037),(00000000000000000129,'test1','',0000000001,0,'2022-08-14 12:43:40',NULL,00000000000000000037),(00000000000000000130,'test','',0000000001,0,'2022-08-16 04:18:22',NULL,00000000000000000033),(00000000000000000131,'test','',0000000001,0,'2022-08-16 04:18:24',NULL,00000000000000000033),(00000000000000000132,'ㄴㅇㄹ','',0000000001,0,'2022-08-16 04:18:43',NULL,00000000000000000033);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `room_user`
--

LOCK TABLES `room_user` WRITE;
/*!40000 ALTER TABLE `room_user` DISABLE KEYS */;
INSERT INTO `room_user` VALUES (00000000000000000001,00000000000000000128,'37','2022-08-14 12:41:33',NULL),(00000000000000000002,00000000000000000129,'37','2022-08-14 12:43:40',NULL);
/*!40000 ALTER TABLE `room_user` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (00000000000000000033,'qwer1@gmail.com','$2a$10$PH8hNItNig4kbUW01k0EROsEyFEXEH.9s4Z2V2BgfIR3tUIMddyg.','qwer1',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwODUzNTM4NTg1LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYxNDU4MzM4LCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.SfHYTkI5y3xDJUSzcIK2Fw7BvJqRIwgjoQ90KSDphGI'),(00000000000000000034,'qwer2@gmail.com','$2a$10$sX7l5pFp1t1NLDkZ7Gu/L.jHN9jmF9g71IcAZaRfseIc.KWvPRi/i','qwer2',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwNDk2OTI5MTEzLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYxMTAxNzI5LCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.NXhputJCQcmSVJfx-Gr9QBGBRhCeoJfnVRYuYcvv-W8'),(00000000000000000035,'qwer3@gmail.com','$2a$10$Nk1yEm4KeDB9L5AaoQ1cqe7ML1aF26fvCkNYbL8aDg9gjoJ2UamPC','qwer3',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjU5NTgzMjEyODM4LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYwMTg4MDEyLCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.QprqBOXgYGw4SukoWqshGAHRKtuc5A0BruD59STf4XQ'),(00000000000000000036,'qwer4@gmail.com','$2a$10$nWud.CbdpUN7O6lbp.3l3u5UB5tjtnz9/nTvlfwCJXnwoQJ2nIuHK','qwer4',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwODUyNDcyNjY1LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYxNDU3MjcyLCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.R9yxL48f9X03KRQrTnBdpnILSlrfJTwgBTo5TujklGw'),(00000000000000000037,'qwer5@gmail.com','$2a$10$AgyvLV7boTFnd8UqYjCP6.R7elQbYLE2pvfr55zo90So6pFVBboQ.','qwer5',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwNDgwNTI2NDU5LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYxMDg1MzI2LCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.MnuNbuJ99yP64hgJ21IYXy1jSQ1qr6UZkidaIJT-wZI'),(00000000000000000038,'qwer6@gmail.com','$2a$10$kenXTQREOOdfBopVaEepBuWTTPzSE.8Fmf.mfM81hckdyO23Zfcgq','qwer6',NULL,NULL,NULL,NULL,NULL,'wetness','user',_binary '\0',NULL,NULL,NULL),(00000000000000000039,'qwer11@gmail.com','$2a$10$qk9eQUvjjoeplOKru57fLOPSk1NZRGgF73RRuvY/T6AphTaclMvsO','qqqq',NULL,NULL,NULL,NULL,NULL,'wetness','drop',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwMjkwODIwMjc2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYwODk1NjIwLCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.e_o0pmu8gpbjgjgej4JielgmI4Va0eRMabGGlY5v3_w'),(00000000000000000040,'admin01@wetness.com','$2a$10$9hbWs0CqJo7pwwog6sR1oO7CmID6CSsNI3H8xyxUAwAlhmzwbR8E6','admin01',NULL,NULL,NULL,NULL,NULL,'wetness','admin',_binary '\0',NULL,NULL,'eyJyZWdEYXRlIjoxNjYwNDk3NzY3MjA3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjYxMTAyNTY3LCJpc3N1ZXIiOiJ3ZXRuZXNzIn0.KOczJVwrg7ScMla2gb0au3chAdgDQE22MlHLm_saaKs');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `user_award`
--

LOCK TABLES `user_award` WRITE;
/*!40000 ALTER TABLE `user_award` DISABLE KEYS */;
INSERT INTO `user_award` VALUES (00000000000000000001,00000000000000000033,'2022-08-14 12:29:26'),(00000000000000000001,00000000000000000034,'2022-08-14 05:29:13'),(00000000000000000001,00000000000000000036,'2022-08-14 17:09:34'),(00000000000000000001,00000000000000000037,'2022-08-14 12:35:26'),(00000000000000000001,00000000000000000040,'2022-08-14 05:31:26'),(00000000000000000002,00000000000000000033,'2022-08-16 04:18:17'),(00000000000000000002,00000000000000000036,'2022-08-17 12:40:41'),(00000000000000000003,00000000000000000036,'2022-08-18 16:52:57'),(00000000000000000019,00000000000000000033,'2022-08-18 07:14:13'),(00000000000000000019,00000000000000000039,'2022-08-14 05:29:56'),(00000000000000000019,00000000000000000040,'2022-08-14 05:31:03');
/*!40000 ALTER TABLE `user_award` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` VALUES (0000000001,'squat',5),(0000000002,'push-ups',8),(0000000003,'burpee',7),(0000000004,'plank',5);
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2022-08-19 11:12:56
