"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Building, TrendingUp, Calendar, Search, Eye } from "lucide-react";

interface OrgSummary {
  id: string;
  name: string;
  plan: string;
  createdAt: string;
  trialEndsAt: string | null;
  userCount: number;
  leadCount: number;
  status: "TRIAL" | "ACTIVE" | "EXPIRED";
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function AdminClient() {
  const [orgs, setOrgs] = useState<OrgSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const response = await fetch("/api/admin/orgs");
      if (response.ok) {
        const data = await response.json();
        setOrgs(data);
      }
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrgs = orgs.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading admin dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 mt-1">
            Monitor all client accounts and performance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-8"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Clients", value: orgs.length, icon: Users },
              { label: "Active Trials", value: orgs.filter(o => o.status === "TRIAL").length, icon: Calendar },
              { label: "Paid Accounts", value: orgs.filter(o => o.status === "ACTIVE").length, icon: TrendingUp },
              { label: "Total Leads", value: orgs.reduce((sum, o) => sum + o.leadCount, 0), icon: Building }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="card-gradient p-6 rounded-2xl shadow-sm"
                variants={fadeInUp}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-100 text-blue-600">
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Organizations Table */}
          <div className="card-gradient p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Client Organizations</h3>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 font-medium text-slate-700">Organization</th>
                    <th className="text-left py-3 font-medium text-slate-700">Plan</th>
                    <th className="text-left py-3 font-medium text-slate-700">Status</th>
                    <th className="text-left py-3 font-medium text-slate-700">Users</th>
                    <th className="text-left py-3 font-medium text-slate-700">Leads</th>
                    <th className="text-left py-3 font-medium text-slate-700">Created</th>
                    <th className="text-left py-3 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrgs.map((org, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-slate-900">{org.name}</p>
                          <p className="text-slate-500 text-xs">{org.id}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          org.plan === 'PREMIUM' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {org.plan}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          org.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                          org.status === 'TRIAL' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {org.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-700">{org.userCount}</td>
                      <td className="py-4 text-slate-700">{org.leadCount}</td>
                      <td className="py-4 text-slate-700">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}