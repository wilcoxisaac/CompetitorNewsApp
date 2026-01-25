import axios from 'axios';
import { API_CONFIG } from '../config/competitors';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const summarizeArticle = async (title, description, content) => {
  const textToSummarize = content || description || title;

  if (!textToSummarize) {
    return 'No content available to summarize.';
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a competitive intelligence analyst. Summarize news in 2-3 sentences, focusing on: acquisitions/mergers, financial performance, new product launches, market expansion, new customer segments, technology innovations, or strategic partnerships. Highlight competitive implications.',
          },
          {
            role: 'user',
            content: `Analyze this competitor news for strategic insights:\n\nTitle: ${title}\n\nContent: ${textToSummarize.slice(0, 1500)}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0]?.message?.content || 'Unable to generate summary.';
  } catch (error) {
    console.error('Error summarizing article:', error.message);

    // Return truncated description as fallback
    if (description) {
      return description.length > 200 ? description.slice(0, 200) + '...' : description;
    }
    return 'Summary unavailable.';
  }
};

export const summarizeArticlesWithDelay = async (articles, delayMs = 500) => {
  const summarizedArticles = [];

  for (const article of articles) {
    const summary = await summarizeArticle(
      article.title,
      article.description,
      article.content
    );

    summarizedArticles.push({
      ...article,
      aiSummary: summary,
    });

    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  return summarizedArticles;
};

// Generate business impact analysis for a competitor
export const generateImpactAnalysis = async (competitorName, articles, ourBusiness) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const articleSummaries = articles
    .slice(0, 3)
    .map(a => `- ${a.title}`)
    .join('\n');

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a strategic business analyst for ${ourBusiness}. Analyze competitor news and provide a concise 2-3 sentence assessment of how these developments could impact ${ourBusiness}'s business. Focus on competitive threats, market opportunities, or strategic responses needed.`,
          },
          {
            role: 'user',
            content: `Analyze how these ${competitorName} developments might impact ${ourBusiness}:\n\n${articleSummaries}`,
          },
        ],
        max_tokens: 150,
        temperature: 0.6,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('Error generating impact analysis:', error.message);
    return getDefaultImpactAnalysis(competitorName, articles, ourBusiness);
  }
};

// Fallback impact analysis when API fails
const getDefaultImpactAnalysis = (competitorName, articles, ourBusiness) => {
  const impactTemplates = {
    // Banking impacts on U.S. Bank
    'Chase': `JPMorgan Chase's continued investment in technology and market expansion poses competitive pressure on ${ourBusiness}'s market share in commercial banking and digital services.`,
    'Bank of America': `Bank of America's digital banking initiatives and small business focus directly compete with ${ourBusiness}'s core customer segments.`,
    'Wells Fargo': `Wells Fargo's technology modernization efforts could improve their competitive positioning against ${ourBusiness} in retail and commercial banking.`,
    'Citibank': `Citigroup's commercial banking expansion in growing markets may impact ${ourBusiness}'s ability to win new business clients.`,
    'PNC Bank': `PNC's fintech acquisitions and lending focus represent increasing competition in ${ourBusiness}'s small business banking segment.`,
    'Capital One': `Capital One's strategic acquisitions and push into business services signals aggressive expansion that could threaten ${ourBusiness}'s commercial card and business banking market share.`,
    // POS impacts on talech
    'Square': `Square's expansion of AI-powered tools and banking services creates integrated competition that could challenge ${ourBusiness}'s position with small business merchants.`,
    'Toast': `Toast's vertical integration in restaurant technology and supply chain poses a threat to ${ourBusiness}'s restaurant POS market share.`,
    'Clover': `Clover's new hardware and Fiserv backing provide strong distribution advantages that ${ourBusiness} must counter with differentiated features.`,
    'Lightspeed': `Lightspeed's enterprise partnerships and omnichannel capabilities represent competitive pressure in ${ourBusiness}'s target mid-market segment.`,
    'Shopify POS': `Shopify's unified commerce approach and brand strength pose significant competition for ${ourBusiness} among retail merchants seeking integrated solutions.`,
  };

  return impactTemplates[competitorName] || `${competitorName}'s recent activities warrant close monitoring for potential impacts on ${ourBusiness}'s market position.`;
};
