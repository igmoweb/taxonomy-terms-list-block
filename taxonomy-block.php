<?php
/**
 * Plugin Name: Taxonomy Terms List Block
 * Description: Displays a list of a post terms for a selected taxonomy.
 * Plugin URI: https://wordpress.org/plugins/taxonomy-terms-list-block
 * Version: %%version%%
 * Author: igmoweb
 * Author URI: http://igmoweb.com
 * Text Domain: taxonomyblock
 * Domain path: /languages
 * License: GPLv2 or later (license.txt)
 * Requires PHP: %%requires_php%%
 * Requires at least: %%requires%%
 */

namespace TaxonomyBlock;

/**
 * Plugin initialization.
 */
function init() {
	include_once plugin_dir_path( __FILE__ ) . '/inc/block.php';

	add_action( 'plugins_loaded', __NAMESPACE__ . '\\load_text_domain', 50 );

	Block\init();
}

/**
 * Load the plugin text domain
 */
function load_text_domain() {
	load_plugin_textdomain( 'taxonomyblock', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
}

/**
 * Retrieve the plugin URL.
 *
 * @return string
 */
function plugin_url(): string {
	return plugin_dir_url( __FILE__ );
}

/**
 * Retrieve the plugin absolute path.
 *
 * @return string
 */
function plugin_dir(): string {
	return plugin_dir_path( __FILE__ );
}

init();
