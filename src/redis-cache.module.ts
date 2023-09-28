import { Module, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { memoryStore } from 'cache-manager';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: (): CacheModuleOptions => ({
        store: memoryStore,
        // max: 50,
        ttl: 60,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
