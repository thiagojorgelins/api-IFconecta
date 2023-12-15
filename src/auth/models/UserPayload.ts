export interface UserPayload {
  sub: number
  email: string
  name: string
  userImage: string
  iat?: number
  exp?: number
}