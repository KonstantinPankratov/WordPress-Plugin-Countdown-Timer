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

    if (!wp_script_is('the-countdown-timer', 'enqueued')) {
        $manifest_path = THE_CDT_PLUGIN_COMPONENTS_BUILD_PATH . '/asset-manifest.json';

        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);

            // Get the main JS and CSS files from the manifest
            $main_js = $manifest['files']['main.js'];
            $main_css = isset($manifest['files']['main.css']) ? $manifest['files']['main.css'] : '';

            wp_enqueue_script(
                'the-countdown-timer',
                THE_CDT_PLUGIN_COMPONENTS_BUILD_URL . $main_js,
                array('wp-element'),
                false,
                true
            );

            if ($main_css) {
                wp_enqueue_style(
                    'the-countdown-timer',
                    THE_CDT_PLUGIN_COMPONENTS_BUILD_URL . $main_css
                );
            }
        }
    }

    json_decode($post->post_content);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'An error occured when parsing countdown timer config';
    }

    return sprintf('<div class="the-countdown-timer-component" data-config="%s"></div>', htmlspecialchars($post->post_content, ENT_QUOTES, 'UTF-8'));
}
