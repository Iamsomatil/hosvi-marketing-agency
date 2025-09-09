"use client";

import { useEffect, useState } from "react";

type Kpi = { label: string; value: number };

export default function DashboardPreview() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<Kpi[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setKpis([
        { label: "New Leads", value: 42 },
        { label: "Replies", value: 19 },
        { label: "Booked", value: 11 },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="card-gradient rounded-3xl p-6 lg:p-8 shadow-xl border border-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg lg:text-xl font-semibold text-slate-900">
          Live Dashboard Preview
        </h3>
        <span className="text-xs text-slate-500">sample data</span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
        {loading
          ? [0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-slate-100 animate-pulse"
              />
            ))
          : kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 p-4 hover:shadow-md transition-all"
              >
                <div className="text-2xl font-bold text-slate-900">
                  {k.value}
                </div>
                <div className="text-sm text-slate-500">{k.label}</div>
              </div>
            ))}
      </div>

      {/* Mini SVG chart */}
      <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200 p-4">
        {loading ? (
          <div className="h-40 rounded-xl bg-slate-100 animate-pulse" />
        ) : (
          <ResponsiveMiniLine />
        )}
      </div>
    </div>
  );
}

function ResponsiveMiniLine() {
  // simple sparkline-like chart
  const width = 600;
  const height = 160;
  const padding = 24;
  const points = [10, 18, 16, 24, 22, 28, 35, 31, 44, 40, 46, 52];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const xStep = (width - padding * 2) / (points.length - 1);
  const y = (v: number) =>
    padding + (height - padding * 2) * (1 - (v - min) / (max - min || 1));
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"}${padding + i * xStep},${y(v)}`)
    .join(" ");

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="transparent" />
        <path
          d={path}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((v, i) => (
          <circle
            key={i}
            cx={padding + i * xStep}
            cy={y(v)}
            r="3.5"
            fill="#ffffff"
            stroke="#6366f1"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}
