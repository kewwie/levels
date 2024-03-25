/*
https://docs.nestjs.com/modules
*/

import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

// GET = Read
// POST = Create
// PATCH = Modify
// PUT = Replace
// DELETE = Delete

@Module({
  imports: [],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer.apply().forRoutes(
                { path: '/guilds', method: RequestMethod.POST },
                { path: '/guilds', method: RequestMethod.PATCH },
                { path: '/guilds', method: RequestMethod.DELETE },
            );
        }
}
