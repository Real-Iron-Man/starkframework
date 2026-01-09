-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stark_framework_test
-- ------------------------------------------------------
-- Server version	8.0.39


--
-- Table structure for table `user`
--
DROP SCHEMA IF EXISTS  `stark_framework_test`;

CREATE schema stark_framework_test;
USE stark_framework_test;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User 1'),
(2,'User 2'),
(3,'User 3'),
(4,'User 4'),
(5,'User 5'),
(6,'User 6'),
(7,'User 7'),
(8,'User 8'),
(9,'User 9'),
(10,'User 10'),
(11,'User 11'),
(12,'User 12'),
(13,'User 13'),
(14,'User 14'),
(15,'User 15'),
(16,'User 16'),
(17,'User 17'),
(18,'User 18'),
(19,'User 19'),
(20,'User 20'),
(21,'User 21'),
(22,'User 22'),
(23,'User 23'),
(24,'User 24'),
(25,'User 25'),
(26,'User 26'),
(27,'User 27'),
(28,'User 28'),
(29,'User 29'),
(30,'User 30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_data`
--

CREATE TABLE `post_data` (
  `post_data_id` int NOT NULL AUTO_INCREMENT,
  `post_data_value` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`post_data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;