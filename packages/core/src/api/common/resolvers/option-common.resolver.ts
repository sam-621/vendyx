import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OptionEntity } from '@/persistance';
import { OptionService } from '@/business';

@Resolver('Option')
export class OptionCommonResolver {
  constructor(private readonly optionService: OptionService) {}

  @ResolveField('values')
  async values(@Parent() option: OptionEntity) {
    const values = await this.optionService.findValues(option.id);

    return values;
  }
}
