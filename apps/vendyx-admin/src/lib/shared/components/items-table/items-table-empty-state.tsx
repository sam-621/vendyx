import { TableCell, TableRow } from '../ui';

export const ItemsTableEmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};
