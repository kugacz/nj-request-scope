import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { requestScopeFactory } from './util/request.scope.factory';
import { NJRS_REQUEST } from './constants';
import { RequestScopeMiddleware } from './util/request.scope.middleware';

@Module({
    providers: [
        {
            provide: NJRS_REQUEST,
            useFactory: requestScopeFactory,
        },
    ],
    exports: [NJRS_REQUEST],
})
export class RequestScopeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(RequestScopeMiddleware).forRoutes('*');
    }
}
