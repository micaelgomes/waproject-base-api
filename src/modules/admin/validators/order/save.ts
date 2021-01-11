import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { IOrder } from 'modules/database/interfaces/order';

export class SaveOrderValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: true, type: 'integer' })
  public id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: true, type: 'integer' })
  public userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1020)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 1020 })
  public description: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: true, type: 'integer' })
  public amount: number;

  @IsNotEmpty()
  // @IsDecimal()
  @ApiProperty({ required: true, type: 'integer' })
  public value: number;
}
