'use client';

import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonCountryFragment } from '@/api/types';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useEntityContext } from '@/shared/contexts/entity-context';

import { type ShipmentContext } from '../../contexts/shipment-context';
import { isStateInCountry } from '../../utils/shipment.utils';
import { type ZoneDetailsFormInput } from '../zone-details/use-zone-details-form';

export const ZoneCountriesSelector = () => {
  const [search, setSearch] = useState('');
  const { setValue, watch } = useFormContext<ZoneDetailsFormInput>();
  const {
    entity: { countries }
  } = useEntityContext<ShipmentContext>();
  const states = watch('states');

  const [selectedStates, setSelectedStates] = useState<CommonCountryFragment['states']>(states);

  const filteredCountries = useMemo(
    () => countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  return (
    <EntitySelector
      title="Add countries"
      description="Add countries to your zone"
      triggerText="Add countries"
      items={filteredCountries}
      isFetching={false}
      onDone={() => setValue('states', selectedStates)}
      onSearch={query => setSearch(query)}
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
