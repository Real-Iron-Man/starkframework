CREATE DATABASE  IF NOT EXISTS `stark_framework_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stark_framework_test`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: stark_framework_test
-- ------------------------------------------------------
-- Server version	8.0.42

--
-- Table structure for table `post_data`
--

DROP TABLE IF EXISTS `post_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_data` (
  `post_data_id` int NOT NULL AUTO_INCREMENT,
  `post_data_value` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`post_data_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_data`
--

LOCK TABLES `post_data` WRITE;
/*!40000 ALTER TABLE `post_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_inventory`
--

DROP TABLE IF EXISTS `room_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_inventory` (
  `room_item_id` int NOT NULL AUTO_INCREMENT,
  `room_item_name` varchar(45) DEFAULT NULL,
  `room_item_quantity` int DEFAULT NULL,
  PRIMARY KEY (`room_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_inventory`
--

LOCK TABLES `room_inventory` WRITE;
/*!40000 ALTER TABLE `room_inventory` DISABLE KEYS */;
INSERT INTO `room_inventory` VALUES (1,'Coffee',100);
/*!40000 ALTER TABLE `room_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User 1'),(2,'User 2'),(3,'User 3'),(4,'User 4'),(5,'User 5'),(6,'User 6'),(7,'User 7'),(8,'User 8'),(9,'User 9'),(10,'User 10'),(11,'User 11'),(12,'User 12'),(13,'User 13'),(14,'User 14'),(15,'User 15'),(16,'User 16'),(17,'User 17'),(18,'User 18'),(19,'User 19'),(20,'User 20'),(21,'User 21'),(22,'User 22'),(23,'User 23'),(24,'User 24'),(25,'User 25'),(26,'User 26'),(27,'User 27'),(28,'User 28'),(29,'User 29'),(30,'User 30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
-- Dump completed on 2026-01-10 21:26:34