import "./App.css";
import MainLayout from "./Layout/MainLayout";
import AppRoutes from "./Router";

function App() {

  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
}

export default App;
