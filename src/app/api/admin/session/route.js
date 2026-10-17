import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  createAdminSession,
  hasAdminSession,
  isValidAdminPassword,
} from "@/data/adminSession";

export async function GET(request) {
  return NextResponse.json({ authenticated: hasAdminSession(request) });
}

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!isValidAdminPassword(password)) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 },
      );
    }

    const session = createAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Admin password is not configured" },
        { status: 503 },
      );
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(adminSessionCookie.name, session, adminSessionCookie);
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookie.name, "", {
    ...adminSessionCookie,
    maxAge: 0,
  });
  return response;
}
