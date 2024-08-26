import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingResolver } from './meeting.resolver';
import { Meeting } from './entities/meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingResolver, MeetingService],
})
export class MeetingModule {}
