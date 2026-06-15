import React from "react";
import './style.css';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Area, AreaChart
} from "recharts";
import {
  User, Users, Briefcase, Shield, CheckCircle2, Clock,
  XCircle, FileText, UserCheck, ShieldCheck, Activity
} from "lucide-react";

const roleCards = [
  { icon: <User size={22} />,     title: "Employee", desc: "Submit leaves & track approvals",   color: "#3B82F6" },
  { icon: <Users size={22} />,    title: "Manager",  desc: "Review & approve team requests",    color: "#1E3A8A" },
  { icon: <Briefcase size={22} />,title: "HR Team",  desc: "Verify and process workflows",      color: "#0EA5E9" },
  { icon: <Shield size={22} />,   title: "Admin",    desc: "Final approval & user management",  color: "#0D1B4C" },
];

const donutData = [
  { name: "Approved", value: 64, color: "#3B82F6" },
  { name: "Pending",  value: 22, color: "#F59E0B" },
  { name: "Rejected", value: 14, color: "#EF4444" },
];

const trendData = [
  { day: "Mon", workflows: 12 },
  { day: "Tue", workflows: 19 },
  { day: "Wed", workflows: 15 },
  { day: "Thu", workflows: 27 },
  { day: "Fri", workflows: 22 },
  { day: "Sat", workflows: 9  },
  { day: "Sun", workflows: 6  },
];

const pipeline = [
  { label: "Employee Submission", value: 100, icon: <FileText size={16} /> },
  { label: "Manager Review",      value: 78,  icon: <UserCheck size={16} /> },
  { label: "HR Verification",     value: 54,  icon: <Briefcase size={16} /> },
  { label: "Admin Approval",      value: 32,  icon: <ShieldCheck size={16} /> },
];

const activities = [
  { who: "Manager",  text: "approved Sick Leave",          time: "10 min ago", color: "#3B82F6" },
  { who: "Employee", text: "submitted Earned Leave",       time: "1 hr ago",   color: "#0EA5E9" },
  { who: "HR",       text: "reviewed Casual Leave",        time: "3 hr ago",   color: "#1E3A8A" },
  { who: "Admin",    text: "closed Workflow WF-1001",      time: "Yesterday",  color: "#0D1B4C" },
];

export default function Dashboard() {
  const total = donutData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="wp-dashboard">
      {/* Heading */}
      <div className="wp-head">
        <div>
          <h1>Workflow Dashboard</h1>
          <p>Overview of leaves, approvals and workflow activity</p>
        </div>
        <div className="wp-head-stats">
          <div className="wp-mini"><CheckCircle2 size={16} color="#10B981" /> 64 Approved</div>
          <div className="wp-mini"><Clock size={16} color="#F59E0B" /> 22 Pending</div>
          <div className="wp-mini"><XCircle size={16} color="#EF4444" /> 14 Rejected</div>
        </div>
      </div>

      {/* Section 1: Role cards */}
      <div className="wp-roles">
        {roleCards.map((r) => (
          <div className="wp-role-card" key={r.title}>
            <div className="wp-role-icon" style={{ background: r.color }}>{r.icon}</div>
            <div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 + 3 */}
      <div className="wp-row">
        <div className="wp-card wp-donut-card">
          <div className="wp-card-head">
            <h2>Workflow Status</h2>
            <span>Distribution</span>
          </div>
          <div className="wp-donut-wrap">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={donutData} dataKey="value" nameKey="name"
                  innerRadius={60} outerRadius={90} paddingAngle={3}
                  stroke="none"
                >
                  {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="wp-donut-center">
              <strong>{total}</strong>
              <span>Total</span>
            </div>
          </div>
          <div className="wp-legend">
            {donutData.map((d) => (
              <div key={d.name}>
                <span className="wp-dot" style={{ background: d.color }} />
                {d.name} <b>{d.value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="wp-card wp-trend-card">
          <div className="wp-card-head">
            <h2>Workflow Trend</h2>
            <span>Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="wfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#3B82F6" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="workflows" stroke="#1E3A8A" strokeWidth={2.5} fill="url(#wfGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 4 + 5 */}
      <div className="wp-row">
        <div className="wp-card wp-pipeline-card">
          <div className="wp-card-head">
            <h2>Approval Pipeline</h2>
            <span>Current cycle</span>
          </div>
          <div className="wp-pipeline">
            {pipeline.map((p) => (
              <div className="wp-pipe-row" key={p.label}>
                <div className="wp-pipe-label">
                  <span className="wp-pipe-icon">{p.icon}</span>
                  {p.label}
                </div>
                <div className="wp-pipe-bar">
                  <div className="wp-pipe-fill" style={{ width: `${p.value}%` }} />
                </div>
                <div className="wp-pipe-val">{p.value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="wp-card wp-activity-card">
          <div className="wp-card-head">
            <h2>Recent Activities</h2>
            <span><Activity size={14} /> Live</span>
          </div>
          <ul className="wp-timeline">
            {activities.map((a, i) => (
              <li key={i}>
                <span className="wp-time-dot" style={{ background: a.color }} />
                <div>
                  <p><b>{a.who}</b> {a.text}</p>
                  <small>{a.time}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
