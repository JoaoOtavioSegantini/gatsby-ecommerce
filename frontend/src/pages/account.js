import { Button } from "@material-ui/core"
import React, { useContext } from "react"
import AuthPortal from "../components/auth/AuthPortal"
import Layout from "../components/ui/layout"
import { UserContext } from "../contexts"
import { setUser } from "../contexts/actions"

export default function Account() {
  const { user, dispatchUser, defaultUser } = useContext(UserContext)

  const handleLogout = () => {
    dispatchUser(setUser(defaultUser))
  }
  return (
    <Layout>
      {user.jwt && user.onboarding ? (
        <Button variant="contained" onClick={handleLogout}>
          logout
        </Button>
      ) : (
        <AuthPortal />
      )}
    </Layout>
  )
}
