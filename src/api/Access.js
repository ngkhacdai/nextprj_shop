"use server";

import { cookies } from "next/headers";
import { DELETE, POST } from "./customFetch";
import { redirect } from "next/navigation";
import { API } from "./url";
export const login = async (form) => {
  const oneMonth = 24 * 60 * 60 * 1000 * 30;
  await POST(`/access/login`, form).then((response) => {
    cookies().set("userID", response.message.userId, { maxAge: oneMonth });
    cookies().set("token", response.message.accessToken, { maxAge: oneMonth });
  });
};
export const register = async (form) => {
  try {
    const response = await POST(`/access/signup`, form);
    return response;
  } catch (error) {
    throw new Error("Could not register");
  }
};
export const verifyOtp = async (form) => {
  await POST(`/access/verifyOtp`, form).then((res) => {
    cookies().set("userID", res.newUser._id);
  });
};
export const signout = async () => {
  await DELETE("/access/signOut").then((res) => {
    cookies().delete("userID");
    cookies().delete("token");
    redirect("/login");
  });
};
