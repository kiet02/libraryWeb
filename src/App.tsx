import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./component/Drawer/Layout";
import Pages from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./component/Alert/AlertContext";

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <Routes>
            {/* Route riêng cho Login */}
            <Route path="/" element={<Pages.Login />} />

            {/* Các route cần Layout */}
            <Route
              path="/"
              element={
                <Layout
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                />
              }
            >
              {/* <Route path="dashboard" element={<Pages.Dashboard />} /> */}
              <Route path="books" element={<Pages.Books />} />
              <Route path="authors" element={<Pages.Authors />} />
              <Route path="categories" element={<Pages.Categories />} />
              <Route path="users" element={<Pages.Users />} />
            </Route>
          </Routes>
        </AlertProvider>
      </QueryClientProvider>
    </Router>
  );
}
