import { IsNotEmpty, IsString } from "class-validator";

export class TextAssessmentDto {
    @IsNotEmpty()
    @IsString()
    text: string;
}