export interface IQuestion {
  id: number
  topicId: number
  setNumber: number
  order: number
  text: string
  image: string
  explain: string
  isCritical: boolean
  answer: IAnswer[]
  yourAnswer?: number
}

export interface IAnswer {
  text: string
  isCorrect: boolean
}

export interface ISign {
  id: number
  typeId: number
  title: string
  description: string
  image: string
}

export interface IResult {
  isPass: boolean
  score: number
  text: string
}

