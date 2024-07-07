import { createContext } from 'react';
import ReactDOM from 'react-dom';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { BaseControl, useBaseControlProps, Flex, FlexItem } from '@wordpress/components';
import InlineCountdownTimer from '../components/InlineCountdownTimer';

export const DelimiterContext = createContext();

registerBlockType("date-counter/inline-countdown", {
	apiVersion: 3,
	title: "Inline Countdown",
	icon: "align-pull-left",
	category: "common",
	attributes: {
		dateTime: {
			type: "datetime",
			default: new Date().getTime()
		},
		delimiter: {
			type: "string",
			default: null
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
				<span class="dashicon dashicons dashicons-align-pull-left"></span>
				{ __('Date Counter: Inline countdown') }
			</label>
			<div style={{ margin: '0 0 10px', width: '100%', padding: '10px', border: '2px dashed lightgrey'}}>
				<DelimiterContext.Provider value={ props.attributes.delimiter }>
					<InlineCountdownTimer targetDate={props.attributes.dateTime} />
				</DelimiterContext.Provider>
			</div>
			<div>
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
	const roots = document.querySelectorAll('.date-counter-inline-countdown');

	if (!roots)
		return;

	roots.forEach(root => {
		ReactDOM.render(
			<React.StrictMode>
				<DelimiterContext.Provider value={ root.dataset.delimiter }>
					<InlineCountdownTimer targetDate={ new Date(root.dataset.datetime).getTime() } />
				</DelimiterContext.Provider>
			</React.StrictMode>,
			root
		);
	});
})();