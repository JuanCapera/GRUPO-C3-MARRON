CREATE DATABASE `GESTION_INVENTARIO` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- GESTION_INVENTARIO.CATEGORIA definition

CREATE TABLE `CATEGORIA` (
  `ID_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `DESCRIPCION` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`ID_CATEGORIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- GESTION_INVENTARIO.PRODUCTO definition

CREATE TABLE `PRODUCTO` (
  `ID_PRODUCTO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `PRECIO` int(11) DEFAULT NULL,
  `DESCRIPCION` varchar(300) DEFAULT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `ID_CATEGORIA` int(11) NOT NULL,
  PRIMARY KEY (`ID_PRODUCTO`),
  KEY `PRODUCTO_CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `PRODUCTO_CATEGORIA` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=In
