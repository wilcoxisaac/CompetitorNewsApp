import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const NewsCard = ({ article, compact = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const openArticle = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={openArticle}
      activeOpacity={0.7}
    >
      {!compact && (
        <View style={styles.header}>
          <View style={styles.competitorBadge}>
            {article.competitorLogo && (
              <Image
                source={{ uri: article.competitorLogo }}
                style={styles.competitorLogo}
                resizeMode="contain"
              />
            )}
            <Text style={styles.competitorText}>{article.competitor}</Text>
          </View>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      )}

      {compact && (
        <View style={styles.compactHeader}>
          <Text style={styles.source}>{article.source?.name || 'Unknown Source'}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      )}

      <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
        {article.title}
      </Text>

      {!compact && (
        <Text style={styles.source}>{article.source?.name || 'Unknown Source'}</Text>
      )}

      <View style={[styles.summaryContainer, compact && styles.summaryContainerCompact]}>
        <Text style={styles.summaryLabel}>AI Summary</Text>
        <Text style={styles.summary}>{article.aiSummary || article.description}</Text>
      </View>

      <Text style={styles.tapToRead}>Tap to read full article</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardCompact: {
    marginVertical: 4,
    padding: 12,
    borderRadius: 8,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleCompact: {
    fontSize: 15,
    marginBottom: 8,
  },
  summaryContainerCompact: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  competitorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  competitorLogo: {
    width: 18,
    height: 18,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: '#FFFFFF',
  },
  competitorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    color: '#999',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 22,
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  summaryContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007AFF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  tapToRead: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'right',
  },
});

export default NewsCard;
