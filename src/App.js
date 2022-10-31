import React from "react";
import "./App.css";
import { routes } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import AppProvider from "./context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
        <AddRoomModal />
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
