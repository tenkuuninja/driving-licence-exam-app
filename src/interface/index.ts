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

