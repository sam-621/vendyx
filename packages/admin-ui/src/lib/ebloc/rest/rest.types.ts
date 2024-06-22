export type EblocAsset = {
  name: string;
  source: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  type: 'IMAGE';
};

export type AdminUiConfig = {
  brand: {
    name: string;
    description: string;
    logoUrl: string;
  };
  serveUrl: string;
};
