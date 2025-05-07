import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'FrodoBaggins@shire.mo'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'ToMordorAndBack@123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}