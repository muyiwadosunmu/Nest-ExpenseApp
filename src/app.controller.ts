import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode
} from '@nestjs/common';
import { AppService } from './app.service';
import { v4 as uuid } from 'uuid';

import { ReportType, data } from './data/data';
import { report } from 'process';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType); // Added 'return' here
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const report = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    return report;
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body
    }

    return data.report[reportIndex]
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('id') id: string
  ) {
    const reportIndex =  data.report.findIndex(report => report.id === id);
 
    if(reportIndex === -1) return

    data.report.splice(reportIndex,1)

    return;
  } 
}
