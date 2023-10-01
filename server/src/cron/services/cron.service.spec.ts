import { CronService } from './cron.service';
import * as fs from 'fs';

describe('Cron service', () => {
  const cronService = new CronService();

  it('should run cleanupImages cron job successfully', () => {
    cronService.cleanupImages();

    const files = fs.readdirSync('uploads/');
    expect(files.length).toBe(0);
  });
});
