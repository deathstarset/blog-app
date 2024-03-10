import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Home } from "./pages/home";
import { Post } from "./pages/home/Post";
import { Signup } from "./pages/home/Signup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
