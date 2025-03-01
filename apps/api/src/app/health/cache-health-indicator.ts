import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { CacheService } from '../shared/services/cache';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheServiceHealthIndicator extends HealthIndicator {
  private INDICATOR_KEY = 'cacheService';
  constructor(private cacheService: CacheService) {
    super();
  }
  async isHealthy(): Promise<HealthIndicatorResult> {
    if (this.cacheService.cacheEnabled()) {
      return this.getStatus(this.INDICATOR_KEY, true);
    }

    throw new HealthCheckError('Cache Health', this.getStatus(this.INDICATOR_KEY, false));
  }
}
