import jsPDF from 'jspdf';
export interface TacheS {
  id: number;
  label: string;
  collaborateurs: string;
  date: string;
  times: string;
  contact: string;
  titre: string;
  description: string;
  etat: string;
  comment: string;
  files: jsPDF;

}
