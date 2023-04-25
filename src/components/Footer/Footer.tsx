import { Footer } from "antd/es/layout/layout";
import packageJson from "../../../package.json";

function FooterComponent() {
  return (
    <Footer style={{ textAlign: "center" }}>
      {packageJson.name.replace("-", " ").toLocaleUpperCase()} ©2023 Created by{" "}
      {packageJson.author.name}
    </Footer>
  );
}

export default FooterComponent;
