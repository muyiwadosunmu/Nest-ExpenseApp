import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';


export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    readonly amount:number

    @IsNotEmpty()
    @IsString()
    readonly source: string
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly amount:number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly source: string
}



// export class UpdateReportDto extends PartialType(CreateReportDto) {

// }
