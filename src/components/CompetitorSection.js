import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NewsCard from './NewsCard';

const CompetitorSection = ({ competitor, articles, businessContext, impactAnalysis }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.competitorInfo}>
          {competitor.logo && (
            <Image
              source={{ uri: competitor.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          )}
          <Text style={styles.competitorName}>{competitor.name}</Text>
        </View>
      </View>

      {impactAnalysis && (
        <View style={styles.impactContainer}>
          <Text style={styles.impactLabel}>Impact on {businessContext}</Text>
          <Text style={styles.impactText}>{impactAnalysis}</Text>
        </View>
      )}

      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} compact />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  competitorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#F0F0F0',
  },
  competitorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  impactContainer: {
    backgroundColor: '#FFF8E7',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F5A623',
  },
  impactLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B8860B',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  impactText: {
    fontSize: 14,
    color: '#5D4E37',
    lineHeight: 20,
  },
});

export default CompetitorSection;
