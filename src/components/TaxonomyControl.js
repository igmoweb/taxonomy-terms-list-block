import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TaxonomySelector = ({ selected, onChange, taxonomies }) => {
	return (
		<SelectControl
			label={__('Display terms from this taxonomy', 'taxonomyblock')}
			value={selected}
			options={[
				{
					label: __('-- Select a taxonomy --', 'taxonomyblock'),
					value: '',
				},
				...taxonomies.map(({ name, slug }) => ({
					label: name,
					value: slug,
				})),
			]}
			onChange={onChange}
		/>
	);
};

export default TaxonomySelector;
