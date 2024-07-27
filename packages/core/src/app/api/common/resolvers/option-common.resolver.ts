import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OptionEntity } from '@/app/persistance';
import { OptionService } from '@/app/business';

@Resolver('Option')
export class OptionCommonResolver {
  constructor(private readonly optionService: OptionService) {}

  @ResolveField('values')
  async values(@Parent() option: OptionEntity) {
    const values = await this.optionService.findValues(option.id);

    return values;
  }
}
