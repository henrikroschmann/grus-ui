  import { useState } from "react";
  import "../styles/App.css";
  import { Layout } from "antd";
  import Sidebar from "./layout/Sidebar";
  import { Content } from "antd/es/layout/layout";
  import { BrowserRouter } from "react-router-dom";
  import ApplicationRouter from "../routes/ApplicationRouter";
  import { ThemeProvider } from "./layout/ThemeContext";
  import ApplicationBreadcrumb from "./layout/ApplicationBreadcrumb";
  import FooterComponent from "./layout/FooterComponent";

  const App: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
      <BrowserRouter>
        <ThemeProvider>
          <Layout className="site" hasSider={!isMobile}>
            <Sidebar
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            <Layout className="site-layout">
              <Content className={`site-content ${collapsed ? "collapsed" : ""}`}>
                <ApplicationBreadcrumb />

                <div className="site-layout-background">
                  <ApplicationRouter />
                </div>
              </Content>
              <FooterComponent />
            </Layout>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  export default App;
