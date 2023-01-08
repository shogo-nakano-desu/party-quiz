import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultSummaryByGuestDto {
  @Field(() => Number, {
    description: 'Calculated from totalTime and numberOfCollectAnswers',
  })
  readonly rank: number;
  @Field(() => String)
  readonly guestId: string;
  @Field(() => String)
  readonly guestName: string;
  @Field(() => Number, { description: 'Calculated total time in milliseconds' })
  readonly totalTime: number;
  @Field(() => Number)
  readonly numberOfCollectAnswers: number;
  @Field(() => Number)
  readonly numberOfQuestions: number;

  constructor(init: Required<ResultSummaryByGuestDto>) {
    Object.assign(this, init);
  }
}
