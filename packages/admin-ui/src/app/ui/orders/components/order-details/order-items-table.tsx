import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@vendyx/theme';

export const OrderItemsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <Table>
            <TableCaption>Desgloce de la orden.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Unit price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>SKU - 897</TableCell>
                <TableCell className="flex items-center gap-2 w-full">
                  <img
                    src={
                      'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1712648898/vendyx/ehpv7wutoacek1syufyw.jpg'
                    }
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  Test product
                </TableCell>
                <TableCell>$ 56.89 MXN</TableCell>
                <TableCell>14</TableCell>
                <TableCell>$ 678.90</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>SKU - 897</TableCell>
                <TableCell className="flex items-center gap-2 w-full">
                  <img
                    src={
                      'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1712648898/vendyx/ehpv7wutoacek1syufyw.jpg'
                    }
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  Test product
                </TableCell>
                <TableCell>$ 56.89 MXN</TableCell>
                <TableCell>14</TableCell>
                <TableCell>$ 678.90</TableCell>
              </TableRow>

              <TableRow className="border-transparent">
                <TableCell>Subtotal</TableCell>
                <TableCell>4 productos</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$ 678.90</TableCell>
              </TableRow>
              <TableRow className="border-transparent">
                <TableCell>Envío</TableCell>
                <TableCell>Express</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$ 50.00</TableCell>
              </TableRow>

              <TableRow className="border-transparent">
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="font-semibold">$ 678.90</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Table>
      </CardContent>
    </Card>
  );
};
