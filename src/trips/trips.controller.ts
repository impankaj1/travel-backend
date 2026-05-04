// src/trips/trips.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createTrip(@Body() body: CreateTripDto, @CurrentUser() user: any) {
    return this.tripsService.createTrip(body, user.id);
  }

  @Get()
  getTrips() {
    return this.tripsService.getTrips();
  }

  @Get(':id')
  getTrip(@Param('id') id: string) {
    return this.tripsService.getTripById(id);
  }
}
