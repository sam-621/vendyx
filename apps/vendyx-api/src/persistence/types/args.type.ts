export type Args<K extends string = string> = Record<K, Arg>;

export type Arg =
  | {
      type: 'text';
      required: boolean;
      label?: string;
      defaultValue?: string;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'number';
      required: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions?: { min: number; max: number };
    }
  | {
      type: 'boolean';
      required: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'select';
      required: boolean;
      label?: string;
      defaultValue?: string;
      options: { label: string; value: string }[];
    }
  | {
      type: 'checkbox';
      required: boolean;
      label?: string;
      defaultValue?: boolean;
    }
  | {
      type: 'price';
      required: boolean;
      label?: string;
      defaultValue?: number;
      placeholder?: string;
      conditions: { min: number; max: number };
    };
