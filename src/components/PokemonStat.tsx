import { Bar } from "react-chartjs-2";
import type { Stat } from "../types/pokemon";
import { useRef } from "react";
import "chart.js/auto";

interface PokemonStatProps {
  stats: Stat[];
}

const PokemonStat: React.FC<PokemonStatProps> = ({ stats }) => {
  const chartRef = useRef(null);

  const data = {
    labels: stats.map(
      (stat) =>
        stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1),
    ),
    datasets: [
      {
        label: "Base Stat",
        data: stats.map((stat) => stat.base_stat),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        max: 255,
        ticks: {
          color: "#4B5563",
        },
      },
      y: {
        ticks: {
          color: "#1F2937",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <>
      <Bar
        ref={chartRef}
        data={data}
        height={400}
        width={600}
        options={options}
      />
    </>
  );
};

export default PokemonStat;
