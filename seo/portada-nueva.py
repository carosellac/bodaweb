# -*- coding: utf-8 -*-
"""Arma /portada-nueva/ (propuesta de portada, sin indexar) a partir de index.html, y agrega sus estilos."""
import io, re, sys
R = 'D:/Usuario/Downloads/bodaweb-html-css/bodaweb/'
h = io.open(R + 'index.html', encoding='utf-8', newline='').read()

i = h.index('    <section class="hero" aria-labelledby="hero-title">')
j = h.index('</section>', i) + len('</section>')
nuevo = '''    <section class="hero hero2" aria-labelledby="hero-title">
      <div class="container hero2-grid">
        <div class="hero2-copy">
          <p class="eyebrow">INVITACIONES DE CASAMIENTO · ARGENTINA</p>
          <h1 id="hero-title">Invitaciones de boda <em>digitales</em></h1>
          <p class="hero2-texto">Tu invitación de boda digital: una página con fecha, mapa, fotos y confirmación de asistencia, lista para mandar por WhatsApp.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#disenos">Ver los 13 diseños <svg class="icon icon-btn"><use href="#i-arrow"/></svg></a>
            <button class="btn btn-outline js-start" type="button">Quiero mi invitación</button>
          </div>
          <ul class="hero2-datos">
            <li><a href="#precios"><strong>$55.000</strong><span>todo incluido</span></a></li>
            <li><strong>3 a 5 días</strong><span>y la tenés lista</span></li>
            <li><strong>Cambios</strong><span>incluidos</span></li>
          </ul>
        </div>
        <div class="hero2-visual">
          <div class="hero2-telefonos">
            <a class="tel tel-izq" href="modelos/eucalipto/" tabindex="-1" aria-hidden="true"><img src="assets/modelo-eucalipto-pantalla.webp" width="585" height="1203" alt="" /></a>
            <a class="tel tel-der" href="modelos/nocturno/" tabindex="-1" aria-hidden="true"><img src="assets/modelo-nocturno-pantalla.webp" width="585" height="1203" alt="" /></a>
            <a class="tel tel-centro" href="modelos/rosa/"><img src="assets/modelo-rosa-pantalla.webp" width="585" height="1203" alt="Invitaciones de boda digitales vistas en el celular: diseños Rosas en Acuarela, Eucalipto y Elegante Nocturno" fetchpriority="high" /></a>
            <div class="hero2-aviso" aria-hidden="true">
              <span class="hero2-aviso-icono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L19 7"/></svg></span>
              <span><strong>Carla confirmó</strong><small>Vienen 2 · llegó por WhatsApp</small></span>
            </div>
          </div>
        </div>
      </div>
    </section>'''
h = h[:i] + nuevo + h[j:]

# Página de prueba: sin indexar y con direcciones absolutas (vive en una subcarpeta)
h = h.replace('<meta name="theme-color" content="#fbf8f5" />', '<meta name="theme-color" content="#fbf8f5" />\n  <meta name="robots" content="noindex" />', 1)
h = re.sub(r'(href|src|srcset)="(?!https?:|/|#|data:|mailto:)([^"]+)"', lambda m: m.group(1) + '="/' + m.group(2) + '"', h)
io.open(R + 'portada-nueva/index.html', 'w', encoding='utf-8', newline='').write(h) if __import__('os').makedirs(R + 'portada-nueva', exist_ok=True) is None else None

css = '''
/* ===================== PORTADA (versión 2): tres celulares con diseños reales ===================== */
.hero2{padding:56px 0 64px;background:radial-gradient(70% 90% at 85% 40%,#f1d9cf 0%,transparent 60%),radial-gradient(60% 70% at 0% 100%,#efe4d6 0%,transparent 70%),var(--cream)}
.hero2-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px}
.hero2 h1{font-size:clamp(46px,5vw,70px);line-height:1.02;letter-spacing:-.8px;margin:0 0 20px}
.hero2 h1 em{display:block}
.hero2-texto{font-family:var(--serif);font-size:22px;line-height:1.4;color:#56514c;max-width:470px;margin:0 0 28px}
.hero2-datos{list-style:none;margin:32px 0 0;padding:0;display:flex;gap:0;max-width:470px;border-top:1px solid var(--line)}
.hero2-datos li{flex:1;padding:16px 14px 0;border-left:1px solid var(--line)}
.hero2-datos li:first-child{border-left:0;padding-left:0}
.hero2-datos a{display:block}
.hero2-datos strong{display:block;font-family:var(--serif);font-weight:500;font-size:27px;line-height:1.1;color:var(--ink)}
.hero2-datos span{display:block;font-size:14px;color:var(--muted);margin-top:2px}
.hero2-datos a:hover strong{color:var(--rose-dark)}
.hero2-visual{display:flex;justify-content:center}
.hero2-telefonos{position:relative;width:min(100%,520px);aspect-ratio:1/1}
.tel{position:absolute;display:block;aspect-ratio:9/18.5;border-radius:13% / 6.3%;background:#231d1a;padding:2.6%;box-shadow:0 30px 60px #3a2a2238,0 0 0 1px #ffffff30;transition:transform .4s ease}
.tel img{width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10.5% / 5.1%;display:block;background:#fff}
.tel-centro{width:44%;left:28%;top:2%;z-index:3}
.tel-izq{width:36%;left:0;top:15%;transform:rotate(-8deg);z-index:1}
.tel-der{width:36%;right:0;top:15%;transform:rotate(8deg);z-index:2}
.tel-izq img,.tel-der img{filter:saturate(.92)}
.hero2-telefonos:hover .tel-izq{transform:rotate(-10deg) translateX(-8px)}
.hero2-telefonos:hover .tel-der{transform:rotate(10deg) translateX(8px)}
.hero2-aviso{position:absolute;left:4%;bottom:6%;z-index:4;display:flex;align-items:center;gap:10px;background:#fff;border-radius:16px;padding:10px 16px 10px 10px;box-shadow:0 14px 34px #3a2a2230;font-family:var(--sans);animation:aviso-entra .6s .8s both}
.hero2-aviso-icono{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#25d366;color:#fff;flex:none}
.hero2-aviso-icono svg{width:18px;height:18px}
.hero2-aviso strong{display:block;font-size:14px;color:var(--ink)}
.hero2-aviso small{display:block;font-size:12.5px;color:var(--muted)}
@keyframes aviso-entra{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@media(max-width:1000px){
  .hero2-grid{gap:24px}
  .hero2-texto{font-size:20px}
}
@media(max-width:780px){
  .hero2{padding:28px 0 36px}
  .hero2-grid{grid-template-columns:1fr;gap:22px}
  .hero2 h1{font-size:clamp(40px,11vw,54px);margin-bottom:14px}
  .hero2-texto{font-size:18.5px;margin-bottom:20px}
  .hero2-datos{margin-top:22px}
  .hero2-telefonos{width:min(100%,400px);aspect-ratio:1/.92;overflow:hidden;margin:0 auto;-webkit-mask:linear-gradient(#000 82%,transparent);mask:linear-gradient(#000 82%,transparent)}
  .hero2-aviso{left:2%;bottom:10%;padding:8px 12px 8px 8px}
  /* En el celular: los teléfonos suben antes de los datos, y queda un solo botón (el encabezado ya tiene "Pedir ahora") */
  .hero2-grid{display:flex;flex-direction:column;align-items:stretch;gap:0}
  .hero2 .hero-actions{margin-bottom:22px}
  .hero2-copy{display:contents}
  .hero2-copy .eyebrow{order:1;margin-bottom:8px}
  .hero2 h1{order:2}
  .hero2-texto{order:3}
  .hero2 .hero-actions{order:4}
  .hero2-visual{order:5}
  .hero2-datos{order:6;margin-top:6px}
  .hero2 .hero-actions .btn-outline{display:none}
  .hero2 .hero-actions .btn-primary{flex:1}
}
@media(max-width:550px){
  .hero2 .eyebrow{letter-spacing:1.6px;font-size:11px}
  .hero2-datos strong{font-size:22px}
  .hero2-datos span{font-size:13px}
  .hero2-datos li{padding:12px 10px 0}
  .hero2-aviso-icono{width:28px;height:28px}
  .hero2-aviso strong{font-size:13px}
  .hero2-aviso small{font-size:11.5px}
}
@media(prefers-reduced-motion:reduce){.hero2-aviso{animation:none}.tel{transition:none}}
'''
c = io.open(R + 'styles.css', encoding='utf-8', newline='').read()
marca = '/* ===================== PORTADA (versión 2)'
if marca in c: c = c[:c.index(marca)].rstrip('\n') + '\n'
c = c.rstrip('\n') + '\n' + css
io.open(R + 'styles.css', 'w', encoding='utf-8', newline='').write(c)
print('ok')
