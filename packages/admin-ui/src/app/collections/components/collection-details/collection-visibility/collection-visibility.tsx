import { Card, CardContent, Label, Switch } from '@ebloc/theme';

export const CollectionVisibility = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Visibility</Label>
        <div className="flex items-center space-x-2">
          <Switch id="collection-status" />
          <Label htmlFor="collection-status" className="cursor-pointer">
            Online store
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
