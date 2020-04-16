if ( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ) {
	mw.loader.using( 'user.options', function () {
		if ( mw.user.options.get( 'usebetatoolbar' ) ) {
			$.when(
				mw.loader.using( 'ext.wikiEditor' ), $.ready
			).then( msi_modifyToolbar1 );
		} else {
			msi_modifyToolbar2();
		}
	});
}

function msi_modifyToolbar1() {
	var dropdownMenu = $( '<select/>' ).attr( 'id', 'msi-select' ).css({ 'margin': '4px', 'float': 'right' }).change( function () {
		var selection = this.options[ this.selectedIndex ].value;
		msi_templateSelect( selection );
	});
	dropdownMenu.append( '<option value="0">' + mw.msg( 'msi-insert-template' ) + '</option>' );
	for ( var i = 0; i < msi_templates.length; i++ ) {
		dropdownMenu.append( '<option value="' + ( i + 1 ) + '">' + msi_templates[ i ] + '</option>' );
	}
	$( '#wikiEditor-section-main' ).find( '.group-insert' ).append( dropdownMenu );
}

function msi_modifyToolbar2() {
	var dropdownMenu = $( '<select/>' ).attr( 'id', 'msi-select' ).css({ 'margin': '4px', 'float': 'right' }).change( function () {
		var selection = this.options[ this.selectedIndex ].value;
		msi_templateSelect( selection );
	});
	dropdownMenu.append( '<option value="0">' + mw.msg( 'msi-insert-template' ) + '</option>' );
	for ( var i = 0; i < msi_templates.length; i++ ) {
		dropdownMenu.append( '<option value="' + ( i + 1 ) + '">' + msi_templates[ i ] + '</option>' );
	}
	$( '#toolbar' ).append( dropdownMenu );
}

function msi_templateSelect( i ) {
	if ( i === 0 ) {
		return false;
	}
	var api = new mw.Api();
	api.get({
		'format': 'json',
		'action': 'query',
		'titles': msi_templates[ i - 1 ],
		'prop': 'revisions',
		'rvprop': 'content'
	}).done ( function ( data ) {
		if ( data.hasOwnProperty( 'query' ) && data.query.hasOwnProperty( 'pages' ) ) {
			// Extract the content from the JSON wrappers
			var pages = data.query.pages;
			for ( i in pages ) {
				var content = pages[ i ].revisions['0']['*'];
			}
			msi_templateInsert( content, '\n', '\n' );
			$( '#msi-select option[value="0"]').prop( 'selected', true );
		}
	});
}

function msi_templateInsert( inhalt, tagOpen, tagClose ) {
	this.editor = document.getElementById( 'wpTextbox1' );
	var sampleText = inhalt;
	var isSample = false;

	if ( document.selection && document.selection.createRange ) {
		if ( document.documentElement && document.documentElement.scrollTop ) {
			var windowScroll = document.documentElement.scrollTop
		} else if ( document.body ) {
			var windowScroll = document.body.scrollTop;
		}

		// Get current selection
		this.editor.focus();
		var range = document.selection.createRange();
		var selectedText = range.text;

		// Insert tags
		msi_checkSelectedText();
		range.text = tagOpen + selectedText + tagClose;

		// Restore window scroll position
		if ( document.documentElement && document.documentElement.scrollTop ) {
			document.documentElement.scrollTop = windowScroll
		} else if ( document.body ) {
			document.body.scrollTop = windowScroll;
		}
	} else if ( this.editor.selectionStart || this.editor.selectionStart == '0' ) { // Mozilla
		// Save textarea scroll position
		var textScroll = this.editor.scrollTop;

		// Get current selection
		this.editor.focus();

		var selectionStart = this.editor.selectionStart;
		var selectionEnd = this.editor.selectionEnd;
		var selectedText = this.editor.value.substring( selectionStart, selectionEnd );

		// Insert tags
		msi_checkSelectedText();
		this.editor.value = this.editor.value.substring( 0, selectionStart ) + tagOpen + selectedText + tagClose + this.editor.value.substring( selectionEnd, this.editor.value.length );

		// Set new selection
		if ( isSample ) {
			this.editor.selectionStart = selectionStart + tagOpen.length + selectedText.length;
			this.editor.selectionEnd = selectionStart + tagOpen.length + selectedText.length;
		} else {
			this.editor.selectionStart = this.editor.selectionStart;
			this.editor.selectionEnd = this.editor.selectionStart;
		}
		this.editor.scrollTop = textScroll;
	}

	function msi_checkSelectedText() {
		if ( !selectedText ) {
			selectedText = sampleText;
			isSample = true;
		} else if ( selectedText.charAt( selectedText.length - 1 ) === ' ' ) { // Exclude ending space char
			selectedText = selectedText.substring( 0, selectedText.length - 1 );
			tagClose += ' ';
		}
	}
}