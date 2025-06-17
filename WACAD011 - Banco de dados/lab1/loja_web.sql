CREATE DATABASE  IF NOT EXISTS `loja_web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `loja_web`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: loja_web
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

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
-- Table structure for table `CATEGORIA`
--

DROP TABLE IF EXISTS `CATEGORIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIA` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIA`
--

LOCK TABLES `CATEGORIA` WRITE;
/*!40000 ALTER TABLE `CATEGORIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `CATEGORIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CLIENTE`
--

DROP TABLE IF EXISTS `CLIENTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLIENTE` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome_completo` varchar(255) NOT NULL,
  `cpf` char(11) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CLIENTE`
--

LOCK TABLES `CLIENTE` WRITE;
/*!40000 ALTER TABLE `CLIENTE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CLIENTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPRA`
--

DROP TABLE IF EXISTS `COMPRA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPRA` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `data_hora_compra` datetime NOT NULL,
  `forma_pagamento` varchar(50) NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `id_cliente` int NOT NULL,
  `id_endereco_envio` int NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_endereco_envio` (`id_endereco_envio`),
  CONSTRAINT `COMPRA_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTE` (`id_cliente`),
  CONSTRAINT `COMPRA_ibfk_2` FOREIGN KEY (`id_endereco_envio`) REFERENCES `ENDERECO` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPRA`
--

LOCK TABLES `COMPRA` WRITE;
/*!40000 ALTER TABLE `COMPRA` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMPRA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ENDERECO`
--

DROP TABLE IF EXISTS `ENDERECO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ENDERECO` (
  `id_endereco` int NOT NULL AUTO_INCREMENT,
  `cep` char(8) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` char(2) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `id_cliente` int NOT NULL,
  PRIMARY KEY (`id_endereco`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `ENDERECO_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTE` (`id_cliente`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ENDERECO`
--

LOCK TABLES `ENDERECO` WRITE;
/*!40000 ALTER TABLE `ENDERECO` DISABLE KEYS */;
/*!40000 ALTER TABLE `ENDERECO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NUMERO_SERIE`
--

DROP TABLE IF EXISTS `NUMERO_SERIE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `NUMERO_SERIE` (
  `id_numero_serie` int NOT NULL AUTO_INCREMENT,
  `numero_serie` varchar(255) NOT NULL,
  `id_produto` int NOT NULL,
  `status` enum('disponivel','vendido') NOT NULL DEFAULT 'disponivel',
  PRIMARY KEY (`id_numero_serie`),
  UNIQUE KEY `numero_serie` (`numero_serie`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `NUMERO_SERIE_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `PRODUTO` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NUMERO_SERIE`
--

LOCK TABLES `NUMERO_SERIE` WRITE;
/*!40000 ALTER TABLE `NUMERO_SERIE` DISABLE KEYS */;
/*!40000 ALTER TABLE `NUMERO_SERIE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUTO`
--

DROP TABLE IF EXISTS `PRODUTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUTO` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) NOT NULL,
  `fabricante` varchar(150) DEFAULT NULL,
  `preco_base` decimal(10,2) NOT NULL,
  `quantidade_disponivel` int NOT NULL DEFAULT '0',
  `id_subcategoria` int NOT NULL,
  PRIMARY KEY (`id_produto`),
  KEY `id_subcategoria` (`id_subcategoria`),
  CONSTRAINT `PRODUTO_ibfk_1` FOREIGN KEY (`id_subcategoria`) REFERENCES `SUBCATEGORIA` (`id_subcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUTO`
--

LOCK TABLES `PRODUTO` WRITE;
/*!40000 ALTER TABLE `PRODUTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRODUTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUTO_COMPRADO`
--

DROP TABLE IF EXISTS `PRODUTO_COMPRADO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PRODUTO_COMPRADO` (
  `id_compra` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int NOT NULL,
  `preco_unitario_na_compra` decimal(10,2) NOT NULL,
  `desconto_item` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id_compra`,`id_produto`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `PRODUTO_COMPRADO_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `COMPRA` (`id_compra`),
  CONSTRAINT `PRODUTO_COMPRADO_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `PRODUTO` (`id_produto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUTO_COMPRADO`
--

LOCK TABLES `PRODUTO_COMPRADO` WRITE;
/*!40000 ALTER TABLE `PRODUTO_COMPRADO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRODUTO_COMPRADO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBCATEGORIA`
--

DROP TABLE IF EXISTS `SUBCATEGORIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUBCATEGORIA` (
  `id_subcategoria` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_subcategoria`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `SUBCATEGORIA_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIA` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBCATEGORIA`
--

LOCK TABLES `SUBCATEGORIA` WRITE;
/*!40000 ALTER TABLE `SUBCATEGORIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `SUBCATEGORIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'loja_web'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-16 20:13:10
