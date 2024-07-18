<?php

function the_cdt_load_scripts() {
    $scripts_tag = 'the-countdown-timer';

    if (!wp_script_is($scripts_tag, 'enqueued')) {
        $manifest_path = THE_CDT_PLUGIN_COMPONENTS_BUILD_PATH . '/.vite/manifest.json';

        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);

            if (!isset($manifest['index.html']))
                return;

            // Get the main JS and CSS files from the manifest
            $main_js = $manifest['index.html']['file'];
            $main_css = isset($manifest['index.html']['css']) ? $manifest['index.html']['css'] : [];

            wp_enqueue_script(
                $scripts_tag,
                THE_CDT_PLUGIN_COMPONENTS_BUILD_URL .'/'. $main_js,
                ['wp-element'],
                null,
                true
            );

            add_filter('script_loader_tag', function ($tag, $handle, $src) use ($scripts_tag) {
                if ($scripts_tag !== $handle) {
                    return $tag;
                }
                return '<script type="module" src="' . esc_url($src) . '" id="' . $handle . '-js"></script>';
            }, 10, 3);

            foreach ($main_css as $key => $path) {
                wp_enqueue_style(
                    $scripts_tag . $key,
                    THE_CDT_PLUGIN_COMPONENTS_BUILD_URL .'/'. $path,
                    [],
                    null
                );
            }
        }
    }
}