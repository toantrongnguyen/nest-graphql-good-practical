import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { QUESTION_TYPE, RANK_SCALE } from 'src/enums';
import { Question } from '../entities/question.entity';

@InputType()
class MultipleChoiceQuestionOptionInput {
  @Field() @IsString() label: string;
  @Field() @IsString() value: string;
}

@InputType()
export class CreateQuestionInput {
  @Field() problem: string;
  @Field() description: string;
  @Field(() => QUESTION_TYPE) type: QUESTION_TYPE;

  @ValidateIf((value) => value.type === QUESTION_TYPE.MULTIPLE_CHOICE)
  @Field(() => [MultipleChoiceQuestionOptionInput], { nullable: true })
  @ValidateNested()
  options?: MultipleChoiceQuestionOptionInput[];

  @ValidateIf((value) => value.type === QUESTION_TYPE.MULTIPLE_CHOICE)
  @Field({ nullable: true })
  @IsString()
  multipleChoiceQuestionAnswer?: string;

  @ValidateIf((value) => value.type === QUESTION_TYPE.OPEN_ENDED)
  @Field({ nullable: true })
  @IsString()
  openEndedQuestionAnswer?: string;

  @ValidateIf((value) => value.type === QUESTION_TYPE.RANK)
  @Field({ nullable: true })
  @IsEnum(RANK_SCALE)
  rankQuestionAnswer?: RANK_SCALE;

  @ValidateIf((value) => value.type === QUESTION_TYPE.TRUE_FALSE)
  @Field({ nullable: true })
  @IsBoolean()
  trueFalseQuestionAnswer?: boolean;

  toSerializableObject(): Omit<typeof Question, 'id'> {
    const base = {
      problem: this.problem,
      description: this.description,
      type: this.type,
    };

    switch (true) {
      case CreateQuestionInput.isMultipleChoiceQuestionInput(this):
        return {
          ...base,
          options: this.options,
          answer: this.multipleChoiceQuestionAnswer,
        } as any;
      case CreateQuestionInput.isOpenEndedQuestionInput(this):
        return {
          ...base,
          answer: this.openEndedQuestionAnswer,
        };
      case CreateQuestionInput.isRankQuestionInput(this):
        return {
          ...base,
          answer: this.rankQuestionAnswer,
        };
      case CreateQuestionInput.isTrueFalseQuestionInput(this):
        return {
          ...base,
          answer: this.trueFalseQuestionAnswer,
        };
    }
  }

  static isMultipleChoiceQuestionInput(
    data: CreateQuestionInput,
  ): data is CreateQuestionInput & {
    type: QUESTION_TYPE.MULTIPLE_CHOICE;
    options: MultipleChoiceQuestionOptionInput[];
    multipleChoiceQuestionAnswer: string;
  } {
    return data.type === QUESTION_TYPE.MULTIPLE_CHOICE;
  }

  static isOpenEndedQuestionInput(
    data: CreateQuestionInput,
  ): data is CreateQuestionInput & {
    type: QUESTION_TYPE.OPEN_ENDED;
    openEndedQuestionAnswer: string;
  } {
    return data.type === QUESTION_TYPE.OPEN_ENDED;
  }

  static isRankQuestionInput(
    data: CreateQuestionInput,
  ): data is CreateQuestionInput & {
    type: QUESTION_TYPE.RANK;
    rankQuestionAnswer: RANK_SCALE;
  } {
    return data.type === QUESTION_TYPE.RANK;
  }

  static isTrueFalseQuestionInput(
    data: CreateQuestionInput,
  ): data is CreateQuestionInput & {
    type: QUESTION_TYPE.TRUE_FALSE;
    trueFalseQuestionAnswer: boolean;
  } {
    return data.type === QUESTION_TYPE.TRUE_FALSE;
  }

  constructor(data: CreateQuestionInput) {
    Object.assign(this, data);
  }
}
