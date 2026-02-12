import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedFilter } from './exceptions/filters/UnauthorizedFilter';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundFilter } from './exceptions/filters/NotFoundFilter';
import { ConflictFilter } from './exceptions/filters/ConflictFilter';
import { InvalidArgumentFilter } from './exceptions/filters/InvalidArgumentFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new UnauthorizedFilter(),
    new NotFoundFilter(),
    new ConflictFilter(),
    new InvalidArgumentFilter()
  );

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: 422 }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
