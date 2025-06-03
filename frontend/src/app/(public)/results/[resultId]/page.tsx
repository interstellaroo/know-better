"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CredibilityChart from "@/components/credability-chart";

interface AnalysisResult {
  id: string;
  title: string;
  domainScore: number;
  overallScore: number;
  aiAnalysis?: {
    label: number;
    confidence: number;
  };
  contentAnalysis?: {
    hasClaims: boolean;
    claims: any[];
  };
}

export default function ResultDetails({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const { resultId } = useParams();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resultId) return;

    const fetchResult = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/results/${resultId}`
        );
        if (!res.ok) throw new Error("API response not OK");
        const json = await res.json();
        setResult(json);
      } catch (err) {
        console.error("Failed to fetch result", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!result) return <p className="text-center p-10">No result found.</p>;

  const aiScore = result.aiAnalysis
    ? result.aiAnalysis.label === 1
      ? result.aiAnalysis.confidence
      : 1 - result.aiAnalysis.confidence
    : 0;

  const factScore = result.contentAnalysis?.hasClaims ? 1 : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex justify-center border-b border-accent">
      <div className="w-full max-w-7xl p-6 space-y-6">
        <h1 className="text-2xl font-bold">Analysis Result</h1>
        <Separator />

        <CredibilityChart
          aiScore={aiScore}
          domainScore={result.domainScore}
          factScore={factScore}
          overallScore={result.overallScore / 100}
        />

        <Card>
          <CardContent className="p-6 space-y-4">
            <p>
              <strong>Title:</strong> {result.title}
            </p>
            {result.aiAnalysis && (
              <p>
                <strong>AI Analysis:</strong> Label = {result.aiAnalysis.label},
                Confidence = {result.aiAnalysis.confidence.toFixed(2)}
              </p>
            )}
            <p>
              <strong>Domain Score:</strong> {result.domainScore}
            </p>
            <p>
              <strong>Has Fact-Checks:</strong>{" "}
              {result.contentAnalysis?.hasClaims ? "Yes" : "No"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
