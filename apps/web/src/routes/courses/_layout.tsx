import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses/_layout"!</div>
}
