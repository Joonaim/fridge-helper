import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import OpenRoutes from "./Components/OpenRoutes";
import Household from "./Pages/Household";
import Landing from "./Pages/Landing";
import ShoppingList from "./Pages/ShoppingList";
import FoodWaste from "./Pages/FoodWaste";
import Settings from "./Pages/Settings";
import General from "./Pages/General";
import ManageHouseholds from "./Pages/ManageHouseholds";
import Terms from "./Pages/Terms";
import Faq from "./Pages/Faq";
import { ThemeProvider } from "styled-components";
import { createTheme } from "styled-breakpoints";

const themeWithBreakpoints = createTheme({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px"
});


export const theme = {
  ...themeWithBreakpoints
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/household" element={<Household />} />
            <Route path="/shopping" element={<ShoppingList />} />
            <Route path="/waste" element={<FoodWaste />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/general" element={<General />} />
            <Route path="/managehouseholds" element={<ManageHouseholds />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<Navigate to="/household" replace />} />
          </Route>

          <Route element={<OpenRoutes />}>
            <Route path="/" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
