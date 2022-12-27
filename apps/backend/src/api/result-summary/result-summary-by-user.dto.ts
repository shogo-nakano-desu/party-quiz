import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultSummaryByUserDto {
  @Field(() => Number)
  readonly rank: number;
  @Field(() => String)
  readonly userId: string;
  @Field(() => String)
  readonly userName: string;
  @Field(() => Number, { description: 'Calculated total time in milliseconds' })
  readonly totalTime: number;
  @Field(() => Number)
  readonly numberOfCollectAnswers: number;
  @Field(() => Number)
  readonly numberOfQuestions: number;

  constructor(init: Required<ResultSummaryByUserDto>) {
    Object.assign(this, init);
  }
}
