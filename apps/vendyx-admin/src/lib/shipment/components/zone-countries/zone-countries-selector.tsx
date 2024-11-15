'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonCountryFragment } from '@/api/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  EntitySelector
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';

import { type ShipmentContext } from '../../contexts';
import { isStateInCountry } from '../../utils';
import { type ZoneDetailsFormInput } from '../zone-details/use-zone-details-form';

export const ZoneCountriesSelector = () => {
  const { setValue, watch } = useFormContext<ZoneDetailsFormInput>();
  const {
    entity: { countries }
  } = useEntityContext<ShipmentContext>();
  const states = watch('states');

  const [selectedStates, setSelectedStates] = useState<CommonCountryFragment['states']>(states);

  return (
    <EntitySelector
      title="Add countries"
      description="Add countries to your zone"
      triggerText="Add countries"
      items={countries}
      isLoading={false}
      onDone={() => setValue('states', selectedStates)}
      onSearch={query => console.log(query)}
      renderItem={country => (
        <Accordion key={country.id} type="single" collapsible>
          <AccordionItem value={`entity-${country.id}`}>
            <div className="flex items-center border-b pl-6 w-full sticky top-0 bg-background">
              <Checkbox
                checked={selectedStates.some(s => isStateInCountry(s, country))}
                onCheckedChange={checked => {
                  if (checked) {
                    setSelectedStates([...selectedStates, ...country.states]);
                  } else {
                    const stateIds = country.states.map(s => s.id);

                    setSelectedStates(
                      selectedStates.filter(selectedState => !stateIds.includes(selectedState.id))
                    );
                  }
                }}
              />
              <AccordionTrigger className="py-0 pr-6" containerClassName="w-full">
                <div className="flex items-center gap-4 px-6 py-4 cursor-pointer">
                  <p>{country.name}</p>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="divide-y py-0">
              {country.states.map(state => (
                <label
                  key={state.id}
                  htmlFor={`state-${state.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
                >
                  <Checkbox
                    id={`state-${state.id}`}
                    className="ml-8"
                    checked={selectedStates.map(s => s.id).includes(state.id)}
                    onCheckedChange={checked => {
                      if (checked) {
                        setSelectedStates([...selectedStates, state]);
                      } else {
                        setSelectedStates(selectedStates.filter(s => s.id !== state.id));
                      }
                    }}
                  />
                  <p>{state.name}</p>
                </label>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    />
  );
};
