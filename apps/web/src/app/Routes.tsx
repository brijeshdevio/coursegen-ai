import { lazy } from "react";
import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

const Index = lazy(() => import("@/pages/public/Index"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Courses = lazy(() => import("@/pages/course/Courses"));
const Generate = lazy(() => import("@/pages/course/Generate"));
const Course = lazy(() => import("@/pages/course/Course"));

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/generate" element={<Generate />} />
        <Route path="/courses/:id" element={<Course />} />
      </RoutesWrapper>
    </BrowserRouter>
  );
}
