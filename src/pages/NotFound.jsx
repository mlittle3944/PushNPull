import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="card narrow center">
      <h1>Page not found</h1>
      <Link to="/">Go to my plan</Link>
    </section>
  )
}
