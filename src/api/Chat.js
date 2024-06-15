"use server";
import { cookies } from "next/headers";

export const getListUsers = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userID")?.value;

  if (!userId) {
    throw new Error("User ID not found in cookies");
  }

  const response = await fetch(
    `http://localhost:3001/getListUserbyShop/${userId}`,
    {
      method: "GET",
    }
  );

  const listUser = await response.json();

  return listUser;
};
