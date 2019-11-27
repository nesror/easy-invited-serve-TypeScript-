// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInterceptor from '../../../app/middleware/interceptor';

declare module 'egg' {
  interface IMiddleware {
    interceptor: typeof ExportInterceptor;
  }
}
