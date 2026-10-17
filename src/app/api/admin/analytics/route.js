import { NextResponse } from "next/server";
import { hasAdminSession } from "@/data/adminSession";
import { getAnalyticsSummary } from "@/data/analyticsStore";

export async function GET(request) {
  if (!hasAdminSession(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestedDays = Number(new URL(request.url).searchParams.get("days"));
  const days = [7, 30, 90].includes(requestedDays) ? requestedDays : 30;
  const requestedPage = Number(new URL(request.url).searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, 100)
      : 1;

  return NextResponse.json({
    success: true,
    ...getAnalyticsSummary(days, page),
  });
}
