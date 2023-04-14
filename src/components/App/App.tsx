import { useState } from "react";
import "./App.css";
import { Layout } from "antd";

import { Content } from "antd/es/layout/layout";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../../ThemeContext";
import ApplicationRouter from "../../routes/ApplicationRouter";
import ApplicationBreadcrumb from "../Breadcrumb/Breadcrumb";
import FooterComponent from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { AuthProvider } from "../../contexts/AuthContext";

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Layout className="site" hasSider={!isMobile}>
            <Sidebar
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            <Layout className={isMobile ? "site-layout-mobile" : "site-layout"}>
              {/* <Content className={`site-content ${collapsed ? "collapsed" : ""}`}> */}
              <Content
                className={
                  isMobile ? "" : `site-content ${collapsed ? "collapsed" : ""}`
                }
              >
                {!isMobile && <ApplicationBreadcrumb />}
                <div className="site-layout-background">
                  <ApplicationRouter />
                </div>
              </Content>
              <FooterComponent />
            </Layout>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
