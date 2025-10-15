git "use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Eye,
  TrendingUp,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  CreditCard,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface DashboardData {
  kpis: {
    newLeads: number;
    positiveReplies: number;
    qualified: number;
    booked: number;
    showed: number;
    closed: number;
  };
  chartSeries: {
    leadsByDay: Array<{ date: string; leads: number }>;
    callsByWeek: Array<{ week: string; calls: number }>;
    replyRateByCampaign: Array<{ campaign: string; rate: number }>;
    pipelineFunnel: Array<{ stage: string; count: number; color: string }>;
  };
  tables: {
    latestLeads: Array<{
      id: string;
      name: string;
      clinic: string;
      city: string;
      source: string;
      status: string;
      lastTouch: string;
    }>;
    campaignPerformance: Array<{
      name: string;
      sends: number;
      opens: number;
      replies: number;
      replyRate: number;
    }>;
  };
  growthSinceRegistration: {
    leadsGrowth: { current: number; baseline: number; percentage: number };
    clientsGrowth: { current: number; baseline: number; percentage: number };
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DashboardClient({ org }: { org: any }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");
  const [portalLoading, setPortalLoading] = useState(false);
  const trialEndsAtDate = org.trialEndsAt ? new Date(org.trialEndsAt) : null;
  const daysLeft = trialEndsAtDate
    ? Math.ceil(
        (trialEndsAtDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;
  const showTrialBanner =
    org.stripeSubscriptionStatus === "trialing" &&
    daysLeft !== null &&
    daysLeft >= 0 &&
    daysLeft <= 3;

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");
      const apiUrl = `/api/dashboard/summary?days=${dateRange}`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        credentials: "include", // Ensure cookies are sent with the request
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dashboardData = await response.json();
      console.log("Dashboard data received:", dashboardData);

      if (!dashboardData) {
        throw new Error("No data received from the server");
      }

      setData(dashboardData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (type: "leads" | "campaigns") => {
    try {
      const response = await fetch(
        `/api/dashboard/export.csv?type=${type}&days=${dateRange}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${type}-${format(new Date(), "yyyy-MM-dd")}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to export data:", error);
    }
  };

  const openBillingPortal = async () => {
    try {
      setPortalLoading(true);
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      if (!res.ok) return;
      const json = await res.json();
      if (json?.url) {
        window.location.href = json.url as string;
      }
    } catch (e) {
      console.error("Failed to open billing portal", e);
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Failed to load dashboard data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Welcome back, {org.name}
              </h1>
              <p className="text-slate-600 mt-1">
                Here's your practice growth overview
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  Plan: <span className="font-medium">{org.plan}</span>
                </span>
                {org.stripeSubscriptionStatus && (
                  <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    Status:{" "}
                    <span className="font-medium">
                      {org.stripeSubscriptionStatus}
                    </span>
                  </span>
                )}
                {org.trialEndsAt && (
                  <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                    Trial ends: {new Date(org.trialEndsAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>

              <button
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-60"
              >
                <CreditCard className="w-5 h-5" />
                {portalLoading ? "Opening…" : "Manage Billing"}
              </button>

              <button
                onClick={() => exportData("leads")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showTrialBanner && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">
                  Your trial ends in {daysLeft} day{daysLeft === 1 ? "" : "s"}.
                </p>
                <p className="text-sm">
                  Keep your access uninterrupted by updating billing now.
                </p>
              </div>
              <button
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="flex-shrink-0 px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60"
              >
                {portalLoading ? "Opening…" : "Manage Billing"}
              </button>
            </div>
          </div>
        )}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="space-y-8"
        >
          {/* KPI Cards */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-6 gap-4"
            variants={fadeInUp}
          >
            {[
              {
                label: "New Leads",
                value: data.kpis.newLeads,
                icon: Users,
                color: "text-blue-600",
              },
              {
                label: "Positive Replies",
                value: data.kpis.positiveReplies,
                icon: MessageSquare,
                color: "text-green-600",
              },
              {
                label: "Qualified",
                value: data.kpis.qualified,
                icon: TrendingUp,
                color: "text-purple-600",
              },
              {
                label: "Booked",
                value: data.kpis.booked,
                icon: Calendar,
                color: "text-orange-600",
              },
              {
                label: "Showed",
                value: data.kpis.showed,
                icon: Eye,
                color: "text-cyan-600",
              },
              {
                label: "Closed",
                value: data.kpis.closed,
                icon: BarChart3,
                color: "text-emerald-600",
              },
            ].map((kpi, index) => (
              <motion.div
                key={index}
                className="card-gradient p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-slate-100 ${kpi.color}`}>
                    <kpi.icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {kpi.value}
                  </p>
                  <p className="text-sm text-slate-600">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Growth Since Registration */}
          <motion.div className="grid lg:grid-cols-2 gap-6" variants={fadeInUp}>
            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Leads Growth Since Registration
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-slate-900">
                  {data.growthSinceRegistration.leadsGrowth.current}
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    data.growthSinceRegistration.leadsGrowth.percentage > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data.growthSinceRegistration.leadsGrowth.percentage > 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(
                    data.growthSinceRegistration.leadsGrowth.percentage
                  )}
                  %
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                vs. baseline:{" "}
                {data.growthSinceRegistration.leadsGrowth.baseline}
              </p>
            </div>

            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Clients Growth Since Registration
              </h3>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-slate-900">
                  {data.growthSinceRegistration.clientsGrowth.current}
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    data.growthSinceRegistration.clientsGrowth.percentage > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data.growthSinceRegistration.clientsGrowth.percentage > 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(
                    data.growthSinceRegistration.clientsGrowth.percentage
                  )}
                  %
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                vs. baseline:{" "}
                {data.growthSinceRegistration.clientsGrowth.baseline}
              </p>
            </div>
          </motion.div>

          {/* Charts */}
          <motion.div className="grid lg:grid-cols-2 gap-6" variants={fadeInUp}>
            {/* Leads by Day */}
            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Leads by Day
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.chartSeries.leadsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pipeline Funnel */}
            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Pipeline Conversion
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data.chartSeries.pipelineFunnel}
                  layout="horizontal"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Data Tables */}
          <motion.div className="grid lg:grid-cols-2 gap-6" variants={fadeInUp}>
            {/* Latest Leads */}
            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Latest Leads
                </h3>
                <button
                  onClick={() => exportData("leads")}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 font-medium text-slate-700">
                        Name
                      </th>
                      <th className="text-left py-3 font-medium text-slate-700">
                        Clinic
                      </th>
                      <th className="text-left py-3 font-medium text-slate-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tables.latestLeads.map((lead, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-slate-900">
                              {lead.name}
                            </p>
                            <p className="text-slate-500 text-xs">
                              {lead.city}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 text-slate-700">{lead.clinic}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              lead.status === "CLOSED"
                                ? "bg-green-100 text-green-700"
                                : lead.status === "QUALIFIED"
                                ? "bg-purple-100 text-purple-700"
                                : lead.status === "BOOKED"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="card-gradient p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Campaign Performance
                </h3>
                <button
                  onClick={() => exportData("campaigns")}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 font-medium text-slate-700">
                        Campaign
                      </th>
                      <th className="text-left py-3 font-medium text-slate-700">
                        Sends
                      </th>
                      <th className="text-left py-3 font-medium text-slate-700">
                        Reply Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tables.campaignPerformance.map((campaign, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="py-3 font-medium text-slate-900">
                          {campaign.name}
                        </td>
                        <td className="py-3 text-slate-700">
                          {campaign.sends}
                        </td>
                        <td className="py-3">
                          <span
                            className={`font-medium ${
                              campaign.replyRate > 5
                                ? "text-green-600"
                                : campaign.replyRate > 2
                                ? "text-orange-600"
                                : "text-red-600"
                            }`}
                          >
                            {campaign.replyRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
