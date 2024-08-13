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
  users: User[];
  _id: string;
}
