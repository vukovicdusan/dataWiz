"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import type { CaseStudyChartData } from "@/lib/caseStudies";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutABProps = {
  chart?: CaseStudyChartData;
};

const fallbackChart: CaseStudyChartData = {
  labels: ["Normal Users", "Use Tracking Prevention"],
  values: [68, 32],
  colors: ["#3b82f6", "#ef4444"],
  offsets: [0, 50],
  cutout: "55%",
};

export default function DonutExploded({ chart = fallbackChart }: DoughnutABProps) {
  const data: ChartData<"doughnut"> = {
    labels: chart.labels,
    datasets: [
      {
        data: chart.values,
        backgroundColor: chart.colors ?? ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"],
        hoverOffset: 6,
        offset: chart.offsets,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    cutout: chart.cutout ?? "55%",
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` } },
    },
  };

  return <Doughnut data={data} options={options} />;
}
