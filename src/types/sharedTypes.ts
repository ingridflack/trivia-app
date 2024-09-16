export interface Category {
  id: number;
  name: string;
}

export interface ApiResponse {
  message: string;
}

interface User {
  _id: string;
  mame: string;
  username: string;
  avatar: string;
}

export interface Question {
  category: string;
  difficulty: string;
  question: string;
  answers: string[];
  _id: string;
}
export interface Trivia {
  category: string;
  createdAt: string;
  difficulty: string;
  game_mode: string;
  questions: Question[];
  score: number;
  users: User[];
  status: string;
  _id: string;
}

export interface TriviaHistory {
  items: {
    answerTime: number;
    isCorrect: boolean;
    question: Question;
    _id: string;
  }[];
  trivia: Trivia;
}

export interface UserSearchSelectOption {
  label: string;
  value: string;
}

export interface UserSearch {
  _id: string;
  username: string;
}

export interface CreateTriviaBody {
  category: string;
  difficulty: string;
  amount: number;
  type: string;
  usernames?: string[];
}
