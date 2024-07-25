import { type FC } from 'react';

export const ExtraUiModulePage: FC<Props> = ({ id }) => {
  // We put the complete url to avoid the base url (we host external ui extensions in the base url)
  // - without window.location.origin: http://localhost:3000/admin/extra-ui-module
  // - with window.location.origin: http://localhost:3000/extra-ui-module
  return <iframe className="w-full h-full" src={`${window.location.origin}/${id}`}></iframe>;
};
type Props = {
  id: string;
};
