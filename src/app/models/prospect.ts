import {TacheS} from "./tasks/tache";

export interface Prospect {

  id: number;
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

  fax: number;
  social: string;
  typeSociety: string;
  status: string;
  tacheS: TacheS[];

}
