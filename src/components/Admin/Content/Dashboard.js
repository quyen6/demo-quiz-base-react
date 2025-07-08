import "./Dashboard.scss";
import React, { PureComponent, useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverView } from "../../../services/apiServices";
import { useTranslation } from "react-i18next";

const Dashboard = (props) => {
  const { t } = useTranslation();
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getOverView();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);

      // process data
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz;
      Qs = res?.DT?.others?.countQuestions;
      As = res?.DT?.others?.countAnswers;

      const data = [
        {
          name: `${t("admin.content.dashboard.r-name.quiz")}`,
          Qz: Qz,
        },
        {
          name: `${t("admin.content.dashboard.r-name.ques")}`,
          Qs: Qs,
        },
        {
          name: `${t("admin.content.dashboard.r-name.ans")}`,
          As: As,
        },
      ];

      setDataChart(data);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="title">{t("admin.content.dashboard.title")}</div>
      <div className="content col-12">
        <div className="left ">
          <div className="square ">
            <span className="text-1 totalusers">
              {t("admin.content.dashboard.l-text-1.totalusers")}
            </span>
            <span className="text-2">{dataOverView?.users?.total || `NA`}</span>
          </div>
          <div className="square  ">
            <span className="text-1 totalquiz">
              {t("admin.content.dashboard.l-text-1.totalquiz")}
            </span>
            <span className="text-2">
              {dataOverView?.others?.countQuiz || `NA`}
            </span>
          </div>
          <div className="square  ">
            <span className="text-1  totalques">
              {t("admin.content.dashboard.l-text-1.totalques")}
            </span>
            <span className="text-2">
              {dataOverView?.others?.countQuestions || `NA`}
            </span>
          </div>
          <div className="square  ">
            <span className="text-1 totalans">
              {t("admin.content.dashboard.l-text-1.totalans")}
            </span>
            <span className="text-2">
              {dataOverView?.others?.countAnswers || `NA`}
            </span>
          </div>
        </div>
        <div className="right col-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dataChart}>
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Qz"
                fill="#8884d8"
                name={t("admin.content.dashboard.r-name.quiz")}
              />
              <Bar
                dataKey="Qs"
                fill="#82ca9d"
                name={t("admin.content.dashboard.r-name.ques")}
              />
              <Bar
                dataKey="As"
                fill="#ffc658"
                name={t("admin.content.dashboard.r-name.ans")}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
