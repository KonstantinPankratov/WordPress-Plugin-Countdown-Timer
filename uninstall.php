<?php

use THECDT\PostType;

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

$posts = get_posts([
    'post_type'      => PostType::$post_type_slug,
    'posts_per_page' => -1,
    'post_status'    => 'any',
    'fields'         => 'ids'
]);

foreach ( $posts as $post_id ) {
    wp_delete_post( $post_id, true );
}