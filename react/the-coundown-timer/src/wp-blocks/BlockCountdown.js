import { createContext } from 'react';
import ReactDOM from 'react-dom';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { SelectControl, BaseControl, useBaseControlProps, Flex, FlexItem } from '@wordpress/components';
import BlockCountdownTimer from '../components/BlockCountdownTimer';

export const CounterContext = createContext();

registerBlockType("kopa-countdown/basic-timer", {
	apiVersion: 3,
	title: "Block Countdown",
	icon: "align-wide",
	category: "common",
	attributes: {
		dateTime: {
			type: "datetime",
			default: new Date().getTime()
		},
		delimiter: {
			type: "string",
			default: null
		},
		style: {
			type: "string",
			default: "simple"
		}
	},
	edit: EditComponent
})

function EditComponent(props)
{
	function onChangeDateTime(value) {
		props.setAttributes({ dateTime: value })
	}

	function onChangeDelimiter(value) {
		props.setAttributes({ delimiter: value })
	}

	function onChangeStyle(value) {
		props.setAttributes({ style: value })
	}

	if (props.attributes.delimiter == null)
		onChangeDelimiter(':')

	const dateProps = useBaseControlProps({
		...props,
		label: __('Date to countdown to')
	});

	const delimiterProps = useBaseControlProps({
		...props,
		label: __('Delimiter')
	});

	return (
		<div {...useBlockProps({ className: 'components-placeholder' })}>
			<label class="components-placeholder__label">
				<span class="dashicon dashicons dashicons-clock"></span>
				{ __('Countdown timer') }
			</label>
			<div style={{ margin: '0 0 10px', width: '100%', padding: '10px 0', border: '2px dashed lightgrey'}}>
				<CounterContext.Provider value={{ delimiter: props.attributes.delimiter, style: props.attributes.style }}>
					<BlockCountdownTimer targetDate={props.attributes.dateTime} />
				</CounterContext.Provider>
			</div>
			<div>
				<div>
					<SelectControl
						label="Style"
						value={ props.attributes.style }
						options={ [
							{ label: 'Text', value: 'text' },
							{ label: 'Bold Light', value: 'bold-light' },
							{ label: 'Thin Light', value: 'thin-light' },
						] }
						onChange={(value) => onChangeStyle(value)}
					/>
				</div>
				<Flex wrap={ true }>
					<FlexItem>
						<BaseControl { ...dateProps.baseControlProps }>
							<input
								{ ...dateProps.controlProps  }
								style={{ display: 'block' }}
								type="datetime-local"
								value={props.attributes.dateTime}
								onChange={(event) => onChangeDateTime(event.target.value)}
							/>
						</BaseControl>
					</FlexItem>
					<FlexItem>
						<BaseControl { ...delimiterProps.baseControlProps }>
							<input
								{ ...delimiterProps.controlProps  }
								style={{ display: 'block' }}
								type="text"
								value={props.attributes.delimiter}
								onChange={(event) => onChangeDelimiter(event.target.value)}
							/>
						</BaseControl>
					</FlexItem>
				</Flex>
			</div>
		</div>
	)
}

(function() {
	const roots = document.querySelectorAll('.kopa-countdown-basic-timer');

	if (!roots)
		return;

	roots.forEach(root => {
		ReactDOM.render(
			<React.StrictMode>
				<CounterContext.Provider value={{ delimiter: root.dataset.delimiter, style: root.dataset.style, }}>
					<BlockCountdownTimer targetDate={ new Date(root.dataset.datetime).getTime() } />
				</CounterContext.Provider>
			</React.StrictMode>,
			root
		);
	});
})();