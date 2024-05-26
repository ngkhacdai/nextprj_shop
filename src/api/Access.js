"use server";

import { cookies } from "next/headers";
import { DELETE, POST } from "./customFetch";
import { redirect } from "next/navigation";
export const login = async (form) => {
  const oneMonth = 24 * 60 * 60 * 1000 * 30;
  await POST(`/access/login`, form).then((response) => {
    cookies().set("userID", response.message.userId, { maxAge: oneMonth });
    cookies().set("token", response.message.accessToken, { maxAge: oneMonth });
  });
};
export const register = async (form) => {
  await POST(`access/login`, form);
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
