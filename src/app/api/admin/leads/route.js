import { NextResponse } from 'next/server';
import { getLeads, updateLeadStatus, deleteLead } from '@/data/leadsStore';

export async function GET(request) {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, internalNotes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID required' }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status, internalNotes);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID required' }, { status: 400 });
    }

    const deleted = deleteLead(id);

    return NextResponse.json({ success: deleted }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}
