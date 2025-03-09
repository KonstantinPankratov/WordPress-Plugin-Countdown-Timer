// import { BaseControl, ColorPicker, ComboboxControl, Flex, FlexBlock, FlexItem, FontSizePicker } from "@wordpress/components";
// import { numbersFontSizeOptions, numbersFontWightOptions } from "../presets/configurationOptions";

// const FontNumberSettings = () => {
//   return (
//     <Flex direction="column" gap={6} style={{ width: '100%' }}>
//       <FlexBlock>
//         <Flex wrap={true} gap={6} align='flex-start' justify="unset">
//           <FlexItem style={{ width: '300px' }}>
//             <Flex direction="column" gap={6} style={{ width: '100%' }}>
//               <FlexBlock>
//                 <ComboboxControl
//                   __next40pxDefaultSize
//                   label="Style"
//                   options={numbersFontWightOptions}
//                   allowReset={false}
//                   onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'fonts.numbers', key: 'weight', value: newValue })}
//                   value={settings.fonts.numbers.weight} />
//               </FlexBlock>
//               <FlexBlock>
//                 <FontSizePicker
//                   __next40pxDefaultSize
//                   fontSizes={numbersFontSizeOptions}
//                   withReset={false}
//                   units={['px']}
//                   onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'fonts.numbers', key: 'size', value: newValue })}
//                   value={settings.fonts.numbers.size} />
//               </FlexBlock>
//             </Flex>
//           </FlexItem>
//           <FlexItem style={{ width: '300px' }}>
//             <BaseControl label="Color">
//               <ColorPicker
//                 copyFormat='hex'
//                 enableAlpha={true}
//                 onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'fonts.numbers', key: 'color', value: newValue })}
//                 color={settings.fonts.numbers.color} />
//             </BaseControl>
//           </FlexItem>
//         </Flex>
//       </FlexBlock>
//       <FlexBlock>
//         <Tip>The <u>monospace</u> font is used to avoid number shifting.</Tip>
//       </FlexBlock>
//     </Flex>
//   );
// }

// export default FontNumberSettings