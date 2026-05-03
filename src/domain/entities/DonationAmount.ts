export interface DonationAmount {
  id: string;
  amount: number | null;
  label: string;
  isPopular: boolean;
  isCustom: boolean;
}
