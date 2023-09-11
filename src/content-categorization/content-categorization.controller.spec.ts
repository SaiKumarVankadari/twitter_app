import { Test, TestingModule } from '@nestjs/testing';
import { ContentCategorizationController } from './content-categorization.controller';

describe('ContentCategorizationController', () => {
  let controller: ContentCategorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentCategorizationController],
    }).compile();

    controller = module.get<ContentCategorizationController>(ContentCategorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
