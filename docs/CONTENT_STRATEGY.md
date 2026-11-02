# Estrategia de contenido — sitio DevTools

Estado actual: 11 secciones en una sola ruta (Hero, Marquee, Manifiesto, Servicios, Metodología, Casos, Testimonios, FAQ, CTA, Footer).

## 1. Qué debe tener una web de estudio de software

| Bloque | Estado | Recomendación |
|---|---|---|
| Propuesta de valor (Hero) | ✅ | Una frase: *para quién + qué resultado + en cuánto tiempo*. |
| Servicios | ✅ | Cada servicio con entregable, stack y "ideal para". |
| Metodología / proceso | ✅ | Añadir qué recibe el cliente en cada fase (entregables, reuniones). |
| Casos de éxito | ✅ | Casos reales configurados: **StayFresh (Stacare Group, Malta)** como caso principal end-to-end, y **Enerlitica (Colombia)** como caso de desarrollo frontend y dashboards. |
| Testimonios | ⏳ | Comentado temporalmente en `page.tsx`. Pendiente recopilar citas y nombres reales de clientes antes de reactivar. |
| FAQ | ✅ | Añadir precios orientativos, propiedad del código, soporte post-entrega, NDA. |
| Contacto | ✅ | Formulario conectado a WhatsApp (`+356 9976 7916`, `WHATSAPP_NUMBER` en `lib/site.ts`) con mensaje pre-formateado en ES/EN. |
| Footer | ✅ | Añadir razón social, país, enlaces legales. |

## 2. Contenido pendiente (por prioridad)

**Alta (confianza y conversión)**
1. **Testimonios reales**: recopilar citas directas, nombre y cargo de clientes reales (ej. StayFresh / Enerlitica) para reactivar `TestimonialsSection` en `app/[locale]/page.tsx`.
2. **Páginas legales**: Política de privacidad y Términos (obligatorio RGPD tras completar el registro de la entidad en Malta).
3. **Precios o modelos de contratación**: proyecto cerrado, equipo dedicado, retainer; rangos orientativos.

**Media**
5. **Casos de estudio detallados** (`/casos/[slug]`) — mejor SEO y prueba social.
6. **Blog / recursos** (artículos técnicos, guías de SDLC) para posicionamiento orgánico.
7. **Logos de clientes** y métricas adicionales.

**Baja / futuro**
8. Calculadora de estimación, página de carreras, área de clientes, changelog.

## 3. Estado SEO, Seguridad y Pendientes Técnicos

### Ya implementado ✅
- **Internacionalización (`next-intl`)**: Rutas `/es` y `/en` con selector de idioma y traducciones completas en `messages/es.json` y `messages/en.json`.
- **Dominio de producción**: Configurado como `https://devtoolsgroup.com` en `lib/site.ts`.
- **Formulario de contacto (WhatsApp)**: Conectado en `components/CtaSection.tsx` hacia `+356 9976 7916` (`WHATSAPP_NUMBER` en `lib/site.ts`) con mensaje pre-formateado según idioma y validación de entradas.
- **Sitemap y Robots**: `app/sitemap.ts` y `app/robots.ts` con soporte multilingüe (`/es`, `/en`) y `hreflang`.
- **Datos estructurados (JSON-LD)**: `ProfessionalService` en `app/[locale]/layout.tsx` (HQ en Malta, área de servicio en Colombia, Malta y UE).
- **Seguridad HTTP**: Cabeceras `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy` en `next.config.ts`.

### Pendiente ⏳
- **Google Search Console**: Tras desplegar en producción, dar de alta la propiedad tipo Dominio (`devtoolsgroup.com`), validar DNS TXT y enviar `sitemap.xml` (gestiona automáticamente tanto Colombia `/es` como Malta `/en` sin necesidad de subdominios).
- **Open Graph**: Crear imagen `opengraph-image.png` (1200x630) para previsualizaciones en WhatsApp/LinkedIn/Twitter.
- **SEO Local y Google Business Profile (Malta & Colombia)**: Una vez completado el registro en Malta y obtenida la dirección física/coworking:
  - Crear ficha en Google Business Profile para búsquedas locales en Malta.
  - Añadir mención de registro en `Footer.tsx` (*"Registered in Malta · Operations in Colombia & Remote"*).
  - Completar dirección exacta en el bloque JSON-LD de `app/[locale]/layout.tsx`.
- **Cumplimiento Legal & RGPD (Malta / UE)**: Tras constituir la empresa:
  - Crear páginas de Política de Privacidad y Términos con la razón social de Malta.
  - Enlazar en `Footer.tsx` y en el formulario de contacto.
  - Banner de cookies solo si en el futuro se añade analítica con seguimiento (Google Analytics, Meta, etc.).

## 4. Próximos pasos sugeridos

1. Imagen `opengraph-image.png` + activar Google Search Console al desplegar `devtoolsgroup.com`.
2. Recopilar testimonios reales de clientes y reactivar `TestimonialsSection`.
3. Páginas legales RGPD + dirección fiscal de Malta cuando quede registrada la empresa.
4. Precios/modelos de contratación + casos de estudio detallados.
