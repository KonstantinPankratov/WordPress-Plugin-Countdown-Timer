<?php

use THE_CDT\PostType;

if (!defined('ABSPATH')) exit;

define('THE_CDT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('THE_CDT_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once THE_CDT_PLUGIN_PATH . '/includes/admin/PostType.php';

PostType::register();
