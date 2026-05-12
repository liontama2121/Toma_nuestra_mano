import { Video } from '@/domain/entities/Video';
import { IVideoRepository } from '@/domain/repositories/IVideoRepository';

export class GetVideosUseCase {
  constructor(private readonly repo: IVideoRepository) {}

  async execute(): Promise<Video[]> {
    return this.repo.getAll();
  }
}
