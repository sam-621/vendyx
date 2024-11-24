import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  render
} from '@react-email/components';
import * as React from 'react';

const Component = ({ domain, otp }: ConfirmEmailInput) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm account</Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="w-[600px] max-w-full">
            <Section>
              <Heading className="text-black text-[24px] font-normal mb-2">Vendyx</Heading>
              <Link href={`${domain}/shops?otp=${otp}`}>
                <Text className="text-[#0070FF] text-[16px] !mt-8 text-underline">
                  Click here to confirm your account.
                </Text>
              </Link>
              <Text className="text-[#666666] text-[16px] !mt-2">
                If you didn't request this email, there's nothing to worry about, you can safely
                ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export type ConfirmEmailInput = {
  domain: string;
  otp: string;
};

Component.PreviewProps = {
  domain: 'https://vendyx.up.railway.app'
} as ConfirmEmailInput;

export default Component;

export const createConfirmMail = (input: ConfirmEmailInput) => render(<Component {...input} />);
