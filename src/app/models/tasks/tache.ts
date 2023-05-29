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
  comment: string;
  files: jsPDF;

}
