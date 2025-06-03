import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class UrlAssessmentDto {
    @ApiProperty({ example: "https://www.bbc.com/news/articles/c1w387gr30ro" })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;
}