import React from "react";

import {
  CVProps,
  CertificationProps,
  CompetencyProps,
  ProfExpProps,
} from "@/config/interfaces";

interface CreateProviderProps extends CVProps {
  setName: (value: string) => void;
  setJob: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setLinkedin: (value: string) => void;
  setGithub: (value: string) => void;
  setResume: (value: string) => void;
  profExp: ProfExpProps[];
  addProfExp: (exp: ProfExpProps) => void;
  rmvProfExp: (id: string) => void;
  editProfExp: (exp: ProfExpProps) => void;
  addCompetency: (comp: CompetencyProps) => void;
  rmvCompetency: (id: string) => void;
  editCompetency: (comp: CompetencyProps) => void;
  addCertification: (cert: CertificationProps) => void;
  rmvCertification: (id: string) => void;
  editCertification: (cert: CertificationProps) => void;
}

export const CreateContext = React.createContext({} as CreateProviderProps);

export function CreateProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = React.useState("");
  const [job, setJob] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [resume, setResume] = React.useState("");
  const [profExp, setProfExp] = React.useState<ProfExpProps[]>([]);
  const [competencies, setCompetencies] = React.useState<CompetencyProps[]>([]);
  const [certifications, setCertifications] = React.useState<
    CertificationProps[]
  >([]);

  function addProfExp(exp: ProfExpProps) {
    const list = [...profExp];
    list.push(exp);
    setProfExp(list);
  }
  function rmvProfExp(id: string) {
    const list = profExp.filter(exp => exp.id !== id);
    setProfExp(list);
  }
  function editProfExp(exp: ProfExpProps) {
    const list = profExp.map(e => {
      if (e.id === exp.id) {
        return exp;
      }
      return e;
    });
    setProfExp(list);
  }
  function addCompetency(comp: CompetencyProps) {
    const list = [...competencies];
    list.push(comp);
    setCompetencies(list);
  }
  function rmvCompetency(id: string) {
    const list = competencies.filter(comp => comp.id !== id);
    setCompetencies(list);
  }
  function editCompetency(comp: CompetencyProps) {
    const list = competencies.map(c => {
      if (c.id === comp.id) {
        return comp;
      }
      return c;
    });
    setCompetencies(list);
  }
  function addCertification(cert: CertificationProps) {
    const list = [...certifications];
    list.push(cert);
    setCertifications(list);
  }
  function rmvCertification(id: string) {
    const list = certifications.filter(cert => cert.id !== id);
    setCertifications(list);
  }
  function editCertification(cert: CertificationProps) {
    const list = certifications.map(c => {
      if (c.id === cert.id) {
        return cert;
      }
      return c;
    });
    setCertifications(list);
  }

  return (
    <CreateContext.Provider
      value={{
        name,
        setName,
        job,
        setJob,
        email,
        setEmail,
        phone,
        setPhone,
        linkedin,
        setLinkedin,
        github,
        setGithub,
        resume,
        setResume,
        profExp,
        addProfExp,
        rmvProfExp,
        editProfExp,
        competencies,
        addCompetency,
        rmvCompetency,
        editCompetency,
        certifications,
        addCertification,
        rmvCertification,
        editCertification,
      }}
    >
      {children}
    </CreateContext.Provider>
  );
}