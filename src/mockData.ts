import { RootEntry } from './types';

export const mockData: RootEntry[] = [
  {
    id: 'f1',
    name: '01 Perfil Profesional',
    type: 'folder',
    children: [
      {
        id: 'd1',
        name: '01. Historia de la Marca Lumara.pdf',
        type: 'file',
        extension: 'pdf',
        size: '1.2 MB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-01-20',
        status: 'approved',
        category: 'Personal'
      },
      {
        id: 'd5',
        name: '02. Perfiles Profesionales del Equipo.pdf',
        type: 'file',
        extension: 'pdf',
        size: '2.8 MB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-01-20',
        status: 'approved',
        category: 'Personal'
      }
    ]
  },
  {
    id: 'f2',
    name: '02 Acuerdo de trabajo en equipo',
    type: 'folder',
    children: [
      {
        id: 'd3',
        name: 'Acuerdo de Trabajo en Equipo - Lumara Project.pdf',
        type: 'file',
        extension: 'pdf',
        size: '450 KB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-01-20',
        status: 'approved',
        category: 'Legal'
      }
    ]
  },
  {
    id: 'f3',
    name: '03 Business Model Canvas',
    type: 'folder',
    children: [
      {
        id: 'd4',
        name: 'Business Model Canvas - Lumara.pdf',
        type: 'file',
        extension: 'pdf',
        size: '850 KB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-01-20',
        status: 'approved',
        category: 'Estrategia'
      }
    ]
  },
  {
    id: 'f4',
    name: '04 Cronograma',
    type: 'folder',
    children: [
      {
        id: 'd6',
        name: 'Cronograma de Actividades Lumara.xlsx',
        type: 'file',
        extension: 'xlsx',
        size: '1.5 MB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-02-15',
        status: 'pending',
        category: 'Planificación'
      },
      {
        id: 'd7',
        name: 'Presupuesto Maestro Duo Lips.xlsx',
        type: 'file',
        extension: 'xlsx',
        size: '2.1 MB',
        uploadedBy: 'Laura Montoya',
        uploadedAt: '2024-03-01',
        status: 'approved',
        category: 'Finanzas'
      }
    ]
  },
  {
    id: 'f5',
    name: '05 Formalización',
    type: 'folder',
    children: []
  },
  {
    id: 'd100',
    name: 'WhatsApp Image 2026-04-17 at 7.04.08 PM.jpeg',
    type: 'file',
    extension: 'jpeg',
    size: '0.11 MB',
    uploadedBy: 'Laura Montoya',
    uploadedAt: '2026-04-24',
    status: 'pending',
    category: 'Imágenes'
  }
];
