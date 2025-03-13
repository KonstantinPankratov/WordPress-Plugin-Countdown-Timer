<?php

use THE_CDT\PostType;

if (!defined('ABSPATH')) exit;

define('THE_CDT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('THE_CDT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('THE_CDT_PLUGIN_COMPONENTS_BUILD_PATH', THE_CDT_PLUGIN_PATH . '../react/dist');
define('THE_CDT_PLUGIN_COMPONENTS_BUILD_URL', THE_CDT_PLUGIN_URL . '../react/dist');

require_once THE_CDT_PLUGIN_PATH . 'includes/helper.php';
require_once THE_CDT_PLUGIN_PATH . 'includes/admin/post-type.php';
require_once THE_CDT_PLUGIN_PATH . 'integrations/wp-shortcode.php';

PostType::register();
