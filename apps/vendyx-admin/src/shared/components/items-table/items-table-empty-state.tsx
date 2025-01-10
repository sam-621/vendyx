import { TableCell, TableRow } from '../ui/table';

export const ItemsTableEmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};
