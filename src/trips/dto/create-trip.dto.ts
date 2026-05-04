// src/trips/dto/create-trip.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  destination: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
