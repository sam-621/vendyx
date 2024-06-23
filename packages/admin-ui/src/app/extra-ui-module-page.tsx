import { type FC } from 'react';

export const ExtraUiModulePage: FC<Props> = ({ id }) => {
  return <iframe src={id}></iframe>;
};
type Props = {
  id: string;
};
