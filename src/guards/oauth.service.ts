import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  private readonly clientId: string = environment.oauth.clientId; // Reemplaza con tu Client ID de Google
  private readonly redirectUri: string = environment.oauth.redirectUri; // La misma URI configurada en Google Cloud Console
  private readonly scope: string = environment.oauth.scope; // Permisos solicitados

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  // Inicia el proceso de login redirigiendo al usuario a Google para la autenticación
  login() {
    const state = this.generateCSRFToken(); // Se puede generar un token CSRF para seguridad adicional
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${this.scope}&state=${state}`;

    // Redirige a la página de Google para obtener el Authorization Code
    window.location.href = authUrl;
  }

  // Función para generar un CSRF Token (opcional, pero recomendado para seguridad)
  private generateCSRFToken(): string {
    return Math.random().toString(36).substring(2); // Genera un valor aleatorio
  }

  // Intercambia el Authorization Code por un Access Token en el backend
  exchangeCodeForToken(code: string) {
    return this.http.post('http://localhost:3000/api/v1/auth/logingoogle', { code });
  }

  // Maneja la redirección después de la autenticación de Google y captura el código de autorización
  handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Intercambia el Authorization Code por un Access Token
      this.exchangeCodeForToken(code).subscribe({
        next: (response: any) => {
                  console.log('Token recibido:', response);

                  // Guarda el token de acceso y marca al usuario como logueado
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('isLoggedIn', 'true'); // Indicamos que el usuario está logueado
                this.router.navigate(['/']); // Redirige al usuario a la página principal
              },
        error: (error) => {
                console.error('Error al obtener el token:', error);
              }
      });
    }
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Cerrar sesión y limpiar los datos del usuario
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']); // Redirige a la página de login
  }
}