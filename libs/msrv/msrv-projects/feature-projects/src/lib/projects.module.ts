import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { Module } from '@nestjs/common';

import { ProjectsService } from './services/projects.service';

import { ProjectEntity } from './entities';

@Module({
  imports: [PostgresModule.forFeature([ProjectEntity])],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
