CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `capital` varchar(60) NOT NULL,
  `country` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO `cities` (`capital`,`country`) VALUES ('Oslo','Norway');
INSERT INTO `cities` (`capital`,`country`) VALUES ('Pretoria','South Africa');
INSERT INTO `cities` (`capital`,`country`) VALUES ('Helsinki','Finland');