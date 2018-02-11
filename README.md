# MsInsert

The MsInsert extension adds a dropdown menu to the edit toolbar, that allows you to insert into the textarea the content of any wiki page listed in the dropdown menu.

## Installation

To install MsInsert, add the following to your LocalSettings.php:

wfLoadExtension( 'MsInsert' );

## Configuration

To add a page to the dropdown menu, add it to the $wgTemplates array in your LocalSettings.php, like so:

$wgTemplates = [
	'Template:Test',
	'Main Page',
	'Talk:Main Page'
];

If the page does not exist yet, then it will not be added to the dropdown menu, even if it's listed in the $wgTemplates array. By default, the array is empty.

## Credits

* Developed and coded by Martin Schwindl (wiki@ratin.de)
* Idea, project management and bug fixing by Martin Keyler (wiki@keyler-consult.de)
* Updated, debugged and enhanced by Felipe Schenone (schenonef@gmail.com)