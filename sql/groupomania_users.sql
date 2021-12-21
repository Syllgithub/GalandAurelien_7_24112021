-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `userLastname` varchar(200) NOT NULL,
  `userFirstname` varchar(200) NOT NULL,
  `userProfilePic` varchar(200) DEFAULT NULL,
  `content` text NOT NULL,
  `isLiked` tinyint(1) DEFAULT '0',
  `postDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (103,8,'Galand','Aurélien','http://localhost:3000/images/aurelien.galand.jpg1640108979169.jpg','Lorem ipsum dolor sit amet. Rem enim rerum et consequuntur alias vel sapiente officia ut maxime velit non sint itaque ut laboriosam odio aut accusamus inventore? Et officia porro a laborum suscipit et omnis fugiat et quaerat natus sed soluta consequatur ab officiis molestiae? Sed porro quia in sint impedit qui autem soluta id magnam dolorem. Eos obcaecati natus sit autem quibusdam ex cumque sint.\n\nAut odio repudiandae ut odit veniam ut laborum dolores in sapiente reprehenderit non voluptas facere. 33 similique similique sit ipsa eaque aut laboriosam nemo et eius internos ea alias amet aut harum enim quo laudantium minima. Et error fuga eos eveniet animi ea vero nemo ut assumenda neque 33 voluptatem dolorem sed temporibus vitae. Aut doloribus omnis hic tempore dolores qui necessitatibus voluptatibus 33 sint possimus est harum minima aut veritatis commodi?\n\nEos corrupti error qui consequatur magni qui omnis consequatur. Ea possimus nobis ut doloribus praesentium ea nihil consequatur id sapiente iusto qui fuga omnis. Aut tempora unde ea tempora aspernatur aut iure aperiam id laborum error et voluptas explicabo.',0,'2021-12-21 18:57:49'),(105,8,'Galand','Aurélien','http://localhost:3000/images/aurelien.galand.jpg1640109609526.jpg','test',0,'2021-12-21 19:06:28');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(200) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `bio` text,
  `isAdmin` tinyint(1) NOT NULL,
  `userPic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'test1','1test','test2@test.test','$2b$10$/Ax8JwNt4A9Fam1CbpKj7.XLXUr8stWv.sIUfK72x9VjA6ha1qeEW',NULL,0,'defaultprofilepic.jpg'),(8,'Galand','Aurélien','aurelien.galand@gmail.com','$2b$10$5NAy3D3oFUaPdHKQH.QCauAJcBLTJitmZpx0OZVNlqyfLZkVRPqDW','Bonjour\nCeci est ma description\n\nJe suis développeur Web chez Groupomania\nCette description est éditable à souhaits. ',0,'http://localhost:3000/images/aurelien.galand.jpg1640112225326.jpg'),(11,'Du','Jean','jeandu@jd.com','$2b$10$L3n0ojHdK8XJqelIuOJg/uYkDZvcZT2yEsp8heoQnLoN/RviD/KeS',NULL,0,NULL),(12,'testes','tsetest','setsetse','$2b$10$4PnDGHSGfCfG9o.QQ174GuPz/kjdu.FwE0KG/GBb.rOZbkejRcofi',NULL,0,'defaultprofilepic.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-21 22:28:09
