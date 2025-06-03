export interface AnalysisResult {
  id: string;
  title: string;
  domainScore: number;

  aiAnalysis: {
    label: number;
    confidence: number;
  };

  contentAnalysis: {
    hasClaims: boolean;
    claims: any[];
  };

  overallScore: number;
  createdAt: string;
}
