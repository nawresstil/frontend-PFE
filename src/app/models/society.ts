import {SafeUrl} from '@angular/platform-browser';
import {Project} from "./Project";
import {TacheS} from "./tasks/tache";

export interface Society {
  id: number;

  tracability: string;
  societyName: string;

  siteWeb: string;

  phoneSociety: number;

  faxSociety: number;

  emailSociety: string;

  pays: string;

  sector: string;

  nbrEmployee: string;

  creationDate: string;

  priority: number;
  gender: string;

  firstName: string;

  lastName: string;

  function: string;

  email: string;

  phone: number;
  social: string;

  typeSociety: string;

  status: string;
  imageUrl: File;
  url: SafeUrl;
  projets: Project[];
  tacheS: TacheS[];
}
