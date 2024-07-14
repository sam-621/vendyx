export type Args = Record<string, Arg>;

type Arg =
  | {
      type: 'text';
      label?: string;
      defaultValue?: string;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'number';
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'boolean';
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'select';
      label?: string;
      defaultValue?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: 'checkbox';
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'price';
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions: { min: number; max: number };
    };
