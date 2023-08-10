import { Injectable } from '@nestjs/common';

interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getHome() {
    return 'Hello Nestjs';
  }
}
