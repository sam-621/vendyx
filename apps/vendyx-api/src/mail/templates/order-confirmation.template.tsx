import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  render
} from '@react-email/components';
import * as React from 'react';

const Component = () => {
  return (
    <Html>
      <Head />
      <Preview>Order #1003 confirmed</Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="w-[600px] max-w-full">
            <Section>
              <Heading className="text-black text-[24px] font-normal mb-2">Acme store</Heading>
              <Text className="text-[#666666] !my-0">ORDER #0001</Text>
              <Heading className="text-black text-[30px] font-normal">
                Rogelio Samuel, Thanks for your purchase!
              </Heading>
              <Text className="text-[#666666] text-[16px]">
                We're getting your order ready to be shipped. We will notify you when it has been
                sent.
              </Text>
              <Button className="bg-[#000000] rounded text-white text-[14px] font-semibold no-underline text-center px-5 py-3">
                View order
              </Button>
            </Section>
            {/* Order summary */}
            <Section>
              <Heading className="text-black text-[20px] font-normal mt-[80px]">
                Order summary
              </Heading>
              <Row>
                <Column>
                  <Img
                    alt="Product 1"
                    className="rounded-[8px] object-cover mr-2"
                    height={110}
                    src="https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731825285/vendyx/fz70bxkwbebh9obzen0p.webp"
                  />
                </Column>
                <Column className="w-full">
                  <Text className="text-[16px] text-black">Acme Circles T-Shirt (x 1)</Text>
                  <Text className="text-[#666666] text-[16px]">Black / M</Text>
                </Column>
                <Column className="w-full">
                  <Text className="text-[16px] text-right text-black">$100.00</Text>
                </Column>
              </Row>
              <Hr />
              <Row>
                <Column className="w-1/2"></Column>
                <Column>
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Subtotal</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">$ 400.00</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Shipment</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">$ 100.00</Text>
                    </Column>
                  </Row>
                  <Hr />
                  <Row>
                    <Column>
                      <Text className="text-[#666666] text-[16px] !my-1">Total</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[16px] !my-1 text-black">$ 500.00</Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
            {/* Customer information & Shipping to */}
            <Section>
              <Row>
                <Column className="w-1/2">
                  <Heading className="text-black text-[20px] font-normal mt-[80px]">
                    Customer information
                  </Heading>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    Rogelio Samuel Moreno Corrales
                  </Text>
                  <Text className="text-[#666666] text-[16px] !my-1">+52 6671 624 203</Text>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    samuel.corrales621@gmail.com
                  </Text>
                </Column>
                <Column className="w-1/2">
                  <Heading className="text-black text-[20px] font-normal mt-[80px]">
                    Shipping to
                  </Heading>
                  <Text className="text-[#666666] text-[16px] !my-1">
                    Romulo Díaz de la Vega #117
                  </Text>
                  <Text className="text-[#666666] text-[16px] !my-1">80290 Culiacán, Sinaloa</Text>
                  <Text className="text-[#666666] text-[16px] !my-1">Mexico</Text>
                </Column>
              </Row>
            </Section>

            {/* Footer */}
            <Section className="mt-[80px] bg-[#F7F7F7] p-4">
              <Row>
                <Column className="w-1/2">
                  <Img
                    alt="React Email logo"
                    height="42"
                    src="https://react.email/static/logo-without-background.png"
                  />
                  <Text className="text-[16px] !my-2 font-semibold text-black">Acme store</Text>
                </Column>
                <Column className="w-1/2">
                  <Row className="table-cell h-[44px] w-[56px] align-bottom">
                    <Column className="pr-[8px]">
                      <Link href="#">
                        <Img
                          alt="Facebook"
                          height="36"
                          src="https://react.email/static/facebook-logo.png"
                          width="36"
                        />
                      </Link>
                    </Column>
                    <Column className="pr-[8px]">
                      <Link href="#">
                        <Img
                          alt="X"
                          height="36"
                          src="https://react.email/static/x-logo.png"
                          width="36"
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="#">
                        <Img
                          alt="Instagram"
                          height="36"
                          src="https://react.email/static/instagram-logo.png"
                          width="36"
                        />
                      </Link>
                    </Column>
                  </Row>
                  <Row>
                    <Text className="!my-2 text-[16px]  leading-[24px] text-gray-500">
                      123 Main Street Anytown, CA 12345
                    </Text>
                    <Text className="!mb-[0px] !mt-1 text-[16px]  leading-[24px] text-gray-500">
                      mail@example.com +123456789
                    </Text>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Component;

export const orderConfirmationTemplate = render(<Component />);
