import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class ListOrderValidator {
  @IsNotEmpty()
  @IsOptional()
  @IsIn(['description', 'amount', 'value'])
  @ApiProperty({ required: false, enum: ['description', 'amount', 'value'] })
  public orderBy: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public page: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public pageSize: number;
}
