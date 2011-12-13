// default image link to none
update_option('image_default_link_type' , '');

// disable WPML's language selector css
define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);

// add language to body class
function extend_body_class($c) {
  $c[] = 'lang-' . ICL_LANGUAGE_CODE;
	return $c;
}
add_filter('body_class', 'extend_body_class');

// more to come...