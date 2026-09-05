export type AuthUser = {
  id: number
  name: string
  email: string
  role: string
}

export type AppEnv = {
  Variables: {
    user: AuthUser
  }
}
