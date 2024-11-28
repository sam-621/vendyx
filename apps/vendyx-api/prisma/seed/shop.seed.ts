import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { generateSku } from './generators';

export const generateShop = async (prisma: PrismaClient) => {
  console.log();

  const user = await prisma.user.upsert({
    where: { email: 'samuel.corrales621@gmail.com' },
    create: {
      email: 'samuel.corrales621@gmail.com',
      password: await bcrypt.hash('123456', 10),
      emailVerified: true
    },
    update: {}
  });

  const shop = await prisma.shop.upsert({
    where: { slug: 'next-store' },
    create: {
      ownerId: user.id,
      name: 'Next store',
      slug: 'next-store',
      phoneNumber: '+526672624203',
      email: 'next-store@gmail.com',
      shopApiKey: 'next-api-key'
    },
    update: {}
  });

  console.log('Generating products... 🚀');

  const [
    tee8PackSize,
    basicSize,
    whiteBasicSize,
    stoneBasicSize,
    tee3Pack,
    lineWork3packSize,
    nomadColor,
    zipToteColor,
    basic6packColor,
    basic6packSize
  ] = await generateOptions(prisma, shop.id, user.id);

  await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.current_shop_id', ${shop.id}, TRUE)`,
    prisma.$executeRaw`SELECT set_config('app.current_owner_id', ${user.id}, TRUE)`,
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Basic Tee 8-Pack',
          description:
            'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732566502/vendyx/vxcwc2fb5b4hirrkskbi.jpg'
          ],
          options: [tee8PackSize.id],
          variants: [
            {
              salePrice: 25600,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee8PackSize.values[0].id
            },
            {
              salePrice: 25600,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee8PackSize.values[1].id
            },
            {
              salePrice: 25600,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee8PackSize.values[2].id
            },
            {
              salePrice: 25600,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee8PackSize.values[3].id
            },
            {
              salePrice: 25600,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee8PackSize.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Basic Tee',
          description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731837767/vendyx/w1mrsclzzxzwlwrbzua6.jpg'
          ],
          options: [basicSize.id],
          variants: [
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: basicSize.values[0].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: basicSize.values[1].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: basicSize.values[2].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: basicSize.values[3].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: basicSize.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Basic Tee 6-Pack',
          description:
            'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/hsqpjls1grt9m1sqtqu0.jpg',
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781143/vendyx/w8kcam6tumec64cm7xfw.jpg',
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/akat6ganhiw57yhxfzlq.jpg',
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/grswbzwz5nvsbhtqrlc9.jpg'
          ],
          options: [basic6packColor.id, basic6packSize.id],
          variants: [
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[0].id, basic6packSize.values[0].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/grswbzwz5nvsbhtqrlc9.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[0].id, basic6packSize.values[1].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/grswbzwz5nvsbhtqrlc9.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[0].id, basic6packSize.values[2].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/grswbzwz5nvsbhtqrlc9.jpg'
            },
            //
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[1].id, basic6packSize.values[0].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/akat6ganhiw57yhxfzlq.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[1].id, basic6packSize.values[1].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/akat6ganhiw57yhxfzlq.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[1].id, basic6packSize.values[2].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781142/vendyx/akat6ganhiw57yhxfzlq.jpg'
            },
            //
            //
            //
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[2].id, basic6packSize.values[0].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781143/vendyx/w8kcam6tumec64cm7xfw.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[2].id, basic6packSize.values[1].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781143/vendyx/w8kcam6tumec64cm7xfw.jpg'
            },
            {
              salePrice: 19200,
              comparisonPrice: 23200,
              costPerUnit: 18800,
              requiresShipping: true,
              stock: 100,
              optionValueId: [basic6packColor.values[2].id, basic6packSize.values[2].id],
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732781143/vendyx/w8kcam6tumec64cm7xfw.jpg'
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Kinda White Basic Tee',
          description: `It's probably, like, 5000 Kelvin instead of 6000 K.`,
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731837781/vendyx/zzqhcarcxzlkyizyscmp.jpg'
          ],
          options: [whiteBasicSize.id],
          variants: [
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: whiteBasicSize.values[0].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: whiteBasicSize.values[1].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: whiteBasicSize.values[2].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: whiteBasicSize.values[3].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: whiteBasicSize.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Stone Basic Tee',
          description: `White tees stain easily, and black tees fade. This is going to be gray for a while.`,
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731837774/vendyx/znswssdi9ot4kpxbe4us.jpg'
          ],
          options: [stoneBasicSize.id],
          variants: [
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: stoneBasicSize.values[0].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: stoneBasicSize.values[1].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: stoneBasicSize.values[2].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: stoneBasicSize.values[3].id
            },
            {
              salePrice: 32000,
              comparisonPrice: 35000,
              costPerUnit: 30000,
              requiresShipping: true,
              stock: 100,
              optionValueId: stoneBasicSize.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Fall Basic Tee 3-Pack',
          description: `Who need stark minimalism when you could have earth tones? Embrace the season.`,
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732568776/vendyx/x16xqmfqrtbzuz7o8lsq.jpg'
          ],
          options: [tee3Pack.id],
          variants: [
            {
              salePrice: 96000,
              comparisonPrice: 10000,
              costPerUnit: 91000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee3Pack.values[0].id
            },
            {
              salePrice: 96000,
              comparisonPrice: 10000,
              costPerUnit: 91000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee3Pack.values[1].id
            },
            {
              salePrice: 96000,
              comparisonPrice: 10000,
              costPerUnit: 91000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee3Pack.values[2].id
            },
            {
              salePrice: 96000,
              comparisonPrice: 10000,
              costPerUnit: 91000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee3Pack.values[3].id
            },
            {
              salePrice: 96000,
              comparisonPrice: 10000,
              costPerUnit: 91000,
              requiresShipping: true,
              stock: 100,
              optionValueId: tee3Pack.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Linework Artwork Tee 3-Pack',
          description: `Get all 3 colors of our popular Linework design and some variety to your monotonous life.`,
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731839922/vendyx/lfmrxrpa3gxgcvoqvlhb.jpg'
          ],
          options: [lineWork3packSize.id],
          variants: [
            {
              salePrice: 10800,
              costPerUnit: 10100,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[0].id
            },
            {
              salePrice: 10800,
              costPerUnit: 10100,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[1].id
            },
            {
              salePrice: 10800,
              costPerUnit: 10100,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[2].id
            },
            {
              salePrice: 10800,
              costPerUnit: 10100,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[3].id
            },
            {
              salePrice: 10800,
              costPerUnit: 10100,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[4].id
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Nomad Pouch',
          description: `White and Black`,
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838062/vendyx/g8bhlixgvb7bemgac95i.jpg',
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732588296/vendyx/rxoidro8cc3wwcum7col.png'
          ],
          options: [nomadColor.id],
          variants: [
            {
              salePrice: 5000,
              costPerUnit: 4500,
              requiresShipping: true,
              stock: 100,
              optionValueId: nomadColor.values[0].id,
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838062/vendyx/g8bhlixgvb7bemgac95i.jpg'
            },
            {
              salePrice: 9000,
              costPerUnit: 8500,
              requiresShipping: true,
              stock: 100,
              optionValueId: lineWork3packSize.values[1].id,
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732588296/vendyx/rxoidro8cc3wwcum7col.png'
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Zip Tote Basket',
          description: 'Zip tote bag standard',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838251/vendyx/sg4c2s0qtlkyjislulv3.jpg',
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838262/vendyx/cpoq8pc05hymbjwpdiag.jpg'
          ],
          options: [zipToteColor.id],
          variants: [
            {
              salePrice: 14000,
              comparisonPrice: 18000,
              costPerUnit: 13000,
              requiresShipping: true,
              stock: 100,
              optionValueId: zipToteColor.values[0].id,
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838251/vendyx/sg4c2s0qtlkyjislulv3.jpg'
            },
            {
              salePrice: 14000,
              comparisonPrice: 18000,
              costPerUnit: 13000,
              requiresShipping: true,
              stock: 100,
              optionValueId: zipToteColor.values[1].id,
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838262/vendyx/cpoq8pc05hymbjwpdiag.jpg'
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Zip Tote Basket',
          description: 'Zip tote bag standard',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838251/vendyx/sg4c2s0qtlkyjislulv3.jpg'
          ],
          options: [zipToteColor.id],
          variants: [
            {
              salePrice: 14000,
              comparisonPrice: 18000,
              costPerUnit: 13000,
              requiresShipping: true,
              stock: 100,
              optionValueId: zipToteColor.values[0].id,
              asset:
                'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838251/vendyx/sg4c2s0qtlkyjislulv3.jpg'
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Medium Stuff Satchel',
          description: 'Blue',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731837966/vendyx/lcckpvd6ndvhsknamtbl.jpg'
          ],
          options: [],
          variants: [
            {
              salePrice: 22000,
              comparisonPrice: 30000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'High Wall Tote',
          description: 'Black and Orange',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838011/vendyx/urbnfpzka9uxu8pzmmfd.jpg'
          ],
          options: [],
          variants: [
            {
              salePrice: 21000,
              costPerUnit: 20000,
              requiresShipping: true,
              stock: 100
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Zip High Wall Tote',
          description: 'White and blue',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1731838135/vendyx/oiky4jn2xomashaw2cdg.jpg'
          ],
          options: [],
          variants: [
            {
              salePrice: 15000,
              costPerUnit: 13000,
              requiresShipping: true,
              stock: 100
            }
          ]
        },
        shop.id
      )
    ),
    prisma.product.upsert(
      generateProduct(
        {
          name: 'Halfsize Tote',
          description: 'Clay',
          assets: [
            'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1732780975/vendyx/xanurflrdllzgeosx259.png'
          ],
          options: [],
          variants: [
            {
              salePrice: 21000,
              comparisonPrice: 30000,
              costPerUnit: 19000,
              requiresShipping: true,
              stock: 100
            }
          ]
        },
        shop.id
      )
    )
  ]);

  console.log('Products generated! 🚀');
  console.log();
  console.log(`Email: ${user.email}`);
  console.log(`Password: 123456`);
  console.log(`Shop: ${shop.name}`);
  console.log(`Shop API key: ${shop.shopApiKey}`);
  console.log();
};

const generateOptions = async (prisma: PrismaClient, id: string, ownerId: string) => {
  const [, , ...rest] = await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.current_shop_id', ${id}, TRUE)`,
    prisma.$executeRaw`SELECT set_config('app.current_owner_id', ${ownerId}, TRUE)`,
    generateOption(prisma, id)(),
    generateOption(prisma, id)(),
    generateOption(prisma, id)(),
    generateOption(prisma, id)(),
    generateOption(prisma, id)(),
    generateOption(prisma, id)(),
    generateOption(prisma, id)({ name: 'Color', values: ['White and Black', 'Salmon'] }),
    generateOption(prisma, id)({ name: 'Color', values: ['Washed Black', 'White and black'] }),
    generateOption(prisma, id)({ name: 'Color', values: ['White', 'Gray', 'Black'] }),
    generateOption(prisma, id)({ name: 'Size', values: ['S', 'M', 'L'] })
  ]);

  return rest;
};

const generateOption =
  (prisma: PrismaClient, shopId: string) =>
  (
    input: { name: string; values: string[] } = {
      name: 'Size',
      values: ['XS', 'S', 'M', 'L', 'XL']
    }
  ) => {
    return prisma.option.create({
      include: { values: true },
      data: {
        shopId,
        name: input.name,
        order: 1,
        values: {
          createMany: {
            data: input.values.map((v, i) => ({ name: v, order: i }))
          }
        }
      }
    });
  };

const generateProduct = (input: ProductInput, shopId: string) => {
  const slug = input.name.toLowerCase().replace(' ', '-');

  return {
    where: { slug },
    update: {},
    create: {
      shopId,
      slug,
      name: input.name,
      description: input.description,
      assets: {
        create: input.assets.map((a, i) => ({
          asset: {
            create: {
              name: slug + '-image-' + i,
              source: a
            }
          },
          order: i
        }))
      },
      options: {
        createMany: {
          data: input.options.map(o => ({ optionId: o }))
        }
      },
      variants: {
        create: input.variants.map(v => {
          const sku = generateSku();
          return {
            salePrice: v.salePrice,
            comparisonPrice: v.comparisonPrice,
            costPerUnit: v.costPerUnit,
            requiresShipping: v.requiresShipping,
            sku,
            stock: v.stock,
            variantOptionValues: v.optionValueId
              ? {
                  create: Array.isArray(v.optionValueId)
                    ? v.optionValueId.map(v => ({ optionValueId: v }))
                    : { optionValueId: v.optionValueId }
                }
              : undefined,
            asset: v.asset && {
              create: {
                name: sku + '-image',
                source: v.asset
              }
            }
          };
        })
      }
    }
  };
};

type ProductInput = {
  name: string;
  description: string;
  assets: string[];
  options: string[];
  variants: {
    salePrice: number;
    comparisonPrice?: number;
    costPerUnit: number;
    requiresShipping: true;
    stock: number;
    optionValueId?: string | string[];
    asset?: string;
  }[];
};
