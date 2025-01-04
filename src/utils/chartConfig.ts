interface ChartOptions {
    value: number;
    title: string;
}

export const getColorBasedOnValue = (value: number): string => {
    if (value >= 0 && value <= 49) return "#FF0000";
    if (value >= 50 && value <= 89) return "#FFA500";
    if (value >= 90 && value <= 100) return "#00FF00";
    return "#000000";
};

export const getChartOptions = ({ value, title }: ChartOptions) => ({
    series: [value],
    chart: {
        height: 200,
        type: "radialBar",
        offsetY: -10,
    },
    colors: [getColorBasedOnValue(value)],
    plotOptions: {
        radialBar: {
            track: { show: false },
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: {
                    fontSize: "32px",
                    color: "#000000",
                    offsetY: 120,
                },
                value: {
                    offsetY: 76,
                    fontSize: "22px",
                    color: "#ffffff",
                    formatter: (val: number) => `${val.toFixed(1)}%`,
                },
            },
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
        },
    },
    stroke: { dashArray: 3 },
    labels: [title],
}); 