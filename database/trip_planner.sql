-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2026 at 07:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trip_planner`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(10) UNSIGNED NOT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `is_capital` tinyint(1) NOT NULL DEFAULT 0,
  `is_popular` tinyint(1) NOT NULL DEFAULT 1,
  `population` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `average_hotel_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `name`, `image_url`, `description`, `is_capital`, `is_popular`, `population`, `average_hotel_price`, `created_at`, `updated_at`) VALUES
(1, 1, 'Paris', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&h=360&fit=crop', 'The City of Light, home to the Eiffel Tower and Louvre.', 1, 1, 2148000, 180.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(2, 1, 'Nice', 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=640&h=360&fit=crop', 'A beautiful coastal city on the French Riviera.', 0, 1, 340000, 150.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(3, 2, 'Tokyo', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&h=360&fit=crop', 'A bustling metropolis blending tradition and technology.', 1, 1, 13960000, 200.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(4, 2, 'Kyoto', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&h=360&fit=crop', 'Ancient temples, gardens, and traditional streets.', 0, 1, 1475000, 160.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(5, 3, 'Rome', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=640&h=360&fit=crop', 'The Eternal City with the Colosseum and Vatican nearby.', 1, 1, 2873000, 170.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(6, 3, 'Venice', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=640&h=360&fit=crop', 'A romantic city of canals and gondolas.', 0, 1, 261000, 200.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(7, 4, 'New York', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=640&h=360&fit=crop', 'The city that never sleeps, from Times Square to Central Park.', 0, 1, 8336000, 250.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(8, 4, 'Los Angeles', 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=640&h=360&fit=crop', 'Hollywood, beaches, and sunny California energy.', 0, 1, 3979000, 200.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(9, 5, 'Bangkok', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=640&h=360&fit=crop', 'A vibrant capital with temples, markets, and street food.', 1, 1, 10539000, 90.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(10, 5, 'Phuket', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=640&h=360&fit=crop', 'A tropical island with beaches and resorts.', 0, 1, 416000, 110.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(11, 6, 'Barcelona', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=640&h=360&fit=crop', 'Gaudi architecture, beaches, and lively neighborhoods.', 0, 1, 1620000, 165.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(12, 6, 'Madrid', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=640&h=360&fit=crop', 'Spain capital with museums, plazas, and food culture.', 1, 1, 3223000, 150.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(13, 7, 'Sydney', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=640&h=360&fit=crop', 'Harbor views, Opera House, and beautiful beaches.', 0, 1, 5312000, 210.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(14, 7, 'Melbourne', 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=640&h=360&fit=crop', 'A cultural hub known for arts, coffee, and sport.', 0, 1, 5078000, 175.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(15, 8, 'London', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&h=360&fit=crop', 'Historic landmarks, museums, and royal palaces.', 1, 1, 8982000, 220.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(16, 8, 'Edinburgh', 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=640&h=360&fit=crop', 'A medieval castle, old town streets, and festival energy.', 0, 1, 548000, 155.00, '2026-05-08 15:43:20', '2026-05-08 15:43:20');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `code` char(2) NOT NULL,
  `continent` varchar(80) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `currency` char(3) NOT NULL DEFAULT 'USD',
  `language` varchar(80) NOT NULL,
  `is_popular` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`, `continent`, `image_url`, `description`, `currency`, `language`, `is_popular`, `created_at`, `updated_at`) VALUES
(1, 'France', 'FR', 'Europe', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&h=420&fit=crop', 'Known for art, cuisine, and the iconic Eiffel Tower.', 'EUR', 'French', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(2, 'Japan', 'JP', 'Asia', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=640&h=420&fit=crop', 'Where ancient traditions meet cutting-edge technology.', 'JPY', 'Japanese', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(3, 'Italy', 'IT', 'Europe', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=640&h=420&fit=crop', 'Home to Rome, Venice, and Renaissance masterpieces.', 'EUR', 'Italian', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(4, 'United States', 'US', 'North America', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=640&h=420&fit=crop', 'Diverse landscapes from New York City to the Grand Canyon.', 'USD', 'English', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(5, 'Thailand', 'TH', 'Asia', 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=640&h=420&fit=crop', 'Beautiful beaches, ancient temples, and amazing food.', 'THB', 'Thai', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(6, 'Spain', 'ES', 'Europe', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=640&h=420&fit=crop', 'Flamenco, tapas, and stunning architecture.', 'EUR', 'Spanish', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(7, 'Australia', 'AU', 'Oceania', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=640&h=420&fit=crop', 'Unique wildlife and the Great Barrier Reef.', 'AUD', 'English', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(8, 'United Kingdom', 'GB', 'Europe', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&h=420&fit=crop', 'Rich history, castles, and vibrant culture.', 'GBP', 'English', 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20');

-- --------------------------------------------------------

--
-- Table structure for table `entertainment`
--

CREATE TABLE `entertainment` (
  `id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(160) NOT NULL,
  `type` varchar(80) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `duration` varchar(80) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `review_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `is_popular` tinyint(1) NOT NULL DEFAULT 1,
  `requires_booking` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `entertainment`
--

INSERT INTO `entertainment` (`id`, `city_id`, `name`, `type`, `price`, `duration`, `description`, `image_url`, `rating`, `review_count`, `is_popular`, `requires_booking`, `created_at`, `updated_at`) VALUES
(1, 1, 'Eiffel Tower Tour', 'Landmark', 35.00, '2 hours', 'Skip-the-line access to the iconic Paris landmark.', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=640&h=360&fit=crop', 4.70, 12453, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(2, 1, 'Louvre Museum', 'Museum', 25.00, '3 hours', 'Explore world-famous art including the Mona Lisa.', 'https://images.unsplash.com/photo-1499426600726-ac2c83e6f560?w=640&h=360&fit=crop', 4.80, 8932, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(3, 2, 'Promenade Walk', 'Tour', 12.00, '2 hours', 'Guided coastal walk through Nice highlights.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.30, 1120, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(4, 2, 'Old Town Food Tour', 'Food', 55.00, '4 hours', 'Taste local dishes across markets and small eateries.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop', 4.60, 943, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(5, 3, 'Senso-ji Temple', 'Temple', 0.00, '2 hours', 'Visit one of Tokyo oldest and most famous Buddhist temples.', 'https://images.unsplash.com/photo-1583169927774-5e421a9f3fc3?w=640&h=360&fit=crop', 4.70, 7823, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(6, 3, 'Tokyo Skytree', 'Observation', 30.00, '2 hours', 'See sweeping city views from high observation decks.', 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=640&h=360&fit=crop', 4.60, 5647, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(7, 4, 'Fushimi Inari Walk', 'Landmark', 0.00, '3 hours', 'Walk through red torii gates and forest paths.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=640&h=360&fit=crop', 4.80, 4250, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(8, 4, 'Tea Ceremony', 'Culture', 45.00, '1.5 hours', 'Experience a traditional tea ceremony with a local host.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.70, 812, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(9, 5, 'Colosseum Tour', 'Historic', 45.00, '3 hours', 'Guided tour of the ancient Roman amphitheater.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=640&h=360&fit=crop', 4.80, 9876, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(10, 5, 'Vatican Museums', 'Museum', 35.00, '4 hours', 'Visit the Sistine Chapel and world-class art collections.', 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=640&h=360&fit=crop', 4.90, 11234, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(11, 6, 'Gondola Ride', 'Tour', 70.00, '45 minutes', 'Classic gondola ride through scenic canals.', 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=640&h=360&fit=crop', 4.50, 2750, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(12, 6, 'Doge Palace Visit', 'Historic', 28.00, '2 hours', 'Explore ornate rooms and Venice political history.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.60, 1660, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(13, 7, 'Empire State Building', 'Observation', 44.00, '2 hours', 'Iconic New York views from the 86th floor.', 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=640&h=360&fit=crop', 4.60, 6800, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(14, 7, 'Statue of Liberty', 'Landmark', 24.00, '4 hours', 'Ferry ride and tour of Liberty Island.', 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=640&h=360&fit=crop', 4.70, 5420, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(15, 8, 'Hollywood Studio Tour', 'Tour', 65.00, '3 hours', 'Behind-the-scenes studio tour and entertainment history.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.40, 1980, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(16, 8, 'Santa Monica Bike Ride', 'Adventure', 28.00, '2 hours', 'Coastal bike route near the beach and pier.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop', 4.30, 734, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(17, 9, 'Grand Palace', 'Landmark', 18.00, '3 hours', 'Visit Thailand most spectacular royal complex.', 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=640&h=360&fit=crop', 4.60, 6543, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(18, 9, 'Floating Market Tour', 'Tour', 35.00, '5 hours', 'Experience floating markets by boat with a local guide.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.40, 3254, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(19, 10, 'Island Hopping', 'Adventure', 75.00, 'Full day', 'Boat trip to nearby islands, beaches, and lagoons.', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=640&h=360&fit=crop', 4.70, 1864, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(20, 10, 'Thai Cooking Class', 'Food', 45.00, '4 hours', 'Learn classic Thai dishes with a local chef.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop', 4.80, 1876, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(21, 11, 'Sagrada Familia Visit', 'Landmark', 32.00, '2 hours', 'Tour Barcelona most famous basilica and design details.', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=640&h=360&fit=crop', 4.80, 5300, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(22, 11, 'Tapas Night Walk', 'Food', 58.00, '3 hours', 'Taste tapas across lively neighborhood stops.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop', 4.60, 1120, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(23, 12, 'Prado Museum', 'Museum', 22.00, '3 hours', 'Explore major European artworks with timed entry.', 'https://images.unsplash.com/photo-1499426600726-ac2c83e6f560?w=640&h=360&fit=crop', 4.70, 2430, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(24, 12, 'Royal Palace Tour', 'Historic', 24.00, '2 hours', 'Visit ceremonial rooms and royal collections.', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=640&h=360&fit=crop', 4.50, 1985, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(25, 13, 'Opera House Tour', 'Landmark', 33.00, '1 hour', 'Guided look inside Sydney most famous landmark.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=640&h=360&fit=crop', 4.70, 3642, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(26, 13, 'Harbour Cruise', 'Tour', 42.00, '2 hours', 'Cruise Sydney Harbour with skyline views.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.50, 2180, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(27, 14, 'Laneway Food Walk', 'Food', 52.00, '3 hours', 'Explore cafes, street art, and local bites.', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=640&h=360&fit=crop', 4.60, 960, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(28, 14, 'National Gallery Visit', 'Museum', 0.00, '2 hours', 'See major art collections in central Melbourne.', 'https://images.unsplash.com/photo-1499426600726-ac2c83e6f560?w=640&h=360&fit=crop', 4.50, 1330, 1, 0, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(29, 15, 'Tower of London', 'Historic', 38.00, '3 hours', 'Discover royal history, towers, and crown jewels.', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=640&h=360&fit=crop', 4.70, 6240, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(30, 15, 'Thames River Cruise', 'Tour', 25.00, '1.5 hours', 'See London landmarks from the River Thames.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.40, 3080, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(31, 16, 'Edinburgh Castle', 'Historic', 27.00, '2 hours', 'Tour the castle, museums, and city viewpoints.', 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=640&h=360&fit=crop', 4.70, 2764, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(32, 16, 'Old Town Ghost Walk', 'Tour', 18.00, '1.5 hours', 'Evening walk through historic closes and stories.', 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&h=360&fit=crop', 4.40, 820, 1, 1, '2026-05-08 15:43:20', '2026-05-08 15:43:20');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(160) NOT NULL,
  `star_rating` tinyint(3) UNSIGNED NOT NULL DEFAULT 3,
  `price_per_night` decimal(10,2) NOT NULL DEFAULT 0.00,
  `image_url` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT '',
  `amenities` text NOT NULL,
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `review_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `city_id`, `name`, `star_rating`, `price_per_night`, `image_url`, `description`, `address`, `amenities`, `rating`, `review_count`, `created_at`, `updated_at`) VALUES
(1, 1, 'Hotel Le Marais', 4, 189.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop', 'Boutique stay near cafes, galleries, and central Paris landmarks.', '12 Rue de Rivoli, Paris', '[\"WiFi\",\"Breakfast\",\"Gym\"]', 4.50, 245, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(2, 1, 'Grand Palace Hotel', 5, 350.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Luxury rooms, spa facilities, and a refined restaurant.', '18 Avenue George V, Paris', '[\"WiFi\",\"Pool\",\"Spa\",\"Restaurant\"]', 4.80, 512, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(3, 2, 'Nice Riviera Hotel', 4, 155.00, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=640&h=360&fit=crop', 'Comfortable hotel close to the promenade and old town.', '4 Promenade des Anglais, Nice', '[\"WiFi\",\"Breakfast\",\"Sea View\"]', 4.30, 198, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(4, 2, 'Azure Coast Resort', 5, 295.00, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=360&fit=crop', 'Relaxed resort with pool access and Mediterranean dining.', '22 Quai des Etats-Unis, Nice', '[\"WiFi\",\"Pool\",\"Spa\",\"Restaurant\"]', 4.70, 301, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(5, 3, 'Shibuya Grand', 4, 165.00, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=640&h=360&fit=crop', 'Modern rooms with easy access to shopping and nightlife.', '3-14 Shibuya, Tokyo', '[\"WiFi\",\"Restaurant\",\"Gym\"]', 4.40, 389, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(6, 3, 'Tokyo Imperial', 5, 420.00, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=640&h=360&fit=crop', 'Premium hotel with skyline views and excellent service.', '1-1 Marunouchi, Tokyo', '[\"WiFi\",\"Pool\",\"Spa\",\"Restaurant\"]', 4.90, 723, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(7, 4, 'Kyoto Garden Inn', 4, 160.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop', 'Quiet stay near gardens, temples, and traditional streets.', '8 Gion, Kyoto', '[\"WiFi\",\"Breakfast\",\"Garden\"]', 4.50, 254, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(8, 4, 'Arashiyama Ryokan', 4, 275.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Traditional ryokan with calm interiors and local meals.', '20 Arashiyama, Kyoto', '[\"WiFi\",\"Breakfast\",\"Onsen\"]', 4.80, 189, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(9, 5, 'Roman Holiday Inn', 4, 145.00, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=360&fit=crop', 'Central hotel within reach of major ancient landmarks.', '44 Via Cavour, Rome', '[\"WiFi\",\"Breakfast\",\"Terrace\"]', 4.20, 267, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(10, 5, 'Colosseum View Hotel', 4, 195.00, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=640&h=360&fit=crop', 'Stylish rooms and rooftop views near the Colosseum.', '7 Via Labicana, Rome', '[\"WiFi\",\"Restaurant\",\"Bar\"]', 4.60, 445, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(11, 6, 'Venice Canal House', 4, 210.00, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=640&h=360&fit=crop', 'Charming canal-side rooms close to historic squares.', '9 San Marco, Venice', '[\"WiFi\",\"Breakfast\",\"Canal View\"]', 4.50, 233, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(12, 6, 'Lagoon Palace Hotel', 5, 360.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Elegant hotel with boat access and fine dining.', '14 Riva degli Schiavoni, Venice', '[\"WiFi\",\"Restaurant\",\"Spa\",\"Bar\"]', 4.80, 341, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(13, 7, 'Manhattan Suites', 4, 225.00, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=640&h=360&fit=crop', 'Central Manhattan hotel for sightseeing and business trips.', '234 W 48th St, New York', '[\"WiFi\",\"Gym\",\"Business Center\"]', 4.30, 567, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(14, 7, 'Times Square Hotel', 3, 159.00, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=640&h=360&fit=crop', 'Practical rooms steps from theaters and subway access.', '120 W 46th St, New York', '[\"WiFi\",\"Breakfast\"]', 4.00, 312, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(15, 8, 'Hollywood Hills Stay', 4, 205.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop', 'Stylish hotel near studios, dining, and nightlife.', '75 Sunset Blvd, Los Angeles', '[\"WiFi\",\"Pool\",\"Gym\"]', 4.30, 284, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(16, 8, 'Santa Monica Beach Hotel', 4, 265.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Beach-adjacent hotel with ocean air and bright rooms.', '9 Ocean Ave, Los Angeles', '[\"WiFi\",\"Breakfast\",\"Sea View\"]', 4.50, 369, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(17, 9, 'Bangkok River View', 4, 95.00, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=360&fit=crop', 'Riverfront rooms with quick access to markets and temples.', '123 Charoen Krung Road, Bangkok', '[\"WiFi\",\"Pool\",\"Restaurant\",\"Spa\"]', 4.30, 567, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(18, 9, 'Sukhumvit Budget Stay', 3, 55.00, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=640&h=360&fit=crop', 'Clean rooms close to transport, dining, and shopping.', 'Soi 11 Sukhumvit, Bangkok', '[\"WiFi\",\"Air Conditioning\"]', 3.90, 312, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(19, 10, 'Phuket Sea Resort', 4, 130.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Relaxed resort with beach access and island tours.', '18 Patong Beach, Phuket', '[\"WiFi\",\"Pool\",\"Breakfast\"]', 4.40, 276, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(20, 10, 'Andaman Luxury Villas', 5, 310.00, 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=640&h=360&fit=crop', 'Private villas with spa services and sunset dining.', '7 Kata Beach, Phuket', '[\"WiFi\",\"Pool\",\"Spa\",\"Restaurant\"]', 4.80, 198, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(21, 11, 'Barcelona Gothic Hotel', 4, 165.00, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=640&h=360&fit=crop', 'Central hotel near Gothic Quarter lanes and cafes.', '19 Carrer Ample, Barcelona', '[\"WiFi\",\"Breakfast\",\"Bar\"]', 4.30, 331, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(22, 11, 'Gaudi View Suites', 5, 280.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Elegant suites with design details and city views.', '30 Passeig de Gracia, Barcelona', '[\"WiFi\",\"Gym\",\"Restaurant\",\"Terrace\"]', 4.70, 291, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(23, 12, 'Madrid Centro Hotel', 4, 150.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop', 'Comfortable base near museums and historic plazas.', '10 Gran Via, Madrid', '[\"WiFi\",\"Breakfast\",\"Gym\"]', 4.20, 286, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(24, 12, 'Royal Prado Stay', 5, 260.00, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=360&fit=crop', 'Polished hotel close to art museums and dining.', '8 Calle de Ruiz, Madrid', '[\"WiFi\",\"Restaurant\",\"Spa\"]', 4.60, 242, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(25, 13, 'Sydney Harbour Hotel', 4, 215.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Harbor area hotel with city access and bright rooms.', '12 Circular Quay, Sydney', '[\"WiFi\",\"Breakfast\",\"Harbor View\"]', 4.40, 418, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(26, 13, 'Bondi Coastal Stay', 4, 185.00, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=640&h=360&fit=crop', 'Easygoing stay near beach walks and cafes.', '44 Campbell Parade, Sydney', '[\"WiFi\",\"Beach Access\",\"Breakfast\"]', 4.20, 204, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(27, 14, 'Melbourne Laneway Hotel', 4, 170.00, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=640&h=360&fit=crop', 'City hotel near cafes, galleries, and tram routes.', '15 Flinders Lane, Melbourne', '[\"WiFi\",\"Breakfast\",\"Gym\"]', 4.30, 288, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(28, 14, 'Yarra Riverside Suites', 5, 255.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Spacious suites with river views and restaurant access.', '22 Southbank, Melbourne', '[\"WiFi\",\"Restaurant\",\"Pool\"]', 4.60, 251, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(29, 15, 'London Westminster Hotel', 4, 225.00, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=640&h=360&fit=crop', 'Convenient hotel near classic London landmarks.', '18 Victoria Street, London', '[\"WiFi\",\"Breakfast\",\"Bar\"]', 4.30, 489, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(30, 15, 'Covent Garden Suites', 5, 340.00, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=640&h=360&fit=crop', 'Premium suites in a walkable theatre district location.', '6 Bow Street, London', '[\"WiFi\",\"Restaurant\",\"Gym\",\"Spa\"]', 4.70, 377, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(31, 16, 'Edinburgh Castle View', 4, 155.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop', 'Warm stay near old town lanes and castle views.', '2 Castlehill, Edinburgh', '[\"WiFi\",\"Breakfast\",\"Bar\"]', 4.40, 214, '2026-05-08 15:43:20', '2026-05-08 15:43:20'),
(32, 16, 'Royal Mile Inn', 3, 115.00, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=640&h=360&fit=crop', 'Simple rooms in the heart of the Royal Mile.', '55 High Street, Edinburgh', '[\"WiFi\",\"Breakfast\"]', 4.00, 176, '2026-05-08 15:43:20', '2026-05-08 15:43:20');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(10) UNSIGNED NOT NULL,
  `booking_code` varchar(24) NOT NULL,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(80) NOT NULL,
  `email` varchar(160) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `payment_method` varchar(40) NOT NULL DEFAULT 'card',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `countries_json` longtext NOT NULL,
  `cities_json` longtext NOT NULL,
  `hotels_json` longtext NOT NULL,
  `entertainment_json` longtext NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `service_fee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(30) NOT NULL DEFAULT 'confirmed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `booking_code`, `first_name`, `last_name`, `email`, `phone`, `payment_method`, `start_date`, `end_date`, `countries_json`, `cities_json`, `hotels_json`, `entertainment_json`, `subtotal`, `service_fee`, `total_cost`, `status`, `created_at`, `updated_at`) VALUES
(4, 'TP-260508-FA85C2', 'Ishmal', 'Khan', 'ishmalk028@gmail.com', '11', 'paypal', '2026-05-08', '2026-05-09', '[{\"id\":1,\"name\":\"🇫🇷 France\",\"region\":\"Europe\",\"description\":\"Known for art, cuisine, and the iconic Eiffel Tower.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop\"}]', '[{\"id\":1,\"name\":\"Paris\",\"nights\":1}]', '[{\"cityId\":1,\"hotelId\":3,\"hotelName\":\"Budget Inn Paris\",\"pricePerNight\":89,\"nights\":1,\"total\":89}]', '[]', 89.00, 4.00, 93.00, 'confirmed', '2026-05-08 16:12:15', '2026-05-08 16:12:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cities_country_id` (`country_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_countries_code` (`code`);

--
-- Indexes for table `entertainment`
--
ALTER TABLE `entertainment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_entertainment_city_id` (`city_id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_hotels_city_id` (`city_id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_trips_booking_code` (`booking_code`),
  ADD KEY `idx_trips_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `entertainment`
--
ALTER TABLE `entertainment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_cities_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `entertainment`
--
ALTER TABLE `entertainment`
  ADD CONSTRAINT `fk_entertainment_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `fk_hotels_city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
