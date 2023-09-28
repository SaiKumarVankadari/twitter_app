import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LoggerService } from 'src/logger.service';

@Injectable()
export class CronsService {
    constructor(private readonly xapp: LoggerService){}
    // private readonly logger = new Logger(CronsService.name);
    @Cron('*/10 */30 10-19 * * *')
  handleCron() {
    this.xapp.debug('hey there! I am your CRON JOB at 10th second for every 10 minutes');
  }
}
