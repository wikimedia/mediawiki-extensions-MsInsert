<?php

class MsInsert {

	public static function start() {
		global $wgOut, $wgTemplates;

		$wgOut->addModules( 'ext.MsInsert' );

		$templates = [];
		foreach ( $wgTemplates as $key => $template ) {
			$title = Title::newFromText( htmlentities( $template ) );
			$title2 = Title::newFromText( $template );
			if ( $title && $title->exists() ) {
				$templates[] = htmlentities( $template );
			} elseif ( $title2 && $title2->exists() ) {
				$templates[] = $template;
			}
		}
		$templates = json_encode( $templates );
		$wgOut->addScript( "<script>var msi_templates = JSON.parse('$templates');</script>" );
		return true;
	}
}
