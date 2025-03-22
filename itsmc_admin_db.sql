-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Czas generowania: 22 Mar 2025, 21:22
-- Wersja serwera: 5.7.24
-- Wersja PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `itsmc_admin_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `responsible_users` varchar(64) DEFAULT NULL,
  `locations` varchar(64) DEFAULT NULL,
  `is_company` tinyint(1) NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `company_name` varchar(250) DEFAULT NULL,
  `nip` varchar(16) DEFAULT NULL,
  `street` varchar(250) DEFAULT NULL,
  `street_number` varchar(16) DEFAULT NULL,
  `room_number` varchar(16) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `email_addresses` varchar(250) DEFAULT NULL,
  `phone_numbers` varchar(100) DEFAULT NULL,
  `creation_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `clients`
--

INSERT INTO `clients` (`id`, `responsible_users`, `locations`, `is_company`, `first_name`, `last_name`, `company_name`, `nip`, `street`, `street_number`, `room_number`, `city`, `email_addresses`, `phone_numbers`, `creation_date`) VALUES
(1, '', '', 0, 'Klaudia', 'Grambor', '', '', 'Cieszkowskiego', '4', '76', 'Łódź', 'klaudiagrambor@gmail.com', '607772017', '2025-03-06 18:36:51');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `internal_repairs`
--

CREATE TABLE `internal_repairs` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `external_repair_id` int(11) DEFAULT NULL,
  `eq_company` varchar(48) NOT NULL,
  `eq_model` varchar(64) NOT NULL,
  `eq_type` varchar(32) NOT NULL,
  `eq_status` varchar(32) NOT NULL,
  `eq_damage_desc` varchar(1000) NOT NULL,
  `repair_desc` varchar(1000) DEFAULT NULL,
  `repair_status` varchar(32) NOT NULL,
  `repair_type` varchar(32) NOT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `repair_date` datetime DEFAULT NULL,
  `planned_start_date` datetime DEFAULT NULL,
  `planned_end_date` datetime DEFAULT NULL,
  `real_start_date` datetime DEFAULT NULL,
  `real_end_date` datetime DEFAULT NULL,
  `warranty_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `internal_repairs`
--

INSERT INTO `internal_repairs` (`id`, `client_id`, `user_id`, `external_repair_id`, `eq_company`, `eq_model`, `eq_type`, `eq_status`, `eq_damage_desc`, `repair_desc`, `repair_status`, `repair_type`, `creation_date`, `repair_date`, `planned_start_date`, `planned_end_date`, `real_start_date`, `real_end_date`, `warranty_date`) VALUES
(3, 1, 0, 0, 'Lenovo', 'Yoga 14ACN6', 'Laptop', 'Uszkodzony', 'Uszkodzona matryca', 'Wymiana matrycy i klapy matrycy', 'Niewykonana', 'Niegwarancyjna', '2025-03-06 18:42:22', '2025-03-06 18:40:39', '2025-03-06 18:40:39', '2025-03-06 18:40:39', '2025-03-06 18:40:39', '2025-03-06 18:40:39', '2025-03-06 18:40:39'),
(4, 1, NULL, NULL, 'Lenovo', 'Thinkpad X1 Carbon', 'Laptop', 'Uszkodzony', 'Uszkodzony lewy zawias', 'Wymiana lewego zawiasu', 'Aktualnie wykonywana', 'Niegwarancyjna', '2025-03-07 19:18:51', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `internal_repairs_permissions` int(11) NOT NULL,
  `external_repairs_permissions` int(11) NOT NULL,
  `admin_permissions` int(11) NOT NULL,
  `additional_permissions` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `internal_repairs_permissions`, `external_repairs_permissions`, `admin_permissions`, `additional_permissions`) VALUES
(1, 'administrator', '$2y$10$W2WQIM0/RF9SqemeyG5Nqu0VOSnHGjWjAE/s/copnwpVg8WlgdvMy', 'Adrian', 'Michalak', 3, 3, 2, 3),
(2, 'User', '$2y$10$o4Tw7HWj6kLUQqtVGddwcODzmmmmXU5HpN8ml6B6hLZHVk8N.gMTm', 'Adrian', 'Michalak', 3, 3, 2, 3);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `internal_repairs`
--
ALTER TABLE `internal_repairs`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `internal_repairs`
--
ALTER TABLE `internal_repairs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
