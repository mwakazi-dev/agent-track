import { Endpoints } from "@/types/enums";
import requestHandler from "@/lib/request";

const signinWIthEmailAndPassword = (payload: any) => {
  return requestHandler.post(
    `${process.env.NEXT_FIREBASE_AUTH_BASE_URL}:${Endpoints.SIGN_IN_WITH_PASSWORD}?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    payload
  );
};

const getUserProfile = (payload: { idToken: string }) => {
  return requestHandler.post(
    `${process.env.NEXT_FIREBASE_AUTH_BASE_URL}:${Endpoints.LOOKUP}?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    payload
  );
};

export const authService = {
  signinWIthEmailAndPassword,
  getUserProfile,
};
