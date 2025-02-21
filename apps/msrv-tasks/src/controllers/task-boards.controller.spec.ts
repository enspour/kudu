import { Test, TestingModule } from '@nestjs/testing';
import { TaskBoardsController } from './task-boards.controller';

describe('TaskBoardsController', () => {
  let controller: TaskBoardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskBoardsController],
    }).compile();

    controller = module.get<TaskBoardsController>(TaskBoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
