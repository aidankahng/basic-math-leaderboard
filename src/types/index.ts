export type UserDictType = {
    id: number,
    username: string,
    quizzes: QuizDictType[]
}

export type QuizDictType = {
    id: number, 
    category: number,
    user: string
}

export type SignUpFormDataType = {
    username: string,
    password: string,
    confirmPassword: string
}

export type BasicProblemType = {
    prompt: string,
    answer: string,
    response?: string
}

export type LoginFormDataType = {
    username: string,
    password: string
}

export type QuizProblemsType = {
    userId: number,
    category: number,
    questions: BasicProblemType[]
}

export type AllScoresType = {
    [username:string] : {
        correct: number,
        attempted: number
    }
}

export type ScoreType = {
    username: string,
    correct: number,
    attempted: number
}

export type HighScoresType = {
    'user': string,
    'totalCorrect' : number,
    'totalQuestions' : number,
    'totalAttempted' : number,
    'numQuizzes' : number,
    'points' : number
}