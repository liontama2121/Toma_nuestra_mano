import { DonationAmount } from '@/domain/entities/DonationAmount';
import { IDonationRepository } from '@/domain/repositories/IDonationRepository';

export class GetDonationAmountsUseCase {
  constructor(private readonly repo: IDonationRepository) {}

  async execute(): Promise<DonationAmount[]> {
    return this.repo.getAmounts();
  }
}
