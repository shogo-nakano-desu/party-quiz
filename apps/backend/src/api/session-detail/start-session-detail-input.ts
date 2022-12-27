import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class StartSessionDetailInputParams {
  @Field(() => String, { nullable: false })
  readonly sessionDetailId: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  readonly startedAt: Date;
  constructor(init: StartSessionDetailInputParams) {
    Object.assign(this, init);
  }
}
