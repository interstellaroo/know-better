import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
    @ApiProperty({ example: 'TestUser123@test.com'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'TestPassword@123' })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}