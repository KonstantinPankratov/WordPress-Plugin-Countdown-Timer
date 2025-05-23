<?php

namespace THECDT;

if (!defined('ABSPATH')) exit;

class PostType {
    public static $post_type_slug = 'thecdt_timer';

    public static function register()
    {
        add_action('init', [__CLASS__, 'create_post_type']);
    }

    public static function create_post_type()
    {
        $labels = array(
            'name'               => _x('The Countdown Timers', 'Post Type General Name', 'the-countdown-timer'),
            'singular_name'      => _x('The Countdown Timer', 'Post Type Singular Name', 'the-countdown-timer'),
            'menu_name'          => __('The Countdown Timers', 'the-countdown-timer'),
            'name_admin_bar'     => __('The Countdown Timer', 'the-countdown-timer'),
            'archives'           => __('The Countdown Timer Archives', 'the-countdown-timer'),
            'attributes'         => __('The Countdown Timer Attributes', 'the-countdown-timer'),
            'parent_item_colon'  => __('Parent Timer:', 'the-countdown-timer'),
            'all_items'          => __('The Countdown Timers', 'the-countdown-timer'),
            'add_new_item'       => __('Add New Countdown Timer', 'the-countdown-timer'),
            'add_new'            => __('Add New', 'the-countdown-timer'),
            'new_item'           => __('New Countdown Timer', 'the-countdown-timer'),
            'edit_item'          => __('Edit Countdown Timer', 'the-countdown-timer'),
            'update_item'        => __('Update Countdown Timer', 'the-countdown-timer'),
            'search_items'       => __('Search Countdown Timer', 'the-countdown-timer'),
        );
    
        $args = array(  
            'label'              => __('The Countdown Timer', 'the-countdown-timer'),
            'description'        => __('-', 'the-countdown-timer'),
            'labels'             => $labels,
            'supports'           => array('title'),
            'show_ui'            => true,
            'show_in_menu'       => 'tools.php',
            'menu_position'      => 5,
            'show_in_admin_bar'  => false,
            'show_in_nav_menus'  => false,
            'can_export'         => true,
            'has_archive'        => true,
            'exclude_from_search'=> true,
            'public'             => false,
            'publicly_queryable' => false,
            'hierarchical'       => false,
            'capability_type'    => 'post',
            'register_meta_box_cb' => array(__CLASS__, 'register_meta_boxes'),
        );
    
        register_post_type(self::$post_type_slug, $args);
    }

    public static function register_meta_boxes()
    {
        add_meta_box(
            'thecdt-general-settings',
            __('Shortcode', 'the-countdown-timer'),
            array(__CLASS__, 'shortcode_meta_box'),
            self::$post_type_slug,
            'side'
        );
    }

    public static function shortcode_meta_box($post)
    {
        thecdt_shortcode_input($post->ID);
    }
}

// Load configurator react component styles

add_action('admin_enqueue_scripts', function ($hook) {
    global $post;

    if ($hook === 'post-new.php' || $hook === 'post.php') {
        if (isset($post) && $post->post_type === PostType::$post_type_slug) {

            thecdt_load_scripts('editor');

            $config = null;

            $parsed = json_decode($post->post_content);

            if (json_last_error() === JSON_ERROR_NONE) {
                $config = $parsed;
            }

            wp_localize_script('the-countdown-timer', 'theCountdownTimerData', array(
                'config' => $config,
                'wpTimezoneName' => get_option('timezone_string') ?? null,
                'wpTimezoneOffset' => get_option('gmt_offset') ? format_utc_offset(get_option('gmt_offset')) : null
            ));
        }
    }
});

function format_utc_offset($offset) {
    $hours = (int) $offset;
    $minutes = abs(($offset - $hours) * 60);
    return sprintf('UTC%+d:%02d', $hours, $minutes);
}

add_action('edit_form_advanced', function ($post) {
    if ($post->post_type === PostType::$post_type_slug) {
        echo '<div class="the-countdown-timer-editor-component"></div>';
    }
});

// Add custom columns
add_filter(sprintf('manage_%s_posts_columns', PostType::$post_type_slug), function ($columns) {
    $columns['shortcode'] = __('Shortcode', 'the-countdown-timer');
    return $columns;
});

// Fill custom columns
add_action(sprintf('manage_%s_posts_custom_column', PostType::$post_type_slug), function ($column, $post_id) {
    if ($column === 'shortcode') {
        thecdt_shortcode_input($post_id);
    }
}, 10, 2);

function thecdt_shortcode_input($post_id) {
    $shortcode = sprintf("[the-countdown-timer id=%d]", $post_id);
    printf(
        "<input type='text' readonly value='%s' class='large-text' onclick='this.select(); document.execCommand(\"copy\");'>",
        esc_attr($shortcode)
    );
}