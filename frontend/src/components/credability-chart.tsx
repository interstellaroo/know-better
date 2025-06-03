"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

interface CredibilityChartProps {
  aiScore: number;
  domainScore: number;
  factScore: number;
  overallScore: number;
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"]; // AI, Domain, Fact

export default function CredibilityChart({
  aiScore,
  domainScore,
  factScore,
  overallScore,
}: CredibilityChartProps) {
  const total = aiScore + domainScore + factScore;
  const normalizedData =
    total > 0
      ? [
          { name: "AI", value: aiScore / total },
          { name: "Domain", value: domainScore / total },
          { name: "Fact-check", value: factScore / total },
        ]
      : [];

  return (
    <Card className="p-6 flex flex-col items-center justify-center w-full max-w-md mx-auto shadow-xl rounded-2xl">
      <div className="relative">
        <PieChart width={300} height={300}>
          <Pie
            data={normalizedData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={80}
            paddingAngle={2}
            label={({ name }) => name}
            startAngle={90}
            endAngle={-270}
          >
            {normalizedData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) =>
              [`${(value * 100).toFixed(0)}%`, name]
            }
          />
        </PieChart>

        {/* Centralny wynik */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-sm text-muted">Overall</div>
            <div className="text-3xl font-bold">
              {(overallScore * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
