import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from '@/modules/user/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [AuthModule, UserModule],
})
export class ProductsModule {}
