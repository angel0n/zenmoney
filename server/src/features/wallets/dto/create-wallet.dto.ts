import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateWalletDto {
    @IsNumber()
    @IsNotEmpty()
    currencyId: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    balance: number

    @IsString()
    @IsNotEmpty()
    name: string
}
