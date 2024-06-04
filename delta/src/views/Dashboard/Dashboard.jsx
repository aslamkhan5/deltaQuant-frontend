import React, { useEffect, Fragment } from "react";
import { Typography } from "@mui/material";
import PositionTable from "./PositionTable";
import AnalyticsCard from "./AnalyticsCard";
import WorkingOrders from "./WorkingOrders";
import RecentlyActiveBotsCards from "./RecentlyActiveBotsCards";
import GenericBreadcrumbs from "../../components/GenericBreadCrumbs";
import { dashboard } from "../../routes/pathName";

const Dashboard = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '/' },
    { text: 'Dashboard', href: dashboard },
  ];
  const data = [
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Fragment>
      <Typography
        mb={2}
        color="#FFFFFF"
        sx={{ fontWeight: 600, fontSize: 32 }}
      >
        Dashboard
      </Typography>
      <GenericBreadcrumbs breadcrumbs={breadcrumbItems} currentPath={dashboard}/>
      <AnalyticsCard data={data} />
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
