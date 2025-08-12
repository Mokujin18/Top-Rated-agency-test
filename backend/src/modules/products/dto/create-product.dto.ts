import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Awesome T-Shirt',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'URL of the product image',
  })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'TSHIRT-BLK-LG', description: 'Stock Keeping Unit' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 29.99, description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 100,
    description: 'Available quantity of the product',
  })
  @IsInt()
  @Min(0)
  quantity: number;
}
