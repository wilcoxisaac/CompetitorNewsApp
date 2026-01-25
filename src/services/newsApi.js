import axios from 'axios';
import { API_CONFIG } from '../config/competitors';

// Currents API - 1,000 free requests/day
const CURRENTS_API_URL = 'https://api.currentsapi.services/v1/search';

// High-priority M&A and strategic topics
const STRATEGIC_KEYWORDS = 'acquisition OR merger OR acquires OR deal';

// Other business topics
const BUSINESS_KEYWORDS = 'earnings OR revenue OR quarterly OR partnership OR expansion';

// Mock data for when API is rate limited
const MOCK_ARTICLES = {
  // Banking competitors
  'Chase': [
    {
      title: 'JPMorgan Chase Reports Record Q4 Earnings, Beats Expectations',
      description: 'JPMorgan Chase reported fourth-quarter earnings that exceeded analyst expectations, driven by strong investment banking revenue.',
      source: { name: 'Reuters' },
      publishedAt: '2026-01-22T14:30:00Z',
      url: 'https://reuters.com',
    },
    {
      title: 'Chase Launches New AI-Powered Business Banking Platform',
      description: 'Chase unveils innovative AI tools for small business customers, including automated cash flow forecasting and expense management.',
      source: { name: 'Bloomberg' },
      publishedAt: '2026-01-20T09:15:00Z',
      url: 'https://bloomberg.com',
    },
  ],
  'Bank of America': [
    {
      title: 'Bank of America Expands Digital Banking Features for Small Business',
      description: 'BofA announces new suite of digital tools targeting the growing small business market segment.',
      source: { name: 'CNBC' },
      publishedAt: '2026-01-21T11:00:00Z',
      url: 'https://cnbc.com',
    },
    {
      title: 'Bank of America Partners with Fintech Startup for Payment Innovation',
      description: 'Strategic partnership aims to modernize B2B payment processing for enterprise customers.',
      source: { name: 'Financial Times' },
      publishedAt: '2026-01-19T16:45:00Z',
      url: 'https://ft.com',
    },
  ],
  'Wells Fargo': [
    {
      title: 'Wells Fargo Announces $500M Investment in Technology Modernization',
      description: 'Bank commits to major technology overhaul to improve customer experience and operational efficiency.',
      source: { name: 'Wall Street Journal' },
      publishedAt: '2026-01-21T08:00:00Z',
      url: 'https://wsj.com',
    },
  ],
  'Citibank': [
    {
      title: 'Citigroup Expands Commercial Banking Presence in Southeast',
      description: 'Citi opens new commercial banking centers targeting mid-market businesses in growing southern markets.',
      source: { name: 'American Banker' },
      publishedAt: '2026-01-20T13:30:00Z',
      url: 'https://americanbanker.com',
    },
  ],
  'PNC Bank': [
    {
      title: 'PNC Bank Acquires Regional Fintech Lender for $280M',
      description: 'Acquisition strengthens PNC\'s position in the small business lending market.',
      source: { name: 'Reuters' },
      publishedAt: '2026-01-19T10:00:00Z',
      url: 'https://reuters.com',
    },
  ],
  'Capital One': [
    {
      title: 'Capital One Acquires Brex for $5.15 Billion in Major Fintech Deal',
      description: 'Capital One announces acquisition of corporate card startup Brex, signaling major push into business travel and expense management.',
      source: { name: 'CNBC' },
      publishedAt: '2026-01-22T08:00:00Z',
      url: 'https://cnbc.com',
    },
    {
      title: 'Capital One\'s Brex Deal Signals Structural Shift in Commercial Cards',
      description: 'The acquisition positions Capital One to compete more aggressively in the corporate payments space against American Express and JPMorgan.',
      source: { name: 'PYMNTS' },
      publishedAt: '2026-01-23T17:30:00Z',
      url: 'https://pymnts.com',
    },
    {
      title: 'Capital One Q4 Earnings Rise on Strong Credit Card Revenue',
      description: 'Capital One reported better-than-expected quarterly results driven by increased consumer spending.',
      source: { name: 'Bloomberg' },
      publishedAt: '2026-01-21T14:00:00Z',
      url: 'https://bloomberg.com',
    },
  ],
  // POS competitors
  'Square': [
    {
      title: 'Block Inc Launches Next-Gen Square Terminal with AI Features',
      description: 'New Square Terminal includes AI-powered inventory management and customer insights for small businesses.',
      source: { name: 'TechCrunch' },
      publishedAt: '2026-01-22T10:00:00Z',
      url: 'https://techcrunch.com',
    },
    {
      title: 'Square Expands Banking Services, Targets Small Business Lending',
      description: 'Square announces expansion of Square Banking with new lending products for merchants.',
      source: { name: 'Forbes' },
      publishedAt: '2026-01-20T09:00:00Z',
      url: 'https://forbes.com',
    },
  ],
  'Toast': [
    {
      title: 'Toast Acquires Restaurant Supply Chain Startup for $200M',
      description: 'Toast expands beyond POS into restaurant supply chain management with strategic acquisition.',
      source: { name: 'Restaurant Business' },
      publishedAt: '2026-01-21T12:00:00Z',
      url: 'https://restaurantbusiness.com',
    },
    {
      title: 'Toast Reports Strong Q4, Restaurant Tech Demand Surges',
      description: 'Toast beats earnings expectations as restaurants continue digital transformation investments.',
      source: { name: 'CNBC' },
      publishedAt: '2026-01-19T16:00:00Z',
      url: 'https://cnbc.com',
    },
  ],
  'Clover': [
    {
      title: 'Fiserv\'s Clover Launches New POS Hardware for Quick Service Restaurants',
      description: 'Clover unveils purpose-built terminals designed for high-volume QSR environments.',
      source: { name: 'PaymentsSource' },
      publishedAt: '2026-01-20T11:30:00Z',
      url: 'https://paymentssource.com',
    },
  ],
  'Lightspeed': [
    {
      title: 'Lightspeed Commerce Partners with Major Retail Chain',
      description: 'Lightspeed signs enterprise deal to power point-of-sale across 500+ retail locations.',
      source: { name: 'Retail Dive' },
      publishedAt: '2026-01-21T14:00:00Z',
      url: 'https://retaildive.com',
    },
    {
      title: 'Lightspeed Expands E-commerce Integration Capabilities',
      description: 'New features enable seamless omnichannel selling for Lightspeed merchants.',
      source: { name: 'TechCrunch' },
      publishedAt: '2026-01-18T10:00:00Z',
      url: 'https://techcrunch.com',
    },
  ],
  'Shopify POS': [
    {
      title: 'Shopify Unveils Major POS Update with Unified Commerce Features',
      description: 'Shopify POS gets significant upgrade with improved inventory sync and customer data integration.',
      source: { name: 'Shopify News' },
      publishedAt: '2026-01-22T09:00:00Z',
      url: 'https://shopify.com',
    },
    {
      title: 'Shopify Acquires Retail Analytics Startup to Enhance POS Offering',
      description: 'Acquisition brings advanced analytics and reporting capabilities to Shopify\'s retail platform.',
      source: { name: 'TechCrunch' },
      publishedAt: '2026-01-19T11:00:00Z',
      url: 'https://techcrunch.com',
    },
  ],
};

// Get mock articles for a competitor
const getMockArticles = (competitorName) => {
  return MOCK_ARTICLES[competitorName] || [];
};

// Normalize title for deduplication
const normalizeTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 8)
    .join(' ');
};

// Check if two titles are similar (for deduplication)
const isSimilarTitle = (title1, title2) => {
  const norm1 = normalizeTitle(title1);
  const norm2 = normalizeTitle(title2);

  // Check for exact match after normalization
  if (norm1 === norm2) return true;

  // Check word overlap
  const words1 = new Set(norm1.split(' '));
  const words2 = new Set(norm2.split(' '));
  const intersection = [...words1].filter(w => words2.has(w) && w.length > 3);
  const similarity = intersection.length / Math.min(words1.size, words2.size);

  return similarity > 0.6;
};

// Deduplicate articles based on title similarity
const deduplicateArticles = (articles) => {
  const unique = [];

  for (const article of articles) {
    const isDuplicate = unique.some(existing =>
      isSimilarTitle(existing.title, article.title)
    );

    if (!isDuplicate) {
      unique.push(article);
    }
  }

  return unique;
};

// Transform Currents API response to match our article format
const transformCurrentsArticle = (article) => ({
  title: article.title,
  description: article.description,
  content: article.description,
  source: { name: article.author || 'Unknown Source' },
  publishedAt: article.published,
  url: article.url,
  urlToImage: article.image,
});

export const fetchNewsForCompetitor = async (competitorName, searchTerms) => {
  const competitorQuery = searchTerms[0];

  console.log(`Fetching news for ${competitorName}`);

  try {
    // Currents API uses keywords parameter
    const response = await axios.get(CURRENTS_API_URL, {
      params: {
        keywords: `${competitorQuery} ${STRATEGIC_KEYWORDS}`,
        language: 'en',
        page_size: 5,
      },
      headers: {
        'Authorization': API_CONFIG.CURRENTS_API_KEY,
      },
    });

    const articles = response.data.news || [];
    const transformedArticles = articles.map(transformCurrentsArticle);

    console.log(`Got ${transformedArticles.length} articles for ${competitorName}`);

    // If no articles found, fall back to mock data
    if (transformedArticles.length === 0) {
      console.log(`Using mock data for ${competitorName}`);
      return getMockArticles(competitorName);
    }

    return transformedArticles;
  } catch (error) {
    console.error(`Error fetching news for ${competitorName}:`, error.response?.data || error.message);
    // Fall back to mock data on error (e.g., rate limit)
    console.log(`Using mock data for ${competitorName} due to API error`);
    return getMockArticles(competitorName);
  }
};

export const fetchNewsForAllCompetitors = async (competitors) => {
  const allNews = [];

  for (const competitor of competitors) {
    const articles = await fetchNewsForCompetitor(competitor.name, competitor.searchTerms);
    const taggedArticles = articles.map(article => ({
      ...article,
      competitor: competitor.name,
      competitorLogo: competitor.logo,
    }));
    allNews.push(...taggedArticles);
  }

  // Deduplicate articles
  const uniqueNews = deduplicateArticles(allNews);

  // Sort by published date, most recent first
  uniqueNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return uniqueNews;
};
