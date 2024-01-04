import { QUESTION_TYPE } from 'src/enums';
import { Question } from './entities/question.entity';

class QuestionCollection {
  questions: (typeof Question)[];

  constructor() {
    this.questions = [
      {
        id: 1,
        problem: 'What is your favorite color?',
        description: 'Choose one of the following colors.',
        options: [
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'yellow', label: 'Yellow' },
        ],
        answer: 'Blue',
        type: QUESTION_TYPE.MULTIPLE_CHOICE,
      },
      {
        id: 2,
        problem: 'What is your favorite city of France?',
        description: 'Fill in the blank with the correct answer.',
        answer: 'Paris',
        type: QUESTION_TYPE.OPEN_ENDED,
      },
      {
        id: 3,
        problem: 'Rank this colors from your favorite to least favorite.',
        description: 'Choose one of the correct rank value',
        answer: 'MEDIUM',
        type: QUESTION_TYPE.RANK,
      },
      {
        id: 4,
        problem: 'Do you love cats?',
        description: 'Choose true or false.',
        answer: true,
        type: QUESTION_TYPE.TRUE_FALSE,
      },
    ];
  }

  getAllQuestions() {
    return this.questions;
  }

  getQuestionById(id) {
    return this.questions.find((question) => question.id === id);
  }

  addQuestion(newQuestion) {
    newQuestion.id = ++QuestionCollection.id;
    this.questions.push(newQuestion);
    return newQuestion;
  }

  updateQuestion(id, updatedQuestion) {
    const index = this.questions.findIndex((question) => question.id === id);

    if (index !== -1) {
      this.questions[index] = { ...this.questions[index], ...updatedQuestion };
      return this.questions[index];
    }

    throw new Error('Question not found');
  }

  deleteQuestion(id) {
    this.questions = this.questions.filter((question) => question.id !== id);
  }

  static id = 4;
}

export default new QuestionCollection();
