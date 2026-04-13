export interface HVACService {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  parts: string[];
  estimated_hours: number;
  parts_cost: number;
  labour_rate: number;
  total_price: number;
}

export interface EmbeddedService extends HVACService {
  embedding: number[];
}

export interface Extraction {
  brand: string | null;
  system_type: string | null;
  issues: string[];
  services_needed: string[];
  age_years: number | null;
  urgency: 'low' | 'medium' | 'high';
  notes: string;
  search_query: string;
}

export interface QuoteLineItem {
  service: string;
  parts: string[];
  parts_cost: number;
  labour_cost: number;
  total: number;
}

export interface QuoteTier {
  tier: 'Good' | 'Better' | 'Best';
  label: string;
  description: string;
  line_items: QuoteLineItem[];
  subtotal: number;
  gst: number;
  total: number;
  recommended?: boolean;
}

export interface QuoteResult {
  extraction: Extraction;
  searchQuery: string;
  tiers: QuoteTier[];
  disclaimer: string;
}

export type AppState = 'idle' | 'listening' | 'processing' | 'done' | 'error';
