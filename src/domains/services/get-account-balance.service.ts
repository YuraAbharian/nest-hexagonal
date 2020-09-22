import { GetAccountBalanceQuery } from '../ports/in/get-account-balance.query';
import { AccountId } from '../entities/account.entity';
import { LoadAccountPort } from '../ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort
  ) {};

  get loadAccountPort(): LoadAccountPort {
    return this._loadAccountPort;
  };

  getAccountBalance(accountId: AccountId) {
    this.loadAccountPort.loadAccount(accountId).calculateBalance();
  };
}
