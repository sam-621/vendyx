import { Button, Html, render } from '@react-email/components';
import * as React from 'react';

function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}

export const emailHtml = (url: string) => render(<Email url={url} />);
