export interface AuthResponse {
  token: string;
  userId?: string;
  username?: string;
  email?: string;
  expiresIn?: number; // tiempo de expiración en segundos (opcional)
}
