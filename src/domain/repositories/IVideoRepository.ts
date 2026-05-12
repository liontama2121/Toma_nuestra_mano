import { Video } from '../entities/Video';

export interface IVideoRepository {
  getAll(): Promise<Video[]>;
}
