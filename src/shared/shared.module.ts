import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  elasticsearchConfig,
  ElasticSearchConfig,
  ELASTICSEARCH_CONFIG_KEY,
} from 'src/config';
import { Todo } from 'src/todo/entities';

const ormModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: process.env.DB_TYPE as any,
    url: `${process.env.DB_URI}/${process.env.DB_NAME}`,
    entities: [Todo],
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            rejectUnauthorized: false,
          }
        : false,
  }),
});
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
  imports: [CqrsModule, ormModule, configModule, esModule],
  exports: [ElasticsearchModule, CqrsModule],
})
export class SharedModule {}
