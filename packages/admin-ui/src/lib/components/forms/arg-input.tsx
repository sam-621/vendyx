import { type FC } from 'react';

import {
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch
} from '@ebloc/theme';

import { type PriceCalculator } from '@/app/config/contexts';
import { Arg } from '@/lib/ebloc/codegen/graphql';

import { FormInput } from './form-input';

export const ArgInput: FC<Props> = ({
  type,
  label,
  placeholder,
  conditions,
  options,
  id,
  name,
  onChange,
  value
}) => {
  if (type === Arg.Text) {
    return (
      <FormInput
        type="text"
        id={id}
        name={name}
        label={label ?? ''}
        placeholder={placeholder ?? ''}
        max={conditions?.max}
        min={conditions?.min}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }

  if (type === Arg.Number) {
    return (
      <FormInput
        type="number"
        id={id}
        name={name}
        label={label ?? ''}
        placeholder={placeholder ?? ''}
        max={conditions?.max}
        min={conditions?.min}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }

  if (type === Arg.Boolean) {
    return (
      <div className="flex items-center space-x-2 pb-[6px]">
        <Switch id={id} checked={value === 'true'} onCheckedChange={checked => onChange(checked)} />
        <Label htmlFor={id} className="cursor-pointer text-base">
          Active
        </Label>
      </div>
    );
  }

  if (type === Arg.Select) {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Select value={value} onValueChange={value => onChange(value)}>
          <SelectTrigger id={id}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options?.map(op => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (type === Arg.Checkbox) {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={value === 'true'}
          onCheckedChange={checked => onChange(checked)}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  }

  if (type === Arg.Price) {
    return (
      <FormInput
        type="text"
        label={label ?? ''}
        placeholder="$ 0.00"
        onFocus={e => e.target.select()}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
};

ArgInput.displayName = 'ArgInput';

type Props = PriceCalculator['args'][0] & {
  id: string;
  name: string;
  onChange: (value: any) => void;
  value: string;
};
