export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";
export type TicketStatus =
  | "requested"
  | "contacted"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";


export type QuoteStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "approved"
  | "declined"
  | "expired";


export interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  sort_order: number;
  active: boolean;
}


export interface Lead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  zip: string | null;
  place_id: string | null;
  lat: number | null;
  lng: number | null;
  service_interest: string | null;
  message: string | null;
  status: LeadStatus;
  source: string | null;
  created_at: string;
}


export type ContactType = "homeowner" | "contractor" | "property_manager" | "vendor";


export type PreferredContactMethod = "call" | "text" | "email";


export interface Contact {
  id: string;
  contact_type: ContactType;
  first_name: string;
  last_name: string | null;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  secondary_phone: string | null;
  secondary_email: string | null;
  preferred_contact_method: PreferredContactMethod | null;
  do_not_contact: boolean;
  do_not_text: boolean;
  referral_source: string | null;
  tags: string[];
  notes: string | null;
  created_at: string;
}


export type PoolType = "inground" | "above_ground";
export type PoolConstruction = "gunite" | "vinyl_liner" | "fiberglass";


export interface Location {
  id: string;
  place_id: string | null;
  formatted_address: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  county: string | null;
  lat: number | null;
  lng: number | null;
  // Pool overview
  pool_type: PoolType | null;
  pool_construction: PoolConstruction | null;
  pool_gallons: number | null;
  length_ft: number | null;
  width_ft: number | null;
  avg_depth_ft: number | null;
  deep_end_depth_ft: number | null;
  // Equipment
  pump_brand: string | null;
  pump_model: string | null;
  filter_type: string | null;
  filter_brand: string | null;
  heater_brand: string | null;
  heater_model: string | null;
  has_salt_system: boolean;
  automation_system: string | null;
  has_safety_cover: boolean;
  safety_cover_brand: string | null;
  liner_installed_date: string | null;
  // Access
  gate_code: string | null;
  lockbox_code: string | null;
  has_dog: boolean;
  access_notes: string | null;
  // Property management
  hoa_name: string | null;
  property_manager_name: string | null;
  property_manager_phone: string | null;
  notes: string | null;
  created_at: string;
}


export interface Quote {
  id: string;
  ticket_id: string;
  quote_number: string;
  access_code: string;
  status: QuoteStatus;
  subtotal: number;
  deposit_required: boolean;
  deposit_amount: number | null;
  deposit_paid: boolean;
  deposit_paid_at: string | null;
  sent_at: string | null;
  viewed_at: string | null;
  approved_at: string | null;
  declined_at: string | null;
  notes: string | null;
  created_at: string;
}


export interface QuoteLineItem {
  id: string;
  quote_id: string;
  description: string;
  quantity: number;
  unit_amount: number;
  sort_order: number;
}


export interface Ticket {
  id: string;
  ticket_number: string;
  location_id: string | null;
  contact_id: string | null;
  lead_id: string | null;
  service_id: string | null;
  service_note: string | null;
  description: string | null;
  status: TicketStatus;
  scheduled_date: string | null;
  completed_date: string | null;
  access_code: string;
  internal_notes: string | null;
  technician_notes: string | null;
  accounting_notes: string | null;
  created_at: string;
}


// Row shape returned by the `ticket_overview` view — a ticket flattened
// with its location and primary/billing contact, for the admin dashboard.
export interface TicketOverviewRow extends Ticket {
  location_formatted_address: string | null;
  location_line1: string | null;
  location_city: string | null;
  primary_contact_id: string | null;
  primary_contact_first_name: string | null;
  primary_contact_last_name: string | null;
  primary_contact_phone: string | null;
  primary_contact_email: string | null;
  billing_contact_first_name: string | null;
  billing_contact_last_name: string | null;
  billing_contact_company: string | null;
  location_state: string | null;
  location_zip: string | null;
  field_job_id: string | null;
  field_job_status: string | null;
  field_job_date: string | null;
}


export interface RetailPackage {
  id: string;
  slug: string;
  name: string;
  kind: "opening" | "closing" | "combo" | string;
  amount_cents: number;
  visit_count: number;
  active: boolean;
  sort_order: number;
}

export interface RetailAddon {
  id: string;
  slug: string;
  name: string;
  amount_cents: number | null;
  opening_amount_cents: number | null;
  closing_amount_cents: number | null;
  active: boolean;
  sort_order: number;
}
