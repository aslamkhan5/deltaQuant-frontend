import React, { useEffect, Fragment, useState, useRef } from "react";
import { Typography } from "@mui/material";
import PositionTable from "./PositionTable";
import AnalyticsCard from "./AnalyticsCard";
import WorkingOrders from "./WorkingOrders";
import RecentlyActiveBotsCards from "./RecentlyActiveBotsCards";
import GenericBreadcrumbs from "../../components/GenericBreadCrumbs";
import { dashboard } from "../../routes/pathName";
import useAxios from "../../hooks/useAxios";
import CandleStick from "../../components/Graphs/CandleStick";

const Dashboard = () => {
  const { apiState, data, error, execute } = useAxios('https://canvasjs.com/data/gallery/react/microsoft-stock-price.json', 'GET')
  const chartRef = useRef(null);
  const [graphsData, setGraphsData] = useState([]);
  //   const [options, setOptions] = useState({
  //     exportEnabled: true,
  //     title: {
  //         text: "Whispertrades stock price 2024"
  //     },
  //     axisX: {
  //         valueFormatString: "D MMM"
  //     },
  //     axisY: {
  //         title: "Price",
  //         prefix: "$"
  //     },
  //     data: [{
  //         type: "candlestick",
  //         name: "Whispertrades Corporation Price",
  //         showInLegend: true,
  //         yValueFormatString: "$##0.00",
  //         xValueType: "dateTime",
  //         dataPoints: [],
  //         risingColor:"green",
  //         fallingColor:"red"
  //     }]
  // });
  const [options, setOptions] = useState({
    exportEnabled: true,
    backgroundColor: "#1e1e1e", // Dark background
    title: {
      text: "Whispertrades stock price 2024",
      fontColor: "#ffffff" // Title color
    },
    axisX: {
      valueFormatString: "D MMM",
      labelFontColor: "#ffffff", // X-axis label color
      lineColor: "#ffffff", // X-axis line color
      tickColor: "#ffffff" // X-axis tick color
    },
    axisY: {
      title: "Price",
      prefix: "$",
      titleFontColor: "#ffffff", // Y-axis title color
      labelFontColor: "#ffffff", // Y-axis label color
      lineColor: "#ffffff", // Y-axis line color
      tickColor: "#ffffff", // Y-axis tick color
      gridColor: "#444444" // Y-axis grid color
    },
    data: [{
      type: "candlestick",
      name: "Whispertrades Corporation Price",
      showInLegend: true,
      yValueFormatString: "$##0.00",
      xValueType: "dateTime",
      dataPoints: [],
      risingColor: "#2EBD85",  // Color for the rising candles
      fallingColor: "#F6465D",  // Color for the falling candles
      // borderThickness:10, // Border Thickness
    }],
    legend: {
      fontColor: "#ffffff" // Legend text color
    }
  });
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Dashboard', href: dashboard },
  ];
  const cardData = [
    {
      price: 60,
      title: "Net Liquidation Value",
      percentage: "0.5",
      additionalText: ""
    },
    {
      price: 12,
      title: "Option Buying Power",
      percentage: "0.5",
      additionalText: "Up from past week"
    },
    {
      price: 12,
      title: "Profit Open",
      percentage: "0.001",
      additionalText: "Down from past week"
    }
  ]
  const botsData = [
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
    {
      title: "CCS Trance 1 Reversal",
      subTitle: "CCS Trance 1 Reversal",
      time: "30 mins ago"
    },
  ]
  useEffect(() => {
    execute()
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (data) {
      const dataPoints = data.map(point => ({
        x: point.x,
        y: point.y,
        color: point.y[0] <= point.y[3] ? "#2EBD85" : "#F6465D",
      }));
      setGraphsData(dataPoints);

      setOptions(prevOptions => ({
        ...prevOptions,
        data: [{
          ...prevOptions.data[0],
          dataPoints: dataPoints,
        }]
      }));
    }
  }, [data])
  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Dashboard
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={dashboard} />
      <AnalyticsCard data={cardData} />
      <CandleStick options={options} data={graphsData} onRef={ref => chartRef.current = ref} />
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Recently Active Bots
      </Typography>
      <RecentlyActiveBotsCards data={botsData} />
      <PositionTable />
      <WorkingOrders />
    </Fragment >
  );
};

export default Dashboard;
