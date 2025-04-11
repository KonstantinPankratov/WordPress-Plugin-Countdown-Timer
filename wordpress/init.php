<?php

use THECDT\PostType;

if (!defined('ABSPATH')) exit;

define('THECDT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('THECDT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('THECDT_PLUGIN_COMPONENTS_BUILD_PATH', THECDT_PLUGIN_PATH . '../react/dist');
define('THECDT_PLUGIN_COMPONENTS_BUILD_URL', THECDT_PLUGIN_URL . '../react/dist');

require_once THECDT_PLUGIN_PATH . 'includes/helper.php';
require_once THECDT_PLUGIN_PATH . 'includes/admin/post-type.php';
require_once THECDT_PLUGIN_PATH . 'includes/admin/plugin-links.php';
require_once THECDT_PLUGIN_PATH . 'integrations/wp-shortcode.php';

PostType::register();
