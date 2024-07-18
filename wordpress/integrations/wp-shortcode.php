<?php

add_shortcode('the-countdown-timer', 'the_countdown_timer_shortcode');

function the_countdown_timer_shortcode($atts)
{
    if (is_admin() || !isset($atts['id'])) {
        return '';
    }

    $post = get_post($atts['id']);

    if (!$post || $post->post_type !== 'the_countdown_timer') {
        return '';
    }

    the_cdt_load_scripts();

    json_decode($post->post_content);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'An error occured when parsing countdown timer config';
    }

    return sprintf('<div class="the-countdown-timer-component" data-config="%s"></div>', htmlspecialchars($post->post_content, ENT_QUOTES, 'UTF-8'));
}
