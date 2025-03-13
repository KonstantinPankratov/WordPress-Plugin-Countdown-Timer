<?php

namespace THE_CDT;

class PostType {
    public static $post_type_slug = 'the_countdown_timer';

    public static function register()
    {
        add_action('init', [__CLASS__, 'create_post_type']);
    }

    public static function create_post_type()
    {
        $labels = array(
            'name'               => _x('The Countdown Timers', 'Post Type General Name', 'WordPress-Plugin-Countdown-Timer'),
            'singular_name'      => _x('The Countdown Timer', 'Post Type Singular Name', 'WordPress-Plugin-Countdown-Timer'),
            'menu_name'          => __('The Countdown Timers', 'WordPress-Plugin-Countdown-Timer'),
            'name_admin_bar'     => __('The Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'archives'           => __('The Countdown Timer Archives', 'WordPress-Plugin-Countdown-Timer'),
            'attributes'         => __('The Countdown Timer Attributes', 'WordPress-Plugin-Countdown-Timer'),
            'parent_item_colon'  => __('Parent Timer:', 'WordPress-Plugin-Countdown-Timer'),
            'all_items'          => __('The Countdown Timers', 'WordPress-Plugin-Countdown-Timer'),
            'add_new_item'       => __('Add New Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'add_new'            => __('Add New', 'WordPress-Plugin-Countdown-Timer'),
            'new_item'           => __('New Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'edit_item'          => __('Edit Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'update_item'        => __('Update Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'search_items'       => __('Search Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
        );
    
        $args = array(  
            'label'              => __('The Countdown Timer', 'WordPress-Plugin-Countdown-Timer'),
            'description'        => __('-', 'WordPress-Plugin-Countdown-Timer'),
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
            'the-cdt-general-settings',
            __('Shortcode', 'WordPress-Plugin-Countdown-Timer'),
            array(__CLASS__, 'shortcode_meta_box'),
            self::$post_type_slug,
            'side'
        );
    }

    public static function shortcode_meta_box($post)
    {
        echo sprintf("<input type='text' readonly value='%s' class='large-text'>", esc_attr("[the-countdown-timer id={$post->ID}]"));
    }
}

// Load configurator react component styles

add_action('admin_enqueue_scripts', function ($hook) {
    global $post;

    if ($hook === 'post-new.php' || $hook === 'post.php') {
        if (isset($post) && $post->post_type === 'the_countdown_timer') {

            the_cdt_load_scripts('editor');

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
    if ($post->post_type === 'the_countdown_timer') {
        echo '<div class="the-countdown-timer-editor-component"></div>';
    }
});
