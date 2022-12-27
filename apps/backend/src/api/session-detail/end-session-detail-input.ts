import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class EndSessionDetailInputParams {
  @Field(() => String, { nullable: false })
  readonly sessionDetailId: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  readonly endedAt: Date;
  constructor(init: EndSessionDetailInputParams) {
    Object.assign(this, init);
  }
}
