import React, { useState, useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { defaultSpacing } from '../../constants';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DataSummaryGraph = () => {
    const [renderTime, setRenderTime] = useState(0);
    const chartRef = useRef(null);
    const startTime = useRef(new Date());

    useEffect(() => {
        const endTime = new Date();
        setRenderTime(endTime - startTime.current);
    }, []);

    const limit = 50000;
    let y = 100;
    const dataPoints = [];

    for (let i = 0; i < limit; i += 1) {
        y += Math.round(Math.random() * 10 - 5);
        dataPoints.push({
            x: i,
            y: y
        });
    }

    const data = [{
        type: "line",
        dataPoints: dataPoints
    }];

    const options = {
        backgroundColor: "#1e1e1e",
        zoomEnabled: true,
        animationEnabled: true,
        title: {
            text: "Whisper Traders Stock Rates",
            fontColor: "#ffffff"
        },
        axisX: {
            labelFontColor: "#ffffff",
            gridColor: "#4f4f4f",
            lineColor: "#4f4f4f",
        },
        axisY: {
            labelFontColor: "#ffffff",
            gridColor: "#4f4f4f",
            lineColor: "#4f4f4f",
        },
        data: data  // random data
    };

    return (
        <div style={{marginBottom:"32px"}}>
            <CanvasJSChart options={options}
                onRef={ref => chartRef.current = ref} />
        </div>
    );
};

export default DataSummaryGraph;
