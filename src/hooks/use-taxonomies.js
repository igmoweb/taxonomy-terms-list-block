/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

export default function useTaxonomies(postType) {
	return useSelect((select) => {
		return (select('core').getTaxonomies() || []).filter(
			(taxonomy) => taxonomy?.visibility?.publicly_queryable
		);
	});
}
