import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronsService {
    constructor(){}
    private readonly logger = new Logger();
    @Cron('*/10 */30 10-17 * * *')
  handleCron() {
    this.logger.debug('hey there! I am your CRON JOB at 10th second for every 10 minutes');
  }
}
