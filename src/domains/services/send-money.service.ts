import { LoadAccountPort } from '../ports/out/load-account.port';
import { SendMoneyUseCase } from '../ports/in/send-money.use-case';
import { SendMoneyCommand } from '../ports/in/send-money.command';
import { UpdateAccountStatePort } from '../ports/out/update-account-state.port';
import { AccountEntity } from '../entities/account.entity';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountStatePort,
  ) {}

  get loadAccountPort(): LoadAccountPort {
    return this._loadAccountPort;
  }

  get updateAccountStatePort(): UpdateAccountStatePort {
    return this._updateAccountStatePort;
  }

  sendMoney({targetAccountId, sourceAccountId, money}: SendMoneyCommand) {
      const sourceAccount: AccountEntity = this.loadAccountPort.loadAccount(sourceAccountId);
      const targetAccount: AccountEntity = this.loadAccountPort.loadAccount(targetAccountId);

      if(!sourceAccount.withdraw(money, targetAccount.id)) {
        return false;
      }
      if(!targetAccount.deposit(money, sourceAccount.id)) {
        return false;
      }

      this.updateAccountStatePort.updateActivities(sourceAccount);
      this.updateAccountStatePort.updateActivities(targetAccount);
  }
}
