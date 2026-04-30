import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
  Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';
import { User, Target, Award, Sparkles, Languages, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ProfileCard = ({ name, age, program, rol, profile, objective, preTest, chartType, chartData, image, stats, references }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-rose-100"
    >
      <div className="grid md:grid-cols-12 gap-0">
        {/* Sidebar Info */}
        <div className="md:col-span-4 bg-rose-50/50 p-8 border-r border-rose-100 flex flex-col items-center text-center">
          <div className="w-48 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white mb-6">
            <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h2 className="text-xl font-black text-rose-600 mb-1 leading-tight">{name}</h2>
          <p className="text-xs font-bold text-rose-300 uppercase tracking-widest mb-6">{rol || "Cofundadora"}</p>
          
          <div className="w-full space-y-4 text-left">
            <div className="bg-white p-4 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-3 mb-1">
                <User className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">Edad & Educación</span>
              </div>
              <p className="text-sm font-bold text-slate-700">{age} años</p>
              <p className="text-[11px] text-slate-500 leading-tight mt-1">{program}</p>
            </div>

            {stats && (
              <div className="grid grid-cols-2 gap-2">
                {stats.map((s: any, i: number) => (
                  <div key={i} className="bg-white p-3 rounded-2xl border border-rose-100 text-center">
                    <p className="text-[8px] font-black text-rose-300 uppercase mb-1">{s.label}</p>
                    <p className="text-sm font-black text-rose-600">{s.val}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* content Area */}
        <div className="md:col-span-8 p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Perfil Profesional</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 text-justify">{profile}</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">
                <Target className="w-4 h-4 text-rose-500" />
              </div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Objetivo</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 text-justify">{objective}</p>
          </section>

          <section className="space-y-6 pt-6 border-t border-rose-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Resultado Pre-Test</h3>
              </div>
              {preTest?.avg && (
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-black text-xs border border-emerald-100">
                  {preTest.avg}
                </div>
              )}
            </div>

            <div className="bg-slate-50/50 p-6 rounded-3xl border border-rose-50/50">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} fontSize={9} tick={{ fill: '#64748b' }} />
                      <YAxis axisLine={false} tickLine={false} domain={[0, 100]} fontSize={10} tick={{ fill: '#64748b' }} />
                      <Tooltip />
                      <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={25}>
                        {chartData?.map((d: any, i: number) => (
                          <Cell key={i} fill={d.val > 80 ? '#10b981' : d.val > 50 ? '#34d399' : '#f43f5e'} />
                        ))}
                        <LabelList dataKey="val" position="top" fontSize={10} fontWeight="bold" formatter={(v: any) => `${v}%`} />
                      </Bar>
                    </BarChart>
                  ) : (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar name={name} dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {preTest?.analysis && <p className="text-sm leading-relaxed text-slate-600 text-justify">{preTest.analysis}</p>}
            
            {references && (
              <div className="pt-4 border-t border-dotted border-slate-200">
                <p className="text-[9px] text-slate-400 italic">● {references}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default function FullPresentation() {
  const [currentPage, setCurrentPage] = React.useState(0);
  
  const team = [
    {
      name: "Angela Camila Pulgar Morales",
      age: "29",
      program: "Administración en Negocios Internacionales",
      rol: "Coordinadora Operativa",
      image: "https://picsum.photos/seed/angela-pro/600/800",
      stats: [
        { label: 'Prom Núcleo', val: '77,00%' },
        { label: 'Prom Grupo', val: '76,15%' },
      ],
      profile: "Soy Técnica en Comercio Internacional y actualmente me desempeño como Coordinadora Operativa en la empresa Transporte Sánchez Polo, con experiencia en la gestión de procesos logísticos, manejo documental y seguimiento de operaciones en el ámbito de importaciones y exportaciones. A lo largo de mi trayectoria laboral he trabajado en procesos relacionados con comercio internacional entre países como Colombia, Venezuela y Ecuador, lo que me ha permitido fortalecer mis conocimientos en el área aduanera y operativa, contribuyendo al cumplimiento eficiente de las operaciones y a la optimización de los procesos. Me caracterizo por ser una persona organizada, responsable y comprometida, con habilidades para el trabajo en equipo, la resolución de problemas y la mejora continua.",
      objective: "Seguir creciendo en el área de comercio internacional, fortaleciendo mis conocimientos en procesos logísticos, aduaneros y de negocios internacionales, con el fin de aportar de manera eficiente a la operación de la empresa y proyectarme hacia un entorno global, desarrollando especialmente habilidades en inglés y gestión estratégica.",
      preTest: {
        avg: '77.00%',
        analysis: 'En mi test de entrada obtuve un resultado muy bueno y cercano al promedio del grupo, lo que me demuestra que tengo buenas bases, especialmente en temas como formalización legal, información tributaria y gestión del emprendimiento. Estas áreas se me facilitan un poco, porque están muy relacionadas con lo que ya manejo día a día en mi trabajo, en comercio internacional. Sin embargo, también identifiqué dos puntos importantes por mejorar, fuentes de financiamiento y, sobre todo, el inglés. Siento que este último es clave para mi carrera, ya que quiero seguir creciendo en un entorno más global, por lo que me comprometo a estudiar y poder aprenderlo a lo largo de mi carrera y poder graduarme ya conociendo más sobre el idioma. Este resultado me ayuda a entender que ya tengo una base sólida con la que puedo trabajar en este núcleo, pero necesito fortalecer ciertas competencias para seguir avanzando y poder tener un perfil más completo y competitivo tanto en lo personal como en lo laboral.'
      },
      chartType: "bar",
      chartData: [
        { name: 'Formalización', val: 95 },
        { name: 'Financiamiento', val: 66 },
        { name: 'Tributaria', val: 96 },
        { name: 'Perfil', val: 93 },
        { name: 'Marca', val: 91 },
        { name: 'Gestión', val: 98 },
        { name: 'English', val: 36 }
      ],
      references: "Google. (2026). Imagen generada mediante inteligencia artificial a partir del prompt “retrato profesional con iluminación de estudio” [Imagen generada por IA]. Gemini."
    },
    {
      name: "Laura Pérez Montoya",
      age: "20",
      program: "Administración de Negocios Internacionales",
      rol: "CEO & Fundadora",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=610&h=800",
      stats: [
        { label: 'Prom Núcleo', val: '79,13%' },
        { label: 'Prom Grupo', val: '76,15%' },
      ],
      profile: "Técnica en Cosmetología y estética integral, me caracterizo por ser una mujer Inteligente, enfocada y con mucha claridad en mis objetivos. disciplinada, con carácter y autoexigente con mi proceso académico y personal. Soy muy extrovertida, deportista, creativa, me gusta bailar, soy buena para las manualidades y el dibujo.",
      objective: "Ser responsable y comprometida con este núcleo y lo que falta de mi carrera, con buena actitud y aportando ideas creativas, ayudando a resolver dudas y problemas, culminar mis estudios con muy buen promedio, y ser una buena profesional en mi área y en mis próximos emprendimientos.",
      preTest: {
        avg: '79.13%',
        analysis: 'En mi resultado del pretest puedo evidenciar que tengo un desempeño general positivo, con un promedio de 79,13%, por encima del promedio del grupo, lo que indica que cuento con buenas bases en las diferentes áreas evaluadas. Observo que tengo un buen rendimiento en perfil del emprendedor, información titulada y reglas gramaticales, donde alcanzo puntajes altos que reflejan una buena capacidad de comprensión, análisis e interpretación de la información. También mantengo un desempeño adecuado en regiones naturales y sistema de control de la calidad, lo que demuestra que tengo nociones claras en estos temas, aunque aún puedo reforzarlos. Por otro lado, identifico que debo mejorar principalmente en puntos de pronunciación y formulación lógica, ya que son las áreas donde presento mayores dificultades, evidenciando la necesidad de fortalecer tanto mis habilidades de razonamiento como la parte auditiva y de expresión en inglés. En conclusión, considero que tengo una base sólida en la mayoría de los temas evaluados, pero debo enfocarme en reforzar los aspectos donde obtuve menor puntaje para lograr un desempeño más equilibrado y completo.'
      },
      chartType: "radar",
      chartData: [
        { subject: 'Formalización', A: 90, fullMark: 100 },
        { subject: 'Financiamiento', A: 65, fullMark: 100 },
        { subject: 'Tributaria', A: 85, fullMark: 100 },
        { subject: 'Perfil', A: 95, fullMark: 100 },
        { subject: 'Marca', A: 70, fullMark: 100 },
        { subject: 'Gestión', A: 88, fullMark: 100 },
      ]
    },
    {
      name: "Manuela Londoño Duque",
      age: "26",
      program: "Contaduría Pública",
      rol: "Auxiliar Administrativa",
      image: "https://picsum.photos/seed/manuela-pro/600/800",
      profile: "Soy técnica en Comercio Exterior y actualmente me desempeño como auxiliar administrativa en la Secretaría de Movilidad, en el área de cobro coactivo. Me caracterizo por ser una mujer inteligente, con grandes metas y una fuerte determinación para alcanzar cada uno de mis objetivos. Soy responsable, comprometida y siempre dispuesta aprender cosas nuevas, lo que me permite adaptarme con facilidad a diferentes entornos y asumir nuevos retos con seguridad. Me considero una persona capaz, perseverante y con una actitud positiva frente a cada desafío.",
      objective: "Desempeñarme de manera responsable y comprometida en mis funciones, aportando mis conocimientos y habilidades en el área contable. Continuar fortaleciendo mi crecimiento personal y profesional, adquiriendo nuevos aprendizajes que me permitan mejorar mi desempeño.",
      preTest: {
        analysis: 'En proceso de fortalecimiento de competencias en el área contable y financiera para el desarrollo de Lumara Beauty.'
      },
      chartType: "bar",
      chartData: [
        { name: 'Contabilidad', val: 85 },
        { name: 'Admin', val: 78 },
        { name: 'Fiscal', val: 70 },
        { name: 'Liderazgo', val: 92 }
      ]
    },
    {
      name: "Diana Marcela Calle Zuleta",
      age: "26",
      program: "Contaduría pública",
      rol: "Auxiliar Contable",
      image: "https://picsum.photos/seed/diana-pro/600/800",
      stats: [
        { label: 'Prom Núcleo', val: '87,25%' },
        { label: 'Prom Grupo', val: '76,15%' },
      ],
      profile: "Técnica en Auxiliar Administrativa y actualmente curso tercer año de Contaduría Pública. Me desempeño como auxiliar contable y financiera en la empresa MILKAMPO S.A.S, donde he fortalecido mis conocimientos en procesos contables, financieros y administrativos. Me caracterizo por ser una persona organizada, puntual y eficiente en el desarrollo de mis actividades diarias. Tengo la capacidad de adaptarme fácilmente a diferentes entornos laborales.",
      objective: "Consolidarme como una contadora pública integral, fortaleciendo continuamente mis conocimientos en el área contable y financiera, con el fin de aportar al crecimiento y sostenibilidad de las organizaciones. Busco desarrollar habilidades analíticas y estratégicas que me permitan interpretar la información financiera de manera eficiente y apoyar la toma de decisiones dentro de las empresas.",
      preTest: {
        avg: '87.25%',
        analysis: 'En mi test de entrada obtuve un buen resultado, con un promedio de 87,25%, lo que está por encima del promedio del grupo y del núcleo. Considero que tengo buenas bases en temas como sistemas de control, información tributaria y formalización legal. Sin embargo, también identifiqué que debo mejorar en fuentes de financiamiento y especialmente en inglés.'
      },
      chartType: "bar",
      chartData: [
        { name: 'Formalización', val: 95 },
        { name: 'Financiamiento', val: 66 },
        { name: 'Inf. Tributaria', val: 100 },
        { name: 'Perfil Empr.', val: 100 },
        { name: 'Registro Marcario', val: 100 },
        { name: 'Control Gestión', val: 100 },
        { name: 'English', val: 56 }
      ]
    }
  ];

  const handleNext = () => {
    if (currentPage < team.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] py-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mb-16 flex items-center justify-between">
        <a href="/" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-600 font-bold text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Volver al Vault
        </a>
        <div className="text-right">
          <h1 className="text-3xl font-black text-rose-600 uppercase tracking-tighter">Talento Lumara</h1>
          <p className="text-rose-300 font-bold uppercase tracking-[0.3em] text-[10px]">Dream Team Presentation</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-400 hover:text-rose-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-rose-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden min-h-[800px]">
          <AnimatePresence mode="wait">
            <ProfileCard key={team[currentPage].name} {...team[currentPage]} />
          </AnimatePresence>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button 
            id="next-sheet-btn"
            onClick={handleNext}
            disabled={currentPage === team.length - 1}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-400 hover:text-rose-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-rose-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Page Indicators */}
      <div className="mt-12 flex gap-3">
        {team.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-8 bg-rose-500' : 'w-2 bg-rose-200'}`}
          />
        ))}
      </div>

      <footer className="max-w-4xl w-full py-20 border-t border-rose-100 text-center mt-auto">
        <p className="text-rose-300 font-black text-xs uppercase tracking-widest">© 2026 Lumara Beauty - Confidencial - Hoja {currentPage + 1} de {team.length}</p>
      </footer>
    </div>
  );
}
