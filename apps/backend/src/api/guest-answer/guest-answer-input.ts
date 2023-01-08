import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { Answer } from 'src/models/types';

@InputType()
export class GuestAnswerInputParams {
  @Field(() => String, { nullable: false })
  readonly guestId: string;
  @Field(() => String, { nullable: false })
  readonly answer: Answer;
  @Field(() => String, { nullable: false })
  readonly sessionId: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  readonly requestedAt: Date;
  constructor(init: GuestAnswerInputParams) {
    Object.assign(this, init);
  }
}
