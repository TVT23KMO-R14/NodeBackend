-- MySQL Workbench Synchronization
-- Generated: 2024-04-02 11:14
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: jarno

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `webSovellusProjekti` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`user` (
  `idUser` INT(11) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`group` (
  `idGroup` INT(11) NOT NULL,
  `groupName` VARCHAR(45) NOT NULL,
  `groupDescription` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`groupMember` (
  `idGroupMember` INT(11) NOT NULL,
  `user_idUser` INT(11) NOT NULL,
  `group_idgroup` INT(11) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGroupMember`),
  INDEX `fk_user_has_group_group1_idx` (`group_idgroup` ASC) VISIBLE,
  INDEX `fk_user_has_group_user_idx` (`user_idUser` ASC) VISIBLE,
  UNIQUE INDEX `thereCanBeOnly2` (`user_idUser` ASC, `group_idgroup` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_group_user`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `webSovellusProjekti`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_group_group1`
    FOREIGN KEY (`group_idgroup`)
    REFERENCES `webSovellusProjekti`.`group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`groupContent` (
  `idGroupContent` INT(11) NOT NULL,
  `group_idGroup` INT(11) NOT NULL,
  `groupMember_idGroupMember` INT(11) NOT NULL,
  `content` BLOB NOT NULL,
  PRIMARY KEY (`idGroupContent`),
  INDEX `fk_group_has_groupMember_groupMember1_idx` (`groupMember_idGroupMember` ASC) VISIBLE,
  INDEX `fk_group_has_groupMember_group1_idx` (`group_idGroup` ASC) VISIBLE,
  UNIQUE INDEX `thereCanBeOnly3` (`group_idGroup` ASC, `groupMember_idGroupMember` ASC) VISIBLE,
  CONSTRAINT `fk_group_has_groupMember_group1`
    FOREIGN KEY (`group_idGroup`)
    REFERENCES `webSovellusProjekti`.`group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_groupMember_groupMember1`
    FOREIGN KEY (`groupMember_idGroupMember`)
    REFERENCES `webSovellusProjekti`.`groupMember` (`idGroupMember`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`favorite` (
  `idFavorite` INT(11) NOT NULL,
  `user_idUser` INT(11) NOT NULL,
  `favorite` INT(11) NOT NULL,
  PRIMARY KEY (`idFavorite`),
  INDEX `fk_favorite_user1_idx` (`user_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_favorite_user1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `webSovellusProjekti`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`review` (
  `idReview` INT(11) NOT NULL,
  `user_idUser` INT(11) NOT NULL,
  `rating` INT(11) NOT NULL,
  `review` BLOB NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_review_user1_idx` (`user_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_review_user1`
    FOREIGN KEY (`user_idUser`)
    REFERENCES `webSovellusProjekti`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `webSovellusProjekti`.`groupInvite` (
  `idGroupInvite` INT(11) NOT NULL,
  `groupMember_idGroupMember` INT(11) NOT NULL,
  `group_idGroup` INT(11) NOT NULL,
  `inviteText` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idGroupInvite`),
  INDEX `fk_groupMember_has_group_group1_idx` (`group_idGroup` ASC) VISIBLE,
  INDEX `fk_groupMember_has_group_groupMember1_idx` (`groupMember_idGroupMember` ASC) VISIBLE,
  CONSTRAINT `fk_groupMember_has_group_groupMember1`
    FOREIGN KEY (`groupMember_idGroupMember`)
    REFERENCES `webSovellusProjekti`.`groupMember` (`idGroupMember`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groupMember_has_group_group1`
    FOREIGN KEY (`group_idGroup`)
    REFERENCES `webSovellusProjekti`.`group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
