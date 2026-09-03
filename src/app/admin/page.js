'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Trash2, Edit3, Check, Filter, MessageSquare, AlertCircle, RefreshCw, Lock } from 'lucide-react';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesText, setNotesText] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default admin access password for demonstration: "admin123"
    if (password === 'admin123' || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      fetchLeads();
    } else {
      setAuthError('Invalid admin password. Default dev password is: admin123');
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveNotes = async (id) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, internalNotes: notesText })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map(l => l.id === id ? { ...l, internalNotes: notesText } : l));
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20 px-4">
        <div className="glass-card rounded-3xl p-8 border border-zinc-800 space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">RB-Tech Admin Portal</h1>
            <p className="text-xs text-zinc-400 mt-1">Authenticate to access lead management & CRM dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs text-zinc-400 mb-1 font-semibold">Admin Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-800/60 text-red-300 text-xs flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Internal Operations
          </span>
          <h1 className="text-3xl font-extrabold text-white flex items-center">
            <ShieldCheck className="w-7 h-7 text-blue-400 mr-3" />
            Lead Management & CRM Dashboard
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white flex items-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-red-950/50 border border-red-800/40 text-xs font-semibold text-red-300 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Archived'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="glass-card rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-semibold border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4">Client / Company</th>
                <th className="px-6 py-4">Service & Budget</th>
                <th className="px-6 py-4">Project Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Internal Notes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-900/50 transition-colors">
                    {/* Client */}
                    <td className="px-6 py-4 space-y-1">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-blue-400">{lead.email}</div>
                      {lead.company && <div className="text-zinc-500 font-mono">{lead.company}</div>}
                      {lead.phone && <div className="text-zinc-500">{lead.phone}</div>}
                      <div className="text-[10px] text-zinc-600">{new Date(lead.createdAt).toLocaleDateString()}</div>
                    </td>

                    {/* Service & Budget */}
                    <td className="px-6 py-4 space-y-1">
                      <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-300 font-semibold block w-fit">
                        {lead.service}
                      </span>
                      <div className="text-zinc-400 pt-1">Budget: <strong className="text-white">{lead.budget}</strong></div>
                      <div className="text-zinc-400">Timeline: {lead.timeline}</div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-3 text-zinc-300 leading-relaxed">
                        {lead.projectDescription}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold focus:outline-none border ${
                          lead.status === 'New' ? 'bg-blue-950 text-blue-300 border-blue-700' :
                          lead.status === 'Contacted' ? 'bg-purple-950 text-purple-300 border-purple-700' :
                          lead.status === 'Qualified' ? 'bg-yellow-950 text-yellow-300 border-yellow-700' :
                          lead.status === 'Converted' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                          'bg-zinc-900 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Converted">Converted</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    {/* Internal Notes */}
                    <td className="px-6 py-4 max-w-xs">
                      {editingNotesId === lead.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            className="w-full p-2 rounded-lg bg-zinc-950 border border-blue-500 text-xs text-white"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              className="px-2.5 py-1 rounded bg-blue-600 text-white font-semibold text-[11px]"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 text-[11px]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between group">
                          <span className="text-zinc-400 italic">
                            {lead.internalNotes || 'No notes added.'}
                          </span>
                          <button
                            onClick={() => {
                              setEditingNotesId(lead.id);
                              setNotesText(lead.internalNotes || '');
                            }}
                            className="p-1 text-zinc-500 hover:text-blue-400"
                            title="Edit Notes"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
