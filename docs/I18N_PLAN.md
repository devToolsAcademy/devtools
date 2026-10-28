# Plan de internacionalización (ES → ES + EN)

> Estado: **fases 1–6 implementadas** (decisiones: `localePrefix: "always"`, `next-intl`). Pendiente: revisión humana de `messages/en.json`, `sitemap`/`robots` y QA visual de textos largos en EN.
>
> Notas originales: Antes de codificar, leer la guía de i18n en `node_modules/next/dist/docs/` (Next 16 tiene cambios: p. ej. `middleware` pasó a llamarse `proxy`). Verificar la compatibilidad de la versión de `next-intl` con Next 16.3.

## 1. Análisis de opciones

| Opción | SEO | Compartible | Complejidad | Veredicto |
|---|---|---|---|---|
| **A. Prefijo en URL** `/es`, `/en` | ⭐⭐⭐ (hreflang, indexa ambos) | ✅ cada idioma tiene su enlace | Media | **Recomendada** |
| B. Solo selector (cookie/estado) | ❌ Google solo ve un idioma | ❌ el enlace no fija idioma | Baja | Descartada como mecanismo único |
| C. Detección automática sin URL | ❌ riesgo de cloaking/mal indexado | ❌ | Baja | Solo como ayuda en 1ª visita |
| D. Locale regional `/es-es`, `/en-us` | ⭐⭐⭐ | ✅ | Alta | No ahora |

### ¿`es` / `en` o `es-es` / `en-us`?
Usar **idioma sin país**: `/es` y `/en`. El contenido no cambia por país (sin precios locales ni moneda por región), así que duplicar `es-es`/`es-mx`/`en-us`/`en-gb` solo añade mantenimiento. Si más adelante hay precios o contenido por mercado, se añade región entonces. Declarar `hreflang="es"`, `hreflang="en"` y `x-default`.

## 2. Idioma por defecto

**Español (`es`)** como `defaultLocale`: es el idioma actual, del mercado principal y del contenido ya escrito.

Comportamiento recomendado (híbrido A + selector):
1. `/` → `proxy.ts` lee, por orden: cookie `NEXT_LOCALE` → cabecera `Accept-Language` → `es`. Redirige a `/es` o `/en`.
2. El visitante puede cambiar con un **selector ES | EN** en el Header; guarda la cookie y navega a la misma sección en el otro idioma.
3. Las URLs con prefijo siempre mandan sobre la cookie (un enlace compartido en `/en` se ve en inglés).
4. Un usuario con idioma ni ES ni EN → `es`.

## 3. Arquitectura propuesta

Librería: **`next-intl`** (App Router, server components, tipado). Alternativa sin dependencias: diccionarios JSON + `[lang]` propio (más manual).

```
app/
  [locale]/
    layout.tsx     # <html lang={locale}>, fuentes, metadata por idioma
    page.tsx       # mismo stack de 12 componentes
  sitemap.ts       # entradas es + en con alternates
i18n/
  routing.ts       # locales: ['es','en'], defaultLocale: 'es'
  request.ts       # carga de mensajes
messages/
  es.json
  en.json
proxy.ts           # detección + redirección
```

Decisiones:
- `localePrefix: "always"` (`/es`, `/en`) → URLs simples y sin ambigüedad.
- Mover `layout.tsx` / `page.tsx` bajo `app/[locale]/` (raíz sin layout propio o solo redirección).
- Los textos salen de los componentes a `messages/*.json` con namespaces por sección (`hero`, `services`, `faq`...). **Esto cambia la convención actual** de "arrays al inicio del componente": actualizar [AGENTS.md](../AGENTS.md) al implementar.
- Componentes servidor: `getTranslations`. Cliente (`Header`, `CtaSection`): `useTranslations`.
- Anclas (`#servicios`...) **no se traducen** (ids estables, contrato de navegación). Si se quiere slug en inglés, se mantiene el id y no se toca.

## 4. Fases

1. **Preparación**: confirmar docs Next 16 + versión `next-intl`; congelar contenido ES (ver [CONTENT_STRATEGY.md](./CONTENT_STRATEGY.md)); lista de textos (incluye `alt`, `aria-label`, `placeholder`, `<option>`, mensajes del formulario).
2. **Infraestructura**: instalar `next-intl`, `routing.ts`, `proxy.ts`, mover app a `[locale]`, `<html lang>` dinámico.
3. **Extracción**: sección por sección, texto → `es.json`. Verificar que `/es` queda idéntica a hoy.
4. **Traducción EN**: `en.json` (traducción natural, no literal; títulos en mayúscula, "SDLC", "Tech Lead" se conservan). Revisión humana.
5. **Selector** en `Header` (desktop + drawer móvil) y Footer.
6. **SEO**: `generateMetadata` por idioma, `og:locale` (`es_ES` / `en_US`), `alternates.languages`, `sitemap`, textos de OG.
7. **QA**: `pnpm lint` → `pnpm build`; probar `/`, `/es`, `/en`, cookie, `Accept-Language`, anclas, drawer móvil, longitud de textos EN (layouts con `uppercase` y tamaños grandes pueden desbordar).

## 5. Riesgos / puntos de atención

- Textos largos en EN pueden romper titulares (`text-7xl uppercase`): revisar visualmente.
- Datos de casos/testimonios: traducirlos como contenido (los nombres no).
- Formato de números/moneda (`-$45,000 USD`): usar `Intl`/`useFormatter` por idioma.
- Estimación: ~1–2 días con infraestructura + extracción; la traducción/revisión depende del volumen de contenido nuevo.

## 6. Decisión pendiente

- ¿`localePrefix: "always"` (recomendado) o `as-needed` (ES sin prefijo en `/`)?
- ¿`next-intl` (recomendado) o solución propia?
