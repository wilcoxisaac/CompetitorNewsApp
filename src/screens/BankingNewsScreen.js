import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, RefreshControl, Text, StyleSheet } from 'react-native';
import { BANKING_COMPETITORS } from '../config/competitors';
import { fetchNewsForAllCompetitors } from '../services/newsApi';
import { summarizeArticlesWithDelay, generateImpactAnalysis } from '../services/openai';
import CompetitorSection from '../components/CompetitorSection';
import LoadingSpinner from '../components/LoadingSpinner';

const BUSINESS_CONTEXT = 'U.S. Bank';

const BankingNewsScreen = () => {
  const [groupedArticles, setGroupedArticles] = useState({});
  const [impactAnalyses, setImpactAnalyses] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadNews = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Fetch news for all banking competitors
      const rawArticles = await fetchNewsForAllCompetitors(BANKING_COMPETITORS);

      if (rawArticles.length === 0) {
        setGroupedArticles({});
        setError('No news articles found. Check your API key.');
        return;
      }

      // Summarize articles with AI (limit to first 15 to avoid rate limits)
      const articlesToSummarize = rawArticles.slice(0, 15);
      const summarizedArticles = await summarizeArticlesWithDelay(articlesToSummarize);

      // Group articles by competitor
      const grouped = {};
      for (const article of summarizedArticles) {
        const competitor = article.competitor;
        if (!grouped[competitor]) {
          grouped[competitor] = [];
        }
        grouped[competitor].push(article);
      }
      setGroupedArticles(grouped);

      // Generate impact analyses for each competitor
      const analyses = {};
      for (const competitor of BANKING_COMPETITORS) {
        if (grouped[competitor.name] && grouped[competitor.name].length > 0) {
          const analysis = await generateImpactAnalysis(
            competitor.name,
            grouped[competitor.name],
            BUSINESS_CONTEXT
          );
          analyses[competitor.name] = analysis;
        }
      }
      setImpactAnalyses(analyses);

    } catch (err) {
      console.error('Error loading news:', err);
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = useCallback(() => {
    loadNews(true);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading banking news..." />;
  }

  const hasArticles = Object.keys(groupedArticles).length > 0;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>U.S. Bank Competitor Intelligence</Text>
        <Text style={styles.headerSubtitle}>
          Tracking strategic moves from key competitors
        </Text>
      </View>

      {!hasArticles && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {error || 'No news articles available'}
          </Text>
          <Text style={styles.emptySubtext}>Pull down to refresh</Text>
        </View>
      )}

      {BANKING_COMPETITORS.map((competitor) => (
        <CompetitorSection
          key={competitor.name}
          competitor={competitor}
          articles={groupedArticles[competitor.name] || []}
          businessContext={BUSINESS_CONTEXT}
          impactAnalysis={impactAnalyses[competitor.name]}
        />
      ))}

      <View style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  footer: {
    height: 40,
  },
});

export default BankingNewsScreen;
