import signsData from './data_signs.json';
import questionsData from './data_question.json';
import { IQuestion, ISign } from '../interface';

export const getSignsByTypeId = (id: number): ISign[] => {
  return signsData.filter((item: ISign) => item.typeId === id)
}

export const getAllQuestions = (): IQuestion[] => questionsData

export const getQuestionsByTopicId = (id: number): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.topicId === id)
}

export const getQuestionsByCode = (id: number): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.setNumber === id).map(i => ({...i, yourAnswer: undefined}))
}

export const getOneHitQuestions = (): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.isCritical === true)
}

export const getQuestionsByIds = (ids: number[]): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => ids.includes(item.id))
}

