"use server";

import { getAuth } from "firebase-admin/auth";

import { StatusCodes } from "@/types/enums";

export async function addRoles(userId: string) {
  try {
    await getAuth().setCustomUserClaims(userId, { admin: true });
    return {
      status: StatusCodes.Ok,
      success: true,
      data: {
        userId,
        roles: ["admin"],
      },
      message: "Roles set successfully",
    };
  } catch {
    return {
      status: StatusCodes.BadRequest,
      success: false,
      message: "Unable to set roles",
    };
  }
}
