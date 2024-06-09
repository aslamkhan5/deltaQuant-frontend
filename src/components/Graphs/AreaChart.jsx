import React, { useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const AreaChart = () => {
    const chartRef = useRef(null);

    const generateDataPoints = (noOfDps) => {
        let xVal = 1;
        let yVal = 100;
        const dps = [];
        for (let i = 0; i < noOfDps; i++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            dps.push({ x: xVal, y: yVal });
            xVal++;
        }
        return dps;
    };

    const options = {
        // theme: "dark2", // Changed to dark theme
        backgroundColor: "#1e1e1e",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Stock Prices",
            fontColor: "#ffffff"
        },
        axisX: {
            labelFontColor: "#ffffff",
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f",
        },
        axisY: {
            labelFontColor: "#ffffff",
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f",
        },
        data: [{
            type: "area",
            dataPoints: generateDataPoints(500)
        }]
    };

    return (
        <div  style={{marginBottom:"32px"}}>
            <CanvasJSChart options={options}
                onRef={ref => chartRef.current = ref}
            />
        </div>
    );
};

export default AreaChart;
