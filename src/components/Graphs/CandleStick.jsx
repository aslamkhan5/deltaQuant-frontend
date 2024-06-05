import React, { useEffect, useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CandleStick = ({ options, data, onRef }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.render();
        }
    }, [data]);

    return (
        <div>
            <CanvasJSChart options={options} onRef={ref => {
                chartRef.current = ref;
                if (onRef) onRef(ref);
            }} />
        </div>
    );
};

export default CandleStick;
