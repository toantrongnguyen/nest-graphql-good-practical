import {
  ObjectType,
  Field,
  Int,
  InterfaceType,
  createUnionType,
} from '@nestjs/graphql';
import { QUESTION_TYPE, RANK_SCALE } from 'src/enums';

@InterfaceType()
abstract class AbstractQuestion {
  @Field(() => Int) id: number;
  @Field() problem: string;
  @Field() description: string;
  @Field(() => QUESTION_TYPE) type: QUESTION_TYPE;
}

@ObjectType()
class Option {
  @Field() label: string;
  @Field() value: string;
}

@ObjectType({
  implements: () => [AbstractQuestion],
})
export class MultipleChoiceQuestion implements AbstractQuestion {
  id: number;
  problem: string;
  description: string;
  type = QUESTION_TYPE.MULTIPLE_CHOICE;

  @Field(() => [Option]) options: Option[];
  @Field() answer: string;
}

@ObjectType({
  implements: () => [AbstractQuestion],
})
export class OpenEndedQuestion implements AbstractQuestion {
  id: number;
  problem: string;
  description: string;
  type = QUESTION_TYPE.OPEN_ENDED;

  @Field() answer: string;
}

@ObjectType({
  implements: () => [AbstractQuestion],
})
export class TrueFalseQuestion implements AbstractQuestion {
  id: number;
  problem: string;
  description: string;
  type = QUESTION_TYPE.TRUE_FALSE;

  @Field() answer: boolean;
}

@ObjectType({
  implements: () => [AbstractQuestion],
})
export class RankQuestion implements AbstractQuestion {
  id: number;
  problem: string;
  description: string;
  type = QUESTION_TYPE.RANK;

  @Field(() => RANK_SCALE) answer: RANK_SCALE;
}

export const Question = createUnionType({
  name: 'QuestionUnion',
  types: () =>
    [
      MultipleChoiceQuestion,
      OpenEndedQuestion,
      TrueFalseQuestion,
      RankQuestion,
    ] as const,
  resolveType: (value) => {
    switch (value.type) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return MultipleChoiceQuestion;
      case QUESTION_TYPE.OPEN_ENDED:
        return OpenEndedQuestion;
      case QUESTION_TYPE.TRUE_FALSE:
        return TrueFalseQuestion;
      case QUESTION_TYPE.RANK:
        return RankQuestion;
      default:
        return null;
    }
  },
});
