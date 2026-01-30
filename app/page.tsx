import Header from "./components/Header";

export default function Home() {
  return (
    <div className="bg-background-light text-text-main antialiased selection:bg-primary selection:text-white">
      {/* Top Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-[35px] lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary mb-6 border border-blue-100">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                Nueva generación V4 lanzada
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main sm:text-5xl lg:text-6xl mb-6">
                Seguridad inteligente para tu hogar y negocio
              </h1>
              <p className="text-lg leading-relaxed text-text-secondary mb-8 max-w-lg">
                Monitoreo avanzado con AI, resolución 4K ultra nítida e integración perfecta con la app para una tranquilidad total, estés donde estés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="h-12 rounded-xl bg-primary px-8 text-base font-bold text-white transition-all hover:bg-primary-dark shadow-lg shadow-blue-900/20">
                  Ver productos
                </button>
                <button className="h-12 rounded-xl bg-white border border-gray-200 px-8 text-base font-bold text-text-main transition-all hover:bg-gray-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-primary">play_circle</span>
                  Ver demo
                </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-sm font-medium text-gray-500">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNXDCU8XSm7mnJ7xt4XB4VHmFNzas02LZotdRuFFlg3FAb6G1sZ3v0g-UKg62Fyk2SjYM6_xQ-r5pTdHn2mH5dDGUp60PN6_-yvqcSMWyaxuR6h9NdyxwcJ6DgP66FvL0YlIvccIUcVzRS8K_NXKBf0u9qt4imJBhLFzszAFRVMp3IphwcD-3UhuCJMnIv_SYuAOi1X8KgM5SPVGZ83CJGZXm4s9RSSxFuW3kIKuwxXMU6Cbc2zJFroEjFfSk2sx_VyToqBdfnKlou')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd9wxK-vB2P53IYdbX23pnPUTzYrgjzAVImL50BxDp2RHOibvbcvkLN79NqE-exTKYJf34dlGJFbMR1Ohak3TTynPqaPu2tIGA9NSJZuYnwwfT8RezM48ieJxBapYfpM5nmTi6LxYpw8xNvo0uwqnt4gIxMqxU5HpSC_UGk4KWZjwjAIeQt164fT-nGbUjzhLGqepoRVsoSnaQnD335t6tjB2lysGSCIEbbt8BKTFSZDT8E2rW0qIMpyBLEBObodqGYrT2ofS_-4_U')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgvOmDjcPBTwft__rpYfVT_IIjAXMcfBoEVYMOPJCvWqnJTw58VqK29CEjHke_wr8SruSVRVPS3t-f52Xoas853eXsENXf17NNzkJzlQgjMO-6R8P-9VRwMvqePbcUxES6Y5f12N3RU5e-ISEL2p5Ewtu-oFkSmp8dNDUEfTtZX5r7zAOT8j_hsv53gevDPf0L8gvMwvOAG_Cj9OkJyT31tUQ7R_rW0r2_PC9MzEmNBfZthtPilEjOv0Xl9kTfxP9ZcEWO8opEuO1C')" }}></div>
                </div>
                <p>Con la confianza de más de 10,000 clientes</p>
              </div>
            </div>
            <div className="relative lg:h-auto">
              {/* Abstract Background Blob */}
              <div className="absolute -right-20 -top-20 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-70 blur-3xl"></div>
              <div className="relative rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-gray-900/5 aspect-[4/3] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAHrAxyBMIyJ11TMpMRm_kC1MqNHFOS1KTFOWFwRZlzBN0O0_0NvMkTAwFv55TrQafnvw2Ftd6n1kHN7_Xgy6aQ_7E2-5iS5CBYuTgDmsaXdhHx70revVYE33Ht6NjD17a4kMq25K-FGcnjVj49TEfI3vQSHiiqkHtMiXbVj4XEaQcyMjkNQrtYI7ACwHjaRasCedRc9Pg4tvnyScFPLadtJXZT62oRo6zHT6mPpbjPkZR29xTXxhTSwD_8RrkO5_wo-MpsTyujkhCe')" }}></div>
                {/* Floating UI Element Mockup */}
                <div className="absolute -bottom-6 -left-6 w-48 rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900">Puerta principal</span>
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="h-24 w-full rounded-lg bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDD5E4QDqKjj-id0RUEhuih9-0yN-nS6VYNQjaXbMphMqwB4kuPW4OoNcpZ9lBanW43GIHFevDGnKM_QdUoXqTS__nF59MR_Hkz6QaoomR0qB7JYcAjwO3_yz3fJyHytPToSMV8ZXVKrUQh4kIuax65I49psWYK1pYy2nBdJGui6xRkez52FYOUhGdj9bBgJO0QGZeGX_qdNk45q-7z8M17gDpWfPwP9iiAWsPDUgop57-sSqEU6VCQZD1EUroSy1rnc4KSjxMCuQXK')" }}></div>
                  <div className="mt-2 flex gap-2">
                    <div className="h-1.5 w-1/2 rounded-full bg-gray-200"></div>
                    <div className="h-1.5 w-1/3 rounded-full bg-primary/20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background-subtle py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">Por qué elegir TecnoVision</h2>
              <p className="mt-4 text-text-secondary">Funciones de seguridad de nivel empresarial diseñadas para el uso diario.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">motion_sensor_active</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Detección inteligente de movimiento</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">Algoritmos avanzados diferencian entre hojas moviéndose y verdaderos intrusos, reduciendo las falsas alarmas.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Grabación en la nube 24/7</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">El almacenamiento externo seguro y cifrado garantiza que tus grabaciones estén a salvo incluso si la cámara se daña.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">night_sight_max</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Visión nocturna a color</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">Ve con claridad en la oscuridad total con nuestra avanzada tecnología de sensor starlight.</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">graphic_eq</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Audio bidireccional</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">Escucha lo que sucede y responde a través de la cámara con cancelación de ruido.</p>
                </div>
              </div>
              {/* Feature 5 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">encrypted</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Cifrado de privacidad</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">El cifrado de extremo a extremo de grado militar mantiene privados tus momentos personales.</p>
                </div>
              </div>
              {/* Feature 6 */}
              <div className="group flex flex-col gap-4 rounded-xl border border-[#d0cdea] bg-white p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main">Reconocimiento con AI</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">Distingue al instante entre personas, mascotas, vehículos y paquetes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-text-main">Productos destacados</h2>
                <p className="mt-2 text-text-secondary">Hardware de nivel profesional para cada escenario.</p>
              </div>
              {/* Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-white shadow-md">
                  Todos
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#e7e6f4] px-5 text-sm font-medium text-text-main hover:bg-gray-200">
                  Hogar
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#e7e6f4] px-5 text-sm font-medium text-text-main hover:bg-gray-200">
                  Negocio
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#e7e6f4] px-5 text-sm font-medium text-text-main hover:bg-gray-200">
                  Interior
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#e7e6f4] px-5 text-sm font-medium text-text-main hover:bg-gray-200">
                  Exterior
                </button>
              </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {/* Product 1 */}
              <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm">4K ULTRA HD</div>
                  <div className="h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGS_ppqnO8TaIt1h6yIuuK3xQRAkCuncV6beWJLSO4uUYXl8yQlSJvp_GcEDYPmyH2oviZo6vwZXVHO9wKi4SXPr4P_I26YdJISpaPP51boEtpVEeFSVSsXuUb23e4HOrsBiBKRGlFNyJG2MChfA5HBTRCjCuTt7mrUDgmAawn-LIlWTNGy82Jj5j2HJvBaxRmIrbTybPDgNGe16YHyriKrK_tMm__BD_AtnMWFroX8Zn9Ik5PdYDVw_MGlyPhiFFcgpI2XUR4_I3N')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Serie Interior</div>
                  <h3 className="text-xl font-bold text-text-main">TecnoCam Pro 4K</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">Nuestra cámara interior insignia con paneo/inclinación 360° y seguimiento con AI.</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <div>
                      <span className="text-xs text-gray-400">Desde</span>
                      <p className="text-lg font-bold text-primary">$129.00</p>
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full bg-[#e7e6f4] text-primary transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 2 */}
              <a href="/products/bullet-cam-pro-ai" className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm">WEATHERPROOF</div>
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3uW4QsH-90gg_Y3YK3sFlpg4geiwCYAjWKBe7yKPYlvh7Kej91QK-3b7R9EkmCzrKxLuOkwYpSpgmhvL9UCsVMpRebjRtg_xw39wYKqs7ckOd4LYKBxOJqwdnaICWogskF0RpGuBPqHqpYQK_W4wqkxKofjOAmWpgpWws1Otcp-Op-_9TsQFbVMEyRI8ysWfIRep4hDN5RWcv2pFv8i10HDGVWczkvjSRrBQd0RGnsHoSgVfhaJ6WT-eIdYFdTzhhaE9trC0w8wo4')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Serie Exterior</div>
                  <h3 className="text-xl font-bold text-text-main">Bullet Cam Pro AI</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">Vigilancia de última generación con AI avanzada, visión nocturna EXIR y protección IP67.</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <div>
                      <span className="text-xs text-gray-400">Desde</span>
                      <p className="text-lg font-bold text-primary">$189.00</p>
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full bg-[#e7e6f4] text-primary transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </a>
              {/* Product 3 */}
              <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
                  <div className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-sm">WIRELESS</div>
                  <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAocVgf7M27K6ElRfITdPZVaAL3HxlZOVa-43qGAwltqvXk_oLJDs6ppT5_-cvXh5f4IGwbz5brZklaUHJDihimFj2ovWQiLqPhiozk3eSn1QIU_Tp71yfTjEok9IqJ4xMRWCpvPyWFyQMHTZfm2ykwTD5xuquz9E1SxiBT5ZN_ub78dztluKQWSF8FyAgOIjWlw0TYWiCFwszBGKw0Ghr3tC1_dJlkVxBrO_qnmj1I9xbVL0N686Q_H0b5ZQLxYTMSJsm9NWcknjUn')" }}></div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Serie de entrada</div>
                  <h3 className="text-xl font-bold text-text-main">Doorbell Connect</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">Timbre inteligente a batería con funciones de detección de paquetes.</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <div>
                      <span className="text-xs text-gray-400">Desde</span>
                      <p className="text-lg font-bold text-primary">$99.00</p>
                    </div>
                    <button className="flex size-10 items-center justify-center rounded-full bg-[#e7e6f4] text-primary transition-colors hover:bg-primary hover:text-white">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-background-subtle py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-main">Soluciones a medida</h2>
            <p className="mt-2 text-text-secondary">Seguridad integral diseñada para tus necesidades específicas.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Solution 1: Hogar */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-transform hover:scale-[1.01]">
              <div className="grid h-full lg:grid-cols-2">
                <div className="order-2 flex flex-col justify-center p-8 lg:order-1">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 text-primary">
                    <span className="material-symbols-outlined">home</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">Seguridad para el hogar</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">Protege lo que más importa con cámaras discretas, cerraduras inteligentes y sensores que se integran con tu decoración, mientras brindan protección de grado militar.</p>
                  <a className="mt-6 inline-flex items-center text-sm font-bold text-primary hover:underline" href="#">
                    Explorar planes para el hogar <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </a>
                </div>
                <div className="order-1 h-64 w-full bg-cover bg-center lg:order-2 lg:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByTf9LYbkROr_ZScXqQP1EBVH10c_4n2U43qi1LIZIIMX590KEetED9S8ZghVd5YCxPhv7RtPn99DOBdAIbBcb5HrKpfGgnImTBjEyQEc_4hLReSaX_TzgfbUdAVcmm9T2EOFx5rOXTYT-KGPmCvyIFe_RlHFNeQX_FluhR4hdKSMIRa5hzbT4zkByRXcgc_bKf-ZI785zUuzo82Y_BoMQ3gqQuib_xSAXwY306V6Pb9EaSaal0oFKTutxW89_Zeljt3SuM8-dakud')" }}></div>
              </div>
            </div>
            {/* Solution 2: Negocio */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-transform hover:scale-[1.01]">
              <div className="grid h-full lg:grid-cols-2">
                <div className="order-2 flex flex-col justify-center p-8 lg:order-1">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 text-primary">
                    <span className="material-symbols-outlined">business</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">Vigilancia para negocios</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">Escala tu seguridad desde un solo local hasta una empresa con múltiples sedes. Incluye integración con POS, seguimiento de ocupación y control de acceso multiusuario.</p>
                  <a className="mt-6 inline-flex items-center text-sm font-bold text-primary hover:underline" href="#">
                    Explorar planes para negocios <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </a>
                </div>
                <div className="order-1 h-64 w-full bg-cover bg-center lg:order-2 lg:h-auto" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARDD-7yFq4-tDC19obft_EaKDUtaj6ch_ROuRXpJl9jDLQvOnQdFD4H1_Jh5Ga-McdQyaJh5j61vLGQoViewk8phKDhWYVYP5S3yyZXuH3sJ6Ir_hOuFYJ-8pHRBKJGzbTiwdo6tt-8xIKTFAlv43GohMhZbutiZHN_lXgNgpYLBsFIADbM6Q2f2TOmrrRB7kgWENPLMYpNg8ryj3V-56ESs_Jen2EddiAR-cNM_1yX-jLThb8vM_gGEQ7uF9fvXJYdJiqi27IDFSH')" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-main">Configúralo en minutos</h2>
            <p className="mt-2 text-text-secondary">No requiere instalación profesional. Solo conecta y listo.</p>
          </div>
          <div className="relative grid gap-12 md:grid-cols-3">
            {/* Connecting Line (Desktop) */}
            <div className="absolute left-0 top-12 hidden h-0.5 w-full -translate-y-1/2 border-t-2 border-dashed border-gray-200 md:block lg:w-[80%] lg:left-[10%]"></div>
            {/* Paso 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-white border-4 border-[#e7e6f4] text-primary shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl">power</span>
              </div>
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">Paso 1</span>
              <h3 className="text-xl font-bold text-text-main">Encender</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-500">Conecta tu dispositivo TecnoVision a cualquier toma de corriente estándar.</p>
            </div>
            {/* Paso 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-white border-4 border-[#e7e6f4] text-primary shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl">wifi</span>
              </div>
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">Paso 2</span>
              <h3 className="text-xl font-bold text-text-main">Conectar WiFi</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-500">Descarga la app y conéctate a tu red local al instante.</p>
            </div>
            {/* Paso 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-white border-4 border-[#e7e6f4] text-primary shadow-lg z-10">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              <span className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">Paso 3</span>
              <h3 className="text-xl font-bold text-text-main">Asegurar</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-500">Personaliza tus zonas y comienza a monitorear de inmediato.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="bg-background-subtle py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Testimonials */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-text-main">Con la confianza de miles</h2>
              <div className="grid gap-6">
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <p className="text-gray-700 italic">&quot;The image quality is absolutely stunning, even at night. I can check on my shop from anywhere in the world without any lag.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgBi-hGJnk8YSxsw0R1z_QbPjeDt1zgTw_vlkJrGz0rrVTRViUiGUfzcr5dVtCJIbsoomT-2EctbDhONkbCry7AJr3sE_XeYhwEWxknu6uoIbcvTPAUHdexw0X4gy32gmBS7pJLW_iQh_Nt4BJIcP0-0Iegj-LP5l0xYxMybCspGNhqKPWz2FWF7eHBr16eEDDQmtmsJaj6DKbHyq87pXPKqKfBTBzSGDwlgwLV_XlfKyzmO263Bm2Mvfk_cwdRErlp72Mr6IX3M-5')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-text-main">Sarah Jenkins</p>
                      <p className="text-xs text-gray-500">Dueña(o) de pequeño negocio</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <p className="text-gray-700 italic">&quot;Best investment for my home. The AI detection actually works and doesn&apos;t spam me when my cat walks by.&quot;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2TKDQ2bpYNZUTbOpP31xpkpdQMYeWLkqYKeN3DaulT4StNvnjhG2u9MBgVWSdMjjoFgjtbWD8rRh3bjP3Y6ASBrWYROybr4apoLLE7Q6zjyhRv5joj5_XIRrj7gap7ig1sRWggIwIU1ES6qYyYgPw8eqYclCdqusKJtM3M20gCOoizamQMq2nuyPGbIuJg_xPW3U5sKFm4gDgcF6JCFkCcCoZ3ATEeKdCCpLpN13nGBxr8xiuNSGnjhiOpqdTppIauTYy8LbvZoyj')" }}></div>
                    <div>
                      <p className="text-sm font-bold text-text-main">Mark Thompson</p>
                      <p className="text-xs text-gray-500">Propietario(a)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* FAQ */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-text-main">Preguntas frecuentes</h2>
              <div className="flex flex-col gap-4">
                <details className="group rounded-xl bg-white p-4 shadow-sm border border-gray-100" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-text-main">
                    <span>¿Necesito una suscripción?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600">
                    La grabación local básica es gratis. Ofrecemos suscripciones opcionales en la nube desde $3.99/mes para un historial ampliado y funciones avanzadas de AI.
                  </p>
                </details>
                <details className="group rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-text-main">
                    <span>¿La instalación es difícil?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600">
                    Para nada. La mayoría de los clientes configura el sistema en menos de 15 minutos. Nuestros modelos a batería no requieren cableado.
                  </p>
                </details>
                <details className="group rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-text-main">
                    <span>¿Qué pasa si se va la luz?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600">
                    Nuestra unidad de batería de respaldo (se vende por separado) puede mantener tu sistema funcionando hasta 24 horas durante apagones.
                  </p>
                </details>
                <details className="group rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-text-main">
                    <span>¿Puedo acceder a varias ubicaciones?</span>
                    <span className="transition group-open:rotate-180">
                      <span className="material-symbols-outlined">expand_more</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600">
                    Sí, la app TecnoVision admite ubicaciones ilimitadas. Ideal para dueños de negocios con varias sucursales o casas de vacaciones.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-3xl bg-primary px-6 py-16 text-center shadow-2xl md:px-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            <h2 className="relative text-3xl font-bold text-white md:text-4xl">¿Listo para proteger tu mundo?</h2>
            <p className="relative mt-4 text-lg text-blue-100 max-w-2xl mx-auto">Únete a más de 50,000 clientes que confían en TecnoVision para sus necesidades de seguridad. Comienza hoy con nuestra garantía de devolución de dinero de 30 días.</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="h-12 w-full min-w-[160px] rounded-xl bg-white px-6 font-bold text-primary transition hover:bg-gray-50 sm:w-auto">
                Comenzar
              </button>
              <button className="h-12 w-full min-w-[160px] rounded-xl border border-white/30 bg-primary/20 px-6 font-bold text-white transition hover:bg-primary/30 sm:w-auto">
                Contactar ventas
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="mb-4">
                <img src="/logo.png" alt="TecnoVision" className="h-10 w-auto" />
              </div>
              <p className="mb-6 max-w-xs text-sm text-gray-500">Innovando el futuro de la seguridad con tecnología impulsada por AI y experiencias de usuario sin fricciones.</p>
              <div className="flex gap-4">
                <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined">public</span></a>
                <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined">send</span></a>
                <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-text-main">Productos</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-500">
                <li><a className="hover:text-primary" href="#">Cámaras</a></li>
                <li><a className="hover:text-primary" href="#">Timbres</a></li>
                <li><a className="hover:text-primary" href="#">Cerraduras inteligentes</a></li>
                <li><a className="hover:text-primary" href="#">Accesorios</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-text-main">Empresa</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-500">
                <li><a className="hover:text-primary" href="#">Sobre nosotros</a></li>
                <li><a className="hover:text-primary" href="#">Carreras</a></li>
                <li><a className="hover:text-primary" href="#">Blog</a></li>
                <li><a className="hover:text-primary" href="#">Prensa</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold text-text-main">Soporte</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-500">
                <li><a className="hover:text-primary" href="#">Centro de ayuda</a></li>
                <li><a className="hover:text-primary" href="#">Contáctanos</a></li>
                <li><a className="hover:text-primary" href="#">Garantía</a></li>
                <li><a className="hover:text-primary" href="#">Estado</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-100 pt-8 text-sm text-gray-400 md:flex-row">
            <p>© 2024 TecnoVision Inc. Todos rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a className="hover:text-gray-600" href="#">Política de privacidad</a>
              <a className="hover:text-gray-600" href="#">Términos del servicio</a>
              <a className="hover:text-gray-600" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
