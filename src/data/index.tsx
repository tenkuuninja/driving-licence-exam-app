import signalData from './data_signal.json';
import signalTopicData from './data_signal_topic.json';
import lawTopicData from './data_law_topic.json';
import lawData from './data_law.json';
import questionsData from './data_question.json';
import { ILaw, IQuestion, ISign, ITopic } from '../interface';

export const getSignalTopic = (): ITopic[] => {
  return signalTopicData;
}

export const getSignalsByTypeCode = (id: number): ISign[] => {
  return signalData.filter((item: ISign) => item.topicId === id)
}

export const getLawTopic = (): ITopic[] => {
  return lawTopicData;
}

export const getLawByVehicleCodeAndTopicId = (vehicleCode: number, topicId: number): ILaw[] => {
  return lawData.filter((item: ILaw) => item.vehicleCode === vehicleCode && item.topicId === topicId)
}

export const getAllQuestions = (): IQuestion[] => questionsData

export const getQuestionsByTopicId = (id: number): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.chuDeId === id)
}

export const getQuestionsByTestCode = (id: number): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.maDeThi === id).map(i => ({...i, userAnswer: undefined}))
}

export const getImportantQuestions = (): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => item.laCauDiemLiet === true)
}

export const getQuestionsByIds = (ids: number[]): IQuestion[] => {
  return questionsData.filter((item: IQuestion) => ids.includes(item.id))
}

