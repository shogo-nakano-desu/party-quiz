import { ObjectType, Field } from '@nestjs/graphql';
import { Answer } from '../../models/types';

@ObjectType()
export class QuestionDto {
  @Field(() => String)
  readonly sessionDetailId: string;
  @Field(() => String)
  readonly questionId: string;
  @Field(() => Number)
  readonly number: number;
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly option_1: string;
  @Field(() => String)
  readonly option_2: string;
  @Field(() => String)
  readonly option_3: string;
  @Field(() => String)
  readonly option_4: string;
  @Field(() => String)
  readonly answer: Answer;

  constructor(init: Required<QuestionDto>) {
    Object.assign(this, init);
  }
}
