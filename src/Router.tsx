import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import GlobalErrorBoundary from "./components/error/GlobalErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));

// 루트 레이아웃 컴포넌트
// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => {
  return (
    <GlobalErrorBoundary>
      <Outlet />
    </GlobalErrorBoundary>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
