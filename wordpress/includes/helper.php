<?php

function the_cdt_load_scripts($type = 'default')
{
    $manifest_path = THE_CDT_PLUGIN_COMPONENTS_BUILD_PATH . '/.vite/manifest.json';

    $bundleKey = 'src/the-cdt.tsx';

    if ($type === 'editor') {
        $bundleKey = 'src/the-cdt-editor.tsx';
    }

    function the_cdt_enqueue_bundle($manifest, $bundle, $depth = 0)
    {
        if ($depth > 3) {
            return;
        }

        $jsFile = $bundle['file'];
        $cssFiles = isset($bundle['css']) ? $bundle['css'] : [];
        $scriptTag = $depth === 0 ? 'the-countdown-timer' : basename($jsFile);

        if (wp_script_is($scriptTag, 'enqueued')) {
            return;
        }
        
        if (function_exists('wp_register_script_module')) { // wp_register_script_module & wp_enqueue_script_module (WP6.5+)
            wp_register_script_module($scriptTag, THE_CDT_PLUGIN_COMPONENTS_BUILD_URL .'/'. $jsFile, ['wp-element'], null, true);
            wp_enqueue_script_module($scriptTag);
        } else {
            wp_register_script($scriptTag, THE_CDT_PLUGIN_COMPONENTS_BUILD_URL .'/'. $jsFile, ['wp-element'], null, true);
            wp_enqueue_script($scriptTag);
            add_filter('script_loader_tag', function ($tag, $handle, $src) use ($scriptTag) {
                if ($handle === $scriptTag) {
                    return str_replace('<script ', '<script type="module" ', $tag);
                }
                return $tag;
            }, 10, 3);
        }

        foreach ($cssFiles as $cssFile) {
            wp_enqueue_style(
                basename($cssFile),
                THE_CDT_PLUGIN_COMPONENTS_BUILD_URL .'/'. $cssFile,
                [],
                null
            );
        }

        if (isset($bundle['imports'])) {
            foreach ($bundle['imports'] as $import) {
                if (isset($manifest[$import])) {
                    the_cdt_enqueue_bundle($manifest, $manifest[$import], ++$depth);
                }
            }
        }
    }

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);

        if (!isset($manifest[$bundleKey])) {
            return;
        }

        the_cdt_enqueue_bundle($manifest, $manifest[$bundleKey]);
    }
}
