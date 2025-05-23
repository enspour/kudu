import { Injectable } from '@nestjs/common';

import { MkNotFoundError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import {
  CreatableUser,
  CreatableUserCredentials,
  UpdatableUser,
} from '@kong/domain';

import { UserEventsService } from '@kong/msrv-feature-user-events';

import { UserEntity } from '@kong/msrv-data-access-entities';

import { UserCredentialsService } from './user-credentials.service';

@Injectable()
export class UsersService {
  constructor(
    private postgresService: MkPostgresService,
    private userEventsService: UserEventsService,
    private userCredentialsService: UserCredentialsService,
  ) {}

  public async get(uuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(UserEntity, { where: { uuid } });
  }

  public async create(
    data: CreatableUser,
    credentials: CreatableUserCredentials,
  ) {
    return await this.postgresService.startTransaction(async () => {
      const manager = this.postgresService.ManagerInTransaction;

      const user = await manager.save(UserEntity, data);
      await this.userCredentialsService.create(credentials, user);

      this.userEventsService.notifyUserCreated(user);

      return user;
    });
  }

  public async update(data: UpdatableUser) {
    const manager = this.postgresService.ManagerInTransaction;

    const found = await manager.findOne(UserEntity, {
      where: { uuid: data.uuid },
    });

    if (!found) {
      throw new MkNotFoundError('Пользователь не найден!');
    }

    const user = await manager.save(UserEntity, data);

    this.userEventsService.notifyUserUpdated(user);

    return user;
  }

  public async remove(uuid: string) {
    const user = await this.postgresService.Manager.findOne(UserEntity, {
      where: { uuid },
    });

    if (!user) {
      throw new MkNotFoundError('Пользователь не найден!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(UserEntity, uuid);

    this.userEventsService.notifyUserRemoved(user);

    return user;
  }
}
