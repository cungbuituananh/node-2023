import { Route, Routes } from "react-router-dom";
import Layout from "themes/Layout";
import Public from "pages";
import Login from "pages/Auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login isLogin={false} />} />

        {/* Protected Routes */}

        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
