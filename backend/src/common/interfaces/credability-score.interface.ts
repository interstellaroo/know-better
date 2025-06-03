import { AIServiceResponse } from "./ai-service-response.interface";
import { ContentAnalysisResponse } from "./content-analysis-response.interface";

export interface CredabilityScore {
    title: string;
    domain_analysis: number;
    content_analysis: ContentAnalysisResponse;
    ai_analysis: AIServiceResponse | null;
    overall_score: number;
}