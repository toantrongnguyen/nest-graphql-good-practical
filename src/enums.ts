import { registerEnumType } from '@nestjs/graphql';

export enum QUESTION_TYPE {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN_ENDED = 'OPEN_ENDED',
  TRUE_FALSE = 'TRUE_FALSE',
  RANK = 'RANK',
}

export enum RANK_SCALE {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

registerEnumType(RANK_SCALE, {
  name: 'RANK_SCALE',
});

registerEnumType(QUESTION_TYPE, {
  name: 'QUESTION_TYPE',
});
