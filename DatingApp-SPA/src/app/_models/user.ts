import { Photo } from './photo';

export interface User {
  id: number;
  userName: string;
  gender: string;
  age: number;
  created: any;
  lastActive: any;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
