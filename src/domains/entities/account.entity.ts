import { MoneyEntity } from './money.entity';
import { ActivityWindowEntity } from './activity-window.entity';
import { ActivityEntity } from './activity.entity';

export type AccountId = string;

export class AccountEntity {

  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity,
    private readonly _activityWindow: ActivityWindowEntity
  ) {}


  get id(): AccountId {
    return this._id;
  }

  get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  get activityWindow(): ActivityWindowEntity {
    return this._activityWindow;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this._baseLineBalance,
      this._activityWindow.calculateBalance(this._id)
    )
  }

  public withdraw(money: MoneyEntity, targetAccountId: AccountId, ): boolean {
    if(!this._mayWithdrawMoney(money)) {
      return false;
    }
    const withdrawal: ActivityEntity = new ActivityEntity(
      this._id,
      targetAccountId,
      new Date,
      money
      )

    this._activityWindow.addActivity(withdrawal);
    return true;
  }

  private _mayWithdrawMoney(money: MoneyEntity) {
    return MoneyEntity.add(this.calculateBalance(), money.negate()).isPositiveOrZero();
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId): boolean {
    const deposit: ActivityEntity = new ActivityEntity(
      this._id,
      sourceAccountId,
      new Date,
      money
    )

    this._activityWindow.addActivity(deposit);
    return true;
  }
}
