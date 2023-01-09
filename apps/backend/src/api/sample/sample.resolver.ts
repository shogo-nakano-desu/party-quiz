import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class SampleResolver {
  @Query(() => Boolean)
  async getSample(): Promise<boolean> {
    return true;
  }
}
