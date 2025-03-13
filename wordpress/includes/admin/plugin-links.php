<?php

add_filter('plugin_action_links_' . plugin_basename(THE_CDT_MAIN_FILE), 'the_cdt_plugin_links');

function the_cdt_plugin_links($links) {
    $list_all_url = admin_url('edit.php?post_type=' . \THE_CDT\PostType::$post_type_slug);
    $add_new_url   = admin_url('post-new.php?post_type=' . \THE_CDT\PostType::$post_type_slug);

    $links[] = sprintf(
        '<a href="%s">%s</a>',
        esc_url($list_all_url),
        __('All timers', 'the-countdown-timer')
    );
    $links[] = sprintf(
        '<a href="%s">%s</a>',
        esc_url($add_new_url),
        __('Create timer', 'the-countdown-timer')
    );
    return $links;
}