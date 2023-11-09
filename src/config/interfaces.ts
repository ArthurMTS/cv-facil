export interface UserProps {
  avatar: string;
  name: string;
  email: string;
  cvs: [];
}

export interface UserProps {
  id: string;
  avatar: string;
  name: string;
  email: string;
  cvs: [];
}

export interface CVProps {
  id?: string;
  name: string;
  email: string;
  job: string;
  phone: string;
  linkedin: string;
  github: string;
  resume: string;
  profExp: ProfExpProps[];
  competencies: CompetencyProps[];
  certifications: CertificationProps[];
}

export interface ProfExpProps {
  id: string;
  title: string;
  city: string;
  state: string;
  start: {
    month: string;
    year: string;
  };
  end: {
    month: string;
    year: string;
  };
  description: string;
}

export interface CompetencyProps {
  id: string;
  title: string;
}

export interface CertificationProps {
  id: string;
  title: string;
  year: string;
}