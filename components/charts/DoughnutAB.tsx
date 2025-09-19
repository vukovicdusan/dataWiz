"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Normal Users", "Use Tracking Prevention"],
  datasets: [
    {
      data: [68, 32],
      backgroundColor: ["#3b82f6", "#ef4444"],
      hoverOffset: 6,
      cutout: "55%",

      offset: [0, 50],
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: { position: "bottom" },
    tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` } },
  },
};

export default function DonutExploded() {
  return <Doughnut data={data} options={options} />;
}
