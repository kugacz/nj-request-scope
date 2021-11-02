import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { requestScopeFactory } from './util/request.scope.factory';
import { REQUEST_PROVIDER } from './constants';
import { RequestScopeMiddleware } from './util/request.scope.middleware';

@Module({
    providers: [
        {
            provide: REQUEST_PROVIDER,
            useFactory: requestScopeFactory,
        },
    ],
    exports: [REQUEST_PROVIDER],
})
export class RequestScopeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(RequestScopeMiddleware).forRoutes('*');
    }
}
