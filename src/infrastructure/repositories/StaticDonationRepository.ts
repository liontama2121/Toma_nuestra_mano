import { DonationAmount } from '@/domain/entities/DonationAmount';
import { IDonationRepository } from '@/domain/repositories/IDonationRepository';

const amounts: DonationAmount[] = [
  { id: '10k', amount: 10000, label: '$10.000', isPopular: false, isCustom: false },
  { id: '25k', amount: 25000, label: '$25.000', isPopular: false, isCustom: false },
  { id: '50k', amount: 50000, label: '$50.000', isPopular: true, isCustom: false },
  { id: '100k', amount: 100000, label: '$100.000', isPopular: false, isCustom: false },
  { id: '250k', amount: 250000, label: '$250.000', isPopular: false, isCustom: false },
  { id: 'custom', amount: null, label: 'Otro valor', isPopular: false, isCustom: true },
];

export class StaticDonationRepository implements IDonationRepository {
  async getAmounts(): Promise<DonationAmount[]> {
    return amounts;
  }
}
