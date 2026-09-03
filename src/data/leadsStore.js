import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'storage');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Initial seed leads for demonstration in Admin Dashboard
const initialLeads = [
  {
    id: "lead_101",
    name: "Alex Morgan",
    email: "alex@techcorp.example",
    company: "TechCorp Global",
    phone: "+1 (555) 234-5678",
    service: "Web Application Development",
    budget: "$5,000–$10,000",
    timeline: "1–2 months",
    projectDescription: "Looking to build a custom SaaS customer portal with Stripe subscription integration and user dashboards.",
    status: "New",
    internalNotes: "Requested call next Tuesday.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "lead_102",
    name: "Sarah Jenkins",
    email: "s.jenkins@retailpulse.example",
    company: "RetailPulse Logistics",
    phone: "+1 (555) 876-5432",
    service: "Mobile App Development",
    budget: "$10,000+",
    timeline: "2–4 months",
    projectDescription: "Need an offline-first React Native inventory barcode scanner app for iOS and Android field technicians.",
    status: "Contacted",
    internalNotes: "Sent proposal draft. Awaiting scope review.",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "lead_103",
    name: "David Chen",
    email: "david@healthplus.example",
    company: "HealthPlus Solutions",
    phone: "+1 (555) 345-6789",
    service: "AI Development",
    budget: "$10,000+",
    timeline: "1–2 months",
    projectDescription: "Interested in developing a custom RAG search interface to query internal medical PDF documentation securely.",
    status: "Qualified",
    internalNotes: "Technical discovery meeting scheduled.",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(initialLeads, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error("Error initializing leads storage:", err);
  }
}

export function getLeads() {
  ensureFileExists();
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return initialLeads;
  }
}

export function addLead(leadData) {
  ensureFileExists();
  const leads = getLeads();
  const newLead = {
    id: `lead_${Date.now()}`,
    name: leadData.name || '',
    email: leadData.email || '',
    company: leadData.company || '',
    phone: leadData.phone || '',
    service: leadData.service || 'Custom Software',
    budget: leadData.budget || 'Custom',
    timeline: leadData.timeline || 'Flexible',
    projectDescription: leadData.projectDescription || '',
    features: leadData.features || [],
    status: 'New',
    internalNotes: '',
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error saving lead:", err);
  }
  return newLead;
}

export function updateLeadStatus(id, newStatus, newNotes) {
  ensureFileExists();
  const leads = getLeads();
  const leadIndex = leads.findIndex(l => l.id === id);
  if (leadIndex !== -1) {
    if (newStatus) leads[leadIndex].status = newStatus;
    if (newNotes !== undefined) leads[leadIndex].internalNotes = newNotes;
    try {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
      return leads[leadIndex];
    } catch (err) {
      console.error("Error updating lead status:", err);
    }
  }
  return null;
}

export function deleteLead(id) {
  ensureFileExists();
  let leads = getLeads();
  leads = leads.filter(l => l.id !== id);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error deleting lead:", err);
    return false;
  }
}
