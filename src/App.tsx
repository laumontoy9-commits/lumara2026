/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Folder, 
  File, 
  FileText, 
  FileSpreadsheet, 
  FileArchive, 
  ChevronRight, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  LayoutDashboard,
  Files,
  Users,
  Settings,
  Bell,
  Menu,
  ShieldCheck,
  Plus,
  Sparkles,
  Heart,
  Gem,
  BookOpen,
  FileImage,
  Camera,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FullPresentation from './components/FullPresentation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  LabelList,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockData } from './mockData';
import { FileEntry, FolderEntry, RootEntry, DocumentStatus } from './types';
import { saveFileToDB, saveImageToDB, deleteFileFromDB, saveVaultState, loadVaultState } from './storage';

const StatusBadge = ({ status }: { status: DocumentStatus }) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-100">Aprobado</Badge>;
    case 'reviewed':
      return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-100">Revisado</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-100">Pendiente</Badge>;
    default:
      return null;
  }
};

const FileIcon = ({ extension }: { extension: string }) => {
  const ext = extension.toLowerCase();
  if (['pdf'].includes(ext)) return <FileText className="w-5 h-5 text-rose-400" />;
  if (['xlsx', 'xls', 'csv'].includes(ext)) return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
  if (['zip', 'rar', '7z'].includes(ext)) return <FileArchive className="w-5 h-5 text-amber-400" />;
  if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext)) return <FileImage className="w-5 h-5 text-purple-400" />;
  return <File className="w-5 h-5 text-slate-300" />;
};

import { read, utils } from 'xlsx';

const BusinessModelPreview = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-[90vh] md:h-[88vh] bg-[#FFF8F8]">
      <div className="flex-1 overflow-y-auto p-4 sm:p-12 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 opacity-60" />
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-16 shadow-2xl border border-rose-100 rounded-[3rem] relative z-10">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-6 border-b border-rose-100 pb-12 text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-200">
                <LayoutDashboard className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-serif text-slate-800 tracking-tight">Modelo de Negocio</h1>
                <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.5em] mt-3">Lumara Beauty • Estrategia 2026</p>
              </div>
              <p className="text-slate-500 italic text-sm font-light max-w-2xl mx-auto leading-relaxed">
                "Nuestra empresa está estructurada de manera estratégica para ofrecer un producto innovador dentro del mercado de la belleza."
              </p>
            </div>

            {/* Narrative Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-700 leading-relaxed text-sm">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <Users className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Socios Clave</h2>
                </div>
                <p>
                  Contamos con laboratorios cosméticos, proveedores de materias primas, fabricantes de empaques y charms, influencers y plataformas de venta online, además del respaldo de entidades regulatorias, lo que nos permite garantizar calidad y cumplimiento.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Actividades Clave</h2>
                </div>
                <p>
                  Nos centramos en el desarrollo y formulación del producto, producción, diseño de empaques y charms, marketing digital, ventas y gestión de marca, lo cual asegura que el producto sea atractivo, funcional y competitivo.
                </p>
              </section>

              <section className="space-y-4 md:col-span-2 bg-rose-500/5 p-8 rounded-[2rem] border border-rose-100/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-sm">
                    <Gem className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Propuesta de Valor</h2>
                </div>
                <p className="font-medium text-slate-800">
                  Es uno de los pilares más importantes, ya que ofrecemos un producto 3 en 1 que combina maquillaje, tratamiento y accesorio, incluyendo un gloss con efecto pH, volumen sin irritación, hidratación con protección UV y un charm intercambiable, lo que nos diferencia al brindar personalización y experiencia al cliente.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Relación con Clientes</h2>
                </div>
                <p>
                  Buscamos una conexión cercana a través de redes sociales, interacción constante, creación de comunidad y fidelización mediante charms coleccionables, generando así una experiencia de marca.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Segmentos de Clientes</h2>
                </div>
                <p>
                  Enfocados principalmente en mujeres entre 16 y 35 años interesadas en maquillaje, tendencias y productos innovadores, especialmente activas en redes sociales.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Canales</h2>
                </div>
                <p>
                  Utilizamos TikTok, Instagram, tienda online, marketplace e influencers, lo que nos permite tener un alcance digital amplio y directo.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Recursos Clave</h2>
                </div>
                <p>
                  Contamos con la fórmula del producto, la marca Lumara Beauty, el registro sanitario, el diseño del producto, presencia digital y un equipo de trabajo sólido.
                </p>
              </section>

              <section className="space-y-4 md:col-span-2 pt-8 border-t border-rose-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-800">Costos e Ingresos</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 text-[13px]">
                  <p>
                    <span className="font-bold text-slate-800 block mb-1">Estructura de Costos:</span>
                    Incluye producción, registro sanitario, marketing, diseño, logística y costos administrativos.
                  </p>
                  <p>
                    <span className="font-bold text-slate-800 block mb-1">Fuentes de Ingreso:</span>
                    Provienen de la venta del dúo de gloss y delineador, charms intercambiables, ediciones limitadas, kits y promociones.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer Section */}
            <div className="pt-12 border-t border-rose-100 text-center">
              <p className="text-slate-500 italic text-sm leading-relaxed mb-8">
                "En conjunto, este modelo nos permite tener una propuesta innovadora, escalable y enfocada en la experiencia del cliente."
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-rose-300" />
                Documento Estratégico • Lumara VentureVault
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-rose-50 flex justify-center sticky bottom-0 z-20">
        <Button onClick={onBack} className="rounded-full bg-rose-500 hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-rose-100 transition-all">
          Cerrar Documento
        </Button>
      </div>
    </div>
  );
};

const ReferencesPreview = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-[90vh] md:h-[88vh] bg-[#FDFCFB]">
      <div className="flex-1 overflow-y-auto p-4 sm:p-12 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 opacity-40" />
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-16 shadow-2xl border border-rose-50/50 rounded-[3rem] relative z-10">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-6 border-b border-rose-50 pb-12">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-[1.25rem] bg-rose-50 flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Lista de Referencias</h1>
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.4em] mt-1">Normas APA 7ma edición</p>
                </div>
              </div>
              <p className="text-slate-500 italic text-sm font-light max-w-2xl leading-relaxed">
                Base académica y estratégica de <span className="text-rose-500 font-bold not-italic">Lumara Beauty</span> — Business Model Canvas.
              </p>
            </div>

            {/* Content List with APA style hanging indent */}
            <div className="space-y-12">
              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">1. Fuente principal — Business Model Canvas</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">Osterwalder, A., & Pigneur, Y. (2011). <i>Generación de modelos de negocio</i> (L. Vázquez Cao, Trad.; 2.ª ed.). Ediciones Deusto. (Obra original publicada en 2010)</p>
                  <p className="pl-12 -indent-12">Strategyzer. (2026, enero 28). <i>The business model canvas</i>. <a href="https://www.strategyzer.com/library/the-business-model-canvas" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.strategyzer.com/library/the-business-model-canvas</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">2. Videos de YouTube</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">The Paradigma Commitment. (2022, abril 24). <i>¿Qué es el Business Model Canvas?</i> [Video]. YouTube. <a href="https://www.youtube.com/watch?v=tkA_DqeiJ2c" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.youtube.com/watch?v=tkA_DqeiJ2c</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">3. Propuesta de valor — Gloss con efecto pH e hidratación</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">Revista Observatorio de la Economía Latinoamericana. (2025). <i>Formulación de brillo labial vegano con aceite de ricino: análisis de propiedades cosméticas</i>. <a href="https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/download/9392/5948/22810" target="_blank" className="text-rose-500 hover:underline transition-all">https://ojs.observatoriolatinoamericano.com/ojs/index.php/olel/article/download/9392/5948/22810</a></p>
                  <p className="pl-12 -indent-12">Hola. (2023, 5 de febrero). <i>Tendencia viral: labios del color de tu pH</i>. <a href="https://www.hola.com/us-es/belleza/20230205342347/tendencia-beauty-labial-ph/" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.hola.com/us-es/belleza/20230205342347/tendencia-beauty-labial-ph/</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">4. Socios clave — INVIMA (entidad reguladora)</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">Instituto Nacional de Vigilancia de Medicamentos y Alimentos (INVIMA). (s.f.). <i>Cosméticos: notificación sanitaria obligatoria</i>. <a href="https://www.invima.gov.co/cosmeticos-aseo-plaguicidas/cosmeticos" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.invima.gov.co/cosmeticos-aseo-plaguicidas/cosmeticos</a></p>
                  <p className="pl-12 -indent-12">Affirma Legal. (2025, abril). <i>Registro INVIMA para cosméticos en Colombia</i>. <a href="https://www.affirmalegal.com/blog/registro-invima-para-cosmeticos-en-colombia/" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.affirmalegal.com/blog/registro-invima-para-cosmeticos-en-colombia/</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">5. Canales — TikTok, Instagram y e-commerce</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">Marketing4Ecommerce. (2026, marzo). <i>TikTok e Instagram redefinen el consumo digital en Colombia en 2026</i>. <a href="https://marketing4ecommerce.co/tiktok-e-instagram-redefinen-el-consumo-digital-en-colombia-2026/" target="_blank" className="text-rose-500 hover:underline transition-all">https://marketing4ecommerce.co/tiktok-e-instagram-redefinen-el-consumo-digital-en-colombia-2026/</a></p>
                  <p className="pl-12 -indent-12">Símbolo Interactivo. (2025). <i>Tendencias de marketing digital en Colombia 2025</i>. <a href="https://www.simbolointeractivo.com/tendencias-de-marketing-digital-en-colombia-2025/" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.simbolointeractivo.com/tendencias-de-marketing-digital-en-colombia-2025/</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">6. Segmento de clientes — Mercado cosmético en Colombia</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">Portafolio. (2025, enero 16). <i>Sector de la belleza en Colombia proyecta un crecimiento superior al 4% en 2025</i>. <a href="https://www.portafolio.co/emprendimiento/sector-de-la-belleza-en-colombia-proyecta-un-crecimiento-superior-al-4-en-2025-621759" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.portafolio.co/emprendimiento/sector-de-la-belleza-en-colombia-proyecta-un-crecimiento-superior-al-4-en-2025-621759</a></p>
                  <p className="pl-12 -indent-12">El Tiempo. (2025, agosto 2). <i>Esto es lo que está revolucionando el mercado de la estética en Colombia</i>. <a href="https://www.eltiempo.com/vida/tendencias/esto-es-lo-que-esta-revolucionando-el-mercado-de-la-cosmetica-en-colombia-las-nuevas-tendencias-con-belleza-y-salud-2025-3477779" target="_blank" className="text-rose-500 hover:underline transition-all">https://www.eltiempo.com/vida/tendencias/esto-es-lo-que-esta-revolucionando-el-mercado-de-la-cosmetica-en-colombia-las-nuevas-tendencias-con-belleza-y-salud-2025-3477779</a></p>
                  <p className="pl-12 -indent-12">INEXMODA. (2025, octubre). <i>El beauty made in Colombia</i>. <a href="https://inexmoda.org.co/moda-y-tendencias/el-beauty-made-in-colombia/" target="_blank" className="text-rose-500 hover:underline transition-all">https://inexmoda.org.co/moda-y-tendencias/el-beauty-made-in-colombia/</a></p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 border-l-4 border-rose-300 pl-4 py-1">7. Representación visual</h2>
                <div className="space-y-8 text-[13px] text-slate-700 leading-[1.8] pl-4">
                  <p className="pl-12 -indent-12">OpenAI. (2025). [Imagen de gloss labial rosado estilo minimalista para marca de belleza colombiana] [Imagen generada por inteligencia artificial, ChatGPT]. <a href="https://chat.openai.com" target="_blank" className="text-rose-500 hover:underline transition-all">https://chat.openai.com</a></p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="pt-12 border-t border-rose-50 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-rose-300" />
                Documentación Oficial • Lumara Project
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white border-t border-rose-50 flex justify-center sticky bottom-0 z-20">
        <Button onClick={onBack} className="rounded-full bg-rose-500 hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-rose-100 transition-all">
          Cerrar Documento
        </Button>
      </div>
    </div>
  );
};

const SpreadsheetPreview = ({ filename, url }: { filename: string; url?: string }) => {
  const [data, setData] = useState<any[][]>([
    ['Fase', 'Actividad', 'Responsable', 'Estado', 'Progreso'],
    ['Lanzamiento', 'Campaña Duo Lips', 'Laura Montoya', 'En Proceso', '75%'],
    ['Lanzamiento', 'Sesión de Fotos', 'Diana Calle', 'Completado', '100%'],
    ['Operación', 'Logística de Envío', 'Angela Pulgar', 'Pendiente', '0%'],
    ['Finanzas', 'Presupuesto Q2', 'Manuela Londoño', 'Revisión', '50%'],
    ['Marketing', 'Influencer Outreach', 'Laura Montoya', 'En Proceso', '40%'],
  ]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!url) return;

    const loadRealData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        if (jsonData && jsonData.length > 0) {
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error parsing excel:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRealData();
  }, [url]);

  return (
    <div className="bg-white h-full flex flex-col font-sans">
      <div className="bg-emerald-700 p-2 flex items-center gap-6 text-white text-[10px] font-bold uppercase tracking-wider">
        <div className="bg-emerald-800 px-4 py-1 rounded shadow-inner">Archivo</div>
        <div className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Inicio</div>
        <div className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Insertar</div>
        <div className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Fórmulas</div>
        <div className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Datos</div>
        <div className="flex-1"></div>
        <div className="text-emerald-300 italic flex items-center gap-2">
          {loading && <Sparkles className="w-3 h-3 animate-spin" />}
          {filename}
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-slate-100">
        <table className="w-full border-collapse text-[11px] border-r border-b border-slate-200 shadow-sm bg-white">
          <thead>
            <tr>
              <th className="w-8 bg-slate-100 border border-slate-200"></th>
              {data[0]?.map((_, i) => (
                <th key={i} className="bg-slate-100 border border-slate-200 p-1 font-normal text-slate-400 w-40 text-center">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data.length > 25 ? data : [...data, ...Array.from({ length: 25 - data.length })]).map((row, rowIndex) => {
              const rowIdx = rowIndex + 1;
              return (
                <tr key={rowIndex}>
                  <td className="bg-slate-100 border border-slate-200 p-1 text-center font-normal text-slate-400">{rowIdx}</td>
                  {data[0]?.map((_, i) => {
                    const isHeader = rowIndex === 0;
                    const cellData = row?.[i];
                    return (
                      <td 
                        key={i} 
                        className={`border border-slate-100 p-2 min-w-[120px] ${isHeader ? 'bg-emerald-50/50 font-bold text-emerald-800' : 'bg-white text-slate-600'}`}
                      >
                        {cellData !== undefined && cellData !== null ? String(cellData) : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-200 border-t border-slate-300 p-1 flex gap-2 text-[10px] text-slate-600 font-bold">
        <div className="bg-white px-6 py-1 border-t-2 border-emerald-500 text-emerald-700 shadow-sm flex items-center gap-2">
          <FileSpreadsheet className="w-3 h-3" />
          Plan Maestro
        </div>
        <div className="px-6 py-1 hover:bg-slate-300 cursor-pointer rounded transition-colors flex items-center gap-2 opacity-60">
          <Clock className="w-3 h-3" />
          Historial
        </div>
        <div className="px-4 py-1 hover:bg-slate-300 cursor-pointer rounded transition-colors">+</div>
      </div>
    </div>
  );
};

const CharmSVG = ({ name, className }: { name: string; className?: string }) => {
  const gold = "#D4AF37";
  const pink = "#FFC0CB";
  const rose = "#E16496";

  switch (name) {
    case 'Corazón':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={pink} stroke={gold} strokeWidth="1"/>
        </svg>
      );
    case 'Moño':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.5 0 2.84-.66 3.75-1.71l1.25 1.71 1.25-1.71c.91 1.05 2.25 1.71 3.75 1.71 2.76 0 5-2.24 5-5s-2.24-5-5-5c-1.5 0-2.84.66-3.75 1.71l-1.25-1.71-1.25 1.71c-.91-1.05-2.25-1.71-3.75-1.71z" fill={pink} stroke={gold} strokeWidth="1"/>
          <circle cx="12" cy="15" r="2" fill={gold}/>
        </svg>
      );
    case 'Flor':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8c1.5-3 5-3 5 0s-3.5 3-5 3-5 0-5-3 3.5-3 5 0zM12 16c1.5 3 5 3 5 0s-3.5-3-5-3-5 0-5 3 3.5 3 5 0zM8 12c-3-1.5-3-5 0-5s3 3.5 3 5-3 5 0 5-3-3.5-3-5zM16 12c3-1.5 3-5 0-5s-3 3.5-3 5 3 5 0 5 3-3.5 3-5z" fill={pink} stroke={gold} strokeWidth="1"/>
          <circle cx="12" cy="12" r="2" fill={gold}/>
        </svg>
      );
    case 'Estrella':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={gold} stroke={gold} strokeWidth="1"/>
          <circle cx="12" cy="12" r="1" fill="white"/>
        </svg>
      );
    case 'Inicial':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill={pink} stroke={gold} strokeWidth="1.5"/>
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill={gold} fontSize="8" fontWeight="bold" fontFamily="serif">L</text>
          <path d="M16 8l1.5 1.5M17.5 8L16 9.5" stroke={gold} strokeWidth="1"/>
        </svg>
      );
    case 'Mariposa':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10c0-4 4-6 6-4s0 6-2 8c2 2 4 6-2 8s-4-4-4-8zM12 10c0-4-4-6-6-4s0 6 2 8c-2 2-4 6 2 8s4-4 4-8z" fill={pink} stroke={gold} strokeWidth="1"/>
          <path d="M12 6v12" stroke={gold} strokeWidth="1.5"/>
        </svg>
      );
    case 'Perla':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" fill="white" stroke={gold} strokeWidth="1"/>
          <circle cx="10" cy="10" r="2" fill="white" fillOpacity="0.5"/>
        </svg>
      );
    case 'Luna':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill={gold} stroke={gold} strokeWidth="1"/>
          <circle cx="15" cy="10" r="0.5" fill="white"/>
        </svg>
      );
    case 'Osito':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="3" fill={gold}/>
          <circle cx="17" cy="7" r="3" fill={gold}/>
          <circle cx="12" cy="14" r="7" fill={gold}/>
          <circle cx="12" cy="13" r="3" fill="white" fillOpacity="0.2"/>
        </svg>
      );
    case 'Espejo':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="7" ry="9" fill="white" stroke={gold} strokeWidth="2"/>
          <path d="M10 8l4 8" stroke={gold} strokeOpacity="0.1" strokeWidth="1"/>
        </svg>
      );
    case 'Tulipán':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15c-3 0-5-3-5-6 0-2 2-4 5-4s5 2 5 4c0 3-2 6-5 6z" fill={pink} stroke={rose} strokeWidth="1"/>
          <path d="M12 15v5M12 20c-2 0-3-2-3-2M12 20c2 0 3-2 3-2" stroke="green" strokeWidth="1.5"/>
        </svg>
      );
    case 'Cristal':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={rose} stroke={gold} strokeWidth="1"/>
          <path d="M8 7l4 4 4-4" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
        </svg>
      );
    default:
      return <Sparkles className={className} />;
  }
};

const FloatingCharms = () => {
  const charms = [
    { name: 'Corazón', top: '5%', left: '8%', delay: 0, size: 35 },
    { name: 'Moño', top: '20%', left: '85%', delay: 1, size: 28 },
    { name: 'Flor', top: '35%', left: '4%', delay: 2, size: 40 },
    { name: 'Estrella', top: '12%', left: '40%', delay: 3, size: 30 },
    { name: 'Inicial', top: '65%', left: '90%', delay: 4, size: 32 },
    { name: 'Mariposa', top: '82%', left: '5%', delay: 5, size: 28 },
    { name: 'Perla', top: '50%', left: '12%', delay: 0.5, size: 24 },
    { name: 'Luna', top: '75%', left: '42%', delay: 1.5, size: 30 },
    { name: 'Osito', top: '10%', left: '70%', delay: 2.5, size: 38 },
    { name: 'Espejo', top: '88%', left: '85%', delay: 3.5, size: 35 },
    { name: 'Tulipán', top: '45%', left: '95%', delay: 4.5, size: 32 },
    { name: 'Cristal', top: '55%', left: '48%', delay: 5.5, size: 30 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {charms.map((charm, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: charm.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: charm.top,
            left: charm.left,
            width: charm.size,
            height: charm.size,
          }}
        >
          <CharmSVG name={charm.name} className="w-full h-full drop-shadow-[0_4px_8px_rgba(184,134,11,0.3)]" />
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/presentation" element={<FullPresentation />} />
    </Routes>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const isLoadedRef = useRef(false);
  const [allData, setAllData] = useState<RootEntry[]>(mockData);
  const [currentPath, setCurrentPath] = useState<FolderEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [profilePhotos, setProfilePhotos] = useState<Record<string, string>>({});
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const [customSignatures, setCustomSignatures] = useState<Record<string, string>>({
    laura: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Ctext x='50%25' y='60%25' font-family='Brush Script MT, cursive' font-size='40' fill='%230f172a' text-anchor='middle' transform='rotate(-2, 150, 50)'%3ELaura Pérez M.%3C/text%3E%3C/svg%3E",
    angela: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Ctext x='50%25' y='60%25' font-family='Apple Chancery, cursive' font-size='35' fill='%230f172a' text-anchor='middle' transform='rotate(1, 150, 50)'%3EAngela Pulgar M.%3C/text%3E%3C/svg%3E",
    diana: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Ctext x='50%25' y='60%25' font-family='Snell Roundhand, cursive' font-size='38' fill='%230f172a' text-anchor='middle' transform='rotate(-1, 150, 50)'%3EDiana Calle Z.%3C/text%3E%3C/svg%3E",
    manuela: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Ctext x='50%25' y='60%25' font-family='Lucida Handwriting, cursive' font-size='32' fill='%230f172a' text-anchor='middle' transform='rotate(2, 150, 50)'%3EManuela Londoño D.%3C/text%3E%3C/svg%3E"
  });

  // On mount: load vault state from Supabase
  React.useEffect(() => {
    loadVaultState().then(({ structure, photos }) => {
      if (structure && structure.length > 0) setAllData(structure);
      if (photos && Object.keys(photos).length > 0) setProfilePhotos(photos);
      isLoadedRef.current = true;
    });
  }, []);

  const handlePaste = (e: React.ClipboardEvent, id: string) => {
    e.preventDefault();
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setCustomSignatures(prev => ({
              ...prev,
              [id]: event.target?.result as string
            }));
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleProfilePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeMemberId) {
      const memberId = activeMemberId;
      setActiveMemberId(null);
      const tempUrl = URL.createObjectURL(file);
      const tempUpdated = { ...profilePhotos, [memberId]: tempUrl };
      setProfilePhotos(tempUpdated);
      try {
        const publicUrl = await saveImageToDB(`photo_${memberId}`, file);
        setProfilePhotos(prev => {
          const final = { ...prev, [memberId]: publicUrl };
          saveVaultState(allData, final);
          return final;
        });
      } catch (err) {
        console.error('Error uploading photo:', err);
        saveVaultState(allData, tempUpdated);
      }
    }
  };

  const triggerProfilePhotoUpload = (memberId: string) => {
    setActiveMemberId(memberId);
    profilePhotoInputRef.current?.click();
  };

  const currentFolder = currentPath.length > 0 ? currentPath[currentPath.length - 1] : null;
  const displayItems = currentFolder ? currentFolder.children : allData;

  const openFile = (file: FileEntry) => {
    const ext = file.extension.toLowerCase();
    if (['xlsx', 'xls', 'csv'].includes(ext) && file.url) {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const fileArray = Array.from<File>(files);
    const ts = Date.now();

    try {
      const newFiles: FileEntry[] = await Promise.all(fileArray.map(async (file, index) => {
        const id = `upl-${ts}-${index}`;
        const publicUrl = await saveFileToDB(id, file);
        return {
          id,
          name: file.name,
          type: 'file' as const,
          extension: file.name.split('.').pop() || '',
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          uploadedBy: 'Laura Montoya',
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'pending' as DocumentStatus,
          category: 'Nuevos Tesoros',
          url: publicUrl,
          isUserUploaded: true
        };
      }));

      if (newFiles.length > 0) openFile(newFiles[0]);

      let updatedData: RootEntry[];
      if (currentFolder) {
        const updateFolder = (items: RootEntry[]): RootEntry[] =>
          items.map(item => {
            if (item.id === currentFolder.id) return { ...item, children: [...(item as FolderEntry).children, ...newFiles] };
            if (item.type === 'folder') return { ...item, children: updateFolder(item.children) };
            return item;
          });
        updatedData = updateFolder(allData);
        setAllData(updatedData);
        setCurrentPath(prev => {
          const newPath = [...prev];
          const last = newPath[newPath.length - 1];
          newPath[newPath.length - 1] = { ...last, children: [...last.children, ...newFiles] };
          return newPath;
        });
      } else {
        updatedData = [...allData, ...newFiles];
        setAllData(updatedData);
      }

      saveVaultState(updatedData, profilePhotos);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setIsUploadDialogOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const fileArray = Array.from<File>(files);
    const ts = Date.now();

    try {
      const newFiles: FileEntry[] = await Promise.all(fileArray.map(async (file, index) => {
        const id = `drop-${ts}-${index}`;
        const publicUrl = await saveFileToDB(id, file);
        return {
          id,
          name: file.name,
          type: 'file' as const,
          extension: file.name.split('.').pop() || '',
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          uploadedBy: 'Laura Montoya',
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'pending' as DocumentStatus,
          category: 'Nuevos Tesoros',
          url: publicUrl,
          isUserUploaded: true
        };
      }));

      if (newFiles.length > 0) openFile(newFiles[0]);

      let updatedData: RootEntry[];
      if (currentFolder) {
        const updateFolder = (items: RootEntry[]): RootEntry[] =>
          items.map(item => {
            if (item.id === currentFolder.id) return { ...item, children: [...(item as FolderEntry).children, ...newFiles] };
            if (item.type === 'folder') return { ...item, children: updateFolder(item.children) };
            return item;
          });
        updatedData = updateFolder(allData);
        setAllData(updatedData);
        setCurrentPath(prev => {
          const newPath = [...prev];
          const last = newPath[newPath.length - 1];
          newPath[newPath.length - 1] = { ...last, children: [...last.children, ...newFiles] };
          return newPath;
        });
      } else {
        updatedData = [...allData, ...newFiles];
        setAllData(updatedData);
      }

      saveVaultState(updatedData, profilePhotos);
    } catch (err) {
      console.error('Drop upload error:', err);
    } finally {
      setIsUploading(false);
      setIsUploadDialogOpen(false);
    }
  };

  const handleCreateFolder = () => {
    const trimmed = newFolderName.trim();
    if (!trimmed) return;

    const newFolder: FolderEntry = {
      id: `folder-${Date.now()}`,
      name: trimmed,
      type: 'folder',
      children: []
    };

    let updatedData: RootEntry[];
    if (currentFolder) {
      const updateFolder = (items: RootEntry[]): RootEntry[] =>
        items.map(item => {
          if (item.id === currentFolder.id) return { ...item, children: [...(item as FolderEntry).children, newFolder] };
          if (item.type === 'folder') return { ...item, children: updateFolder(item.children) };
          return item;
        });
      updatedData = updateFolder(allData);
      setAllData(updatedData);
      setCurrentPath(prev => {
        const newPath = [...prev];
        const last = newPath[newPath.length - 1];
        newPath[newPath.length - 1] = { ...last, children: [...last.children, newFolder] };
        return newPath;
      });
    } else {
      updatedData = [...allData, newFolder];
      setAllData(updatedData);
    }

    saveVaultState(updatedData, profilePhotos);
    setNewFolderName('');
    setIsNewFolderDialogOpen(false);
  };

  const handleDeleteFile = (fileId: string) => {
    const removeFile = (items: RootEntry[]): RootEntry[] =>
      items
        .filter(item => item.id !== fileId)
        .map(item =>
          item.type === 'folder'
            ? { ...item, children: removeFile(item.children) }
            : item
        );
    const updatedData = removeFile(allData);
    setAllData(updatedData);
    if (currentPath.length > 0) {
      setCurrentPath(prev =>
        prev.map(folder => ({ ...folder, children: removeFile(folder.children) }))
      );
    }
    if (selectedFile?.id === fileId) setSelectedFile(null);
    deleteFileFromDB(fileId);
    saveVaultState(updatedData, profilePhotos);
  };

  const handleGlobalPaste = async (e: any) => {
    // Handle paste for profile images/charts if one is being hovered
    if (hoveredMemberId) {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const file = items[i].getAsFile();
        if (file && file.type.startsWith('image/')) {
          const memberId = hoveredMemberId;
          const tempUrl = URL.createObjectURL(file);
          setProfilePhotos(prev => ({ ...prev, [memberId]: tempUrl }));
          try {
            const publicUrl = await saveImageToDB(`photo_${memberId}`, file);
            setProfilePhotos(prev => {
              const final = { ...prev, [memberId]: publicUrl };
              saveVaultState(allData, final);
              return final;
            });
          } catch (err) {
            console.error('Error uploading pasted photo:', err);
          }
          return;
        }
      }
    }

    // Only handle generic paste if the upload dialog is open
    if (!isUploadDialogOpen) return;

    const items = e.clipboardData?.items;
    if (!items) return;

    const pastedFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const file = items[i].getAsFile();
      if (file) pastedFiles.push(file);
    }

    if (pastedFiles.length > 0) {
      setIsUploading(true);
      const ts = Date.now();
      try {
        const newFiles: FileEntry[] = await Promise.all(pastedFiles.map(async (file, index) => {
          const id = `paste-${ts}-${index}`;
          const publicUrl = await saveFileToDB(id, file);
          return {
            id,
            name: file.name || `Imagen pegada ${index + 1}.png`,
            type: 'file' as const,
            extension: file.name?.split('.').pop() || 'png',
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            uploadedBy: 'Laura Montoya',
            uploadedAt: new Date().toISOString().split('T')[0],
            status: 'pending' as DocumentStatus,
            category: 'Nuevos Tesoros',
            url: publicUrl,
            isUserUploaded: true
          };
        }));

        if (newFiles.length > 0) openFile(newFiles[0]);

        let updatedData: RootEntry[];
        if (currentFolder) {
          const updateFolder = (items: RootEntry[]): RootEntry[] =>
            items.map(item => {
              if (item.id === currentFolder.id) return { ...item, children: [...(item as FolderEntry).children, ...newFiles] };
              if (item.type === 'folder') return { ...item, children: updateFolder(item.children) };
              return item;
            });
          updatedData = updateFolder(allData);
          setAllData(updatedData);
        } else {
          updatedData = [...allData, ...newFiles];
          setAllData(updatedData);
        }
        saveVaultState(updatedData, profilePhotos);
      } catch (err) {
        console.error('Paste upload error:', err);
      } finally {
        setIsUploading(false);
        setIsUploadDialogOpen(false);
      }
    }
  };

  React.useEffect(() => {
    const handlePaste = (e: any) => handleGlobalPaste(e);
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isUploadDialogOpen, currentFolder, allData, hoveredMemberId]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return displayItems;
    const lowerSearch = searchTerm.toLowerCase();
    
    // Recursive search for demo purposes
    const flatten = (items: RootEntry[]): FileEntry[] => {
      let result: FileEntry[] = [];
      items.forEach(item => {
        if (item.type === 'file') {
          if (item.name.toLowerCase().includes(lowerSearch)) {
            result.push(item);
          }
        } else {
          result = [...result, ...flatten(item.children)];
        }
      });
      return result;
    };
    
    if (searchTerm) {
      return flatten(allData);
    }
    return displayItems;
  }, [displayItems, searchTerm, allData]);

  const navigateToFolder = (folder: FolderEntry) => {
    setCurrentPath([...currentPath, folder]);
  };

  const navigateToBreadcrumb = (index: number) => {
    setSearchTerm('');
    if (index === -1) {
      setCurrentPath([]);
    } else {
      setCurrentPath(currentPath.slice(0, index + 1));
    }
  };

  return (
    <div className="flex h-screen bg-[#FFF9F9] text-foreground font-sans selection:bg-rose-100 selection:text-rose-900 border-rose-100">
      {/* Sidebar - Matching Design width 240px */}
      <aside className="w-[260px] border-r border-rose-100 flex flex-col bg-white/80 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />

        <div className="p-8 flex flex-col gap-1 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-200 shrink-0">
               <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full" />
               </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none text-rose-500 uppercase">LUMARA</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-rose-300 uppercase">VENTUREVAULT</span>
            </div>
          </div>
          <p className="text-[10px] italic text-rose-400">Define. Brilla. Sé tú. ❤️</p>
        </div>

        <nav className="flex-1 space-y-1 px-4 relative z-10">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-md shadow-rose-100 font-semibold' : 'text-rose-400 hover:bg-rose-50 border-transparent'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => {
              setActiveTab('documents');
              setCurrentPath([]);
              setSearchTerm('');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm ${activeTab === 'documents' ? 'bg-primary text-white shadow-md shadow-rose-100 font-semibold' : 'text-rose-400 hover:bg-rose-50 border-transparent'}`}
          >
            <Files className="w-4 h-4" />
            <span>Documentos</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-50 rounded-2xl transition-all text-sm">
            <Users className="w-4 h-4" />
            <span>Colaboradores</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-50 rounded-2xl transition-all text-sm">
            <Settings className="w-4 h-4" />
            <span>Ajustes Lumara</span>
          </button>
        </nav>

        <div className="p-6 relative z-10">
          <Card className="bg-gradient-to-br from-rose-400 to-rose-300 text-white border-none overflow-hidden relative shadow-lg shadow-rose-100 rounded-3xl h-32">
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop" alt="makeup" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
            </div>
            <CardContent className="p-5 relative z-10 h-full flex flex-col justify-end">
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-md rounded-full shadow-sm">
                <Heart className="w-3 h-3 fill-white text-white" />
              </div>
              <div className="absolute top-4 right-4">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-white/20 px-2 py-1 rounded-full backdrop-blur-md border border-white/30 text-white">PRO PLAN</span>
              </div>
              <div className="space-y-1 mt-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-rose-50/90 leading-tight">TU ALMACENAMIENTO</p>
                <p className="text-lg font-black leading-none tracking-tight">42.5 GB / 100 GB</p>
                <div className="pt-2">
                  <Progress value={42.5} className="h-1.5 bg-white/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <FloatingCharms />
        {/* Background Image - Cityscape as per screenshot */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2000&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
          }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-white/95 via-transparent to-rose-50/20" />


        {/* Header - top-bar */}
        <header className="h-20 bg-white/60 backdrop-blur-md px-10 flex items-center justify-between sticky top-0 z-20 border-b border-rose-100/50">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-300 transition-colors group-focus-within:text-rose-500" />
              <Input 
                placeholder="Encuentra tus tesoros Lumara..." 
                className="pl-12 bg-rose-50/50 border-rose-100 focus-visible:ring-2 focus-visible:ring-rose-200 h-11 text-sm rounded-2xl placeholder:text-rose-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.svg,.webp,.doc,.docx"
              onChange={handleFileUpload}
            />
            <input 
              type="file" 
              ref={profilePhotoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleProfilePhotoUpload}
            />
            <Button variant="outline" className="h-11 rounded-2xl gap-2 text-[10px] font-bold uppercase tracking-widest border-rose-200 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all px-6">
              <BookOpen className="w-4 h-4" />
              ÍNDICE LUMARA
            </Button>
            <Button 
              variant="outline" 
              className="h-11 rounded-2xl gap-2 text-[10px] font-bold uppercase tracking-widest border-rose-200 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all px-6"
              onClick={() => setSelectedFile({ id: 'bib', name: 'Lista de Referencias', type: 'file', extension: 'pdf', size: '0' } as any)}
            >
              <FileText className="w-4 h-4" />
              REFERENCIAS
            </Button>
            <Dialog open={isNewFolderDialogOpen} onOpenChange={(open) => { setIsNewFolderDialogOpen(open); if (!open) setNewFolderName(''); }}>
              <DialogTrigger
                render={
                  <Button variant="outline" className="h-11 rounded-full gap-2 text-[10px] font-bold uppercase tracking-widest border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all px-6">
                    <Folder className="w-4 h-4" />
                    NUEVA CARPETA
                  </Button>
                }
              />
              <DialogContent className="sm:max-w-sm rounded-[2rem] border-rose-100">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-rose-500">Nueva Carpeta</DialogTitle>
                  <DialogDescription className="text-rose-400">
                    Crea una carpeta para organizar tu colección Lumara.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <Input
                    placeholder="Nombre de la carpeta..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                    className="rounded-2xl border-rose-100 focus-visible:ring-rose-200 h-11"
                    autoFocus
                  />
                  <Button
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                    className="w-full h-11 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-rose-200/50"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    Crear Carpeta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger
                render={
                  <Button className="h-11 rounded-full bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200/50 gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all px-8">
                    <Plus className="w-4 h-4" />
                    NUEVO TESORO
                  </Button>
                }
              />
              <DialogContent className="sm:max-w-md rounded-[2rem] border-rose-100">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-rose-500">Añadir a la Colección</DialogTitle>
                  <DialogDescription className="text-rose-400">
                    Sube tus archivos de forma segura bajo la protección de Lumara.
                  </DialogDescription>
                </DialogHeader>
                <div
                  className={`border-2 border-dashed rounded-[2rem] p-12 text-center space-y-4 transition-all cursor-pointer group relative ${isDragging ? 'border-rose-400 bg-rose-100/50 scale-[1.02]' : 'border-rose-100 bg-rose-50/30 hover:border-rose-300'}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-[1.8rem] flex flex-col items-center justify-center z-10 transition-all animate-in fade-in">
                       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                       <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">Protegiendo tu Tesoro...</p>
                    </div>
                  )}
                  <div className="w-16 h-16 bg-white text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-rose-600">Haz clic para subir o suelta tus archivos aquí</p>
                    <p className="text-xs text-rose-300">Colección de hasta 50MB por archivo</p>
                    <p className="text-[10px] text-rose-200 mt-2 italic">Aceptamos: PDF, Excel, Imágenes y más.</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Separator orientation="vertical" className="h-8 bg-rose-100/50" />
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-rose-600">Laura Montoya</p>
                <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest mt-1">Directora Lumara</p>
              </div>
              <Avatar 
                className="w-11 h-11 rounded-full border-2 border-rose-400 shadow-xl cursor-pointer hover:opacity-80 transition-opacity relative group"
                onClick={() => triggerProfilePhotoUpload('user_avatar')}
              >
                <AvatarImage src={profilePhotos['user_avatar'] || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"} />
                <AvatarFallback className="bg-rose-500 text-white font-bold">LM</AvatarFallback>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area - content-body */}
        <ScrollArea className="flex-1 relative z-10">
          <div className="p-10 max-w-7xl mx-auto space-y-12">
            
            {activeTab === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight text-rose-600 italic">Bienvenida a tu Oasis, Laura ✨</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="border-rose-100/50 bg-white/60 backdrop-blur-lg shadow-xl shadow-rose-200/20 rounded-[2rem] border-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                      <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">Total Tesoros</CardTitle>
                      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                        <Gem className="w-4 h-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-rose-600">1,284</div>
                      <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1 mt-2 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                        + 12 esta semana
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-rose-100/50 bg-white/60 backdrop-blur-lg shadow-xl shadow-rose-200/20 rounded-[2rem] border-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                      <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">Pendientes</CardTitle>
                      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-rose-600">48</div>
                      <p className="text-[11px] text-rose-300 font-bold mt-2">Requieren tu toque</p>
                    </CardContent>
                  </Card>
                  <Card className="border-rose-100/50 bg-white/60 backdrop-blur-lg shadow-xl shadow-rose-200/20 rounded-[2rem] border-0">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
                      <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">Innovadores</CardTitle>
                      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-rose-600">12</div>
                      <p className="text-[11px] text-rose-300 font-bold mt-2">Creando ahora</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <Card className="col-span-1 lg:col-span-2 border-0 bg-white/60 backdrop-blur-lg rounded-[2.5rem] shadow-xl shadow-rose-200/20 overflow-hidden min-h-[450px] group cursor-pointer" onClick={() => triggerProfilePhotoUpload('dashboard_hero')}>
                    <div className="h-full relative overflow-hidden">
                      <img
                        src={profilePhotos['dashboard_hero'] || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"}
                        alt="Lumara Duo Lips"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <Camera className="w-5 h-5 text-rose-500" />
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-white font-bold text-xl drop-shadow-md">Tu tono, tu forma, tu poder.</p>
                        <p className="text-rose-100 text-xs font-medium mt-1">Descubre la colección Duo Lips</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="col-span-1 lg:col-span-3 border-0 bg-white/60 backdrop-blur-lg rounded-[2.5rem] shadow-xl shadow-rose-200/20 overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-rose-50/50 bg-rose-50/20">
                      <h3 className="font-bold text-sm tracking-widest text-rose-500 uppercase flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Colección de Charms
                      </h3>
                    </div>
                    <CardContent className="p-8 flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                        {[
                          'Corazón',
                          'Moño',
                          'Flor',
                          'Estrella',
                          'Inicial',
                          'Mariposa',
                          'Perla',
                          'Luna',
                          'Osito',
                          'Espejo',
                          'Tulipán',
                          'Cristal'
                        ].map((charmName) => (
                          <div 
                            key={charmName} 
                            className="flex flex-col items-center gap-2 group cursor-pointer"
                            onClick={() => navigate('/presentation')}
                          >
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-rose-50 shadow-sm transition-all group-hover:border-primary group-hover:shadow-md p-2">
                              <CharmSVG name={charmName} className="w-full h-full" />
                            </div>
                            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter group-hover:text-rose-600 transition-colors whitespace-nowrap">{charmName}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                        <p className="text-xs font-bold text-rose-600 italic">"Tu Charm, tu historia, tu poder. ✨"</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-3 text-[10px] text-rose-300 font-bold uppercase tracking-[0.2em] bg-white/40 backdrop-blur-sm w-fit px-8 py-3 rounded-full shadow-sm shadow-rose-100 border border-white/50">
                      <button
                        onClick={() => navigateToBreadcrumb(-1)}
                        className="hover:text-rose-500 transition-colors"
                      >
                        Lumara Vault
                      </button>
                      {currentPath.length === 0 && (
                        <>
                          <ChevronRight className="w-3 h-3 text-rose-200" />
                          <span className="text-rose-500 bg-rose-50/50 px-3 py-1 rounded-full">COLECCIÓN DUO LIPS</span>
                        </>
                      )}
                      {currentPath.map((folder, i) => (
                        <React.Fragment key={folder.id}>
                          <ChevronRight className="w-3 h-3 text-rose-100" />
                          <button
                            onClick={() => navigateToBreadcrumb(i)}
                            className={`hover:text-primary transition-colors ${i === currentPath.length - 1 ? 'text-rose-600' : ''}`}
                          >
                            {folder.name}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    {currentFolder && (
                      <button
                        onClick={() => setIsUploadDialogOpen(true)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 px-6 py-3 rounded-full shadow-lg shadow-rose-200/50 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Subir a esta carpeta
                      </button>
                    )}
                  </div>
                </div>

                {/* Folder Grid - Lumara Styled */}
                {!searchTerm && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {(currentFolder ? currentFolder.children.filter(i => i.type === 'folder') : allData.filter(i => i.type === 'folder')).map((folder) => (
                      <Card
                        key={folder.id}
                        className="bg-white/80 backdrop-blur-lg border-0 hover:-translate-y-2 transition-all duration-300 cursor-pointer group shadow-2xl shadow-rose-200/5 rounded-[2.5rem]"
                        onClick={() => navigateToFolder(folder as FolderEntry)}
                      >
                        <CardContent className="p-8">
                          <div className="mb-6">
                            <div className="w-14 h-14 bg-white/60 backdrop-blur-md rounded-3xl flex items-center justify-center group-hover:bg-rose-50/80 transition-colors shadow-inner">
                              <Folder className="w-7 h-7 text-rose-300 fill-rose-300 group-hover:text-rose-400 transition-colors" />
                            </div>
                          </div>
                          <h4 className="font-bold text-sm text-rose-600 mb-2 truncate">{folder.name}</h4>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest whitespace-nowrap">
                              {(folder as FolderEntry).children.length} Tesoros
                            </p>
                            <button
                              className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center shadow-md"
                              title="Subir archivo a esta carpeta"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToFolder(folder as FolderEntry);
                                setTimeout(() => setIsUploadDialogOpen(true), 50);
                              }}
                            >
                              <Upload className="w-3.5 h-3.5 text-white" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* File List - styled as per Lumara aesthetic */}
                <div className="bg-white/60 backdrop-blur-lg border-0 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-200/10">
                  <Table>
                    <TableHeader className="bg-rose-50/10">
                      <TableRow className="border-b border-rose-50 hover:bg-transparent">
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 px-10 h-16">NOMBRE DEL TESORO</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 h-16 text-center">ESTADO</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 h-16 px-10">BRILLANDO DESDE</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 h-16">TAMAÑO</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400 text-right px-10 h-16">ACCIÓN</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.filter(i => i.type === 'file').map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="border-b border-rose-50 last:border-0 group cursor-pointer hover:bg-rose-50/20 transition-all h-20"
                          onClick={() => {
                            if (item.type === 'file') openFile(item as FileEntry);
                          }}
                        >
                          <TableCell className="px-10">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-rose-50/50 rounded-[1rem] flex items-center justify-center border border-rose-100">
                                <FileIcon extension={(item as FileEntry).extension} />
                              </div>
                              <span className="text-sm font-semibold text-rose-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-lg">
                                {item.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-rose-500 text-white shadow-sm shadow-rose-200">
                              {(item as FileEntry).status === 'pending' ? 'PENDING' : (item as FileEntry).status.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="text-rose-400 text-[11px] font-bold px-10">
                            {(item as FileEntry).uploadedAt}
                          </TableCell>
                          <TableCell className="text-rose-400 text-[11px] font-bold">
                            {(item as FileEntry).size}
                          </TableCell>
                          <TableCell className="text-right px-10">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const link = document.createElement('a');
                                  link.href = (item as FileEntry).url || '#';
                                  link.download = (item as FileEntry).name;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm(`¿Eliminar "${(item as FileEntry).name}"?`)) {
                                    handleDeleteFile(item.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredItems.filter(i => i.type === 'file').length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-48 text-center cursor-pointer group" onClick={() => setIsUploadDialogOpen(true)}>
                            <div className="flex flex-col items-center justify-center gap-4">
                              <div className="w-16 h-16 border-2 border-dashed border-rose-200 rounded-full flex items-center justify-center group-hover:border-rose-400 group-hover:bg-rose-50/50 transition-all">
                                <Upload className="w-7 h-7 text-rose-300 group-hover:text-rose-500 transition-colors" />
                              </div>
                              <p className="text-sm font-bold italic text-rose-300 group-hover:text-rose-500 transition-colors">
                                Esta carpeta está vacía — haz clic para subir archivos
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          className="border-t border-rose-50 group cursor-pointer hover:bg-rose-50/30 transition-all h-20"
                          onClick={() => setIsUploadDialogOpen(true)}
                        >
                          <TableCell className="px-10" colSpan={5}>
                            <div className="flex items-center gap-5 text-rose-400 group-hover:text-rose-500 transition-colors">
                              <div className="w-10 h-10 border-2 border-dashed border-rose-200 rounded-full flex items-center justify-center group-hover:border-rose-400 transition-colors bg-white/50">
                                <Plus className="w-5 h-5" />
                              </div>
                              <span className="text-sm font-black italic tracking-tight">Haz clic aquí para subir otro archivo...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            )}

          </div>
        </ScrollArea>

        {/* Document Viewer Dialog */}
        <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
          <DialogContent className="sm:max-w-6xl w-[95vw] rounded-[2.5rem] border-rose-100 p-0 overflow-hidden bg-white/95 backdrop-blur-xl">
            {selectedFile?.url ? (
              <div className="flex flex-col h-[90vh] md:h-[88vh]">
                <div className="p-4 border-b border-rose-100 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <FileIcon extension={selectedFile.extension} />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold text-rose-600 truncate max-w-[200px] sm:max-w-md leading-none">{selectedFile.name}</h2>
                      <span className="text-[9px] font-bold text-rose-300 uppercase tracking-widest mt-1">Alta Fidelidad • Lumara HD</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold uppercase text-[9px] tracking-widest px-4 h-8 transition-all shadow-sm"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedFile.url || '#';
                        link.download = selectedFile.name;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Descargar
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="rounded-full">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100 relative overflow-hidden">
                  {['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(selectedFile.extension.toLowerCase()) ? (
                    <ScrollArea className="h-full w-full">
                      <div className="min-h-full w-full flex items-center justify-center p-4 md:p-12">
                        <img 
                          src={selectedFile.url} 
                          alt={selectedFile.name} 
                          className="max-w-full h-auto shadow-2xl rounded-sm ring-1 ring-black/5" 
                          style={{ imageRendering: 'high-quality' }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </ScrollArea>
                  ) : ['xlsx', 'xls', 'csv'].includes(selectedFile.extension.toLowerCase()) ? (
                    <div className="flex flex-col items-center justify-center h-full gap-6 bg-emerald-50/30">
                      <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center shadow-inner">
                        <FileSpreadsheet className="w-10 h-10 text-emerald-600" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="font-bold text-emerald-700 text-lg">{selectedFile.name}</p>
                        <p className="text-sm text-emerald-500">Los archivos Excel se abren en tu computador con formato completo</p>
                      </div>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 gap-2 shadow-lg"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = selectedFile.url || '#';
                          link.download = selectedFile.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Descargar Excel
                      </Button>
                    </div>
                  ) : (
                    <iframe 
                      src={selectedFile.url} 
                      className="w-full h-full border-0 bg-white"
                      title={selectedFile.name}
                    />
                  )}
                </div>
                <div className="p-4 bg-white border-t border-rose-50 flex justify-center sticky bottom-0 z-20">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest shadow-md">
                    Regresar al Vault
                  </Button>
                </div>
              </div>
            ) : (selectedFile?.name.includes('Acuerdo de Trabajo') && !selectedFile?.isUserUploaded) ? (
              <div className="flex flex-col h-[90vh] md:h-[85vh] bg-stone-100">
                <div className="p-4 border-b border-rose-100 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-rose-500" />
                    </div>
                    <h2 className="font-bold text-slate-800 tracking-tight">Acuerdo de Trabajo en Equipo</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="rounded-full">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-12 bg-slate-200/50">
                  <div className="max-w-4xl mx-auto bg-white p-8 sm:p-20 shadow-2xl border border-stone-200 text-slate-800 font-sans">
                    <div className="space-y-8">
                      {/* Page 1 Header */}
                      <div className="space-y-6">
                        <h1 className="text-4xl font-normal tracking-widest text-black">COMPROMISOS PARA LA CONVIVENCIA</h1>
                        <div className="space-y-2 italic text-2xl font-normal leading-tight">
                          <p>“La fuerza del equipo reside en cada miembro. La fuerza de cada miembro es el equipo.” – Phil Jackson.</p>
                        </div>
                        
                        <h2 className="text-[#FF00FF] text-xl font-bold uppercase pt-4">CÓDIGO DE ÉTICA:</h2>
                        <p className="text-justify leading-relaxed">
                          Debemos fortalecer nuestros equipos siendo incluyentes y aprovechando los conocimientos, experiencia y las diversas maneras de pensar de la gente. Es responsabilidad de todos crear integración entre las personas de cada área y entre todas las áreas, conformando equipos a los cuales pertenecer y buscando con creatividad y alto desempeño el desarrollo de los compañeros que los integran.
                        </p>
                        <p className="text-justify leading-relaxed">
                          Respetamos la dignidad, privacidad y los derechos personales de cada integrante y estamos comprometidos a mantener un lugar de trabajo en el cual no existan situaciones de discriminación o acoso. Por lo tanto, los empleados no deben discriminar respecto del origen, nacionalidad, religión, raza, género, edad u orientación sexual, ni deben tener ningún tipo de conducta de acoso verbal o físico basada en lo mencionado anteriormente o en cualquier otro motivo.
                        </p>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-[#FF00FF] text-xl font-bold">1.Respeto Mutuo:</h3>
                            <ul className="list-none space-y-4 pt-2">
                              <li>-Asistir puntualmente a las reuniones, reconociendo que el tiempo de cada integrante es valioso y merece nuestro respeto.</li>
                              <li>-Propiciamos un ambiente de respeto y confianza, donde cada opinión es valorada, teniendo en cuenta que la diversidad de opiniones enriquecerá nuestro trabajo y nos permitirá encontrar soluciones creativas e innovadoras.</li>
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-[#FF00FF] text-xl font-bold">2.Responsabilidad y Compromiso:</h3>
                            <ul className="list-none space-y-4 pt-2">
                              <li>-Realizar las tareas asignadas dentro de los plazos establecidos, garantizando así el progreso continuo del equipo y el logro de objetivos comunes.</li>
                              <li>-Trabajaremos los entregables durante la semana lunes a viernes para respetar los espacios personales el fin de semana.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Page 2 */}
                      <div className="space-y-6 pt-10">
                        <div>
                          <h3 className="text-[#FF00FF] text-xl font-bold">3.Comunicación Constante:</h3>
                          <ul className="list-none space-y-4 pt-2">
                            <li>-Buscaremos mantener una comunicación abierta y sincera, donde cada miembro del equipo pueda expresar sus inquietudes y sugerencias sin temor a ser juzgado.</li>
                            <li>-Nuestras reuniones se realizan de forma virtual los días miércoles en horas de la noche a través de WhatsApp, estaremos en seguimiento de lunes a viernes entre 7:00 am y 11:00 pm, para validar avance de las gestiones individuales y grupales, asegurando la alineación como equipo.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-[#FF00FF] text-xl font-bold">4.Participación:</h3>
                          <ul className="list-none space-y-4 pt-2">
                            <li>-Crearemos un ambiente donde todos tengan la oportunidad de brillar, potenciando las habilidades personales y asignando responsabilidades que nos lleven a empoderarnos en el desarrollo de este núcleo.</li>
                            <li>-Participar activamente en todas las reuniones y ejecución de entregables aportando nuestras ideas y habilidades para alcanzar los objetivos como equipo de trabajo.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-[#FF00FF] text-xl font-bold">5. Motivación:</h3>
                          <p className="pt-2">Reconoceremos nuestro avance y celebraremos los logros, tanto individuales como grupales, para promover el entusiasmo en el equipo.</p>
                        </div>

                        <div>
                          <h3 className="text-[#FF00FF] text-xl font-bold">6. Comprensión y empatía:</h3>
                          <ul className="list-none space-y-4 pt-2">
                            <li>-Estaremos dispuestos a la colaboración y apoyo en caso de obstáculos en el entendimiento o en caso de temas de relevancia que impliquen en la entrega de las actividades.</li>
                            <li>-Apoyar a los compañeros para agilizar el trabajo en equipo</li>
                          </ul>
                        </div>

                        <div className="pt-10 space-y-6">
                          <h2 className="text-[#FF00FF] text-xl font-bold uppercase">CONSECUENCIAS ANTE LOS INCUMPLIMIENTOS</h2>
                          <div className="space-y-4">
                            <p className="text-3xl font-normal leading-tight">“Ser exitoso es una elección; por lo tanto, ser derrotado es una decisión”. Jim Stovall, escritor estadounidense</p>
                            <p className="text-justify pt-4">
                              Lo primero que se debería hacer es consultarle a que se debe su falta de cumplimiento o responsabilidad, que no se trate de una fuerza mayor, si no es el caso, se trata de llegar a un acuerdo, reemplazando su responsabilidad evitada con otra y si reitera lo mejor sería dialogar con él para un cambio de actitud o de grupo.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Page 3 */}
                      <div className="space-y-6 pt-10">
                        <div className="space-y-4">
                          <p>Ser consecuente según los acuerdos lo indican.</p>
                          <p>Buscar mediaciones para saber el porqué incumple y como arreglarlo.</p>
                          <p>Se hace un aviso a la persona sobre la mala conducta que está teniendo y si es repetitiva se le hará una sanción de expulsión del grupo.</p>
                        </div>

                        <div className="space-y-6 pt-4">
                          <div>
                            <p><span className="text-[#FF00FF] font-bold">-Reasignación de Tareas:</span> En caso de incumplimiento continuado (3 ocasiones), podremos asignar tareas entre los miembros para asegurar que el trabajo se complete de manera equitativa y efectiva.</p>
                          </div>
                          <div>
                            <p><span className="text-[#FF00FF] font-bold">-Medidas Correctivas:</span> Implementaremos medidas correctivas para abordar el problema, como sesiones de apoyo para mejorar la comprensión y el rendimiento.</p>
                          </div>
                          <div>
                            <p><span className="text-[#FF00FF] font-bold">-Medidas definitivas:</span> Si el comportamiento se repite (3 ocasiones o más) de forma continua, se realizará una votación grupal que podría llevar a la expulsión definitiva del integrante. El líder del equipo informará al profesor del núcleo sobre la decisión adoptada.</p>
                          </div>
                          <p>-Cuando uno de los compañeros no entienda o sea capaz de realizar alguna actividad se le debe de explicar con paciencia y ayudarlo para resolver la situación.</p>
                        </div>

                        <div className="pt-10 space-y-6">
                          <h2 className="text-[#FF00FF] text-xl font-bold uppercase">¿Qué hacer en caso de conflicto?</h2>
                          <p className="text-justify">
                            Cuando se presenta un conflicto lo mejor que se puede hacer es escuchar ambas partes y convocar una reunión, hacerle frente de buena manera, por medio del diálogo para llegar a un acuerdo intermedio donde las dos partes se encuentren satisfechas con el resultado acordado.
                          </p>
                        </div>

                        {/* Signatures */}
                        <div className="pt-16 space-y-12">
                          <div className="space-y-4">
                            <p className="text-sm">Laura Pérez Montoya — C.C. 1.125.269.015 — CEO y Gerente Creativa — 40% de participación</p>
                            <div 
                              className={`w-56 h-24 relative rounded-xl flex items-center justify-center cursor-pointer transition-all group ${
                                customSignatures['laura'] 
                                  ? 'border-none bg-transparent' 
                                  : 'border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-rose-300'
                              }`}
                              onPaste={(e) => handlePaste(e, 'laura')}
                              tabIndex={0}
                            >
                              {customSignatures['laura'] ? (
                                <img src={customSignatures['laura']} alt="Firma Laura" className="w-full h-full object-contain p-2" />
                              ) : (
                                <div className="text-center space-y-1">
                                  <Camera className="w-5 h-5 mx-auto text-slate-300 group-hover:text-rose-400 transition-colors" />
                                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-rose-400 transition-colors">Pegar Firma Aquí</p>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-400" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-sm">Angela Camila Pulgar Morales — C.C. 1.042.454.771 — Gerente de Comercio Exterior — 20% de participación</p>
                            <div 
                              className={`w-56 h-24 relative rounded-xl flex items-center justify-center cursor-pointer transition-all group ${
                                customSignatures['angela'] 
                                  ? 'border-none bg-transparent' 
                                  : 'border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-rose-300'
                              }`}
                              onPaste={(e) => handlePaste(e, 'angela')}
                              tabIndex={0}
                            >
                              {customSignatures['angela'] ? (
                                <img src={customSignatures['angela']} alt="Firma Angela" className="w-full h-full object-contain p-2" />
                              ) : (
                                <div className="text-center space-y-1">
                                  <Camera className="w-5 h-5 mx-auto text-slate-300 group-hover:text-rose-400 transition-colors" />
                                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-rose-400 transition-colors">Pegar Firma Aquí</p>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-400" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-sm">Diana Marcela Calle Zuleta — C.C. 1.007.221.880 — Gerente Financiera — 20% de participación</p>
                            <div 
                              className={`w-56 h-24 relative rounded-xl flex items-center justify-center cursor-pointer transition-all group ${
                                customSignatures['diana'] 
                                  ? 'border-none bg-transparent' 
                                  : 'border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-rose-300'
                              }`}
                              onPaste={(e) => handlePaste(e, 'diana')}
                              tabIndex={0}
                            >
                              {customSignatures['diana'] ? (
                                <img src={customSignatures['diana']} alt="Firma Diana" className="w-full h-full object-contain p-2" />
                              ) : (
                                <div className="text-center space-y-1">
                                  <Camera className="w-5 h-5 mx-auto text-slate-300 group-hover:text-rose-400 transition-colors" />
                                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-rose-400 transition-colors">Pegar Firma Aquí</p>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-400" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <p className="text-sm">Manuela Londoño Duque — C.C. 1.026.161.988 — Gerente Comercial — 20% de participación</p>
                            <div 
                              className={`w-56 h-24 relative rounded-xl flex items-center justify-center cursor-pointer transition-all group ${
                                customSignatures['manuela'] 
                                  ? 'border-none bg-transparent' 
                                  : 'border-2 border-dashed border-slate-200 bg-slate-50/50 hover:border-rose-300'
                              }`}
                              onPaste={(e) => handlePaste(e, 'manuela')}
                              tabIndex={0}
                            >
                              {customSignatures['manuela'] ? (
                                <img src={customSignatures['manuela']} alt="Firma Manuela" className="w-full h-full object-contain p-2" />
                              ) : (
                                <div className="text-center space-y-1">
                                  <Camera className="w-5 h-5 mx-auto text-slate-300 group-hover:text-rose-400 transition-colors" />
                                  <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 group-hover:text-rose-400 transition-colors">Pegar Firma Aquí</p>
                                </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-rose-50 flex justify-center sticky bottom-0 z-20">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest shadow-md">
                    Cerrar Documento
                  </Button>
                </div>
              </div>
            ) : (selectedFile?.name.includes('Business Model Canvas') && !selectedFile?.isUserUploaded) ? (
              <BusinessModelPreview onBack={() => setSelectedFile(null)} />
            ) : (selectedFile?.name === 'Lista de Referencias') ? (
              <ReferencesPreview onBack={() => setSelectedFile(null)} />
            ) : (selectedFile?.name.includes('Historia de la Marca') && !selectedFile?.isUserUploaded) ? (
              <div className="flex flex-col h-full">
                <div 
                  className="h-40 relative cursor-pointer group"
                  onClick={() => triggerProfilePhotoUpload('brand_header')}
                  onMouseEnter={() => setHoveredMemberId('brand_header')}
                  onMouseLeave={() => setHoveredMemberId(null)}
                >
                  <img 
                    src={profilePhotos['brand_header'] || "https://picsum.photos/seed/lumara-lips/800/400"} 
                    alt="Lumara header" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-black/10 transition-colors group-hover:from-white group-hover:to-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 p-3 rounded-full shadow-lg">
                      <Upload className="w-5 h-5 text-rose-500" />
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-10 -mt-6 relative z-10 space-y-8">
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-rose-600 italic tracking-tight">Nuestra Historia</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-300">Lumara Beauty • Brand Concept</p>
                  </div>
                  
                  <div className="prose prose-rose max-w-none">
                    <p className="text-rose-500 font-medium leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                      Lumara Beauty nació porque buscábamos un labial que aún no existía en el mercado colombiano: inteligente, duradero y con personalidad propia. Con esa idea en mano, Laura nuestra CEO se unió a tres mujeres extraordinarias :Ángela, Diana y Manuela,quienes aportaron su experiencia en logística, finanzas y ventas para convertir ese sueño en una marca real.
                    </p>
                    <p className="text-rose-500 font-medium leading-relaxed mt-4">
                      El resultado es Lumara Duo Lips, nuestro producto estrella: un gloss con efecto pH que reacciona al calor de tus labios para revelar tu tono único, combinado con un delineador de doble textura y un sistema de charms intercambiables que lo convierte en un accesorio de moda. Un cosmético colombiano diseñado para mujeres que no quieren elegir entre belleza y practicidad.
                    </p>
                    <div className="mt-10 pt-8 border-t border-rose-50 text-center">
                      <p className="text-lg font-bold text-rose-600 italic">"Bienvenida a Lumara. Aquí, tu belleza tiene nombre propio."</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-rose-50/30 flex justify-center border-t border-rose-50">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest">
                    Cerrar Lectura
                  </Button>
                </div>
              </div>
            ) : (selectedFile?.name.includes('Perfiles Profesionales') && !selectedFile?.isUserUploaded) ? (
              <div className="flex flex-col h-[90vh] md:h-[85vh]">
                <div className="p-6 border-b border-rose-50 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-rose-400" />
                    <h2 className="font-bold text-rose-600">Presentación del Equipo Lumara</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="rounded-full">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50 scroll-smooth">
                  <div className="max-w-2xl mx-auto space-y-12 pb-20">
                    {/* Member: Angela Camila */}
                    <div className="bg-white p-6 sm:p-12 shadow-sm rounded-lg space-y-10 border border-slate-100">
                      <div className="space-y-6">
                        <h1 className="text-center text-3xl font-normal text-black tracking-widest uppercase">PRESENTACIÓN PERSONAL</h1>
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">PERFIL PROFESIONAL.</h2>
                        <div className="space-y-1 text-lg">
                          <p><span className="font-bold">Nombre:</span> Angela Camila Pulgar Morales. <span className="font-bold">Edad:</span> 29 años.</p>
                          <p><span className="font-bold">Programa:</span> Administración en Negocios Internacionales.</p>
                          <p><span className="font-bold">Rol actual:</span> Coordinadora Operativa.</p>
                        </div>
                        <div 
                          className="w-full max-w-sm mx-auto overflow-hidden rounded-sm border border-slate-100 shadow-sm cursor-pointer relative group"
                          onClick={() => triggerProfilePhotoUpload('angela')}
                          onMouseEnter={() => setHoveredMemberId('angela')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <img 
                            src={profilePhotos['angela'] || "https://picsum.photos/seed/angela-profile/600/800"} 
                            alt="Angela Profile" 
                            className="w-full object-cover transition-transform group-hover:scale-105" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="bg-white/90 p-4 rounded-full shadow-lg flex flex-col items-center gap-1">
                              <Camera className="w-5 h-5 text-rose-500" />
                              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Subir Foto</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center">Imagen generada mediante inteligencia artificial (Google, 2026). Gemini.</p>
                        <div className="space-y-4">
                          <h3 className="text-[#FF00FF] font-medium text-lg">Perfil:</h3>
                          <p className="text-sm leading-relaxed text-justify">
                            Soy Técnica en Comercio Internacional y actualmente me desempeño como Coordinadora Operativa en la empresa Transporte Sánchez Polo, con experiencia en la gestión de procesos logísticos, manejo documental y seguimiento de operaciones en el ámbito de importaciones y exportaciones. A lo largo de mi trayectoria laboral he trabajado en procesos relacionados con comercio internacional entre países como Colombia, Venezuela y Ecuador, lo que me ha permitido fortalecer mis conocimientos en el área aduanera y operativa, contribuyendo al cumplimiento eficiente de las operaciones y a la optimización de los procesos.
                          </p>
                          <p className="text-sm leading-relaxed text-justify">
                            Me caracterizo por ser una persona organizada, responsable y comprometida, con habilidades para el trabajo en equipo, la resolución de problemas y la mejora continua. Además, cuento con un enfoque orientado a resultados y al cumplimiento eficiente de las actividades asignadas.
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-slate-50 space-y-8">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">Resultado TEST Angela Pulgar</h2>
                        <div 
                          className="bg-white p-6 rounded-xl border border-slate-100 shadow-inner space-y-6 relative group cursor-pointer" 
                          onClick={() => triggerProfilePhotoUpload('angela_chart')}
                          onMouseEnter={() => setHoveredMemberId('angela_chart')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <div className="grid grid-cols-5 gap-2 text-center">
                            {[ 
                              { label: 'Prom Núcleo', val: '77,00%' },
                              { label: 'Prom Grupo', val: '76,15%' },
                              { label: 'Prom Selección', val: '75,00%' },
                              { label: 'Jornada', val: 'V' },
                              { label: 'Cantidad', val: '1' }
                            ].map((stat) => (
                              <div key={stat.label} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[8px] uppercase font-bold text-slate-400 mb-1">{stat.label}</div>
                                <div className="text-[10px] font-black text-slate-700">{stat.val}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="h-[280px] w-full">
                            {profilePhotos['angela_chart'] ? (
                              <img src={profilePhotos['angela_chart']} className="w-full h-full object-contain" alt="Angela Chart" />
                            ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                  data={[
                                    { name: 'Formalización Legal', val: 95 },
                                    { name: 'Financiamiento', val: 66 },
                                    { name: 'Inf. Tributaria', val: 96 },
                                    { name: 'Perfil Empr.', val: 93 },
                                    { name: 'Registro Marcario', val: 91 },
                                    { name: 'Control Gestión', val: 98 },
                                    { name: 'English', val: 36 }
                                  ]}
                                  margin={{ top: 20, right: 10, left: -20, bottom: 60 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                  <XAxis 
                                    dataKey="name" 
                                    angle={-45} 
                                    textAnchor="end" 
                                    height={60} 
                                    interval={0} 
                                    fontSize={9} 
                                    tick={{ fill: '#64748b', fontWeight: 600 }}
                                  />
                                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} fontSize={10} tick={{ fill: '#64748b' }} />
                                  <Tooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px' }}
                                  />
                                  <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={25}>
                                    {[95, 66, 96, 93, 91, 98, 36].map((val, index) => (
                                      <Cell key={`cell-${index}`} fill={val > 80 ? '#10b981' : val > 50 ? '#34d399' : '#f43f5e'} />
                                    ))}
                                    <LabelList dataKey="val" position="top" fontSize={10} fontWeight="bold" formatter={(val: any) => `${val}%`} />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <div className="bg-white/90 p-3 rounded-full shadow-lg">
                              <Upload className="w-5 h-5 text-rose-500" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            En mi test de entrada obtuve un resultado muy bueno y cercano al promedio del grupo, lo que me demuestra que tengo buenas bases, especialmente en temas como formalización legal, información tributaria y gestión del emprendimiento. Estas áreas se me facilitan un poco, porque están muy relacionadas con lo que ya manejo día a día en mi trabajo, en comercio internacional.
                          </p>
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            Sin embargo, también identifiqué dos puntos importantes por mejorar, fuentes de financiamiento y, sobre todo, el inglés. Siento que este último es clave para mi carrera, ya que quiero seguir creciendo en un entorno más global, por lo que me comprometo a estudiar y poder aprenderlo a lo largo de mi carrera y poder graduarme ya conociendo más sobre el idioma.
                          </p>
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            Este resultado me ayuda a entender que ya tengo una base sólida con la que puedo trabajar en este núcleo, pero necesito fortalecer ciertas competencias para seguir avanzando y poder tener un perfil más completo y competitivo tanto en lo personal como en lo laboral.
                          </p>
                          <div className="pt-4 border-t border-slate-100">
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Referencias</h4>
                             <p className="text-[10px] text-slate-400 italic">● Google. (2026). Imagen generada mediante inteligencia artificial a partir del prompt "retrato profesional con iluminación de estudio" [Imagen generada por IA]. Gemini.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Member: Laura Perez */}
                    <div className="bg-white p-6 sm:p-12 shadow-sm rounded-lg space-y-10 border border-slate-100">
                      <div className="space-y-6">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">PERFIL PROFESIONAL.</h2>
                        <div className="space-y-1 text-lg">
                          <p><span className="font-bold">Nombre:</span> Laura Pérez Montoya <span className="font-bold">Edad:</span> 20 años</p>
                          <p><span className="font-bold">Programa:</span> Administración de Negocios Internacionales.</p>
                        </div>
                        <div 
                          className="w-full max-w-sm mx-auto overflow-hidden rounded-sm border border-slate-100 shadow-sm cursor-pointer relative group"
                          onClick={() => triggerProfilePhotoUpload('laura')}
                          onMouseEnter={() => setHoveredMemberId('laura')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <img 
                            src={profilePhotos['laura'] || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=610&h=800"} 
                            alt="Laura Profile" 
                            className="w-full object-cover transition-transform group-hover:scale-105" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="bg-white/90 p-4 rounded-full shadow-lg flex flex-col items-center gap-1">
                              <Camera className="w-5 h-5 text-rose-500" />
                              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Subir Foto</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-[#FF00FF] font-medium text-lg">Perfil.</h3>
                          <p className="text-sm leading-relaxed text-justify">
                            Técnica en Cosmetología y estética integral, me caracterizo por ser una mujer Inteligente, enfocada y con mucha claridad en mis objetivos. disciplinada, con carácter y autoexigente con mi proceso académico y personal.
                          </p>
                          <p className="text-sm leading-relaxed text-justify">
                            Soy muy extrovertida, deportista, creativa, me gusta bailar, soy buena para las manualidades y el dibujo.
                          </p>
                          <h3 className="text-[#FF00FF] font-medium text-lg">Objetivo:</h3>
                          <p className="text-sm leading-relaxed text-justify">
                            Ser responsable y comprometida con este núcleo y lo que falta de mi carrera, con buena actitud y aportando ideas creativas...
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-slate-50 space-y-8">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">Resultado del Pre-Test: Laura</h2>
                        <div 
                          className="bg-white p-6 rounded-xl border border-slate-100 shadow-inner space-y-6 relative group cursor-pointer" 
                          onClick={() => triggerProfilePhotoUpload('laura_chart')}
                          onMouseEnter={() => setHoveredMemberId('laura_chart')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <div className="grid grid-cols-4 gap-2 text-center">
                            {[ 
                              { label: 'Prom Núcleo', val: '79,13%' },
                              { label: 'Prom Grupo', val: '76,15%' },
                              { label: 'Prom Selección', val: '79,00%' },
                              { label: 'V', val: 'Jornada' }
                            ].map((stat) => (
                              <div key={stat.label} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[7px] uppercase font-bold text-slate-400 mb-1">{stat.label}</div>
                                <div className="text-[10px] font-black text-slate-700">{stat.val}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="h-[250px] w-full flex items-center justify-center">
                            {profilePhotos['laura_chart'] ? (
                              <img src={profilePhotos['laura_chart']} className="w-full h-full object-contain" alt="Laura Chart" />
                            ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                  { subject: 'Formalización', A: 90, fullMark: 100 },
                                  { subject: 'Financiamiento', A: 65, fullMark: 100 },
                                  { subject: 'Tributaria', A: 85, fullMark: 100 },
                                  { subject: 'Perfil', A: 95, fullMark: 100 },
                                  { subject: 'Marca', A: 70, fullMark: 100 },
                                  { subject: 'Gestión', A: 88, fullMark: 100 },
                                ]}>
                                  <PolarGrid stroke="#e2e8f0" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                                  <Radar
                                    name="Laura"
                                    dataKey="A"
                                    stroke="#10b981"
                                    fill="#10b981"
                                    fillOpacity={0.5}
                                  />
                                  <Tooltip />
                                </RadarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <div className="bg-white/90 p-3 rounded-full shadow-lg">
                              <Upload className="w-5 h-5 text-rose-500" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            En mi resultado del pretest puedo evidenciar que tengo un desempeño general positivo, con un promedio de 79,13%, por encima del promedio del grupo, lo que indica que cuento con buenas bases en las diferentes áreas evaluadas. Observo que tengo un buen rendimiento en perfil del emprendedor, información titulada y reglas gramaticales, donde alcanzo puntajes altos que reflejan una buena capacidad de comprensión, análisis e interpretación de la información.
                          </p>
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            También mantengo un desempeño adecuado en regiones naturales y sistema de control de la calidad, lo que demuestra que tengo nociones claras en estos temas, aunque aún puedo reforzarlos. Por otro lado, identifico que debo mejorar principalmente en puntos de pronunciación y formulación lógica, ya que son las áreas donde presento mayores dificultades.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Member: Manuela Londoño */}
                    <div className="bg-white p-6 sm:p-12 shadow-sm rounded-lg space-y-10 border border-slate-100">
                      <div className="space-y-6">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">PERFIL PROFESIONAL.</h2>
                        <div className="space-y-1 text-lg">
                          <p><span className="font-bold">Nombre:</span> Manuela Londoño Duque <span className="font-bold">Edad:</span> 26 años</p>
                          <p><span className="font-bold">Programa:</span> Contaduría Pública.</p>
                        </div>
                        <div 
                          className="w-full max-w-sm mx-auto overflow-hidden rounded-sm border border-slate-100 shadow-sm cursor-pointer relative group"
                          onClick={() => triggerProfilePhotoUpload('manuela')}
                          onMouseEnter={() => setHoveredMemberId('manuela')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <img 
                            src={profilePhotos['manuela'] || "https://picsum.photos/seed/manuela-profile/600/800"} 
                            alt="Manuela Profile" 
                            className="w-full object-cover transition-transform group-hover:scale-105" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="bg-white/90 p-4 rounded-full shadow-lg flex flex-col items-center gap-1">
                              <Camera className="w-5 h-5 text-rose-500" />
                              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Subir Foto</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center">Imagen generada mediante inteligencia artificial (Google, 2026). Gemini.</p>
                        <div className="space-y-4">
                          <h3 className="text-[#FF00FF] font-medium text-lg">Perfil.</h3>
                          <p className="text-sm leading-relaxed text-justify">
                            Soy técnica en Comercio Exterior y actualmente me desempeño como auxiliar administrativa en la Secretaría de Movilidad, en el área de cobro coactivo. Me caracterizo por ser una mujer inteligente, con grandes metas y una fuerte determinación...
                          </p>
                        </div>
                        <h3 className="text-[#FF00FF] font-medium text-lg">Objetivo profesional:</h3>
                        <p className="text-sm leading-relaxed text-justify">
                          Desempeñarme de manera responsable y comprometida en mis funciones, aportando mis conocimientos y habilidades en el área contable...
                        </p>
                      </div>
                    </div>

                    {/* Member: Diana Marcela */}
                    <div className="bg-white p-6 sm:p-12 shadow-sm rounded-lg space-y-10 border border-slate-100">
                      <div className="space-y-6">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">PERFIL PROFESIONAL.</h2>
                        <div className="space-y-1 text-lg">
                          <p><span className="font-bold">Nombre:</span> Diana Marcela Calle Zuleta <span className="font-bold">Edad:</span> 26 años</p>
                          <p><span className="font-bold">Programa:</span> Contaduría pública</p>
                        </div>
                        <div 
                          className="w-full max-w-sm mx-auto overflow-hidden rounded-sm border border-slate-100 shadow-sm cursor-pointer relative group"
                          onClick={() => triggerProfilePhotoUpload('diana')}
                          onMouseEnter={() => setHoveredMemberId('diana')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <img 
                            src={profilePhotos['diana'] || "https://picsum.photos/seed/diana-profile/600/800"} 
                            alt="Diana Profile" 
                            className="w-full object-cover transition-transform group-hover:scale-105" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="bg-white/90 p-4 rounded-full shadow-lg flex flex-col items-center gap-1">
                              <Camera className="w-5 h-5 text-rose-500" />
                              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-tighter">Subir Foto</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center">Imagen generada mediante inteligencia artificial (Google, 2026). Gemini.</p>
                        <div className="space-y-4">
                          <h3 className="text-[#FF00FF] font-medium text-lg">Perfil:</h3>
                          <p className="text-sm leading-relaxed text-justify">
                            Técnica en Auxiliar Administrativa y actualmente curso tercer año de Contaduría Pública. Me desempeño como auxiliar contable y financiera en la empresa MILKAMPO S.A.S...
                          </p>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-slate-50 space-y-8">
                        <h2 className="text-[#FF00FF] font-medium text-xl uppercase tracking-wider">Resultado del Pre-Test: Diana</h2>
                        <div 
                          className="bg-white p-6 rounded-xl border border-slate-100 shadow-inner space-y-6 relative group cursor-pointer" 
                          onClick={() => triggerProfilePhotoUpload('diana_chart')}
                          onMouseEnter={() => setHoveredMemberId('diana_chart')}
                          onMouseLeave={() => setHoveredMemberId(null)}
                        >
                          <div className="grid grid-cols-5 gap-2 text-center">
                            {[ 
                              { label: 'Prom Núcleo', val: '87,25%' },
                              { label: 'Prom Grupo', val: '76,15%' },
                              { label: 'Prom Selección', val: '87,25%' },
                              { label: 'V', val: 'Jornada' },
                              { label: '1', val: 'Cantidad' }
                            ].map((stat) => (
                              <div key={stat.label} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="text-[7px] uppercase font-bold text-slate-400 mb-1">{stat.label}</div>
                                <div className="text-[10px] font-black text-slate-700">{stat.val}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="h-[280px] w-full">
                            {profilePhotos['diana_chart'] ? (
                              <img src={profilePhotos['diana_chart']} className="w-full h-full object-contain" alt="Diana Chart" />
                            ) : (
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                  data={[
                                    { name: 'Formalización', val: 95 },
                                    { name: 'Financiamiento', val: 66 },
                                    { name: 'Inf. Tributaria', val: 100 },
                                    { name: 'Perfil Empr.', val: 100 },
                                    { name: 'Registro Marcario', val: 100 },
                                    { name: 'Control Gestión', val: 100 },
                                    { name: 'English', val: 56 }
                                  ]}
                                  margin={{ top: 20, right: 10, left: -20, bottom: 60 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                  <XAxis 
                                    dataKey="name" 
                                    angle={-45} 
                                    textAnchor="end" 
                                    height={60} 
                                    interval={0} 
                                    fontSize={9} 
                                    tick={{ fill: '#64748b', fontWeight: 600 }}
                                  />
                                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} fontSize={10} tick={{ fill: '#64748b' }} />
                                  <Tooltip cursor={{ fill: '#f8fafc' }} />
                                  <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={25}>
                                    {[95, 66, 100, 100, 100, 100, 56].map((val, index) => (
                                      <Cell key={`cell-${index}`} fill={val > 80 ? '#10b981' : val > 50 ? '#34d399' : '#f43f5e'} />
                                    ))}
                                    <LabelList dataKey="val" position="top" fontSize={10} fontWeight="bold" formatter={(val: any) => `${val}%`} />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                            <div className="bg-white/90 p-3 rounded-full shadow-lg">
                              <Upload className="w-5 h-5 text-rose-500" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            En mi test de entrada obtuve un buen resultado, con un promedio de 87,25%, lo que está por encima del promedio del grupo y del núcleo. Considero que tengo buenas bases en temas como sistemas de control, información tributaria y formalización legal. Sin embargo, también identifiqué que debo mejorar en fuentes de financiamiento y especialmente en inglés.
                          </p>
                          <p className="text-sm leading-relaxed text-slate-600 text-justify">
                            En general, siento que tengo un buen punto de partida, pero sé que puedo seguir fortaleciendo algunos conocimientos durante el proceso de formación.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-rose-50 flex justify-center sticky bottom-0 z-20">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-8 text-white font-bold uppercase text-[10px] tracking-widest shadow-md">
                    Regresar al Archivo
                  </Button>
                </div>
              </div>
            ) : (selectedFile?.name.includes('Cronograma de Actividades') && !selectedFile?.isUserUploaded) ? (
              <div className="flex flex-col h-[90vh]">
                <div className="p-8 border-b border-rose-50 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-rose-600 text-lg">Cronograma de Actividades</h2>
                      <p className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Planificación Estratégica 2024</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="rounded-full h-10 w-10">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                  <div className="max-w-4xl mx-auto space-y-8 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[ 
                        { label: 'Fase de Inicio', val: '100%', color: 'bg-emerald-500' },
                        { label: 'Fase de Ejecución', val: '45%', color: 'bg-rose-500' },
                        { label: 'Fase de Lanzamiento', val: '0%', color: 'bg-slate-200' }
                      ].map((phase, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-rose-50 shadow-sm space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{phase.label}</span>
                            <span className="text-xs font-bold text-slate-800">{phase.val}</span>
                          </div>
                          <Progress value={parseInt(phase.val)} className={`h-1.5 ${phase.color}`} />
                        </div>
                      ))}
                    </div>

                    <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
                      <Table>
                        <TableHeader className="bg-rose-50/50">
                          <TableRow className="border-rose-100 hover:bg-transparent">
                            <TableHead className="text-[10px] font-black uppercase text-rose-400 py-6">Actividad</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-rose-400">Responsable</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-rose-400">Duración</TableHead>
                            <TableHead className="text-[10px] font-black uppercase text-rose-400">Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { act: 'Definición de Marca & Logo', res: 'Laura M.', dur: '2 Semanas', st: 'approved' },
                            { act: 'Registro de Cámara de Comercio', res: 'Diana C.', dur: '1 Mes', st: 'approved' },
                            { act: 'Pruebas de Prototipo Duo Lips', res: 'Angela P.', dur: '3 Semanas', st: 'approved' },
                            { act: 'Plan de Marketing Digital', res: 'Manuela L.', dur: '2 Meses', st: 'pending' },
                            { act: 'Lanzamiento Oficial Lumara', res: 'Equipo', dur: 'N/A', st: 'pending' }
                          ].map((row, i) => (
                            <TableRow key={i} className="border-rose-50 hover:bg-rose-50/20 transition-colors">
                              <TableCell className="font-bold text-slate-700 text-sm py-5">{row.act}</TableCell>
                              <TableCell className="text-slate-500 text-xs">{row.res}</TableCell>
                              <TableCell className="text-slate-500 text-xs">{row.dur}</TableCell>
                              <TableCell><StatusBadge status={row.st as any} /></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-rose-50 flex justify-center">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-12 text-white font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-rose-100">
                    Cerrar Cronograma
                  </Button>
                </div>
              </div>
            ) : (selectedFile?.name.includes('Acuerdo de Trabajo') && !selectedFile?.isUserUploaded) ? (
              <div className="flex flex-col h-[90vh]">
                <div className="p-8 border-b border-rose-50 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-rose-600 text-lg">Acuerdo de Trabajo en Equipo</h2>
                      <p className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">Protocolo de Convivencia & Compromiso</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)} className="rounded-full h-10 w-10">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-12 bg-white selection:bg-rose-100 selection:text-rose-900">
                  <div className="max-w-2xl mx-auto space-y-10 text-slate-700 leading-relaxed">
                    <div className="text-center space-y-4 mb-16">
                      <div className="w-20 h-px bg-rose-200 mx-auto" />
                      <h1 className="text-3xl font-serif italic text-rose-500">Pacto Lumara</h1>
                      <div className="w-20 h-px bg-rose-200 mx-auto" />
                    </div>

                    <section className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-rose-400">1. Objetivos del Equipo</h3>
                      <p className="text-sm">Consolidar a Lumara como una marca líder en cosmética inteligente, basando nuestro crecimiento en la innovación constante y el respeto mutuo entre las fundadoras.</p>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-rose-400">2. Valores Fundamentales</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {['Transparencia', 'Innovación', 'Responsabilidad', 'Colaboración'].map(v => (
                          <div key={v} className="bg-rose-50/50 p-4 rounded-xl border border-rose-100/50 text-rose-600 font-bold text-xs uppercase tracking-tighter flex items-center gap-2">
                             <CheckCircle2 className="w-3 h-3" /> {v}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-rose-400">3. Resolución de Conflictos</h3>
                      <p className="text-sm italic border-l-4 border-rose-200 pl-4">"Cualquier desacuerdo será abordado mediante comunicación directa y asertiva, priorizando siempre el bienestar de la marca y la cohesión del equipo."</p>
                    </section>
                  </div>
                </div>

                <div className="p-6 bg-rose-50/30 border-t border-rose-50 flex justify-center">
                  <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-12 text-white font-bold uppercase text-[10px] tracking-widest">
                    Cerrar Acuerdo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-300">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-rose-500">{selectedFile?.name}</h3>
                  <p className="text-rose-400 text-sm">Este documento está listo para tu revisión segura en la bóveda de Lumara.</p>
                </div>
                <Button onClick={() => setSelectedFile(null)} className="rounded-full bg-primary hover:bg-rose-600 px-10 text-white font-bold uppercase text-[10px] tracking-widest">
                  Volver al Vault
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
