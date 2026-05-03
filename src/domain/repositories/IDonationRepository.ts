import { DonationAmount } from '../entities/DonationAmount';

export interface IDonationRepository {
  getAmounts(): Promise<DonationAmount[]>;
}
