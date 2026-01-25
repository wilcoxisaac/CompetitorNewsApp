// Competitor lists for tracking news

export const BANKING_COMPETITORS = [
  { name: 'Chase', searchTerms: ['JPMorgan Chase', 'Chase Bank'], logo: 'https://www.google.com/s2/favicons?domain=chase.com&sz=128' },
  { name: 'Bank of America', searchTerms: ['Bank of America', 'BofA'], logo: 'https://www.google.com/s2/favicons?domain=bankofamerica.com&sz=128' },
  { name: 'Wells Fargo', searchTerms: ['Wells Fargo'], logo: 'https://www.google.com/s2/favicons?domain=wellsfargo.com&sz=128' },
  { name: 'Citibank', searchTerms: ['Citigroup', 'Citibank'], logo: 'https://www.google.com/s2/favicons?domain=citi.com&sz=128' },
  { name: 'PNC Bank', searchTerms: ['PNC Bank', 'PNC Financial'], logo: 'https://www.google.com/s2/favicons?domain=pnc.com&sz=128' },
  { name: 'Capital One', searchTerms: ['Capital One'], logo: 'https://www.google.com/s2/favicons?domain=www.capitalone.com&sz=128' },
];

export const POS_COMPETITORS = [
  { name: 'Square', searchTerms: ['Square POS', 'Square payments', 'Block Inc Square'], logo: 'https://www.google.com/s2/favicons?domain=squareup.com&sz=128' },
  { name: 'Toast', searchTerms: ['Toast POS', 'Toast restaurant'], logo: 'https://www.google.com/s2/favicons?domain=toasttab.com&sz=128' },
  { name: 'Clover', searchTerms: ['Clover POS', 'Clover payments'], logo: 'https://www.google.com/s2/favicons?domain=clover.com&sz=128' },
  { name: 'Lightspeed', searchTerms: ['Lightspeed POS', 'Lightspeed Commerce'], logo: 'https://www.google.com/s2/favicons?domain=lightspeedhq.com&sz=128' },
  { name: 'Shopify POS', searchTerms: ['Shopify POS', 'Shopify point of sale'], logo: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=128' },
];

// API Configuration - Replace with your own keys
export const API_CONFIG = {
  // Currents API - 1,000 free requests/day (10x more than NewsAPI)
  // Get your free API key at: https://currentsapi.services/en
  CURRENTS_API_KEY: 'YOUR_CURRENTS_API_KEY_HERE',
  // Get from https://platform.openai.com
  OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE',
};
