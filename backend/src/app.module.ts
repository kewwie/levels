import { GuildsModule } from './guilds/guilds.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Everything TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data/datasource';

// TypeORM Currently not in use

@Module({
    imports: [
        GuildsModule, 
        AuthModule, 
        TypeOrmModule.forRoot(dataSourceOptions),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
