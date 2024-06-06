"use server";
import { cookies } from "next/headers";
import { API } from "./url";

// Trừu tượng hóa hàm fetch
export const getCookie = () => {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;
  return { userID, token };
};
async function customFetch(
  request,
  { method = "GET", headers = {}, body } = {}
) {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;

  const defaultHeaders = {
    "x-xclient-id": userID,
    authorization: token,
    ...headers,
  };

  const res = await fetch(`${API}${request}`, {
    method: method,
    headers: defaultHeaders,
    body: body
      ? typeof body === "string"
        ? body
        : JSON.stringify(body)
      : null,
  });

  if (!res.ok) {
    console.error("Fetch error:", res);
    throw new Error("Failed to fetch data");
  }

  const contentType = res.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    return await res.text(); // or other suitable method to handle different response types
  }
}

// Hàm GET
export async function GET(request) {
  return customFetch(request, { method: "GET" });
}

// Hàm POST
export async function POST(request, form) {
  return customFetch(request, {
    method: "POST",
    body: form,
    headers: {
      "Content-Type":
        typeof form === "string" ? "text/plain" : "application/json",
    },
  });
}

// Hàm PUT
export async function PUT(request, form = {}) {
  return customFetch(request, {
    method: "PUT",
    body: form,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Hàm PATCH
export async function PATCH(request, form = {}) {
  return customFetch(request, {
    method: "PATCH",
    body: form,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Hàm DELETE
export async function DELETE(request, form) {
  return customFetch(request, {
    method: "DELETE",
    body: form,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
