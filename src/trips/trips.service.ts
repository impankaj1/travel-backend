// src/trips/trips.service.ts
import { PrismaService } from '../prisma/prisma.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async createTrip(data: CreateTripDto, userId: string) {
    return this.prisma.trip.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async getTrips() {
    return this.prisma.trip.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTripById(id: string) {
    return this.prisma.trip.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }
}
