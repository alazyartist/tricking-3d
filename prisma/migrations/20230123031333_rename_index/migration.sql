-- RenameIndex
ALTER TABLE `sessiondatascores` RENAME INDEX `sessiondatascores_userid_sessiondataid_key` TO `userid:sessiondataid`;
