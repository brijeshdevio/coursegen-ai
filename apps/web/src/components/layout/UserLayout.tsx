import { ProtectedLayout } from "./ProtectedLayout";

export function UserLayout() {
  return (
    <>
      <div>Users</div>
      <ProtectedLayout />
    </>
  );
}
