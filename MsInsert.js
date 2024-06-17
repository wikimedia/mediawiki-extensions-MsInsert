const MsInsert = {

	init: function () {
		mw.hook( 'wikiEditor.toolbarReady' ).add( MsInsert.addDropdownMenu );
	},

	addDropdownMenu: function ( $textarea ) {
		const $wikiEditor = $textarea.closest( '.wikiEditor-ui' );
		let $dropdownMenu = $( '<select id="msi-select"></select>' ).css( 'margin', '0 4px' ).on( 'change', $wikiEditor, MsInsert.onTemplateSelect );
		$dropdownMenu.append( '<option>' + mw.msg( 'msi-insert-template' ) + '</option>' );
		const templates = mw.config.get( 'wgMsInsertTemplates' );
		for ( let template of templates ) {
			$dropdownMenu.append( '<option>' + template + '</option>' );
		}
		$textarea.closest( '.wikiEditor-ui' ).find( '#wikiEditor-section-main .group-insert' ).append( $dropdownMenu );
	},

	onTemplateSelect: function ( event ) {
		const template = this.options[ this.selectedIndex ].value;
		if ( !template ) {
			return false;
		}
		new mw.Api().get( {
			action: 'query',
			titles: template,
			prop: 'revisions',
			rvprop: 'content',
			rvslots: 'main',
			format: 'json',
			formatversion: 2
		} ).done( function ( data ) {
			if ( data.query && data.query.pages ) {
				const content = data.query.pages[0].revisions[0].slots.main.content;
				const $wikiEditor = event.data;
				const textarea = $wikiEditor.find( '#wpTextbox1' )[0];
				MsInsert.templateInsert( textarea, content );
				$wikiEditor.find( '#msi-select option' ).first().prop( 'selected', true );
			}
		} );
	},

	templateInsert: function ( textarea, content ) {
		if ( textarea.selectionStart || textarea.selectionStart === 0 ) {
			const selectionStart = textarea.selectionStart;
			const selectionEnd = textarea.selectionEnd;
			const textStart = textarea.value.substring( 0, selectionStart );
			const textEnd = textarea.value.substring( selectionEnd, textarea.value.length );
			textarea.value = textStart + content + textEnd;
			textarea.selectionStart = selectionStart;
			textarea.selectionEnd = selectionStart + content.length;
		} else {
			textarea.value += content;
		}
		textarea.focus();
	}
};

$( MsInsert.init );
