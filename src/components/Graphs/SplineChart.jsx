import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = () => {
    const options = {
        backgroundColor: "#1e1e1e", // Dark background
        animationEnabled: true,
        title: {
            text: "Monthly Sales - 2024",
            fontColor: "#ffffff" // White text for the title
        },
        axisX: {
            valueFormatString: "MMM",
            labelFontColor: "#ffffff", // White labels on X-axis
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f"
        },
        axisY: {
            title: "Sales (in USD)",
            prefix: "$",
            labelFontColor: "#ffffff", // White labels on Y-axis
            titleFontColor: "#ffffff", // White title on Y-axis
            lineColor: "#4f4f4f",
            tickColor: "#4f4f4f"
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            lineColor: "red", // Red line color
            dataPoints: [
                { x: new Date(2017, 0), y: 25060 },
                { x: new Date(2017, 1), y: 27980 },
                { x: new Date(2017, 2), y: 42800 },
                { x: new Date(2017, 3), y: 32400 },
                { x: new Date(2017, 4), y: 35260 },
                { x: new Date(2017, 5), y: 33900 },
                { x: new Date(2017, 6), y: 40000 },
                { x: new Date(2017, 7), y: 52500 },
                { x: new Date(2017, 8), y: 32300 },
                { x: new Date(2017, 9), y: 42000 },
                { x: new Date(2017, 10), y: 37160 },
                { x: new Date(2017, 11), y: 38400 }
            ]
        }]
    };

    return (
        <div style={{ marginBottom: "32px" }}>
            <CanvasJSChart options={options} />
        </div>
    );
};

export default SplineChart;
