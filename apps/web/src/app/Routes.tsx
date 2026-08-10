import { lazy } from "react";
import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";

const Home = lazy(() => import("@/pages/public/Home"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Courses = lazy(() => import("@/pages/course/Courses"));
const CourseDetails = lazy(() => import("@/pages/course/CourseDetails"));
const CourseTopic = lazy(() => import("@/pages/course/CourseTopic"));
const CourseGenerate = lazy(() => import("@/pages/course/CourseGenerate"));

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="courses" element={<ProtectedLayout />}>
          <Route index element={<Courses />} />
          <Route path="generate" element={<CourseGenerate />} />
          <Route path=":id" element={<CourseDetails />} />
          <Route path=":id/topics/:topicId" element={<CourseTopic />} />
        </Route>
      </RoutesWrapper>
    </BrowserRouter>
  );
}
