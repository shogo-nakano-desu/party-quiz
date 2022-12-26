import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { Answer } from 'src/models/types';

@InputType()
export class UserAnswerInputParams {
  @Field(() => String, { nullable: false })
  readonly userId: string;
  @Field(() => String, { nullable: false })
  readonly answer: Answer;
  @Field(() => String, { nullable: false })
  readonly sessionId: string;
  @Field(() => GraphQLISODateTime, { nullable: false })
  readonly requestedAt: Date;
  constructor(init: UserAnswerInputParams) {
    Object.assign(this, init);
  }
}
