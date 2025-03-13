<?php

/*
Plugin Name: The Countdown Timer
Description: Add countdown timer to your website
Version: 1.0.0
Author: Konstantin Pankratov
Author URI: http://kopa.pw/
License: GPLv2 or later
*/
if (!defined('ABSPATH')) exit;

define( 'THE_CDT_MAIN_FILE', __FILE__ );
define( 'THE_CDT_PATH', plugin_dir_path(__FILE__) );

require_once THE_CDT_PATH . '/wordpress/init.php';