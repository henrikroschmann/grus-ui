import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "../../styles/Dashboard.css";

import TableDataComponent from "../layout/table/TableDataComponent";
import CombinedChart from "../layout/chart/CombinedChart";


const Dashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const row2 = document.querySelector(".row-2") as HTMLDivElement;
    const row1 = document.querySelector(".row-1") as HTMLDivElement;
    const onScroll = () => {
      if (
        window.pageYOffset >= row1.offsetTop &&
        window.pageYOffset < row2.offsetTop
      ) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className={`row-1 ${isCollapsed ? "collapsed" : ""}`}>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 8 }}>
            <div className="box">
              {/* Box 1 content */}

              <h3>Total Cost 1</h3>
              <p>$5000</p>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 8 }}>
            <div className="box">
              {/* Box 2 content */}

              <h3>Total Cost 1</h3>
              <p>$5000</p>
            </div>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 8 }}>
            <div className="box">
              {/* Box 3 content */}

              <h3>Total Cost 1</h3>
              <p>$5000</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={`row-2 ${isCollapsed ? "collapsed" : ""}`}>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }}>
            {/* Hide row 2 on medium and small screens */}
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
            {/* Show row 2 on large screens */}

            <div className="rectangle">
              <CombinedChart />
            </div>
          </Col>
        </Row>
      </div>
      <div className="table-container">
        {/* Table component */}
        <TableDataComponent />
      </div>
    </div>
  );
};

export default Dashboard;
