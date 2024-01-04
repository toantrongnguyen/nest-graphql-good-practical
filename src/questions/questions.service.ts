import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import questionsRepository from './questions.mock';
import { validateOrReject } from 'class-validator';

@Injectable()
export class QuestionsService {
  async create(createQuestionInput: CreateQuestionInput) {
    const questionInput = new CreateQuestionInput(createQuestionInput);

    try {
      await validateOrReject(questionInput);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    const question = questionsRepository.addQuestion(
      questionInput.toSerializableObject(),
    );

    return question;
  }

  findAll() {
    return questionsRepository.getAllQuestions();
  }

  findOne(id: number) {
    const question = questionsRepository.getQuestionById(id);

    return question;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const questionInput = new UpdateQuestionInput(updateQuestionInput);

    try {
      await validateOrReject(questionInput);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    const question = questionsRepository.updateQuestion(
      id,
      questionInput.toSerializableObject(),
    );

    return question;
  }

  remove(id: number) {
    const question = questionsRepository.deleteQuestion(id);

    return question;
  }
}
