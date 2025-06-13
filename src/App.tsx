import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./component/Drawer/Layout";
import {Authors,Books,Categories,Login,Users} from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./component/Alert/AlertContext";
import { DashboardLayoutPattern, MiniDrawer } from "./page/_Test/Drawer/Drawer";

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <Routes>
            {/* Route riêng cho Login */}
            <Route path="/" element={<Login />} />

            {/* Các route cần Layout */}
            <Route
              path="/"
              // element={
              //   <Layout
              //     isDrawerOpen={isDrawerOpen}
              //     setIsDrawerOpen={setIsDrawerOpen}
              //   />
              // }
            >
              {/* <Route path="dashboard" element={<Pages.Dashboard />} /> */}
              {/* <Route path="books" element={<Books />} /> */}
              <Route path="Drawer" element={<DashboardLayoutPattern />} />

              {/* <Route path="authors" element={<Authors />} />
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<Users />} /> */}
            </Route>
          </Routes>
        </AlertProvider>
      </QueryClientProvider>
    </Router>
  );
}
