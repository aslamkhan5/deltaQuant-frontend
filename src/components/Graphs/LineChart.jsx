import React, { useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = () => {
    const chartRef = useRef(null);

    const options = {
        backgroundColor: "#1e1e1e",
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Bounce Rate by Week of Year",
            fontColor: "#ffffff"
        },
        axisY: {
            title: "Bounce Rate",
            suffix: "%",
            labelFontColor: "#ffffff",
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f",
            titleFontColor: "#ffffff"
        },
        axisX: {
            title: "Week of Year",
            prefix: "W",
            interval: 2,
            labelFontColor: "#ffffff",
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f",
            titleFontColor: "#ffffff"
        },
        data: [{
            type: "line",
            toolTipContent: "Week {x}: {y}%",
            dataPoints: [
                { x: 1, y: 64 },
                { x: 2, y: 61 },
                { x: 3, y: 64 },
                { x: 4, y: 62 },
                { x: 5, y: 64 },
                { x: 6, y: 60 },
                { x: 7, y: 58 },
                { x: 8, y: 59 },
                { x: 9, y: 53 },
                { x: 10, y: 54 },
                { x: 11, y: 61 },
                { x: 12, y: 60 },
                { x: 13, y: 55 },
                { x: 14, y: 60 },
                { x: 15, y: 56 },
                { x: 16, y: 60 },
                { x: 17, y: 59.5 },
                { x: 18, y: 63 },
                { x: 19, y: 58 },
                { x: 20, y: 54 },
                { x: 21, y: 59 },
                { x: 22, y: 64 },
                { x: 23, y: 59 }
            ]
        }]
    };

    return (
        <div style={{marginBottom:"32px"}}>
            <CanvasJSChart options={options}
                onRef={ref => chartRef.current = ref}
            />
        </div>
    );
}

export default LineChart;
