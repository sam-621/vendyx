import { DialogTrigger } from '@radix-ui/react-dialog';
import { PlusIcon } from 'lucide-react';

import { type CommonCountryFragment } from '@/api';
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
} from '@/components/shared';
import { useEntityContext } from '@/lib/contexts';
import { cn } from '@/lib/utils';

export const ZoneCountriesSelector = () => {
  const { entity: countries } = useEntityContext<CommonCountryFragment[]>();

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
            <Input
              // onChange={e => setSearchValue(e.target.value)}
              placeholder="Search country..."
            />
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
                      // defaultChecked={selectedIds.includes(country.id)}
                      // onCheckedChange={handleCheck(country.id)}
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
                            // defaultChecked={selectedIds.includes(country.id)}
                            // onCheckedChange={handleCheck(country.id)}
                          />
                          <p>{state.name}</p>
                        </label>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                // <label
                //   key={country.id}
                //   htmlFor={`entity-${country.id}`}
                //   className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
                // >
                //   <Checkbox
                //     id={`entity-${country.id}`}
                //     // defaultChecked={selectedIds.includes(country.id)}
                //     // onCheckedChange={handleCheck(country.id)}
                //   />
                //   <p>{country.name}</p>
                // </label>
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
          <Button
            onClick={async () => {
              // setIsLoading(true);
              // const { closeModal } = await onDone(selectedIds);
              // if (closeModal) {
              //   setIsOpen(false);
              // }
              // setIsLoading(false);
            }}
            // isLoading={isLoading}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
