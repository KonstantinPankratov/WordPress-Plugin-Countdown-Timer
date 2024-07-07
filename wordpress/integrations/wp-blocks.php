<?php

/**
 * Load assets for custom gutenberg blocks
 */
add_action('enqueue_block_assets', 'date_counter_block_assets');

function date_counter_block_assets() {
	wp_enqueue_script(
		'date-counter-block-scripts',
		plugin_dir_url(__FILE__) . '/build/index.js',
		array(
			'wp-blocks',
			'wp-components',
		),
		'1.0.0',
		true
	);

	wp_enqueue_style(
		'date-counter-block-styles',
		plugin_dir_url(__FILE__) . '/build/index.css',
		array('wp-edit-blocks'),
		'1.0.0'
	);
}


/**
 * Register dynamic blocks to render JSX on pages
 */
add_action( 'init', 'date_counter_register_dynamic_blocks' );

function date_counter_register_dynamic_blocks()
{
	register_block_type(
		'date-counter/block-countdown',
		array(
		  'editor_script' => 'date-counter-block-scripts',
		  'render_callback' => 'date_counter_register_dynamic_blocks_render_callback',
		)
	);

	register_block_type(
		'date-counter/inline-countdown',
		array(
		  'editor_script' => 'date-counter-block-scripts',
		  'render_callback' => 'date_counter_register_dynamic_blocks_render_callback',
		)
	);
}


/**
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 */
function date_counter_register_dynamic_blocks_render_callback( $attributes, $content, $block_instance )
{
	$id = str_replace('/', '-', $block_instance->name);

	ob_start();
	echo "<p class=\"{$id}\" data-datetime=\"{$attributes['dateTime']}\" data-delimiter=\"{$attributes['delimiter']}\" data-style=\"{$attributes['style']}\"></p>";
	return ob_get_clean();
}