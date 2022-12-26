import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/models/types';

@ObjectType()
export class UserAnswerDto {
  @Field(() => String)
  readonly user_id: string;

  @Field(() => String, {
    description:
      'Only web-common knows question_id. web-personal does not know it.',
  })
  readonly question_id: string;

  @Field(() => String)
  readonly answer: Answer;

  @Field(() => GraphQLISODateTime, {
    description: 'This field is created in clients.',
  })
  readonly requested_at: Date;

  constructor(init: Required<UserAnswerDto>) {
    Object.assign(this, init);
  }
}
