import { NextResponse } from "next/server";
import { recordPageView } from "@/data/analyticsStore";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DEVICES = new Set(["Desktop", "Mobile", "Tablet"]);
const BROWSERS = new Set(["Chrome", "Firefox", "Safari", "Edge", "Other"]);

export async function POST(request) {
  try {
    const body = await request.json();
    const { eventId, visitorId, sessionId, page, referrer, device, browser } =
      body;

    if (
      !UUID_PATTERN.test(eventId || "") ||
      !UUID_PATTERN.test(visitorId || "") ||
      !UUID_PATTERN.test(sessionId || "") ||
      typeof page !== "string" ||
      !page.startsWith("/") ||
      page.startsWith("//") ||
      page.length > 300 ||
      page.includes("?") ||
      page.includes("#") ||
      typeof referrer !== "string" ||
      referrer.length > 120 ||
      !DEVICES.has(device) ||
      !BROWSERS.has(browser)
    ) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    recordPageView({
      id: eventId,
      visitorId,
      sessionId,
      page,
      referrer: referrer.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 120),
      device,
      browser,
    });

    return NextResponse.json({ success: true }, { status: 202 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to record page view" },
      { status: 500 },
    );
  }
}
