import { registerAs } from '@nestjs/config';

export const ELASTICSEARCH_CONFIG_KEY = 'config.es';

export type ElasticSearchConfig = {
  uri: string;
  index: string;
};

export const elasticsearchConfig = registerAs(
  ELASTICSEARCH_CONFIG_KEY,
  (): ElasticSearchConfig => ({
    uri: process.env.ES_URI,
    index: process.env.ES_INDEX,
  }),
);
