'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { DialogTrigger } from '@radix-ui/react-dialog';
import { PlusIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/api/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';
import { cn } from '@/lib/shared/utils';

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-distinct" variant="link" type="button">
          <PlusIcon size={16} />
          Add countries
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader className="px-6 pb-0">
          <DialogTitle>Add countries</DialogTitle>
          <DialogDescription>Add countries to your zone</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="px-6">
            <Input placeholder="Search country..." />
          </div>
          <div>
            <div
              className={cn('border-y h-[calc(80px*2)] lg:h-[calc(80px*5)]', 'overflow-y-scroll')}
            >
              {countries?.map(country => (
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
                              selectedStates.filter(
                                selectedState => !stateIds.includes(selectedState.id)
                              )
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
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 gap-2 ">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setValue('states', selectedStates);
              }}
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
