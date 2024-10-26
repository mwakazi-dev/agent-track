"use server";

import { authService } from "@/services/authService";
import { AuthErrors, ErrorMessages, Roles, StatusCodes } from "@/types/enums";
// import { addRoles } from "./admin";
import { getUserRoles } from "@/lib/dal";
import { createSession } from "@/lib/session";
import { AxiosError } from "axios";

export async function signin(email: string, password: string) {
  try {
    const { data: authData } = await authService.signinWIthEmailAndPassword({
      email,
      password,
    });

    // await addRoles(authData.localId);

    const rolesResponse = await getUserRoles(authData?.localId);

    await createSession(
      authData?.idToken,
      3600,
      Boolean(rolesResponse?.data?.roles?.admin)
    );

    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        userId: authData?.localId,
        email: authData?.email,
        roles: rolesResponse?.data?.roles?.admin ? [Roles.ADMIN] : [Roles.USER],
      },
      message: "Login successful",
    };
  } catch (error: any) {
    const errorCode = error?.message?.response?.data?.error?.message;

    if (errorCode === AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER) {
      return {
        status: 400,
        success: false,
        error: {
          code: AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER,
          message: AuthErrors.TOO_MANY_ATTEMPTS_TRY_LATER,
        },
      };
    }
    if (errorCode === AuthErrors.INVALID_LOGIN_CREDENTIALS) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.INVALID_LOGIN_CREDENTIALS,
          message: ErrorMessages.INVALID_LOGIN_CREDENTIALS,
        },
      };
    }
    if (errorCode === AuthErrors.INVALID_PASSWORD) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.INVALID_PASSWORD,
          message: AuthErrors.INVALID_PASSWORD,
        },
      };
    }
    if (errorCode === AuthErrors.EMAIL_NOT_FOUND) {
      return {
        status: StatusCodes.BadRequest,
        success: false,
        error: {
          code: AuthErrors.EMAIL_NOT_FOUND,
          message: AuthErrors.EMAIL_NOT_FOUND,
        },
      };
    }

    return {
      status: StatusCodes.InternalServerError,
      success: false,
      error: {
        code: AuthErrors.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.INTERNAL_SERVER_ERROR,
      },
    };
  }
}
