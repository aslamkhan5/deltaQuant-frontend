import Backtests from "../../views/Backtests/Backtests";
import Balance from "../../views/Balance/Balance";
import BotEntry from "../../views/BotEntry/BotEntry";
import Bots from "../../views/Bots/Bots";
import Broker from "../../views/Broker/Broker";
import Connection from "../../views/Connection/Connection";
import Dashboard from "../../views/Dashboard/Dashboard"
import Guide from "../../views/Guide/Guide";
import Orders from "../../views/Orders/Orders";
import Performance from "../../views/Performance/Performance";
import Position from "../../views/Position/Position";
import Reports from "../../views/Reports/Reports";
import {
  backtests,
  balance,
  botEntry,
  bots,
  broker,
  connection,
  dashboard,
  guide,
  orders,
  performance,
  position,
  reports,
} from "../pathName";

export const PrivateRoutes = [
  {
    title: "Dashboard",
    component: Dashboard,
    path: dashboard,
  },
  {
    title: "Bots",
    component: Bots,
    path: bots,
  },
  {
    title: "Bot Entry",
    component: BotEntry,
    path: botEntry,
  },
  {
    title: "Connection",
    component: Connection,
    path: connection,
  },
  {
    title: "Position",
    component: Position,
    path: position,
  },
  {
    title: "Orders",
    component: Orders,
    path: orders,
  },
  {
    title: "Performance",
    component: Performance,
    path: performance,
  },
  {
    title: "Reports",
    component: Reports,
    path: reports,
  },
  {
    title: "Backtests",
    component: Backtests,
    path: backtests,
  },
  {
    title: "Balance",
    component: Balance,
    path: balance,
  },
  {
    title: "Broker",
    component: Broker,
    path: broker,
  },
  {
    title: "Guide",
    component: Guide,
    path: guide,
  }
];
