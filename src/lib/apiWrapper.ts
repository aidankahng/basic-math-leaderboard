import axios from "axios";
import { BasicProblemType, HighScoresType, LoginFormDataType, MyScoresType, QuizProblemsType, SignUpFormDataType, UpdateUserDataType, UserDictType } from "../types";

// Localhost url
// const baseURL: string = "http://localhost:5555"

// Online Host
const baseURL: string = "https://basic-math-leaderboard-api.onrender.com/"

const signUpEndpoint: string = "/signup";
const loginEndpoint: string = "/login";
const quizEndpoint: string = "/quiz"

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


// create an axios instance with required login info
const apiClientNoAuth = () =>
    axios.create({
        baseURL: baseURL,
    });

const apiClientBasicAuth = (username: string, password: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
    });

const apiClientTokenAuth = (token: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

type APIResponse<T> = {
    data?: T;
    error?: string;
};

// Each function below will make a request to the API

async function signUp(signUpFormData: SignUpFormDataType): Promise<APIResponse<UserDictType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(
            signUpEndpoint,
            signUpFormData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { data, error };
}

async function login(loginFormData: LoginFormDataType): Promise<APIResponse<string>> {
    let data;
    let error;
    try {
        const response = await apiClientBasicAuth(loginFormData.username, loginFormData.password).get(loginEndpoint);
        data = response.data.token;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { data, error };
}

// This function will get the current user's data from the backend
async function getMe(token: string): Promise<APIResponse<MyScoresType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`/my-scores`);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

// POST endpoint to send data and update a user
async function updateMe(token: string, updateData:UpdateUserDataType): Promise<APIResponse<UserDictType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(`/user/edit`, updateData);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}


// This function will get problems from the api
async function getProblems(category:number, amount:number, token:string): Promise<APIResponse<QuizProblemsType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(quizEndpoint + `/${category}/${amount}`);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

// This function will submit a quiz to the api
async function submitProblems(quiz:QuizProblemsType, token:string): Promise<APIResponse<QuizProblemsType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(quizEndpoint + '/submit', quiz);
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

// Gets global scores (No auth)
async function getHighscores(): Promise<APIResponse<HighScoresType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get('/highscores');
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

// Gets CLAN scores (token auth)
async function getClanHighscores(token:string): Promise<APIResponse<HighScoresType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get('/highscores/clan');
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}


// Get practice problems (no auth)
async function getRandom(): Promise<APIResponse<BasicProblemType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get('/random');
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error;
        } else {
            error = "Something went wrong";
        }
    }
    return { data, error };
}




export { signUp, login , getRandom, getProblems, submitProblems, getHighscores, getClanHighscores , getMe, updateMe }