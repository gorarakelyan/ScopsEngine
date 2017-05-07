-- phpMyAdmin SQL Dump
-- version 4.0.8
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 31 2017 г., 03:55
-- Версия сервера: 5.1.71-community-log
-- Версия PHP: 5.5.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `nnet`
--

-- --------------------------------------------------------

--
-- Структура таблицы `ads`
--

CREATE TABLE IF NOT EXISTS `ads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `url` varchar(300) NOT NULL,
  `img` varchar(250) NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `clicks` int(11) NOT NULL DEFAULT '0',
  `limit_views` int(11) NOT NULL DEFAULT '0',
  `limit_clicks` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `audios`
--

CREATE TABLE IF NOT EXISTS `audios` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `prof` int(15) NOT NULL,
  `author` int(1) NOT NULL,
  `audio` text COLLATE utf8_unicode_ci NOT NULL,
  `time` int(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prof` int(11) NOT NULL,
  `friend` int(11) NOT NULL,
  `count` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `clubs`
--

CREATE TABLE IF NOT EXISTS `clubs` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `admin` text COLLATE utf8_unicode_ci NOT NULL,
  `secret` int(2) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `reg_time` int(15) NOT NULL,
  `img` int(15) NOT NULL,
  `cover` int(15) NOT NULL,
  `members` int(15) NOT NULL,
  `followers` text COLLATE utf8_unicode_ci NOT NULL,
  `requests` text COLLATE utf8_unicode_ci NOT NULL,
  `audios` text COLLATE utf8_unicode_ci NOT NULL,
  `videos` text COLLATE utf8_unicode_ci NOT NULL,
  `black_list` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(20) NOT NULL,
  `prof_id` int(11) NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `time` int(11) NOT NULL,
  `likes` text COLLATE utf8_unicode_ci NOT NULL,
  `unlikes` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `dialogues`
--

CREATE TABLE IF NOT EXISTS `dialogues` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `chat_id` int(50) NOT NULL,
  `prof` int(50) NOT NULL,
  `friend` int(50) NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `img` int(2) NOT NULL,
  `img_small` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `img_medium` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `img_big` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `sticker` int(1) NOT NULL,
  `sticker_pack` int(5) NOT NULL,
  `sticker_index` int(5) NOT NULL,
  `gif` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `audios` text COLLATE utf8_unicode_ci NOT NULL,
  `videos` text COLLATE utf8_unicode_ci NOT NULL,
  `sendtime` int(12) NOT NULL,
  `viewtime` int(1) NOT NULL,
  `prof_hide` int(1) NOT NULL,
  `friend_hide` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creator` int(15) NOT NULL,
  `e_time` int(20) NOT NULL,
  `going` text COLLATE utf8_unicode_ci NOT NULL,
  `invited` text COLLATE utf8_unicode_ci NOT NULL,
  `members` int(7) NOT NULL,
  `title` text COLLATE utf8_unicode_ci NOT NULL,
  `about` text COLLATE utf8_unicode_ci NOT NULL,
  `thumb` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `place` text COLLATE utf8_unicode_ci NOT NULL,
  `date` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `start` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `closed` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `about` text COLLATE utf8_unicode_ci NOT NULL,
  `link` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `prop` double NOT NULL,
  `genre` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `games`
--

INSERT INTO `games` (`id`, `name`, `about`, `link`, `cover`, `prop`, `genre`) VALUES
(1, 'Day D: Tower Rus', 'This time-travelling professor is going to get eaten by dinosaurs if you don''t help him out and fast!', '<iframe frameborder="0" scrolling="yes" src="http://files.cdn.spilcloud.com/df9aa4793b5/dino_rage_v2-13-02/index.html" allowfullscreen="true">\r\n</iframe>', 'img/games/tower.jpg', 0.6, 4),
(2, 'Tomb Runner', 'How far can Professor Jones keep running in the adventures of Tomb Runner? Run, jump, slide, rush and surf through', '<iframe frameborder="0" scrolling="yes" src="http://files.cdn.spilcloud.com/webgl/TR-13-01/index.html" allowfullscreen="true">\n</iframe>', 'img/games/tomb.jpg', 1.45, 1),
(3, 'Drift Challenge', 'Be prepared for the ultimate flash free online drift challenge game that will test your driving and drifting skills to the max? ', '<iframe frameborder="0" scrolling="yes" src="http://media2.y8.com/y8-studio/unity_webgl_games/gamewerk/drift_challenge/" allowfullscreen="true">\r\n</iframe>', 'img/games/drift.jpg', 0.8, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `gifts`
--

CREATE TABLE IF NOT EXISTS `gifts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `gifts`
--

INSERT INTO `gifts` (`id`, `name`, `img`) VALUES
(1, 'Car Present', 'img/gifts/gh6z4ikNh5t.jpg'),
(2, 'New Year', 'img/gifts/gaQeKAk2sst.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `langs`
--

CREATE TABLE IF NOT EXISTS `langs` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `langs`
--

INSERT INTO `langs` (`id`, `name`, `title`) VALUES
(1, 'en', 'English'),
(6, 'hy', 'Հայերեն'),
(7, 'ru', 'Русский'),
(8, 'bg', 'Български'),
(9, 'fr', 'Français'),
(10, 'ge', 'Deutsche');

-- --------------------------------------------------------

--
-- Структура таблицы `main`
--

CREATE TABLE IF NOT EXISTS `main` (
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `host` text COLLATE utf8_unicode_ci NOT NULL,
  `connection` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `admin` text COLLATE utf8_unicode_ci NOT NULL,
  `mail` text COLLATE utf8_unicode_ci NOT NULL,
  `theme` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email_conf` tinyint(1) NOT NULL,
  `demo` tinyint(1) NOT NULL,
  `user_theme` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `main`
--

INSERT INTO `main` (`name`, `host`, `connection`, `admin`, `mail`, `theme`, `email_conf`, `demo`, `user_theme`) VALUES
('Scops', '', 'http://', 'SHKKKZ5iRK6b8RDD6aRtEtt7fNNi4FnzeeEz489F', '', 'classic', 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `network`
--

CREATE TABLE IF NOT EXISTS `network` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `link` text COLLATE utf8_unicode_ci NOT NULL,
  `online` int(12) NOT NULL,
  `reg_time` int(12) NOT NULL,
  `secret` int(1) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `img` int(11) NOT NULL,
  `cover` int(11) NOT NULL,
  `lang` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'en',
  `country` text COLLATE utf8_unicode_ci NOT NULL,
  `city` text COLLATE utf8_unicode_ci NOT NULL,
  `birth` text COLLATE utf8_unicode_ci NOT NULL,
  `gender` int(1) NOT NULL,
  `rating` int(1) NOT NULL,
  `datings` text COLLATE utf8_unicode_ci NOT NULL,
  `dating_enabled` int(1) NOT NULL,
  `visitors` text COLLATE utf8_unicode_ci NOT NULL,
  `visits` text COLLATE utf8_unicode_ci NOT NULL,
  `friends` text COLLATE utf8_unicode_ci NOT NULL,
  `stickers` text COLLATE utf8_unicode_ci NOT NULL,
  `games` text COLLATE utf8_unicode_ci NOT NULL,
  `gifts` text COLLATE utf8_unicode_ci,
  `audios` text COLLATE utf8_unicode_ci NOT NULL,
  `videos` text COLLATE utf8_unicode_ci NOT NULL,
  `clubs` text COLLATE utf8_unicode_ci NOT NULL,
  `requests` text COLLATE utf8_unicode_ci NOT NULL,
  `followers` text COLLATE utf8_unicode_ci NOT NULL,
  `black_list` text COLLATE utf8_unicode_ci NOT NULL,
  `visits_enabled` int(1) NOT NULL,
  `theme` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'classic',
  `url` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `prof_id` int(11) NOT NULL,
  `author` int(1) NOT NULL,
  `followers` text COLLATE utf8_unicode_ci NOT NULL,
  `time` int(15) NOT NULL,
  `type` int(2) NOT NULL,
  `metetions` text COLLATE utf8_unicode_ci NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `img` int(11) NOT NULL,
  `img_small` text COLLATE utf8_unicode_ci NOT NULL,
  `img_medium` text COLLATE utf8_unicode_ci NOT NULL,
  `img_big` text COLLATE utf8_unicode_ci NOT NULL,
  `img_clip` text COLLATE utf8_unicode_ci NOT NULL,
  `cover_clip` text COLLATE utf8_unicode_ci NOT NULL,
  `gif` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `video_glob` text COLLATE utf8_unicode_ci NOT NULL,
  `video_loc` text COLLATE utf8_unicode_ci NOT NULL,
  `audio` text COLLATE utf8_unicode_ci NOT NULL,
  `link` text COLLATE utf8_unicode_ci NOT NULL,
  `prof_pic` int(11) NOT NULL,
  `prof_cover` int(11) NOT NULL,
  `group_pic` int(11) NOT NULL,
  `likes` text COLLATE utf8_unicode_ci NOT NULL,
  `unlikes` text COLLATE utf8_unicode_ci NOT NULL,
  `shared` text COLLATE utf8_unicode_ci NOT NULL,
  `views` text COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `prof_id`, `author`, `followers`, `time`, `type`, `metetions`, `text`, `img`, `img_small`, `img_medium`, `img_big`, `img_clip`, `cover_clip`, `gif`, `video_glob`, `video_loc`, `audio`, `link`, `prof_pic`, `prof_cover`, `group_pic`, `likes`, `unlikes`, `shared`, `views`, `location`) VALUES
(1, 0, 0, '0', 0, 10, '', '', 1, '["img/person/man.png"]', '["img/person/man.png"]', '["img/person/man.png"]', '["img/person/man.png","img/person/man.png","img/person/man.png"]', '', '', '', '', '', '', 0, 0, 0, '', '', '', '', ''),
(2, 0, 0, '0', 0, 10, '', '', 1, '["img/person/woman.png"]', '["img/person/woman.png"]', '["img/person/woman.png"]', '["img/person/woman.png","img/person/woman.png","img/person/woman.png"]', '', '', '', '', '', '', 0, 0, 0, '', '', '', '', ''),
(3, 0, 0, '0', 0, 10, '', '', 1, '["img/person/cover.png"]', '["img/person/cover.png"]', '["img/person/cover.png"]', '', '["img/person/cover.png","img/person/cover.png","img/person/cover.png"]', '', '', '', '', '', 0, 0, 0, '', '', '', '', ''),
(4, 0, 0, '0', 0, 10, '', '', 1, '["img/person/group.png"]', '["img/person/group.png"]', '["img/person/group.png"]', '["img/person/group.png","img/person/group.png","img/person/group.png"]', '', '', '', '', '', '', 0, 0, 0, '', '', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `notif`
--

CREATE TABLE IF NOT EXISTS `notif` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prof_id` int(11) NOT NULL DEFAULT '0',
  `friend_id` int(11) NOT NULL DEFAULT '0',
  `type` int(2) NOT NULL DEFAULT '0',
  `extra_column_1` text COLLATE utf8_unicode_ci NOT NULL,
  `extra_column_2` text COLLATE utf8_unicode_ci NOT NULL,
  `time` int(15) NOT NULL DEFAULT '0',
  `view` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `registration`
--

CREATE TABLE IF NOT EXISTS `registration` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `user_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_data` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `stickers`
--

CREATE TABLE IF NOT EXISTS `stickers` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `length` int(4) NOT NULL,
  `format` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `thumb` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `stickers`
--

INSERT INTO `stickers` (`id`, `name`, `length`, `format`, `thumb`, `cover`) VALUES
(1, 'Spotty', 25, 'png', 'img/stickers/1/thumb.png', 'img/stickers/1/cover.jpg'),
(2, 'Cat', 25, 'png', 'img/stickers/2/thumb.png', 'img/stickers/2/cover.jpg'),
(3, 'Famous People', 33, 'png', 'img/stickers/3/thumb.png', 'img/stickers/3/cover.png'),
(4, 'Bearded', 32, 'png', 'img/stickers/4/thumb.png', 'img/stickers/4/cover.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `themes`
--

CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `key` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `themes`
--

INSERT INTO `themes` (`id`, `title`, `key`) VALUES
(1, 'Classic', 'classic'),
(2, 'FB theme', 'fb'),
(3, 'VK theme', 'vk');

-- --------------------------------------------------------

--
-- Структура таблицы `videos`
--

CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(18) NOT NULL AUTO_INCREMENT,
  `prof` int(15) NOT NULL,
  `author` int(1) NOT NULL,
  `video` text COLLATE utf8_unicode_ci NOT NULL,
  `time` int(12) NOT NULL,
  `views` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `video_call`
--

CREATE TABLE IF NOT EXISTS `video_call` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prof` int(11) NOT NULL,
  `friend` int(11) NOT NULL,
  `hash` varchar(50) NOT NULL,
  `action` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
