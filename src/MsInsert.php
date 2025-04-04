<?php

use MediaWiki\EditPage\EditPage;
use MediaWiki\Title\Title;

class MsInsert {

	public static function onResourceLoaderGetConfigVars( array &$vars, string $skin, Config $config ) {
		$templates = $config->get( 'Templates' );
		foreach ( $templates as $key => $template ) {
			$title = Title::newFromText( $template );
			if ( !$title || !$title->exists() ) {
				unset( $templates[ $key ] );
			}
		}
		$vars['wgMsInsertTemplates'] = $templates;
	}

	public static function onShowEditFormInitial( EditPage $editPage, OutputPage $output ) {
		$output->addModules( 'ext.MsInsert' );
	}
}
