import { lazy } from "react";
import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

const Index = lazy(() => import("@/pages/public/Home"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Courses = lazy(() => import("@/pages/course/Courses"));

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Index />} />
        <Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route>
          <Route path="/courses" element={<Courses />} />
        </Route>
      </RoutesWrapper>
    </BrowserRouter>
  );
}
