import { AccountId } from '../../entities/account.entity';

export interface LoadAccountPort {
  loadAccount(account: AccountId);
}
