-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 17, 2024 at 12:32 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Rakusens`
--

-- --------------------------------------------------------

--
-- Table structure for table `ImageGallery`
--

CREATE TABLE `ImageGallery` (
  `Image_ID` int(11) NOT NULL,
  `SKU_ID` int(11) NOT NULL,
  `Ingredient_ID` int(11) NOT NULL,
  `ImageURL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Ingredients`
--

CREATE TABLE `Ingredients` (
  `Ingredient_ID` int(11) NOT NULL,
  `SKU_ID` int(11) NOT NULL,
  `IngredientName` varchar(50) NOT NULL,
  `Quantity` decimal(4,2) NOT NULL,
  `Size` int(11) NOT NULL,
  `Unit` varchar(20) NOT NULL,
  `ExpiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Ingredients`
--

INSERT INTO `Ingredients` (`Ingredient_ID`, `SKU_ID`, `IngredientName`, `Quantity`, `Size`, `Unit`, `ExpiryDate`) VALUES
(1, 1, 'Flour', 60.00, 1, 'kg', '2024-09-09'),
(2, 1, 'Sugar', 90.00, 5, 'kg', '2026-04-15');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `SKU_ID` int(11) NOT NULL,
  `ProductName` varchar(20) NOT NULL,
  `Price` decimal(6,2) NOT NULL,
  `Size` int(11) NOT NULL,
  `Unit` varchar(20) NOT NULL,
  `QuantityAvailable` int(11) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `Category` varchar(20) NOT NULL,
  `ExpiryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`SKU_ID`, `ProductName`, `Price`, `Size`, `Unit`, `QuantityAvailable`, `Description`, `Category`, `ExpiryDate`) VALUES
(1, 'Gluten Free Matzo', 10.00, 250, 'g', 362, 'Low in fat, sugar and salt, it’s a perfect base for all manner of toppings and with just a few ingredients and a minute or two under the grill makes a perfect mini pizza!', 'Snacks', '2025-01-01'),
(2, 'Gluten Free Cracker', 9.00, 300, 'g', 498, 'Rakusen’s Gluten Free Crackers are a healthy, versatile choice for a range of toppings.\r\n\r\nTasty, crispy and naturally free from gluten, they are the perfect option for guilt-free snacking.', 'Snacks', '2025-07-03'),
(3, 'Traditional Matzos', 12.00, 400, 'g', 400, 'Our traditional Matzo, the one that comes in the big blue box, is also our most versatile cracker.\r\n\r\nLow in fat, sugar and salt, it’s a perfect base for all manner of toppings and with just a few ingredients and a minute or two under the grill makes a perfect mini pizza!', 'Snacks', '2024-09-09');

-- --------------------------------------------------------

--
-- Table structure for table `PurchaseOrders`
--

CREATE TABLE `PurchaseOrders` (
  `PurchaseOrder_ID` int(11) NOT NULL,
  `SKU_ID` int(11) NOT NULL,
  `Vendor_ID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL,
  `Status` varchar(20) NOT NULL,
  `TotalAmount` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `User_ID` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `UserType` varchar(30) NOT NULL,
  `Status` enum('Approved','Pending','Deactivated','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`User_ID`, `Username`, `Password`, `UserType`, `Status`) VALUES
(100, 'Dave', 'Jones', 'Vendor', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `Vendors`
--

CREATE TABLE `Vendors` (
  `Vendor_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `VendorName` varchar(30) NOT NULL,
  `ContactInfo` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Status` enum('Approved','Pending','Deactivated','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ImageGallery`
--
ALTER TABLE `ImageGallery`
  ADD PRIMARY KEY (`Image_ID`),
  ADD KEY `Product_ID` (`SKU_ID`),
  ADD KEY `Ingredient_ID` (`Ingredient_ID`);

--
-- Indexes for table `Ingredients`
--
ALTER TABLE `Ingredients`
  ADD PRIMARY KEY (`Ingredient_ID`),
  ADD KEY `SKU_ID` (`SKU_ID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`SKU_ID`);

--
-- Indexes for table `PurchaseOrders`
--
ALTER TABLE `PurchaseOrders`
  ADD PRIMARY KEY (`PurchaseOrder_ID`),
  ADD KEY `SKU_ID` (`SKU_ID`,`Vendor_ID`),
  ADD KEY `Vendor_ID` (`Vendor_ID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`User_ID`);

--
-- Indexes for table `Vendors`
--
ALTER TABLE `Vendors`
  ADD PRIMARY KEY (`Vendor_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ImageGallery`
--
ALTER TABLE `ImageGallery`
  MODIFY `Image_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Ingredients`
--
ALTER TABLE `Ingredients`
  MODIFY `Ingredient_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `SKU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `PurchaseOrders`
--
ALTER TABLE `PurchaseOrders`
  MODIFY `PurchaseOrder_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `Vendors`
--
ALTER TABLE `Vendors`
  MODIFY `Vendor_ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
