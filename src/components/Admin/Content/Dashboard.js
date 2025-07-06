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

const Dashboard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchDataOverView();
  }, []);

  const fetchDataOverView = async () => {
    let res = await getOverView();
    if (res && res.EC === 0) {
      console.log("🚀 ~ fetchDataOverView ~ res:", res);
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
          name: "Quiz",
          Qz: Qz,
        },
        {
          name: "Question",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      console.log("🚀 ~ fetchDataOverView ~ data:", data);
      setDataChart(data);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content col-12">
        <div className="left ">
          <div className="square  ">
            <span className="text-1">Total Users</span>
            <span className="text-2">{dataOverView?.users?.total || `NA`}</span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Quiz</span>
            <span className="text-2">
              {dataOverView?.others?.countQuiz || `NA`}
            </span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverView?.others?.countQuestions || `NA`}
            </span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Answers</span>
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
              <Bar dataKey="Qz" fill="#8884d8" name="Quiz" />
              <Bar dataKey="Qs" fill="#82ca9d" name="Question" />
              <Bar dataKey="As" fill="#ffc658" name="Answers" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
