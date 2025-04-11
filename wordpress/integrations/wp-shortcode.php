<?php

use THECDT\PostType;

if (!defined('ABSPATH')) exit;

add_shortcode('the-countdown-timer', 'thecdt_shortcode');

function thecdt_shortcode($atts)
{
    if (is_admin() || !isset($atts['id'])) {
        return '';
    }

    $post = get_post($atts['id']);

    if (!$post || $post->post_type !== PostType::$post_type_slug) {
        return '';
    }

    thecdt_load_scripts();

    json_decode($post->post_content);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'An error occured when parsing countdown timer config';
    }

    return sprintf('<div class="the-countdown-timer-component" data-config="%s"></div>', htmlspecialchars($post->post_content, ENT_QUOTES, 'UTF-8'));
}
