// import { ComboboxControl, Flex, FlexItem, TextControl } from "@wordpress/components";

// const DateTimeSettings = () => {
//   return (
//     <Flex wrap={true} align='flex-start' gap={6} style={{ width: '100%' }} justify="unset">
//       <FlexItem style={{ width: '200px' }}>
//         <TextControl
//           label="Target Date & time"
//           __next40pxDefaultSize
//           type='datetime-local'
//           step={1}
//           onClick={
//             (e) => {
//               if ("showPicker" in HTMLInputElement.prototype) {
//                 (e.target as HTMLInputElement).showPicker();
//               }
//             }
//           }
//           onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, key: 'datetime', value: newValue })}
//           value={settings.datetime ?? ''} />
//       </FlexItem>
//       <FlexItem style={{ width: '300px' }}>
//         <ComboboxControl
//           label="Time zone"
//           __next40pxDefaultSize
//           allowReset={false}
//           options={timezoneListOptions}
//           onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, key: 'timezone', value: newValue })}
//           value={settings.timezone} />
//       </FlexItem>
//     </Flex>
//   );
// }

// export default DateTimeSettings;