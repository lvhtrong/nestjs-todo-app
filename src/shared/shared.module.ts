import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {
  elasticsearchConfig,
  ElasticSearchConfig,
  ELASTICSEARCH_CONFIG_KEY,
} from 'src/config';
import { ES_INDEX_NAME } from './constants';

const esModule = ElasticsearchModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const esConfig = configService.get<ElasticSearchConfig>(
      ELASTICSEARCH_CONFIG_KEY,
    );
    return {
      node: esConfig.uri,
    };
  },
});
const configModule = ConfigModule.forRoot({
  load: [elasticsearchConfig],
});

@Global()
@Module({
  imports: [CqrsModule, configModule, esModule],
  exports: [ElasticsearchModule, CqrsModule],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      imports: [ConfigModule.forFeature(elasticsearchConfig)],
      providers: [
        {
          provide: ES_INDEX_NAME,
          inject: [ConfigService],
          useFactory: (configService: ConfigService): string => {
            const esConfig = configService.get<ElasticSearchConfig>(
              ELASTICSEARCH_CONFIG_KEY,
            );
            return esConfig.index;
          },
        },
      ],
      exports: [ES_INDEX_NAME],
    };
  }
}
