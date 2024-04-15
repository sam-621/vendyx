import { Card, CardContent, CardHeader, CardTitle, Label } from '@vendyx/theme';

export const OrderCustomerCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cliente</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 text-sm">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-distinct">Rogelio Samuel Moreno Corrales</p>
          <p>samuel.corrales621@gmail.com</p>
          <p>+52 667 1624 203</p>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-base">Dirección</Label>
          <p>Rogelio Samuel Moreno Corrales</p>
          <p>Presidente Romulo Diaz de la Vega #177</p>
          <p>Lazaro Cardenas</p>
          <p>80290 Culiacan Rosales, Sinaloa</p>
          <p>Mexico</p>
          <p>+52 667 1624 203</p>
        </div>
      </CardContent>
    </Card>
  );
};
