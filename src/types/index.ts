export type UserDictType = {
    id: number,
    username: string,
    points: number,
    quizzes: QuizDictType[]
}

export type QuizDictType = {
    id: number, 
    category: number,
    user: string,
    totalQuestions: number,
    totalAttempted: number,
    totalCorrect: number,
    score: number,
    userId: number,
    quizStyle?: string
}

export type SignUpFormDataType = {
    username: string,
    password: string,
    confirmPassword: string
}

export type UpdateUserDataType = {
    password: string,
    newPassword?: string,
    username?: string,
    message?: string,
    clan?: string
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
    user: string,
    totalCorrect : number,
    totalQuestions : number,
    totalAttempted : number,
    numQuizzes : number,
    points : number,
    message: string,
    clan: string
}

export type MyScoresType = HighScoresType & {
    lastQuiz: QuizDictType,
    message: string,
    clan: string
}


export const Categories = {
    '1': 'Basic Addition',
    '2': '2-Digit Addition',
    '3': '3-Digit Addition',
    '4': 'Basic Subtraction',
    '5': '2-Digit Subtraction',
    '6': '3-Digit Subtraction',
    '7': 'Basic Multiplication',
    '8': '2-Digit Multiplication',
    '9': 'Basic Division',
    '10': '2-Digit Division',
    '11': 'Arithmetic Sequence'
}