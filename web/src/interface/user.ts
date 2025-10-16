export interface User {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  username: string | null;
  phoneNumber: string | null;
  phoneVerified: boolean;
  bio: string | null;
  profilePicture: string | null;
  role: 'USER' | 'ADMIN';
  isProfileComplete: boolean;
  creditBalance: number | null;
}