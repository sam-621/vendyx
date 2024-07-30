export type EblocAsset = {
  id: string;
  name: string;
  source: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  type: 'IMAGE';
};

export type AdminUiConfig = {
  branding: {
    name: string;
    description: string;
  };
  extraUiModules: {
    slug: string;
    label: string;
    icon: string;
    id: string;
  }[];
};
