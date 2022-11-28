export abstract class CronAbstract {
    public async run(): Promise<void> {
      if (this.canRun()) await this.execute();
    }
    protected abstract execute(): Promise<void>;
    protected abstract canRun(): Boolean;
  }
  