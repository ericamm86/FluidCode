import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#cbd5e1", boxWidth: 10, boxHeight: 10 }
    },
    tooltip: {
      backgroundColor: "#0f151b",
      borderColor: "#26313d",
      borderWidth: 1,
      titleColor: "#f8fafc",
      bodyColor: "#cbd5e1"
    }
  },
  scales: {
    x: {
      grid: { color: "rgba(148, 163, 184, 0.08)" },
      ticks: { color: "#8f9bab" }
    },
    y: {
      min: 0,
      max: 10,
      grid: { color: "rgba(148, 163, 184, 0.10)" },
      ticks: { color: "#8f9bab", stepSize: 2 }
    }
  }
};

export function EmotionLineChart({ title, data = [], period = "semanal" }) {
  const labels = data.map((item) => item.label);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Humor",
        data: data.map((item) => item.humor),
        borderColor: "#2dd4bf",
        backgroundColor: "rgba(45, 212, 191, 0.16)",
        tension: 0.35,
        fill: true
      },
      {
        label: "Estresse",
        data: data.map((item) => item.estresse),
        borderColor: "#fb7185",
        backgroundColor: "rgba(251, 113, 133, 0.10)",
        tension: 0.35
      },
      {
        label: "Energia",
        data: data.map((item) => item.energia),
        borderColor: "#fbbf24",
        backgroundColor: "rgba(251, 191, 36, 0.12)",
        tension: 0.35
      }
    ]
  };

  return (
    <section className="panel min-h-[20rem] min-w-0 p-4 sm:min-h-[22rem] sm:p-5">
      <div className="mb-5 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="w-fit rounded-full border border-line px-3 py-1 text-xs text-muted">{period}</span>
      </div>
      <div className="h-64 sm:h-72">
        {data.length ? <Line options={baseOptions} data={chartData} /> : <EmptyChart />}
      </div>
    </section>
  );
}

export function CrisisBarChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Crises",
        data: data.map((item) => item.total),
        backgroundColor: "#fb7185",
        borderRadius: 8
      }
    ]
  };

  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        max: undefined,
        ticks: { color: "#8f9bab", precision: 0 }
      }
    }
  };

  return (
    <section className="panel min-h-[20rem] min-w-0 p-4 sm:min-h-[22rem] sm:p-5">
      <h2 className="mb-5 text-lg font-semibold text-white">Crises por horario</h2>
      <div className="h-64 sm:h-72">
        {data.length ? <Bar options={options} data={chartData} /> : <EmptyChart />}
      </div>
    </section>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-full place-items-center rounded-lg border border-dashed border-line text-center text-sm text-muted">
      Nenhum dado suficiente para exibir o grafico.
    </div>
  );
}
