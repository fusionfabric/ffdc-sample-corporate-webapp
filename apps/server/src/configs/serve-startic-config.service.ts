import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ServeStaticModuleOptionsFactory,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';
import { join } from 'path';

@Injectable()
export class ServiceStaticConfigService
  implements ServeStaticModuleOptionsFactory {
  appFolder = join(__dirname, '../../..', 'dist/apps/client');

  constructor(private configService: ConfigService) {}

  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [
      {
        rootPath: this.appFolder,
      },
    ];
  }
}
