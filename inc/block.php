<?php
/**
 * Manage block rendering.
 */

namespace TaxonomyBlock\Block;

/**
 * Hooks initialization
 */
function init() {
	add_action( 'init', __NAMESPACE__ . '\\register_block' );
}

/**
 * Block registration.
 */
function register_block() {
	register_block_type(
		dirname(__DIR__ ),
		[
			'render_callback' => __NAMESPACE__ . '\\render',
		]
	);
}

/**
 * Block rendering.
 */
function render( $attributes, $content, $block ) {
	$is_preview = isset( $_GET['context'] ) && $_GET['context'] === 'edit';

	if ( ! isset( $block->context['postId'] ) || ! isset( $attributes['term'] ) ) {
		return '';
	}

	if ( ! is_taxonomy_viewable( $attributes['term'] ?? '' ) ) {
		return '';
	}

	$preview_post_terms = isset( $_GET['previewPostTerms'] ) && is_array( $_GET['previewPostTerms'] ) ? array_map( 'absint', $_GET['previewPostTerms'] ) : null;

	if ( $preview_post_terms === null ) {
		$post_terms = get_the_terms( $block->context['postId'], $attributes['term'] );
	} elseif ( count( $preview_post_terms ) === 0 ) {
		$post_terms = [];
	} else {
		$post_terms = array_map( 'get_term', $preview_post_terms );
	}

	if ( is_wp_error( $post_terms ) ) {
		return '';
	}

	if ( empty( $post_terms ) ) {
		return get_taxonomy( $attributes['term'] )->labels->no_terms ?? __( 'Term items not found.', 'taxonomyblock' );
	}

	$classes = 'taxonomy-' . $attributes['term'];
	if ( isset( $attributes['textAlign'] ) ) {
		$classes .= ' has-text-align-' . $attributes['textAlign'];
	}

	$separator = empty( $attributes['separator'] ) ? ' ' : $attributes['separator'];

	$wrapper_attributes = ! $is_preview ? get_block_wrapper_attributes( [ 'class' => $classes ] ) : '';

	$links = [];
	foreach ( $post_terms as $term ) {
		$link = get_term_link( $term, $attributes['term'] );
		if ( is_wp_error( $link ) ) {
			return $link;
		}

		$style = $is_preview ? 'style="pointer-events:none;"' : '';
		$links[] = '<a href="' . esc_url( $link ) . '"' . $style . ' rel="tag">' . $term->name . '</a>';
	}

	$term_links = apply_filters( "term_links-{$attributes['term']}", $links );  // phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores

	$label = $attributes['title'] ?? '';
	$label = $label ? '<strong>' . esc_html( $attributes['title'] ) . ':</strong> ' : '';
	return "<div $wrapper_attributes>$label" . implode( '<span class="wp-block-post-terms__separator">' . esc_html( $separator ) . '</span>', $term_links ) . '</div>';
}