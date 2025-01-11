# nj-request-scope
Performant request scope dependency injection for NestJS framework using express server

## Description
nj-request-scope library solves NestJs request-scope dependency injection problems:
* bubbling up the injection chain - [NestJS documentation](https://docs.nestjs.com/fundamentals/injection-scopes#scope-hierarchy)
* request-scope performance issues - [NestJS documentation](https://docs.nestjs.com/fundamentals/injection-scopes#performance)

This solution is based on the build-in javascript Proxy design pattern. For every request, only the proxy's target object is changed to the new request-scope instance instead of creating all injection chain objects.

## Installation
```console
npm install nj-request-scope
```

There are also a few peer dependencies that have to be satisfied:
```json
    "@nestjs/common": ">8.0.0",
    "@nestjs/core": ">8.0.0",
    "@nestjs/platform-express": ">8.0.0",
    "express-http-context": "^1.2.4",
    "reflect-metadata": "^0.1.12",
    "rxjs": "^7.1.0"
```
**Especially `express-http-context` which is not required by NestJS by default.** 

nj-request-scope was tested with NestJs 8.x & 9.x & 10.x

## Usage
To use nj-request-scope in NestJS module you have to add import of ```RequestScopeModule``` in the module class decorator:
```typescript
import { RequestScopeModule } from 'nj-request-scope';

@Module({
    imports: [RequestScopeModule],
})
```

Next, there are two ways of using nj-request-scope.

1. Inject express request object into class constructor with ```NJRS_REQUEST``` token:
```typescript
import { NJRS_REQUEST } from 'nj-request-scope';
[...]
constructor(@Inject(NJRS_REQUEST) private readonly request: Request) {}
```

2. Change class inject scope to request-scope with ```@RequestScope()``` decorator:
```typescript
import { RequestScope } from 'nj-request-scope';

@Injectable()
@RequestScope()
export class RequestScopeService {
```

## Limitations
Proxy handler implements only most common methods: 
* ```get``` 
* ```has``` 
* ```set```
* ```getPrototypeOf```
* ```getOwnPropertyDescriptor```
* ```ownKeys```

If you need other methods implemented please feel free to contribute. 
[ProxyHandler implementation](https://github.com/kugacz/nj-request-scope/blob/main/src/util/dynamic.object.handler.factory.ts)

## Example project
[https://github.com/kugacz/nj-request-scope-example](https://github.com/kugacz/nj-request-scope-example)

## License
nj-request-scope is [MIT licensed](LICENSE).
