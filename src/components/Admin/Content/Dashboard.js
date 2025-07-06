import "./Dashboard.scss";
import React, { PureComponent } from "react";
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

const data = [
  {
    name: "Quiz",
    Qz: 590,
  },
  {
    name: "Question",
    Qs: 868,
  },
  {
    name: "Answers",
    As: 1397,
  },
];
const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content col-12">
        <div className="left ">
          <div className="square  ">
            <span className="text-1">Total Users</span>
            <span className="text-2">50</span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Quiz</span>
            <span className="text-2">50</span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Questions</span>
            <span className="text-2">50</span>
          </div>
          <div className="square  ">
            <span className="text-1">Total Answers</span>
            <span className="text-2">50</span>
          </div>
        </div>
        <div className="right col-6">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
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
