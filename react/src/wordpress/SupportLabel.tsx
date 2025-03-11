import { Button, Notice } from "@wordpress/components";

const SupportLabel = () => {
  return (
    <div style={{marginTop: '40px'}}>
    <Notice status="warning" politeness="polite" isDismissible={false}>
      <h4 style={{margin: '0'}}>Show some love ❤️</h4>
      <p>Your support is the <i>heartbeat</i> of this project. If you find it useful, please consider making a <i>small donation</i>. Your kindness <i>keeps</i> this project <i>alive</i> and kicking!</p>
      <Button href='https://buymeacoffee.com/ko.pa' variant='primary' target='_blank'>I want to support</Button>
    </Notice>
    </div>
  );
};

export default SupportLabel;