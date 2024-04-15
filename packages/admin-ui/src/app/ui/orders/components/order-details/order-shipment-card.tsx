import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

export const OrderShipmentCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Envío</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Método: <span className="font-medium text-distinct">Express</span>
          </p>
          <p>
            Monto: <span>$ 678.90</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
