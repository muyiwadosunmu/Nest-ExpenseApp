import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
// import { PartialType } from '@nestjs/mapped-types';
import { ReportType } from 'src/data/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly amount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly source: string;
}

// export class UpdateReportDto extends PartialType(CreateReportDto) {

// }
export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
