import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "src", "data", "storage");
const ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
const RETENTION_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_EVENTS = 10000;

function readEvents() {
  try {
    const events = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8"));
    return Array.isArray(events) ? events : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(events), "utf-8");
}

export function recordPageView(pageView) {
  const cutoff = Date.now() - RETENTION_MS;
  const events = readEvents().filter(
    (event) => Date.parse(event.viewedAt) >= cutoff,
  );

  if (events.some((event) => event.id === pageView.id)) {
    return false;
  }

  events.unshift({ ...pageView, viewedAt: new Date().toISOString() });
  saveEvents(events.slice(0, MAX_EVENTS));
  return true;
}

function countBy(events, key) {
  const counts = new Map();
  for (const event of events) {
    const value = event[key] || "Unknown";
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAnalyticsSummary(days, page = 1) {
  const retentionCutoff = Date.now() - RETENTION_MS;
  const retainedEvents = readEvents().filter(
    (event) => Date.parse(event.viewedAt) >= retentionCutoff,
  );
  saveEvents(retainedEvents);

  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const events = retainedEvents
    .filter((event) => Date.parse(event.viewedAt) >= cutoff)
    .sort((a, b) => Date.parse(b.viewedAt) - Date.parse(a.viewedAt));
  const uniqueVisitors = new Set(events.map((event) => event.visitorId)).size;
  const sessions = new Set(events.map((event) => event.sessionId)).size;
  const daily = new Map();

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() - offset);
    daily.set(date.toISOString().slice(0, 10), 0);
  }

  for (const event of events) {
    const date = new Date(event.viewedAt).toISOString().slice(0, 10);
    if (daily.has(date)) daily.set(date, daily.get(date) + 1);
  }

  return {
    stats: {
      pageViews: events.length,
      uniqueVisitors,
      sessions,
      pagesPerSession: sessions
        ? Number((events.length / sessions).toFixed(1))
        : 0,
    },
    daily: [...daily.entries()].map(([date, count]) => ({ date, count })),
    topPages: countBy(events, "page").slice(0, 8),
    sources: countBy(
      events.filter((event) => event.referrer !== "Internal navigation"),
      "referrer",
    ).slice(0, 8),
    devices: countBy(events, "device"),
    browsers: countBy(events, "browser"),
    recentVisits: events.slice((page - 1) * 100, page * 100),
    visitCount: events.length,
    visitPage: page,
    visitPageCount: Math.max(1, Math.ceil(events.length / 100)),
  };
}
