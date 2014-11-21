<?php

$wgExtensionCredits['other'][] = array(
	'name' => 'MsInsert',
	'url' => 'https://www.mediawiki.org/wiki/Extension:MsInsert',
	'version' => '3.0',
	'descriptionmsg' => 'msi-desc',
	'license-name' => 'GPLv2+',
	'author' => array( '[mailto:wiki@ratin.de Martin Schwindl]', '[mailto:wiki@keyler-consult.de Martin Keyler]', '[https://www.mediawiki.org/wiki/User:Luis_Felipe_Schenone Luis Felipe Schenone]' ),
);

$wgResourceModules['ext.MsInsert'] = array(
	'scripts' => 'MsInsert.js',
	'messages' => array(
		'msi-insert-template',
	),
	'localBasePath' => __DIR__,
	'remoteExtPath' => 'MsInsert',
);

$wgAutoloadClasses['MsInsert'] = __DIR__ . '/MsInsert.body.php';

$wgExtensionMessagesFiles['MsInsert'] = __DIR__ . '/MsInsert.i18n.php';
$wgMessagesDirs['MsInsert'] = __DIR__ . '/i18n';

$wgHooks['EditPage::showEditForm:initial'][] = 'MsInsert::start';

// Default configuration
$wgTemplates = array();