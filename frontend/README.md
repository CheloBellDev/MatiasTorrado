# NutriApp Frontend

## Configuración rápida
```bash
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_API_BASE_URL` debe apuntar al backend (ej: `http://localhost:8000`).

## Páginas
- `/` Inicio
- `/programas` Lista de planes (DRF)
- `/agendar` Formulario que envía a `/api/appointments/`
- `/sobre-nosotros` Info + mapa
- `/auth/login` / `/auth/register` JWT
