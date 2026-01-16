# Admin Dashboard - Tienda de Vinilos

## 🎯 Características del Dashboard

El panel de administración proporciona una vista completa de las métricas clave del negocio:

### 📊 Tarjetas de Estadísticas

1. **Ventas Hoy** - Total de ventas del día actual en CLP
2. **Órdenes Pendientes** - Órdenes con estado PENDING o CONFIRMED
3. **Productos Bajo Stock** - Productos donde stock ≤ minStock (5 unidades)
4. **Nuevos Clientes** - Clientes registrados este mes

### 📈 Gráfico de Ventas

- Ventas de los últimos 7 días
- Visualización en gráfico de líneas con recharts
- Formato de moneda chilena (CLP)

### 🏆 Top 5 Productos

Tabla de productos más vendidos mostrando:
- Nombre del producto
- Categoría
- Unidades vendidas
- Ingresos totales

### 📦 Órdenes Recientes

Lista de las últimas 5 órdenes con:
- Número de orden
- Cliente
- Fecha
- Total
- Estado con badge colorizado

## 🔐 Acceso al Dashboard

### Credenciales de Admin

Para acceder al dashboard administrativo, usa las siguientes credenciales:

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@tiendavinilos.cl`
- **Contraseña**: `admin123`

### Credenciales de Usuario Regular (para testing)

- **Email**: `demo@ejemplo.com`
- **Contraseña**: `password123`

> ⚠️ **Nota**: El usuario regular no tiene acceso al dashboard. La API devolverá un error 403 (Forbidden).

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **shadcn/ui** - Componentes UI
- **Recharts** - Gráficos
- **NextAuth** - Autenticación
- **Lucide React** - Iconos

## 📁 Estructura de Archivos

```
app/
├── (admin)/
│   └── admin/
│       ├── page.tsx           # Dashboard principal
│       └── login/
│           └── page.tsx       # Página de login admin
├── api/
│   └── admin/
│       └── stats/
│           └── route.ts       # API de estadísticas
lib/
├── auth.ts                    # Configuración NextAuth y helpers
└── mockData.ts                # Generadores de datos mock
types/
└── order.ts                   # Tipos TypeScript para órdenes y stats
components/
└── ui/
    └── card.tsx               # Componente Card de shadcn
```

## 🔄 Funcionalidades Implementadas

### API Endpoint: `/api/admin/stats`

**Método**: GET  
**Autenticación**: Requiere rol de administrador  
**Respuesta**: JSON con estadísticas completas

```typescript
interface DashboardStats {
  salesToday: number;
  pendingOrders: number;
  lowStockProducts: number;
  newCustomers: number;
  salesLast7Days: Array<{
    date: string;
    total: number;
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    category: string;
    unitsSold: number;
    revenue: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    date: string;
    total: number;
    status: OrderStatus;
  }>;
}
```

### Protección de Rutas

La API usa el helper `requireAdmin()` que:
1. Verifica que el usuario esté autenticado
2. Verifica que el usuario tenga rol "admin"
3. Devuelve 401 si no está autenticado
4. Devuelve 403 si no es administrador

## 🎨 Diseño Responsivo

- **Mobile First**: Diseño optimizado para móviles
- **Grid System**: Uso de CSS Grid para layouts flexibles
- **Breakpoints**:
  - `sm`: 640px - Stack en columnas
  - `md`: 768px - 2 columnas
  - `lg`: 1024px - 4 columnas

## 🔍 Estados de Órdenes

| Estado | Color | Descripción |
|--------|-------|-------------|
| PENDING | Amarillo | Orden pendiente de confirmación |
| CONFIRMED | Azul | Orden confirmada |
| PROCESSING | Púrpura | En proceso |
| SHIPPED | Índigo | Enviada |
| DELIVERED | Verde | Entregada |
| CANCELLED | Rojo | Cancelada |

## 🚀 Cómo Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

3. Acceder al dashboard:
   ```
   http://localhost:3000/admin
   ```

4. Hacer login con las credenciales de admin

## 📊 Datos Mock

El dashboard utiliza datos generados dinámicamente con las siguientes características:

- **100 órdenes** simuladas en los últimos 30 días
- **50 productos** con stock variable
- **150 usuarios** registrados en los últimos 90 días
- Ventas diarias calculadas en CLP
- Estados de orden distribuidos aleatoriamente

## 🔒 Seguridad

- Todas las rutas admin están protegidas
- Validación de rol en el servidor
- No se exponen datos sensibles en el cliente
- Manejo apropiado de errores 401 y 403

## 📝 Próximas Mejoras

- [ ] Filtros por fecha personalizada
- [ ] Exportar estadísticas a PDF/Excel
- [ ] Gráficos adicionales (pie chart, bar chart)
- [ ] Notificaciones en tiempo real
- [ ] Dashboard personalizable
- [ ] Integración con base de datos real (Prisma)

---

**Desarrollado para**: Tienda de Vinilos  
**Versión**: 1.0.0  
**Idioma**: Español (Chile)
