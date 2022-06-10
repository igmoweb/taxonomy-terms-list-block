import './styles/editor.css';
import { registerBlockType } from '@wordpress/blocks';
import Edit from './components/Edit';

const BLOCK_NAME = 'taxonomy-terms-list/block';

registerBlockType(BLOCK_NAME, {
	edit: Edit,
});
