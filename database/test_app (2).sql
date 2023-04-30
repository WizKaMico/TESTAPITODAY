-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2023 at 04:29 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `aid` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`aid`, `fullname`, `email`, `contact`, `password`, `department`, `status`, `date_created`) VALUES
(4, 'Gerald', 'tricore012@gmail.com', '09166513189', '21232f297a57a5a743894a0e4a801fc3', 'I.T', 'APPROVED', '2023-04-23');

-- --------------------------------------------------------

--
-- Table structure for table `assign_program_faculty`
--

CREATE TABLE `assign_program_faculty` (
  `id` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assign_program_faculty`
--

INSERT INTO `assign_program_faculty` (`id`, `fid`, `pid`) VALUES
(1, 2, 3),
(2, 3, 7),
(6, 2, 5),
(7, 2, 4),
(8, 2, 13);

-- --------------------------------------------------------

--
-- Table structure for table `assign_program_member`
--

CREATE TABLE `assign_program_member` (
  `id` int(11) NOT NULL,
  `fid` int(11) NOT NULL,
  `pid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assign_program_member`
--

INSERT INTO `assign_program_member` (`id`, `fid`, `pid`) VALUES
(1, 2, 7),
(2, 2, 7),
(3, 2, 13),
(4, 2, 13);

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `data` blob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `fid` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`fid`, `fullname`, `email`, `contact`, `password`, `department`, `status`, `date_created`) VALUES
(2, 'Gerald Mico', 'tricore012@gmail.com', '09531599180', '21232f297a57a5a743894a0e4a801fc3', 'I.T SCHEEME', 'APPROVED', '0000-00-00'),
(3, 'Gerald Mico Facistol', 'gmfacistol@gmail.com', '09166513189', '952a3a9fb7d9c2b52e2410d01a07555c', 'I.T DEPARTMENT', 'UN-APPROVED', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts_faculty`
--

CREATE TABLE `login_attempts_faculty` (
  `id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `attempt_time` datetime NOT NULL,
  `successful` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login_attempts_faculty`
--

INSERT INTO `login_attempts_faculty` (`id`, `faculty_id`, `attempt_time`, `successful`) VALUES
(1, 2, '2023-04-23 02:15:38', 1),
(2, 2, '2023-04-24 16:10:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `partners_management`
--

CREATE TABLE `partners_management` (
  `part_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact_person` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  `valid` varchar(250) NOT NULL,
  `remaining_days` varchar(100) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `partners_management`
--

INSERT INTO `partners_management` (`part_id`, `name`, `address`, `contact_person`, `contact_number`, `contact_email`, `start_date`, `expiration_date`, `valid`, `remaining_days`, `date_created`) VALUES
(1, 'ACCENTURE', 'MAGICIAN AKO PERO HINDI KA SURE', 'Gerald', '09166513189', 'tricore012@gmail.com', '2023-04-30', '2023-06-30', '2 months', '61', '2023-04-22'),
(2, 'ACCENTURE', 'MAGICIAN AKO PERO HINDI KA SURE', 'Gerald', '09531599179', 'gmwhattheheck@gmail.com', '2022-04-20', '2023-04-24', '2 days', '2', '2023-04-22'),
(3, 'TEST', 'MAGICIAN AKO PERO HINDI KA SURE', 'Gerald', '09531599179', 'gmfacistol@gmail.com', '2022-04-20', '2024-04-24', '1 year', '368', '2023-04-22'),
(4, 'TEST', 'MAGICIAN AKO PERO HINDI KA SURE', 'Gerald', '099999119191', 'HEROKU@gmail.com', '2022-04-20', '2023-04-21', '2 days', '2', '2023-04-22'),
(5, 'TRICORE', '10 U206 TARRAVILLE SUBDIVISION', 'Gerald Mico Facistol', '0916653189', 'tricore012@gmail.com', '2023-04-30', '2023-05-30', '1 month', '31', '2023-04-29'),
(6, 'TRICORE', '10 U206 TARRAVILLE SUBDIVISION', 'Gerald Mico Facistol', '09166531899', 'shinegami@gmail.com', '2023-04-30', '2023-05-30', '1 month', '31', '2023-04-29');

-- --------------------------------------------------------

--
-- Table structure for table `program_management`
--

CREATE TABLE `program_management` (
  `pid` int(11) NOT NULL,
  `program_title` varchar(200) NOT NULL,
  `start` varchar(100) NOT NULL,
  `end` varchar(100) NOT NULL,
  `place` varchar(100) NOT NULL,
  `program_details` text NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `program_management`
--

INSERT INTO `program_management` (`pid`, `program_title`, `start`, `end`, `place`, `program_details`, `status`) VALUES
(3, 'WHAT DOESNT KILL YOU MAKES YOU STRONGER', '2023-04-22 14:30:00', '2023-04-22 14:30:00', 'BULACAN', 'program_details', 'IN-PROGRESS'),
(4, 'WHAT DOESNT KILL YOU MAKES YOU', '2023-04-22 14:30:00', '2023-04-22 14:30:00', 'BULACAN', 'program_details', ''),
(5, 'WHAT DOESNT KILL YOU MAKES YOU', '2023-04-22 14:30:00', '2023-04-22 14:30:00', 'BULACAN', 'program_details', ''),
(7, 'WHAT DOESNT KILL YOU MAKES YOU STRONGER PART 2', '2023-04-22 14:30:11', '2023-04-22 14:30:11', 'BULACAN PH', 'program_details 1', 'IN-PROGRESS'),
(8, 'program title', '2023-04-22 14:30:00', '2023-04-22 14:30:00', 'TEST', 'TEST', 'IN-PROGRESS'),
(9, 'TEST TODAY', '2023-04-30T00:01', '2023-05-01T00:01', 'BULACAN', 'TEST TEST', 'IN-PROGRESS'),
(10, 'TEST TODAY', '2023-04-30T00:01', '2023-05-01T00:01', 'BULACAN', 'TEST TEST', 'IN-PROGRESS'),
(11, 'TEST TODAY', '2023-04-30T00:01', '2023-05-01T00:01', 'BULACAN', 'TEST TEST', 'IN-PROGRESS'),
(12, 'TEST TODAY', '2023-04-30T00:01', '2023-05-01T00:01', 'BULACAN', 'TEST TEST', 'IN-PROGRESS'),
(13, 'TEST TODAY AS IN TODAY', '2023-04-30T19:40', '2023-05-01T19:40', 'BULACAN', 'TEST TEST', 'IN-PROGRESS');

-- --------------------------------------------------------

--
-- Table structure for table `program_participant`
--

CREATE TABLE `program_participant` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `program_participant`
--

INSERT INTO `program_participant` (`id`, `pid`, `fullname`, `email`, `contact`) VALUES
(1, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(2, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(3, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(4, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(5, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(6, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(7, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(8, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(9, 3, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(10, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(11, 7, 'John Michael', 'tricore012@gmail.com', '9166513189'),
(12, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(13, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(14, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(15, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(16, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(17, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(18, 7, 'John Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(19, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(20, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(21, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(22, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(23, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(24, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(25, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(26, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189'),
(27, 3, 'jERWIN Michael', 'johndimahuhuli@gmail.com', '9166513189');

-- --------------------------------------------------------

--
-- Table structure for table `super_admin`
--

CREATE TABLE `super_admin` (
  `id` int(11) NOT NULL,
  `fullname` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `date_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `super_admin`
--

INSERT INTO `super_admin` (`id`, `fullname`, `email`, `password`, `date_created`) VALUES
(3, 'Gerald Mico', 'gmfacistol@gmail.com', '86059a46b59da3babea5362c82bef474', '2023-04-23');

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color_scheme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`id`, `name`, `color_scheme`) VALUES
(1, 'theme_test', '#00000'),
(2, 'theme_test', '#00000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `assign_program_faculty`
--
ALTER TABLE `assign_program_faculty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_program_member`
--
ALTER TABLE `assign_program_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `login_attempts_faculty`
--
ALTER TABLE `login_attempts_faculty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `partners_management`
--
ALTER TABLE `partners_management`
  ADD PRIMARY KEY (`part_id`);

--
-- Indexes for table `program_management`
--
ALTER TABLE `program_management`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `program_participant`
--
ALTER TABLE `program_participant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `super_admin`
--
ALTER TABLE `super_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assign_program_faculty`
--
ALTER TABLE `assign_program_faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `assign_program_member`
--
ALTER TABLE `assign_program_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `login_attempts_faculty`
--
ALTER TABLE `login_attempts_faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partners_management`
--
ALTER TABLE `partners_management`
  MODIFY `part_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `program_management`
--
ALTER TABLE `program_management`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `program_participant`
--
ALTER TABLE `program_participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `super_admin`
--
ALTER TABLE `super_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_attempts_faculty`
--
ALTER TABLE `login_attempts_faculty`
  ADD CONSTRAINT `login_attempts_faculty_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`fid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
