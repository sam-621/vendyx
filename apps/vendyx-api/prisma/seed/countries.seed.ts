import { PrismaClient } from '@prisma/client';

export const generateCountries = async (prisma: PrismaClient) => {
  const mx = await prisma.country.upsert({
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
  });

  const us = await prisma.country.upsert({
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
  });

  return [mx, us];
};
