export interface MenuItem {
    title: string;
    key: string;
    icon?: React.ReactNode;
    route: string;
    protected: boolean;
    component: React.ComponentType<any>;
    children?: MenuItem[];
  }
  