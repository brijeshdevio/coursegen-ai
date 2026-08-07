import { lazy } from "react";
import {
  BrowserRouter,
  Routes as RoutesWrapper,
  Route,
} from "react-router-dom";

import { ProtectedLayout } from "@/components/layout/ProtectedLayout";

const Index = lazy(() => import("@/pages/public/Home"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Courses = lazy(() => import("@/pages/course/Courses"));
const CourseDetails = lazy(() => import("@/pages/course/CourseDetails"));
const CourseTopic = lazy(() => import("@/pages/course/CourseTopic"));

export default function Routes() {
  return (
    <BrowserRouter>
      <RoutesWrapper>
        <Route path="/" element={<Index />} />
        <Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route
            path="/courses/:id/topics/:topicId"
            element={<CourseTopic />}
          />
        </Route>
      </RoutesWrapper>
    </BrowserRouter>
  );
}
