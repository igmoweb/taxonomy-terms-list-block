import useTaxonomies from '../hooks/use-taxonomies';
import usePostTerms from '../hooks/use-post-terms';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import Settings from './Settings';
import { Placeholder, Spinner } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

const Edit = ({ attributes, context, setAttributes }) => {
	const { term, textAlign } = attributes;
	const { postId, postType } = context;

	const allTaxonomies = useTaxonomies(postType);
	const postTypeTaxonomies = allTaxonomies.filter(
		({ types }) => types.indexOf(postType) > -1
	);

	const taxonomies =
		postTypeTaxonomies.length === 0 ? allTaxonomies : postTypeTaxonomies;

	const selectedTerm = useSelect(
		(select) => {
			if (!term) return {};
			const { getTaxonomy } = select(coreStore);
			const taxonomy = getTaxonomy(term);
			return taxonomy?.visibility?.publicly_queryable ? taxonomy : {};
		},
		[term]
	);

	const { postTerms, isLoading } = usePostTerms({
		postId,
		postType,
		term: selectedTerm,
	});

	const postTypeHasTaxonomy = postTypeTaxonomies.some(({ slug }) => {
		return slug === term;
	});

	console.log({ postTypeHasTaxonomy, term, postTypeTaxonomies });

	useEffect(() => {
		if (postTerms === null) {
			return;
		}
		setAttributes({ lastUpdate: new Date().getTime() });
	}, [postTerms]);

	const hasPost = postId && postType;
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
			[`taxonomy-block-${term}`]: term,
		}),
	});

	return (
		<div {...blockProps}>
			{hasPost && (
				<Settings
					taxonomies={taxonomies}
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			)}
			{isLoading && term && postTypeHasTaxonomy && <Spinner />}
			{term && !postTypeHasTaxonomy && (
				<Placeholder
					instructions={__(
						"Taxonomy Terms List: This post hasn't got the %s taxonomy associated. This may happen inside the block editor context depending on the page you are trying to edit. The taxonomy terms list here will be replaced for an actual list in the website.",
						'taxonomyblock'
					)}
				/>
			)}
			{term && !isLoading && postTypeHasTaxonomy && (
				<ServerSideRender
					attributes={attributes}
					block="taxonomy-terms-list/block"
					urlQueryArgs={{
						previewPostTerms: postTerms,
					}}
				/>
			)}
			{!term && (
				<Placeholder
					instructions={__(
						'Please, select a taxonomy in the block options',
						'taxonomyblock'
					)}
				/>
			)}
		</div>
	);
};

export default Edit;
