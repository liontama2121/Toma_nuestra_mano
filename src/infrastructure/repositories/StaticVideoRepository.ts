import { Video } from '@/domain/entities/Video';
import { IVideoRepository } from '@/domain/repositories/IVideoRepository';

// IDs obtenidos del canal https://www.youtube.com/@tomanuestramano
// Para agregar más videos: añadir objetos { id, title } con el ID del video de YouTube
const videos: Video[] = [
  { id: 'TiUXXV65txo', title: 'Misión Espacial Colombia' },
  { id: '6Euce9xdD9Y', title: 'Expedición Misión Espacial Colombia' },
  { id: 'U4J1RKwJo2E', title: 'Inglés en las Tablas' },
  { id: 'A0J9NsDtGUE', title: 'Yo Decido Cuando' },
];

export class StaticVideoRepository implements IVideoRepository {
  async getAll(): Promise<Video[]> {
    return videos;
  }
}
