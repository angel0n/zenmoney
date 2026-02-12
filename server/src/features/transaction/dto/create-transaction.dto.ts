import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    type: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    amount: number

    @IsNumber()
    categoryId: number

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsOptional()
    fromWalletId: number

    @IsNumber()
    @IsOptional()
    toWalletId: number
}
