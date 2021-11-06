import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import {
  elasticsearchConfig,
  ElasticSearchConfig,
  ELASTICSEARCH_CONFIG_KEY,
} from 'src/config';

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
export class SharedModule {}
