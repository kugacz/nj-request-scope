import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
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
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this, @typescript-eslint/no-explicit-any
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(RequestScopeMiddleware).forRoutes('*');
    }
}
