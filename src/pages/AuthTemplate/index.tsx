import { Outlet } from 'react-router-dom'

const AuthTemplate = () => {
  return (
    <div>
      <h1>Header</h1>
      <Outlet/>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default AuthTemplate
