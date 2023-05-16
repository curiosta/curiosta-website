interface Country {
  id: number;
  iso_2: string;
  iso_3: string;
  num_code: number;
  name: string;
  display_name: string;
  region_id: string;
}

interface PaymentProvider {
  id: string;
  is_installed: boolean;
}

interface FulfillmentProvider {
  id: string;
  is_installed: boolean;
}

export interface Regions {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  currency_code: string;
  tax_rate: number;
  tax_code: string | null;
  gift_cards_taxable: boolean;
  automatic_taxes: boolean;
  tax_provider_id: string | null;
  metadata: any;
  countries: Country[];
  payment_providers: PaymentProvider[];
  fulfillment_providers: FulfillmentProvider[];
}
