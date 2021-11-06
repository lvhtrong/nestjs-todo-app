import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Todo } from '../../entities';
import { SearchTodoQuery } from './search-todo.query';

@QueryHandler(SearchTodoQuery)
export class SearchTodoQueryHandler
  implements IQueryHandler<SearchTodoQuery, Todo[]> {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async execute(query: SearchTodoQuery): Promise<Todo[]> {
    const response = await this.elasticsearchService.search({
      index: 'todo',
      body: {
        query: {
          bool: {
            must: {
              term: {
                type: 'todo',
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
