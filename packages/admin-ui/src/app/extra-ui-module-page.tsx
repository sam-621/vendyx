import { type FC } from 'react';

export const ExtraUiModulePage: FC<Props> = ({ id }) => {
  return <iframe className="w-full h-full" src={id}></iframe>;
};
type Props = {
  id: string;
};
