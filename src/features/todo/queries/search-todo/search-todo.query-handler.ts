import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ES_DOCUMENT_TYPE, ES_INDEX_NAME } from 'src/shared';
import { Todo } from '../../entities';
import { SearchTodoQuery } from './search-todo.query';

@QueryHandler(SearchTodoQuery)
export class SearchTodoQueryHandler
  implements IQueryHandler<SearchTodoQuery, Todo[]> {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(ES_INDEX_NAME)
    private readonly esIndex: string,

    @Inject(ES_DOCUMENT_TYPE)
    private readonly esDocumentType: string,
  ) {}

  async execute(query: SearchTodoQuery): Promise<Todo[]> {
    const response = await this.elasticsearchService.search({
      index: this.esIndex,
      body: {
        query: {
          bool: {
            must: {
              term: {
                type: this.esDocumentType,
              },
            },
          },
        },
      },
    });
    const items: any[] = response.body.hits.hits;
    return items.map(item => item._source.todo);
  }
}
