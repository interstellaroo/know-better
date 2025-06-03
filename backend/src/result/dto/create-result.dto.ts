import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateResultDto {
  @IsString()
  title: string;

  @IsNumber()
  domainScore: number;

  @IsObject()
  aiAnalysis: {
    label: number;
    confidence: number;
  };

  @IsObject()
  contentAnalysis: {
    hasClaims: boolean;
  };
  
  @IsArray()
  claims: any[];

  @IsNumber()
  overallScore: number;
}
