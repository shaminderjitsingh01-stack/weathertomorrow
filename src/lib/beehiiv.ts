// Beehiiv API client
// Docs: https://developers.beehiiv.com/docs/v2

const BEEHIIV_API_URL = "https://api.beehiiv.com/v2";

function getHeaders() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!apiKey) throw new Error("BEEHIIV_API_KEY not set");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
}

function getPublicationId() {
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!pubId) throw new Error("BEEHIIV_PUBLICATION_ID not set");
  return pubId;
}

// ===== Subscribers =====

export interface BeehiivSubscriber {
  id: string;
  email: string;
  status: string;
  created?: number;
  utm_source?: string;
  custom_fields: { name: string; value: string }[];
}

export async function createSubscriber(
  email: string,
  city: string,
  timezone: string,
  sendHour: number = 20,
  forecastType: "today" | "tomorrow" = "tomorrow"
): Promise<{ success: boolean; error?: string }> {
  const pubId = getPublicationId();

  const res = await fetch(`${BEEHIIV_API_URL}/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      custom_fields: [
        { name: "city", value: city },
        { name: "timezone", value: timezone },
        { name: "send_hour", value: String(sendHour) },
        { name: "forecast_type", value: forecastType },
      ],
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Beehiiv subscribe error:", error);
    return { success: false, error: "Failed to subscribe. Please try again." };
  }

  return { success: true };
}

export async function getSubscribers(
  page: number = 1,
  limit: number = 100
): Promise<{ subscribers: BeehiivSubscriber[]; totalPages: number }> {
  const pubId = getPublicationId();

  const res = await fetch(
    `${BEEHIIV_API_URL}/publications/${pubId}/subscriptions?status=active&limit=${limit}&page=${page}`,
    { headers: getHeaders() }
  );

  if (!res.ok) {
    console.error("Beehiiv fetch error:", await res.text());
    return { subscribers: [], totalPages: 0 };
  }

  const data = await res.json();
  return {
    subscribers: data.data || [],
    totalPages: data.total_pages || 0,
  };
}

// Get all active subscribers (paginated)
export async function getAllSubscribers(): Promise<BeehiivSubscriber[]> {
  const all: BeehiivSubscriber[] = [];
  let page = 1;

  while (true) {
    const { subscribers, totalPages } = await getSubscribers(page, 100);
    all.push(...subscribers);
    if (page >= totalPages || subscribers.length === 0) break;
    page++;
  }

  return all;
}

// ===== Posts =====

export async function createAndSendPost(
  subject: string,
  htmlContent: string,
  previewText: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const pubId = getPublicationId();

  const res = await fetch(`${BEEHIIV_API_URL}/publications/${pubId}/posts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      title: subject,
      subtitle: previewText,
      content: [
        {
          type: "html",
          html: htmlContent,
        },
      ],
      status: "confirmed", // Sends immediately
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Beehiiv post error:", error);
    return { success: false, error };
  }

  const data = await res.json();
  return { success: true, postId: data.data?.id };
}

// ===== Helpers =====

// Group subscribers by city
export function groupSubscribersByCity(
  subscribers: BeehiivSubscriber[]
): Map<string, { timezone: string; count: number }> {
  const cityMap = new Map<string, { timezone: string; count: number }>();

  for (const sub of subscribers) {
    const cityField = sub.custom_fields?.find((f) => f.name === "city");
    const tzField = sub.custom_fields?.find((f) => f.name === "timezone");

    if (!cityField?.value) continue;

    const city = cityField.value;
    const existing = cityMap.get(city);

    if (existing) {
      existing.count++;
    } else {
      cityMap.set(city, {
        timezone: tzField?.value || "UTC",
        count: 1,
      });
    }
  }

  return cityMap;
}

// Get subscribers whose send_hour matches current hour in their timezone
export function getSubscribersForCurrentHour(
  subscribers: BeehiivSubscriber[]
): BeehiivSubscriber[] {
  return subscribers.filter((sub) => {
    const tzField = sub.custom_fields?.find((f) => f.name === "timezone");
    const hourField = sub.custom_fields?.find((f) => f.name === "send_hour");

    if (!tzField?.value || !hourField?.value) return false;

    const sendHour = parseInt(hourField.value, 10);

    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: tzField.value,
      });
      const currentHour = parseInt(formatter.format(now), 10);
      return currentHour === sendHour;
    } catch {
      return false;
    }
  });
}
