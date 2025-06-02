import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';
import { HistoryModule } from './history/history.module';
import { AnalyticsModule } from './analytics/analytics.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('DATABASE_URL'),
        synchronize: true,
        entities: [User],
      }),
    }),
    UserModule, 
    AuthModule, AnalyticsModule, HistoryModule, AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
