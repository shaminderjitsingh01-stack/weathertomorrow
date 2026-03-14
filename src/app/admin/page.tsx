import { redirect } from "next/navigation";
import { getAllSubscribers } from "@/lib/beehiiv";
import { getAllCitySlugs } from "@/lib/cities";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const cronSecret = process.env.CRON_SECRET;

  // Simple auth — require ?key=CRON_SECRET
  if (!params.key || params.key !== cronSecret) {
    redirect("/");
  }

  const subscribers = await getAllSubscribers();
  const curatedCitySlugs = getAllCitySlugs();
  // Unique cities from subscribers that aren't in the curated list = dynamically created pages
  const subscriberCities = new Set<string>();
  for (const sub of subscribers) {
    const cityField = sub.custom_fields?.find((f) => f.name === "city");
    if (cityField?.value) {
      const slug = cityField.value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (!curatedCitySlugs.includes(slug)) subscriberCities.add(slug);
    }
  }
  const totalPages = curatedCitySlugs.length + subscriberCities.size + 4; // +4 for home, about, privacy, not-found

  // Group by city
  const cityMap = new Map<string, { count: number; emails: string[] }>();
  const statusCount = { active: 0, pending: 0, validating: 0, inactive: 0, other: 0 };
  const forecastTypeCount = { today: 0, tomorrow: 0, unknown: 0 };
  const sourceCount = new Map<string, number>();

  for (const sub of subscribers) {
    // Status
    const status = sub.status as keyof typeof statusCount;
    if (status in statusCount) {
      statusCount[status]++;
    } else {
      statusCount.other++;
    }

    // City
    const cityField = sub.custom_fields?.find((f) => f.name === "city");
    const city = cityField?.value || "Unknown";
    const existing = cityMap.get(city);
    if (existing) {
      existing.count++;
      existing.emails.push(sub.email);
    } else {
      cityMap.set(city, { count: 1, emails: [sub.email] });
    }

    // Forecast type
    const ftField = sub.custom_fields?.find((f) => f.name === "forecast_type");
    const ft = ftField?.value as "today" | "tomorrow" | undefined;
    if (ft === "today") forecastTypeCount.today++;
    else if (ft === "tomorrow") forecastTypeCount.tomorrow++;
    else forecastTypeCount.unknown++;

    // Source
    const source = sub.utm_source || "direct";
    sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
  }

  // Sort cities by count descending
  const citiesSorted = [...cityMap.entries()].sort((a, b) => b[1].count - a[1].count);
  const sourcesSorted = [...sourceCount.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          Weather Tomorrow — Admin
        </h1>
        <p className="text-sm text-white/30 mb-8">
          Subscriber analytics from Beehiiv
        </p>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Subscribers" value={subscribers.length} />
          <StatCard label="Active" value={statusCount.active} color="text-emerald-400" />
          <StatCard label="Pending" value={statusCount.pending} color="text-amber-400" />
          <StatCard label="Sub Cities" value={cityMap.size} color="text-blue-400" />
        </div>

        {/* Pages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Pages" value={totalPages} color="text-purple-400" />
          <StatCard label="Curated Cities" value={curatedCitySlugs.length} />
          <StatCard label="Dynamic Cities" value={subscriberCities.size} color="text-cyan-400" />
          <StatCard label="Static Pages" value={4} />
        </div>

        {/* Forecast type breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatCard label="Tomorrow's Weather" value={forecastTypeCount.tomorrow} color="text-blue-400" />
          <StatCard label="Today's Weather" value={forecastTypeCount.today} color="text-cyan-400" />
          <StatCard label="Not Set" value={forecastTypeCount.unknown} color="text-white/30" />
        </div>

        {/* Cities table */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Subscribers by City</h2>
          <div className="bg-white/5 rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">City</th>
                  <th className="text-right px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Subscribers</th>
                  <th className="text-right px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {citiesSorted.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-white/30">
                      No subscribers yet
                    </td>
                  </tr>
                ) : (
                  citiesSorted.map(([city, data]) => (
                    <tr key={city} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-5 py-3 font-medium">{city}</td>
                      <td className="px-5 py-3 text-right font-bold">{data.count}</td>
                      <td className="px-5 py-3 text-right text-white/40">
                        {subscribers.length > 0
                          ? `${((data.count / subscribers.length) * 100).toFixed(1)}%`
                          : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sources table */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Acquisition Sources</h2>
          <div className="bg-white/5 rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Source</th>
                  <th className="text-right px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Count</th>
                </tr>
              </thead>
              <tbody>
                {sourcesSorted.map(([source, count]) => (
                  <tr key={source} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-5 py-3 font-medium">{source}</td>
                    <td className="px-5 py-3 text-right font-bold">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent subscribers */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Recent Subscribers
            <span className="text-white/30 font-normal text-sm ml-2">(last 20)</span>
          </h2>
          <div className="bg-white/5 rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">City</th>
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-white/40 font-semibold text-xs uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-white/30">
                      No subscribers yet
                    </td>
                  </tr>
                ) : (
                  [...subscribers]
                    .sort((a, b) => (b.created || 0) - (a.created || 0))
                    .slice(0, 20)
                    .map((sub) => {
                      const city = sub.custom_fields?.find((f) => f.name === "city")?.value || "—";
                      const ft = sub.custom_fields?.find((f) => f.name === "forecast_type")?.value || "—";
                      const date = sub.created
                        ? new Date(sub.created * 1000).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "—";

                      return (
                        <tr key={sub.id} className="border-b border-white/5 hover:bg-white/3">
                          <td className="px-5 py-3 font-medium truncate max-w-[200px]">{sub.email}</td>
                          <td className="px-5 py-3 text-white/60">{city}</td>
                          <td className="px-5 py-3 text-white/60">{ft}</td>
                          <td className="px-5 py-3">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                sub.status === "active"
                                  ? "bg-emerald-500/15 text-emerald-400"
                                  : sub.status === "pending"
                                    ? "bg-amber-500/15 text-amber-400"
                                    : "bg-white/10 text-white/40"
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-white/40">{date}</td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-white/15 text-center mt-10">
          weathertomorrow.app admin — data from Beehiiv API
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
      <div className="text-[11px] text-white/35 font-semibold uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className={`text-3xl font-extrabold tracking-tight ${color}`}>
        {value}
      </div>
    </div>
  );
}
