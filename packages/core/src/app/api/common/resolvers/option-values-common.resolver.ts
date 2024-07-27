import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OptionValueEntity } from '@/app/persistance';
import { OptionValueService } from '@/app/business';

@Resolver('OptionValue')
export class OptionValueCommonResolver {
  constructor(private readonly optionValueService: OptionValueService) {}

  @ResolveField('option')
  async options(@Parent() optionValue: OptionValueEntity) {
    const option = await this.optionValueService.findOption(optionValue.id);

    return option;
  }
}
