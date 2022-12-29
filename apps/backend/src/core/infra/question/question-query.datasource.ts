import { Injectable, Inject } from '@nestjs/common';
import { DATASOURCE_CLIENT } from '../../../core/constants';
import { QuestionQueryService } from '../../../core/usecase/question/query/question-query-service';
import { DatasourceClient } from '../datasource.client';
import { QuestionDto } from '../../../api/question/question.dto';

@Injectable()
export class QuestionQueryDatasource implements QuestionQueryService {
  constructor(@Inject(DATASOURCE_CLIENT) private client: DatasourceClient) {}
  async listQuestions(sessionId: string): Promise<QuestionDto[]> {
    return (
      await this.client.session_detail.findMany({
        where: { session_id: sessionId },
        include: { question: true },
        orderBy: { number: 'asc' },
      })
    ).map((detail) => {
      return new QuestionDto({
        sessionDetailId: detail.id,
        questionId: detail.question.id,
        number: detail.number,
        name: detail.question.name,
        option_1: detail.question.option_1,
        option_2: detail.question.option_2,
        option_3: detail.question.option_3,
        option_4: detail.question.option_4,
        answer: detail.question.answer,
      });
    });
  }
}
