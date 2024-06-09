import React, { useRef, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedBarChart = () => {
    const chartRef = useRef(null);

    const toggleDataSeries = (e) => {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chartRef.current.render();
    };

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor: "#1e1e1e",
        title: {
            text: "Operating Expenses of Whisper Traders",
            fontFamily: "verdana",
            fontColor: "#ffffff"
        },
        axisY: {
            title: "in Eur",
            includeZero: true,
            prefix: "€",
            suffix: "k",
            labelFontColor: "#ffffff",
            titleFontColor: "#ffffff",
            gridColor: "#4f4f4f",
            lineColor: "#4f4f4f",
        },
        axisX: {
            labelFontColor: "#ffffff",
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f",
        },
        toolTip: {
            shared: true,
            reversed: true,
            fontColor: "#ffffff",
            backgroundColor: "#333333"
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            itemclick: toggleDataSeries,
            fontColor: "#ffffff"
        },
        data: [
            {
                type: "stackedColumn",
                name: "General",
                showInLegend: true,
                yValueFormatString: "#,###k",
                dataPoints: [
                    { label: "Jan", y: 14 },
                    { label: "Feb", y: 12 },
                    { label: "Mar", y: 14 },
                    { label: "Apr", y: 13 },
                    { label: "May", y: 13 },
                    { label: "Jun", y: 13 },
                    { label: "Jul", y: 14 },
                    { label: "Aug", y: 14 },
                    { label: "Sept", y: 13 },
                    { label: "Oct", y: 14 },
                    { label: "Nov", y: 14 },
                    { label: "Dec", y: 14 }
                ]
            },
            {
                type: "stackedColumn",
                name: "Marketing",
                showInLegend: true,
                yValueFormatString: "#,###k",
                dataPoints: [
                    { label: "Jan", y: 13 },
                    { label: "Feb", y: 13 },
                    { label: "Mar", y: 15 },
                    { label: "Apr", y: 16 },
                    { label: "May", y: 17 },
                    { label: "Jun", y: 17 },
                    { label: "Jul", y: 18 },
                    { label: "Aug", y: 18 },
                    { label: "Sept", y: 17 },
                    { label: "Oct", y: 18 },
                    { label: "Nov", y: 18 },
                    { label: "Dec", y: 18 }
                ]
            }
        ]
    };

    useEffect(() => {
        // Perform any additional setup or cleanup here if needed
    }, []);

    return (
        <div style={{marginBottom:"32px"}}>
            <CanvasJSChart options={options}
                onRef={ref => chartRef.current = ref}
            />
        </div>
    );
};

export default StackedBarChart;
