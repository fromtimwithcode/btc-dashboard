import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Markets({ price = 0, marketCap = 0 }) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Markets</CardTitle>
          <CardDescription>Spot Bitcoin price & information.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Price</div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {price}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Market Cap</div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {marketCap}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
