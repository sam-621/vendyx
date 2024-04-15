import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

export const OrderPaymentCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pago</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            Método: <span className="font-medium text-distinct">PayPal</span>
          </p>
          <p>
            ID de transacción: <span>fundnvvdmf</span>
          </p>
          <p>
            Monto: <span>$ 678.90</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
