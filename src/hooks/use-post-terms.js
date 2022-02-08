/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';

export default function usePostTerms({ postId, postType, term }) {
	const { rest_base: restBase } = term;
	const [termIds] = useEntityProp('postType', postType, restBase, postId);
	return {
		postTerms: termIds,
		isLoading: typeof termIds === 'undefined',
	};
}
