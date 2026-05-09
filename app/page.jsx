"use client";
import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════
   TOKENS — Moderno Gremial
══════════════════════════════════════════ */
const C = {
  mag:     "#C02889",   // firma institucional — uso mínimo
  magOsc:  "#9A1F6E",   // hover de CTAs
  verde:   "#00AE8D",   // campo / validación
  negro:   "#0A0A0A",   // texto principal
  grisTx:  "#5A5A5A",   // texto secundario
  grisBrd: "#E2E2E2",   // bordes
  grisLt:  "#F8F8F8",   // fondo alternativo secciones
  blanco:  "#FFFFFF",
};

/* ══════════════════════════════════════════
   COUNTER
══════════════════════════════════════════ */
function useCounter(target, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s = null;
    const tick = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const PlusMinus = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
function Nav({ refs }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (key) => {
    refs[key]?.current?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Línea magenta — la firma institucional */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: C.mag, zIndex: 300,
      }} />

      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 200,
        background: solid ? "rgba(255,255,255,0.98)" : C.blanco,
        borderBottom: `1px solid ${solid ? C.grisBrd : "transparent"}`,
        transition: "border-color 0.3s, background 0.3s",
        height: 60, display: "flex", alignItems: "center",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 32px",
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
            <img
              src="/images/logo-mercamexico-negro.png"
              alt="MercaMéxico"
              style={{ height: 52, width: "auto", display: "block" }}
            />
          </button>

          {/* Links */}
          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[
              ["El RAV", "rav"],
              ["En Números", "stats"],
              ["Técnico", "tech"],
              ["Afíliate", "contacto"],
            ].map(([label, key]) => (
              <button key={key} onClick={() => go(key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: C.grisTx, fontFamily: "inherit",
                  padding: "4px 0", borderBottom: "2px solid transparent",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.negro; e.currentTarget.style.borderBottomColor = C.mag; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.grisTx; e.currentTarget.style.borderBottomColor = "transparent"; }}
              >{label}</button>
            ))}
            <button onClick={() => go("contacto")}
              style={{
                background: C.mag, color: C.blanco, border: "none",
                padding: "9px 22px", fontSize: 11, fontWeight: 800,
                letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.magOsc}
              onMouseLeave={e => e.currentTarget.style.background = C.mag}
            >
              Únete <ChevronRight />
            </button>
          </div>

          {/* Hamburguesa */}
          <button className="nav-ham"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "none", flexDirection: "column", gap: 5 }}>
            <div style={{ width: 20, height: 2, background: C.negro }} />
            <div style={{ width: 20, height: 2, background: C.negro }} />
            <div style={{ width: 14, height: 2, background: C.negro }} />
          </button>
        </div>

        {open && (
          <div style={{
            position: "absolute", top: 60, left: 0, right: 0,
            background: C.blanco, borderBottom: `1px solid ${C.grisBrd}`,
            padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20,
          }}>
            {[["El RAV","rav"],["En Números","stats"],["Técnico","tech"],["Afíliate","contacto"]].map(([l,k]) => (
              <button key={k} onClick={() => go(k)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, color: C.negro, textAlign: "left", fontFamily: "inherit", padding: 0 }}>
                {l}
              </button>
            ))}
            <button onClick={() => go("contacto")}
              style={{ background: C.mag, color: C.blanco, border: "none", padding: "12px", fontSize: 13, fontWeight: 800, textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
              QUIERO AFILIARME
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero({ refContacto }) {
  return (
    <section style={{
      background: C.blanco, paddingTop: 63,
      minHeight: "100vh", display: "flex", alignItems: "center",
      borderBottom: `1px solid ${C.grisBrd}`,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px 80px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end" }}>

          {/* Texto */}
          <div style={{ maxWidth: 820 }}>
            {/* Categoría */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{ width: 20, height: 2, background: C.negro }} />
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.5em",
                textTransform: "uppercase", color: C.grisTx,
              }}>
                Asociación Mexicana de Mercados y Centrales de Abasto, A.C.
              </span>
            </div>

            {/* Headline — brutalismo editorial */}
            <h1 style={{
              margin: 0, fontWeight: 900, lineHeight: 0.97,
              fontSize: "clamp(36px, 5.5vw, 68px)",
              textTransform: "uppercase", letterSpacing: "-0.02em",
              color: C.negro,
            }}>
              Por primera vez en 50 años,<br />
              tributa sobre lo que<br />
              realmente <span style={{ color: C.mag }}>ganas.</span>
            </h1>

            {/* Subline */}
            <p style={{
              margin: "40px 0 0", fontSize: "clamp(15px, 1.8vw, 20px)",
              color: C.grisTx, lineHeight: 1.65,
              maxWidth: 560, fontWeight: 400,
            }}>
              Merca México es el gremio que le da al comerciante mayorista
              la herramienta legal que el sistema nunca le dio.
              Por primera vez en 50 años, puedes tributar sobre lo que realmente ganas.
            </p>

            {/* CTAs */}
            <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <button
                onClick={() => document.getElementById("rav-id")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: C.mag, color: C.blanco, border: "none",
                  padding: "14px 28px", fontSize: 12, fontWeight: 800,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 8,
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.magOsc}
                onMouseLeave={e => e.currentTarget.style.background = C.mag}
              >
                Conoce el RAV <ChevronRight />
              </button>
              <button
                onClick={() => refContacto?.current?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "none", color: C.negro,
                  border: `1.5px solid ${C.negro}`, padding: "14px 28px",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.15em",
                  textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.negro; e.currentTarget.style.color = C.blanco; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = C.negro; }}
              >
                Únete al Gremio
              </button>
            </div>
          </div>

          {/* Panel derecho — datos clave verticales */}
          <div className="hero-side" style={{
            borderLeft: `1px solid ${C.grisBrd}`,
            paddingLeft: 40, display: "flex", flexDirection: "column", gap: 36,
          }}>
            {[
              { n: "89",    label: "Centrales y mercados\nmayoristas en México" },
              { n: "52K+",  label: "Comerciantes activos\nen el gremio" },
              { n: "70.3%", label: "De los alimentos\nde México pasa aquí" },
            ].map(({ n, label }) => (
              <div key={n}>
                <div style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 900, color: C.negro, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, color: C.grisTx, marginTop: 4, lineHeight: 1.5, whiteSpace: "pre-line" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CVCs — franja inferior */}
        <div style={{
          marginTop: 64, paddingTop: 32,
          borderTop: `1px solid ${C.grisBrd}`,
          display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center",
        }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: C.grisTx }}>
            Centros de Validación
          </span>
          {[
            { label: "CVC Occidente — Guadalajara", color: C.verde },
            { label: "CVC Centro — CDMX",           color: C.negro },
            { label: "CVC Norte — Monterrey",        color: C.mag },
          ].map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.negro, letterSpacing: "0.05em" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HABLANDO CLARO
══════════════════════════════════════════ */
function HablandoClaro({ secRef }) {
  return (
    <section id="rav-id" ref={secRef} style={{ background: C.blanco, padding: "96px 32px", borderBottom: `1px solid ${C.grisBrd}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header de sección */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 16, height: 2, background: C.negro }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.grisTx }}>
              Sin tecnicismos
            </span>
          </div>
          <h2 style={{
            margin: 0, fontWeight: 900, fontSize: "clamp(36px, 6vw, 72px)",
            textTransform: "uppercase", letterSpacing: "-0.02em", color: C.negro, lineHeight: 0.95,
          }}>
            El problema<br />
            <span style={{ color: C.mag }}>y la solución.</span>
          </h2>
        </div>

        {/* Grid problema / solución */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: C.grisBrd }}>

          {/* Problema */}
          <div style={{ background: C.blanco, padding: "48px 40px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#D50057", border: "1px solid #D5005730",
              padding: "5px 12px", marginBottom: 28,
            }}>
              ⚠ El Problema
            </div>
            <h3 style={{
              margin: "0 0 28px", color: C.negro,
              fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 800, lineHeight: 1.3,
            }}>
              Compras al campo en efectivo. No te dan factura. El SAT te cobra sobre dinero que no ganaste.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Vendes $50M al año. Tu costo real es $45M. Tu ganancia real: $5M.",
                "Sin factura del productor, Hacienda te cobra sobre los $50M completos.",
                "La carga fiscal se vuelve imposible. La informalidad parece la única salida.",
                "Esto no es tu culpa. Es un fallo del sistema que lleva 50 años sin solución.",
              ].map((txt, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#D50057", fontWeight: 900, fontSize: 16, flexShrink: 0, lineHeight: 1.7 }}>×</span>
                  <p style={{ margin: 0, color: C.grisTx, fontSize: 14, lineHeight: 1.75 }}>{txt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solución */}
          <div style={{ background: C.grisLt, padding: "48px 40px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 9, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase",
              color: C.verde, border: `1px solid ${C.verde}40`,
              padding: "5px 12px", marginBottom: 28,
            }}>
              ✓ La Solución: RAV
            </div>
            <h3 style={{
              margin: "0 0 28px", color: C.negro,
              fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 800, lineHeight: 1.3,
            }}>
              Merca México valida tu compra. Tú deduces el gasto. Duermes tranquilo.
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "El agricultor sigue vendiendo como siempre. Sin facturas. Sin cambios.",
                "Merca México verifica que el producto existe y que el precio es justo.",
                "Con esa validación, puedes deducir ese gasto ante el SAT legalmente.",
                "Pagas impuestos sobre lo que realmente ganas: entre 1.5% y 2.5%.",
              ].map((txt, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: C.verde, flexShrink: 0, marginTop: 3 }}><Tick /></span>
                  <p style={{ margin: 0, color: C.grisTx, fontSize: 14, lineHeight: 1.75 }}>{txt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amnistía */}
        <div style={{
          marginTop: 1, background: C.negro,
          padding: "24px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 24 }}>⏰</span>
            <div>
              <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
                Amnistía de Formalización
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: 800, color: C.blanco }}>
                18 meses sin revisiones del pasado si te regularizas hoy.
              </p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("contacto-id")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: C.mag, color: C.blanco, border: "none",
              padding: "11px 24px", fontSize: 11, fontWeight: 800,
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.magOsc}
            onMouseLeave={e => e.currentTarget.style.background = C.mag}
          >
            Me quiero regularizar <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   STATS
══════════════════════════════════════════ */
function Stats({ secRef }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const c89   = useCounter(89,   1800, on);
  const c52   = useCounter(52,   2000, on);
  const c703  = useCounter(703,  2000, on);
  const c9000 = useCounter(9000, 2200, on);
  const c130  = useCounter(130,  1900, on);
  const c185  = useCounter(185,  2100, on);

  const stats = [
    { val: c89,                            fmt: v => `${v}`,               suf: "",    label: "Centrales y Mercados Mayoristas en México" },
    { val: c52,                            fmt: v => `${v}K`,              suf: "+",   label: "Comerciantes activos en el gremio" },
    { val: c703,                           fmt: v => `${(v/10).toFixed(1)}`, suf: "%", label: "De los alimentos de México pasa por aquí" },
    { val: c9000,                          fmt: v => `$${v.toLocaleString()}M`, suf: "", label: "USD mueve al año solo la CEDA CDMX" },
    { val: c130,                           fmt: v => `${v}M`,              suf: "",    label: "Mexicanos alimentados por esta cadena" },
    { val: c185,                           fmt: v => `${(v/100).toFixed(2)}M`, suf: "", label: "Empleos directos generados por el sector" },
  ];

  return (
    <section ref={(el) => { ref.current = el; if (secRef) secRef.current = el; }}
      style={{ background: C.grisLt, padding: "96px 32px", borderBottom: `1px solid ${C.grisBrd}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 16, height: 2, background: C.negro }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.grisTx }}>
                El sector en cifras
              </span>
            </div>
            <h2 style={{
              margin: 0, fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)",
              textTransform: "uppercase", letterSpacing: "-0.02em", color: C.negro, lineHeight: 0.95,
            }}>
              Merca México<br />
              <span style={{ color: C.verde }}>en números.</span>
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: C.grisTx, maxWidth: 340, lineHeight: 1.7 }}>
            El abasto mayorista no es un nicho. Es la infraestructura crítica que alimenta a México todos los días.
          </p>
        </div>

        {/* Grid de estadísticas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: C.grisBrd }}>
          {stats.map(({ val, fmt, suf, label }, i) => (
            <div key={i} style={{ background: C.blanco, padding: "32px 28px" }}>
              <div style={{
                fontWeight: 900, color: C.negro, lineHeight: 1,
                fontSize: "clamp(36px, 4.5vw, 52px)",
                fontVariantNumeric: "tabular-nums",
              }}>
                {fmt(val)}<span style={{ color: C.verde, fontSize: "0.55em" }}>{suf}</span>
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 12, color: C.grisTx, lineHeight: 1.55 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ZONA TÉCNICA
══════════════════════════════════════════ */
function TechZone({ secRef }) {
  const [open, setOpen] = useState(null);

  const items = [
    {
      id: "tasas",
      label: "Tasas del RAV — Lo que pagas según lo que ganas",
      body: (
        <div>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: C.grisTx, lineHeight: 1.7 }}>
            La tasa refleja la realidad del abasto: márgenes pequeños, rotación alta. Tributas sobre lo que realmente ganas.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 16px", background: C.negro, color: C.blanco, fontWeight: 700 }}>Ventas anuales</th>
                <th style={{ textAlign: "center", padding: "10px 16px", background: C.negro, color: C.blanco, fontWeight: 700 }}>Tasa ISR</th>
                <th style={{ textAlign: "left", padding: "10px 16px", background: C.negro, color: C.blanco, fontWeight: 700 }}>Base</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hasta $5 millones MXN",      "1.5%",           "Sobre ingresos brutos"],
                ["De $5 a $20 millones MXN",   "2.0%",           "Sobre ingresos brutos"],
                ["De $20 a $100 millones MXN", "2.5%",           "Sobre ingresos brutos"],
                ["Más de $100 millones MXN",   "Régimen general","Art. 9 o 152 LISR"],
              ].map(([v, t, b], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.blanco : C.grisLt }}>
                  <td style={{ padding: "10px 16px", color: C.negro, borderBottom: `1px solid ${C.grisBrd}` }}>{v}</td>
                  <td style={{ padding: "10px 16px", color: C.verde, fontWeight: 800, textAlign: "center", borderBottom: `1px solid ${C.grisBrd}` }}>{t}</td>
                  <td style={{ padding: "10px 16px", color: C.grisTx, borderBottom: `1px solid ${C.grisBrd}` }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: "candados",
      label: "8 candados anti-abuso — El sistema que garantiza integridad",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Cuota fija anual — nunca porcentual", "Merca México cobra cuota fija. Nunca un % sobre operaciones. Sin incentivo para inflar facturas."],
            ["Responsabilidad solidaria (Art. 26 CFF)", "Merca México responde fiscalmente si se detectan validaciones fraudulentas."],
            ["Precios topados al SNIIM + 15%", "Ningún CAD-CFDI puede exceder el precio publicado por la Secretaría de Economía."],
            ["Auditoría cruzada con SENASICA", "Los volúmenes declarados deben coincidir con guías de movilización agropecuaria."],
            ["Rotación de validadores", "Ningún funcionario puede validar al mismo comerciante más de 2 ejercicios consecutivos."],
            ["Revocabilidad SAT", "El SAT puede revocar la autorización de Merca México en cualquier momento."],
            ["Dictamen externo anual", "Estados financieros sujetos a contador público independiente."],
            ["Canal de denuncia anónima", "Cualquier comerciante puede reportar irregularidades sin temor a represalias."],
          ].map(([t, d], i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.grisBrd}` }}>
              <div style={{
                width: 22, height: 22, background: C.negro, color: C.blanco,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 900, flexShrink: 0, borderRadius: 2,
              }}>{i+1}</div>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: C.negro }}>{t}</p>
                <p style={{ margin: 0, fontSize: 12, color: C.grisTx, lineHeight: 1.6 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "productor",
      label: "El productor no cambia — Artículo 74 LISR intacto",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            "El productor mantiene su exención del Artículo 74 LISR. La ley no cambia para él.",
            "No está obligado a emitir facturas ni a inscribirse en ningún padrón.",
            "Sigue vendiendo como siempre: producto por efectivo, al amanecer, en la Central.",
            "La carga administrativa recae en el comerciante y en Merca México. No en el campo.",
            "Las facilidades administrativas del DOF para productores primarios permanecen intactas.",
          ].map((txt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.grisBrd}` }}>
              <span style={{ color: C.verde, flexShrink: 0, marginTop: 2 }}><Tick /></span>
              <p style={{ margin: 0, fontSize: 13, color: C.negro, lineHeight: 1.7 }}>{txt}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "flujo",
      label: "El flujo completo — De la compra al SAT en 5 pasos",
      body: (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            ["01", "Te afilias a Merca México", "KYC: verificamos identidad y actividad como comerciante mayorista."],
            ["02", "Compras al productor como siempre", "Efectivo, producto real, precio de mercado. Nada cambia en tu operación."],
            ["03", "Solicitas el Número Único de Validación (NUV)", "Merca México verifica producto, volumen y precio contra el SNIIM."],
            ["04", "Emites tu CAD-CFDI", "Con el NUV, generas tu Comprobante de Auto-Deducción Digital. El SAT lo acepta."],
            ["05", "Declaras y deduces", "Tu costo real está documentado. Pagas entre 1.5% y 2.5% sobre lo que ganaste."],
          ].map(([n, t, d]) => (
            <div key={n} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: `1px solid ${C.grisBrd}` }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 700, color: C.grisTx, flexShrink: 0, marginTop: 2, width: 24 }}>{n}</div>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: C.negro }}>{t}</p>
                <p style={{ margin: 0, fontSize: 12, color: C.grisTx, lineHeight: 1.6 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section ref={secRef} style={{ background: C.blanco, padding: "96px 32px", borderBottom: `1px solid ${C.grisBrd}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ marginBottom: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 16, height: 2, background: C.negro }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.grisTx }}>
              Para tu contador
            </span>
          </div>
          <h2 style={{
            margin: 0, fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)",
            textTransform: "uppercase", letterSpacing: "-0.02em", color: C.negro, lineHeight: 0.95,
          }}>
            Los detalles<br />
            <span style={{ color: C.verde }}>que importan.</span>
          </h2>
          <p style={{ margin: "16px 0 0", fontSize: 14, color: C.grisTx, maxWidth: 440, lineHeight: 1.7 }}>
            Todo lo técnico en un lugar. Comparte esta sección con tu asesor fiscal.
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${C.grisBrd}` }}>
          {items.map(({ id, label, body }) => {
            const isOpen = open === id;
            return (
              <div key={id} style={{ borderBottom: `1px solid ${C.grisBrd}` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : id)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 16, padding: "22px 0",
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", fontFamily: "inherit",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.negro, lineHeight: 1.3 }}>
                    {label}
                  </span>
                  <span style={{ color: isOpen ? C.mag : C.grisTx }}>
                    <PlusMinus open={isOpen} />
                  </span>
                </button>
                {isOpen && (
                  <div style={{ paddingBottom: 28 }}>{body}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACTO
══════════════════════════════════════════ */
function Contacto({ secRef }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", central: "", interes: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const ch = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const chTel = (e) => setForm({ ...form, telefono: e.target.value.replace(/\D/g, "").slice(0, 10) });

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono) return;
    setLoading(true);
    const msg = encodeURIComponent(
      `Hola Merca México, soy ${form.nombre}. Me interesa: ${form.interes || "afiliarme"}. Central: ${form.central || "no especificada"}. Email: ${form.email || "no dado"}. WhatsApp: ${form.telefono}.`
    );
    setTimeout(() => {
      setLoading(false); setSent(true);
      window.open(`https://wa.me/528141948410?text=${msg}`, "_blank");
    }, 700);
  };

  const inp = {
    width: "100%", padding: "12px 0", fontSize: 14,
    border: "none", borderBottom: `1.5px solid ${C.grisBrd}`,
    outline: "none", background: "transparent", color: C.negro,
    boxSizing: "border-box", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contacto-id" ref={secRef}
      style={{ background: C.grisLt, padding: "96px 32px", borderBottom: `1px solid ${C.grisBrd}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 80, alignItems: "start" }}>

          {/* Copy izquierda */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 16, height: 2, background: C.negro }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: C.grisTx }}>
                Sin compromisos
              </span>
            </div>
            <h2 style={{
              margin: "0 0 28px", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)",
              textTransform: "uppercase", letterSpacing: "-0.02em", color: C.negro, lineHeight: 0.95,
            }}>
              Únete al<br />
              <span style={{ color: C.verde }}>gremio.</span>
            </h2>
            <p style={{ margin: "0 0 36px", fontSize: 15, color: C.grisTx, lineHeight: 1.8 }}>
              Merca México está abierto a cualquier mercado de abastos, central
              mayorista o comerciante del sector agroalimentario de México.
              No cobramos comisiones. Solo te avalamos ante Hacienda para que
              tributes sobre lo que realmente ganas.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
              {[
                "Acceso a los 3 Centros de Validación y Control (CVC)",
                "Historial crediticio ante el sistema financiero formal",
                "Amnistía: 18 meses sin revisiones del pasado",
                "Representación gremial ante el SAT y la SHCP",
                "Cuota fija anual — nunca un porcentaje sobre tus ventas",
              ].map((txt, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: C.verde, flexShrink: 0, marginTop: 2 }}><Tick /></span>
                  <p style={{ margin: 0, fontSize: 13, color: C.negro, lineHeight: 1.7 }}>{txt}</p>
                </div>
              ))}
            </div>

            {/* Directiva */}
            <div style={{ borderTop: `1px solid ${C.grisBrd}`, paddingTop: 24 }}>
              <p style={{ margin: "0 0 14px", fontSize: 9, fontWeight: 700, color: C.grisTx, letterSpacing: "0.4em", textTransform: "uppercase" }}>
                Mesa Directiva
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Presidencia", "Miguel Gracián"], ["Vicepresidencia", "Alejandro Gayosso Mar"]].map(([c, n]) => (
                  <div key={c}>
                    <div style={{ fontSize: 9, color: C.grisTx, letterSpacing: "0.3em", textTransform: "uppercase" }}>{c}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.negro, marginTop: 1 }}>{n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div>
            {sent ? (
              <div style={{ padding: "56px 0", textAlign: "left" }}>
                <div style={{ width: 48, height: 48, background: C.verde, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Tick />
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 900, color: C.negro }}>Recibido.</h3>
                <p style={{ margin: 0, color: C.grisTx, fontSize: 14, lineHeight: 1.7 }}>
                  Un representante de Merca México te contactará en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { label: "Nombre completo *", name: "nombre", ph: "Tu nombre", req: true, type: "text", change: ch },
                  { label: "WhatsApp *", name: "telefono", ph: "10 dígitos", req: true, type: "tel", change: chTel },
                  { label: "Correo electrónico", name: "email", ph: "tu@correo.com", req: false, type: "email", change: ch },
                  { label: "Central de Abasto donde operas", name: "central", ph: "CEDA, UCMA, Abastos Estrella...", req: false, type: "text", change: ch },
                ].map(({ label, name, ph, req, type, change }) => (
                  <div key={name}>
                    <label style={{ fontSize: 9, fontWeight: 700, color: C.grisTx, textTransform: "uppercase", letterSpacing: "0.4em", display: "block", marginBottom: 8 }}>
                      {label}
                    </label>
                    <input name={name} placeholder={ph} required={req} type={type}
                      value={form[name]} onChange={change}
                      style={inp}
                      onFocus={e => e.currentTarget.style.borderBottomColor = C.negro}
                      onBlur={e => e.currentTarget.style.borderBottomColor = C.grisBrd} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 9, fontWeight: 700, color: C.grisTx, textTransform: "uppercase", letterSpacing: "0.4em", display: "block", marginBottom: 8 }}>
                    ¿Qué te interesa?
                  </label>
                  <select name="interes" value={form.interes} onChange={ch}
                    style={{ ...inp, borderBottom: `1.5px solid ${C.grisBrd}`, paddingBottom: 12 }}>
                    <option value="">Selecciona...</option>
                    <option value="Afiliarme al RAV">Afiliarme al RAV</option>
                    <option value="Información general">Información general</option>
                    <option value="Representación ante el SAT">Representación ante el SAT</option>
                    <option value="Afiliar mi Central de Abasto">Afiliar mi Central de Abasto</option>
                  </select>
                </div>
                <button type="submit" disabled={loading}
                  style={{
                    background: loading ? C.grisTx : C.mag,
                    color: C.blanco, border: "none",
                    padding: "14px 0", fontSize: 11, fontWeight: 800,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit", marginTop: 8,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = C.magOsc; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.mag; }}
                >
                  {loading ? "Enviando..." : <><span>Quiero afiliarme</span><ChevronRight /></>}
                </button>
                <p style={{ margin: 0, fontSize: 10, color: C.grisTx }}>
                  Sin compromisos. Información confidencial.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: C.negro }}>
      {/* Línea magenta top */}
      <div style={{ height: 3, background: C.mag }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 32px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>

          <div>
            <img
              src="/images/logo-mercamexico-blanco.png"
              alt="MercaMéxico"
              style={{ height: 56, width: "auto", display: "block", marginBottom: 16 }}
            />
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
              Herramientas de cumplimiento,<br />no privilegios.
            </p>
          </div>

          <div>
            <p style={{ margin: "0 0 16px", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              Centros de Validación
            </p>
            {[
              { n: "CVC Occidente", s: "UCMA — Guadalajara, Jal.",          c: C.verde },
              { n: "CVC Centro",    s: "CEDA — Iztapalapa, CDMX",           c: "rgba(255,255,255,0.6)" },
              { n: "CVC Norte",     s: "Abastos Estrella — Monterrey, N.L.", c: C.mag },
            ].map(({ n, s, c }) => (
              <div key={n} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.blanco }}>{n}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2, paddingLeft: 12 }}>{s}</div>
              </div>
            ))}
          </div>

          <div>
            <p style={{ margin: "0 0 16px", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              Mesa Directiva
            </p>
            {[["Presidencia","Miguel Gracián"], ["Vicepresidencia","Alejandro Gayosso Mar"]].map(([c,n]) => (
              <div key={c} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.3em" }}>{c}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.blanco, marginTop: 2 }}>{n}</div>
              </div>
            ))}
          </div>

          <div>
            <p style={{ margin: "0 0 16px", fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em", textTransform: "uppercase" }}>
              Ecosistema
            </p>
            {[
              ["Grupo Mercahorro", "https://grupomercahorro.com", "Infraestructura de abasto"],
              ["Merca Capital",    "https://mercacapital.mx",     "Fondo de inversión"],
            ].map(([l, h, s]) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", marginBottom: 14, textDecoration: "none" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.blanco }}>{l}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{s}</div>
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
            © 2026 MERCAMÉXICO — Asociación Mexicana de Mercados y Centrales de Abasto, A.C.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Aviso de Privacidad", "Términos de Uso"].map(t => (
              <a key={t} href="#" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function MercaMexicoPage() {
  const ravRef     = useRef(null);
  const statsRef   = useRef(null);
  const techRef    = useRef(null);
  const contactRef = useRef(null);
  const refs = { rav: ravRef, stats: statsRef, tech: techRef, contacto: contactRef };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0, padding: 0, background: C.blanco }}>
      <Nav refs={refs} />
      <Hero refContacto={contactRef} />
      <HablandoClaro secRef={ravRef} />
      <Stats secRef={statsRef} />
      <TechZone secRef={techRef} />
      <Contacto secRef={contactRef} />
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-ham   { display: flex !important; }
          .hero-side { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-ham { display: none !important; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${C.blanco}; }
        ::selection { background: ${C.mag}; color: #fff; }
        input::placeholder, select { color: ${C.grisTx}; }
      `}</style>
    </div>
  );
}
