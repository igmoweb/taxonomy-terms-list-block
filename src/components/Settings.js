import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import TaxonomySelector from './TaxonomyControl';
import { __ } from '@wordpress/i18n';

const Settings = ({ taxonomies, attributes, setAttributes }) => {
	const { term, textAlign, separator, title } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<TaxonomySelector
						taxonomies={taxonomies}
						selected={term}
						onChange={(value) => {
							setAttributes({ term: value });
						}}
					/>
				</PanelBody>
				<PanelBody>
					<TextControl
						autoComplete="off"
						label={__('Separator', 'taxonomyblock')}
						value={separator || ''}
						onChange={(nextValue) => {
							setAttributes({ separator: nextValue });
						}}
						help={__(
							'Enter character(s) used to separate terms.',
							'taxonomyblock'
						)}
					/>
					<TextControl
						autoComplete="off"
						label={__('Title', 'taxonomyblock')}
						value={title || ''}
						onChange={(nextValue) => {
							setAttributes({ title: nextValue });
						}}
						help={__(
							'Title prefixed to the list of elements.',
							'taxonomyblock'
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
		</>
	);
};

export default Settings;
