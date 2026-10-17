"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "rbtech-analytics-consent";
const VISITOR_KEY = "rbtech-analytics-visitor";
const VISITOR_CREATED_KEY = "rbtech-analytics-visitor-created";
const SESSION_KEY = "rbtech-analytics-session";
const VISITOR_TTL_MS = 90 * 24 * 60 * 60 * 1000;

function subscribeToConsent(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("analytics-consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("analytics-consent-change", callback);
  };
}

function getConsent() {
  return window.localStorage.getItem(CONSENT_KEY) || "prompt";
}

function createId() {
  if (window.crypto.randomUUID) return window.crypto.randomUUID();
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

function getBrowser(userAgent) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function getDevice(userAgent) {
  if (/iPad|Tablet|PlayBook|Silk/i.test(userAgent)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) return "Mobile";
  return "Desktop";
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsent,
    () => null,
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const lastTrackedPath = useRef("");

  useEffect(() => {
    if (
      consent !== "accepted" ||
      !pathname ||
      pathname.startsWith("/admin") ||
      lastTrackedPath.current === pathname
    ) {
      return;
    }

    const isInternalNavigation = Boolean(lastTrackedPath.current);
    lastTrackedPath.current = pathname;
    const userAgent = window.navigator.userAgent;
    const storedVisitorId = window.localStorage.getItem(VISITOR_KEY);
    const visitorCreatedAt = Number(
      window.localStorage.getItem(VISITOR_CREATED_KEY),
    );
    const isStoredVisitorValid =
      storedVisitorId && Date.now() - visitorCreatedAt < VISITOR_TTL_MS;
    const visitorId = isStoredVisitorValid ? storedVisitorId : createId();
    const sessionId = window.sessionStorage.getItem(SESSION_KEY) || createId();
    const referrerUrl =
      !isInternalNavigation && document.referrer
        ? new URL(document.referrer)
        : null;
    const referrer = isInternalNavigation
      ? "Internal navigation"
      : referrerUrl
        ? referrerUrl.host === window.location.host
          ? "Internal navigation"
          : referrerUrl.hostname
        : "Direct";

    window.localStorage.setItem(VISITOR_KEY, visitorId);
    if (!isStoredVisitorValid) {
      window.localStorage.setItem(VISITOR_CREATED_KEY, String(Date.now()));
    }
    window.sessionStorage.setItem(SESSION_KEY, sessionId);

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: createId(),
        visitorId,
        sessionId,
        page: pathname,
        referrer,
        device: getDevice(userAgent),
        browser: getBrowser(userAgent),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [consent, pathname]);

  const chooseConsent = (choice) => {
    if (choice === "rejected") {
      window.localStorage.removeItem(VISITOR_KEY);
      window.localStorage.removeItem(VISITOR_CREATED_KEY);
      window.sessionStorage.removeItem(SESSION_KEY);
      lastTrackedPath.current = "";
    }
    window.localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event("analytics-consent-change"));
    setShowPrompt(false);
  };

  return (
    <>
      {consent === "prompt" || showPrompt ? (
        <aside className="fixed bottom-4 left-4 z-70 w-[min(24rem,calc(100vw-2rem))] border border-zinc-700 bg-zinc-950 p-4 shadow-2xl">
          <p className="text-sm font-semibold text-white">Privacy settings</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-300">
            Allow pseudonymous analytics to count page views and understand site
            traffic. Names, contact details, and IP addresses are not stored.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => chooseConsent("accepted")}
              className="bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Allow analytics
            </button>
            <button
              type="button"
              onClick={() => chooseConsent("rejected")}
              className="border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-900"
            >
              Reject
            </button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setShowPrompt(true)}
          className="fixed bottom-4 left-4 z-60 border border-zinc-700 bg-zinc-950/95 px-3 py-2 text-[11px] font-medium text-zinc-300 shadow-lg hover:text-white"
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
