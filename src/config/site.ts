/**
 * Single source of truth for business details shown across the site.
 *
 * EDITABLE DEFAULTS: every value in `business` was supplied as a default on
 * 5 Oct 2026 and must be confirmed by Manoj before the Razorpay website review.
 *
 * PLACEHOLDERS: entries in `placeholders` render with a visible amber
 * highlight (<Placeholder>) and are listed by `npm run check:placeholders`.
 * Set `value` and flip `confirmed: true` to publish the real text.
 */

export const business = {
  brand: 'Curiosta',
  brandMark: 'Curiosta™', // ™ not ®: hardware trade-mark registration not yet granted
  legalName: 'Sahukar Consultancy', // EDITABLE
  constitution: 'Sole proprietorship', // EDITABLE
  proprietor: 'Manoj Kumar Sahukar', // EDITABLE
  gstin: '06FPRPS8300Q1ZW', // EDITABLE (Haryana). Odisha GSTIN 21FPRPS8300Q1Z4 intentionally not shown.
  gstState: 'Haryana',
  address: {
    // EDITABLE: registered / principal place of business
    line1: 'WeWork HD-240, Two Horizon Centre',
    line2: 'DLF Phase 5',
    city: 'Gurugram',
    state: 'Haryana',
    pin: '122002',
    country: 'India',
  },
  email: 'info@curiosta.com', // EDITABLE
  phoneDisplay: '+91-9438643108', // EDITABLE
  phoneHref: 'tel:+919438643108',
  hours: 'Monday to Friday, 10:00 to 18:00 IST (excluding public holidays)', // EDITABLE
  quoteResponse: '3 working days', // EDITABLE: promised turnaround for a formal quotation
  quotationValidityDays: 30, // EDITABLE
  refundProcessingDays: 7, // EDITABLE: business days from refund approval to initiation
  grievance: {
    name: 'Manoj Kumar Sahukar', // EDITABLE
    designation: 'Grievance Officer',
    email: 'info@curiosta.com', // EDITABLE
    phoneDisplay: '+91-9438643108',
    confirmed: false, // PENDING: Manoj to confirm he is the named grievance officer
  },
  jurisdiction: 'Gurugram, Haryana', // EDITABLE
  policiesEffective: '5 October 2026', // EDITABLE: update when policies are finalised
} as const;

export const fullAddress = [
  business.address.line1,
  business.address.line2,
  `${business.address.city}, ${business.address.state} ${business.address.pin}`,
  business.address.country,
];

export type PlaceholderKey = keyof typeof placeholders;

export const placeholders = {
  dispatchTime: {
    label: 'dispatch time',
    confirmed: false,
    value: '', // e.g. 'within 3 business days of order confirmation for in-stock items'
    fallback: 'Dispatch time: to be confirmed',
  },
  deliveryTime: {
    label: 'courier delivery estimate',
    confirmed: false,
    value: '', // e.g. '2 to 7 business days after dispatch, depending on PIN code'
    fallback: 'Delivery estimate after dispatch: to be confirmed',
  },
  shippingRates: {
    label: 'shipping rates',
    confirmed: false,
    value: '', // e.g. 'Free above ₹10,000; otherwise ₹150 per order within India (incl. GST)'
    fallback: 'Shipping charges: to be confirmed',
  },
  returnsWindow: {
    label: 'returns window',
    confirmed: false,
    value: '', // e.g. '7 days from delivery'
    fallback: 'Returns window: to be confirmed',
  },
  damageReportWindow: {
    label: 'transit-damage reporting window',
    confirmed: false,
    value: '', // e.g. '48 hours of delivery'
    fallback: 'Reporting window for transit damage: to be confirmed',
  },
} satisfies Record<string, { label: string; confirmed: boolean; value: string; fallback: string }>;

export const nav = [
  { href: '/products/', label: 'Products' },
  { href: '/custom-design-manufacturing/', label: 'Custom design & manufacture' },
  { href: '/components/', label: 'Components desk' },
  { href: '/how-to-buy/', label: 'How to buy' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const policyLinks = [
  { href: '/terms-and-conditions/', label: 'Terms & Conditions' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/shipping-policy/', label: 'Shipping Policy' },
  { href: '/cancellation-and-refunds/', label: 'Cancellation & Refunds' },
  { href: '/grievance-redressal/', label: 'Grievance Redressal' },
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}
