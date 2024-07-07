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
            'name'               => _x('The Countdown Timers', 'Post Type General Name', self::$post_type_slug),
            'singular_name'      => _x('The Countdown Timer', 'Post Type Singular Name', self::$post_type_slug),
            'menu_name'          => __('The Countdown Timers', self::$post_type_slug),
            'name_admin_bar'     => __('The Countdown Timer', self::$post_type_slug),
            'archives'           => __('The Countdown Timer Archives', self::$post_type_slug),
            'attributes'         => __('The Countdown Timer Attributes', self::$post_type_slug),
            'parent_item_colon'  => __('Parent Timer:', self::$post_type_slug),
            'all_items'          => __('The Countdown Timers', self::$post_type_slug),
            'add_new_item'       => __('Add New Countdown Timer', self::$post_type_slug),
            'add_new'            => __('Add New', self::$post_type_slug),
            'new_item'           => __('New Countdown Timer', self::$post_type_slug),
            'edit_item'          => __('Edit Countdown Timer', self::$post_type_slug),
            'update_item'        => __('Update Countdown Timer', self::$post_type_slug),
            'search_items'       => __('Search Countdown Timer', self::$post_type_slug),
        );
    
        $args = array(  
            'label'              => __('The Countdown Timer', self::$post_type_slug),
            'description'        => __('-', self::$post_type_slug),
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
            __('General settings', self::$post_type_slug),
            array(__CLASS__, 'general_settings_meta_box_content'),
            self::$post_type_slug
        );
    }

    public static function general_settings_meta_box_content($post)
    {
        // wp_nonce_field('custom_post_manager_save_meta_box_data', 'custom_post_manager_meta_box_nonce');

        $value = get_post_meta($post->ID, '_custom_post_meta_key', true);

        echo '<label for="custom_post_manager_new_field">';
        _e('Custom Field', 'custom-post-manager');
        echo '</label> ';
        echo '<input type="text" id="custom_post_manager_new_field" name="custom_post_manager_new_field" value="' . esc_attr($value) . '" />';
    }
}

// // Save meta box data
// function custom_post_manager_save_meta_box_data($post_id) {
//     if (!isset($_POST['custom_post_manager_meta_box_nonce'])) {
//         return;
//     }
//     if (!wp_verify_nonce($_POST['custom_post_manager_meta_box_nonce'], 'custom_post_manager_save_meta_box_data')) {
//         return;
//     }
//     if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
//         return;
//     }
//     if (!current_user_can('edit_post', $post_id)) {
//         return;
//     }

//     if (!isset($_POST['custom_post_manager_new_field'])) {
//         return;
//     }

//     $data = sanitize_text_field($_POST['custom_post_manager_new_field']);

//     update_post_meta($post_id, '_custom_post_meta_key', $data);
// }
// add_action('save_post', 'custom_post_manager_save_meta_box_data');