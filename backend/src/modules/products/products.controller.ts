import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { ENDPOINTS } from '@/common/constants/endpoints.constant';
import { API_OPERATION } from '@/common/constants/docs.constant';

@ApiTags(ENDPOINTS.PRODUCT.BASE)
@Controller(ENDPOINTS.PRODUCT.BASE)
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation(API_OPERATION.PRODUCT.CREATE)
  @Post(ENDPOINTS.PRODUCT.CREATE)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(ENDPOINTS.PRODUCT.FIND_MANY)
  @ApiOperation(API_OPERATION.PRODUCT.FIND_MANY)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(ENDPOINTS.PRODUCT.FIND_ONE)
  @ApiOperation(API_OPERATION.PRODUCT.FIND_ONE)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(ENDPOINTS.PRODUCT.UPDATE)
  @ApiOperation(API_OPERATION.PRODUCT.UPDATE)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(ENDPOINTS.PRODUCT.REMOVE)
  @ApiOperation(API_OPERATION.PRODUCT.REMOVE)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
