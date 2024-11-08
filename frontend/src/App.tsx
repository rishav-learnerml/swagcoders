import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./layout/Body";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Auth";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/Footer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            path="/login"
            element={<>
              <div className="h-[90vh] flex justify-center items-center">
                <Login />
              </div>
                <Footer />
            </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
