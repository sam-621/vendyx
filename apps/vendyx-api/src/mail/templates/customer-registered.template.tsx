import { Customer, Shop } from '@prisma/client';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  render
} from '@react-email/components';
import * as React from 'react';

const Component = ({ customer, shop }: CustomerRegisteredTemplateInput) => {
  const customerName = customer.firstName ?? customer.lastName;

  return (
    <Html>
      <Head />
      <Preview>Welcome {customerName}</Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="w-[600px] max-w-full">
            <Section>
              <Heading className="text-black text-[24px] font-normal mb-2">{shop.name}</Heading>
              <Heading className="text-black text-[30px] font-normal !mb-0">
                Welcome to {shop.name}!
              </Heading>
              <Text className="text-[#666666] text-[16px] !mt-2">
                Hi {customerName}, next time you shop with us log in for faster checkout.
              </Text>
              <Button className="bg-[#000000] rounded text-white text-[16px] no-underline text-center px-5 py-3">
                Visit our store
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export type CustomerRegisteredTemplateInput = {
  shop: Shop;
  customer: Customer;
};

Component.PreviewProps = {
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhondoe@gmail.com',
    id: '123',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  shop: {
    name: 'Acme'
  }
} as CustomerRegisteredTemplateInput;

export default Component;

export const createCustomerRegisteredMail = (input: CustomerRegisteredTemplateInput) =>
  render(<Component {...input} />);
