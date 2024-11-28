import { PrismaClient } from '@prisma/client';

export const generateCountries = async (prisma: PrismaClient) => {
  return await prisma.$transaction([
    prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
    prisma.country.upsert({
      where: { name: 'Mexico' },
      update: {},
      create: {
        name: 'Mexico',
        states: {
          create: [
            { name: 'Aguascalientes' },
            { name: 'Baja California' },
            { name: 'Baja California Sur' },
            { name: 'Campeche' },
            { name: 'Chiapas' },
            { name: 'Chihuahua' },
            { name: 'Coahuila' },
            { name: 'Colima' },
            { name: 'Durango' },
            { name: 'Guanajuato' },
            { name: 'Guerrero' },
            { name: 'Hidalgo' },
            { name: 'Jalisco' },
            { name: 'CDMX' },
            { name: 'Michoacan' },
            { name: 'Morelos' },
            { name: 'Nayarit' },
            { name: 'Nuevo Leon' },
            { name: 'Oaxaca' },
            { name: 'Puebla' },
            { name: 'Queretaro' },
            { name: 'Quintana Roo' },
            { name: 'San Luis Potosi' },
            { name: 'Sinaloa' },
            { name: 'Sonora' },
            { name: 'Tabasco' },
            { name: 'Tamaulipas' },
            { name: 'Tlaxcala' },
            { name: 'Veracruz' },
            { name: 'Yucatan' },
            { name: 'Zacatecas' }
          ]
        }
      }
    }),
    prisma.country.upsert({
      where: { name: 'United States' },
      update: {},
      create: {
        name: 'United States',
        states: {
          create: [
            { name: 'Alabama' },
            { name: 'Alaska' },
            { name: 'Arizona' },
            { name: 'Arkansas' },
            { name: 'California' },
            { name: 'Colorado' },
            { name: 'Connecticut' },
            { name: 'Delaware' },
            { name: 'Florida' },
            { name: 'Georgia' },
            { name: 'Hawaii' },
            { name: 'Idaho' },
            { name: 'Illinois' },
            { name: 'Indiana' },
            { name: 'Iowa' },
            { name: 'Kansas' },
            { name: 'Kentucky' },
            { name: 'Louisiana' },
            { name: 'Maine' },
            { name: 'Maryland' },
            { name: 'Massachusetts' },
            { name: 'Michigan' },
            { name: 'Minnesota' },
            { name: 'Mississippi' },
            { name: 'Missouri' },
            { name: 'Montana' },
            { name: 'Nebraska' },
            { name: 'Nevada' },
            { name: 'New Hampshire' },
            { name: 'New Jersey' },
            { name: 'New Mexico' },
            { name: 'New York' },
            { name: 'North Carolina' },
            { name: 'North Dakota' },
            { name: 'Ohio' },
            { name: 'Oklahoma' },
            { name: 'Oregon' },
            { name: 'Pennsylvania' },
            { name: 'Rhode Island' },
            { name: 'South Carolina' },
            { name: 'South Dakota' },
            { name: 'Tennessee' },
            { name: 'Texas' },
            { name: 'Utah' },
            { name: 'Vermont' },
            { name: 'Virginia' },
            { name: 'Washington' },
            { name: 'West Virginia' },
            { name: 'Wisconsin' },
            { name: 'Wyoming' }
          ]
        }
      }
    })
  ]);
};
