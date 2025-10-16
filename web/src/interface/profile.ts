export interface Profile{
  firstName: string;
  lastName: string;
  username: string | null;
  phoneNumber: string | null;
  profilePicture: File | null;
  bio: string | null;
}