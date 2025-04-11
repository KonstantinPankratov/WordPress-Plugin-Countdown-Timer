<?php

/*
Plugin Name: The Countdown Timer
Description: The only countdown timer you'll ever need!
Version: 1.0.0
Requires PHP: 7.2
Author: Konstantin Pankratov
Author URI: http://kopa.pw/
License: GPLv2 or later
*/
if (!defined('ABSPATH')) exit;

define( 'THECDT_MAIN_FILE', __FILE__ );
define( 'THECDT_PATH', plugin_dir_path(__FILE__) );

require_once THECDT_PATH . '/wordpress/init.php';