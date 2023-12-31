import React from "react";

import { Header, Input, RoundButton } from "@/components";
import {
  CompetenciesForm,
  ProfExpForm,
  CertificationsForm,
  SectionTitle,
  Line,
  ProfExpView,
  CompetenciesView,
  CertificationsView,
} from "./components";
import { CreateContext } from "@/contexts/create";
import { maskPhone } from "@/config/masks/phone";
import { textOnly } from "@/config/masks/textOnly";

export function Create() {
  const {
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
    competencies,
    addCompetency,
    certifications,
    addCertification,
  } = React.useContext(CreateContext);

  function resetInputs() {
    setName("");
    setJob("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setGithub("");
    setResume("");
  }

  return (
    <div className="bg-slate-200 pb-1">
      <Header />
      <form className="bg-slate-50 my-11 md:mx-10 lg:mx-48 p-11 lg:px-40 shadow-lg rounded flex flex-col gap-y-3.5">
        <Input
          label="Nome completo"
          value={name}
          onChange={e => setName(textOnly(e.target.value))}
          placeholder="Ex.: José da Silva"
          minlength={1}
          maxlength={70}
          required
        />
        <Input
          label="Título do cargo"
          value={job}
          onChange={e => setJob(e.target.value)}
          placeholder="Ex.: Desenvolvedor Front-end"
          minlength={1}
          maxlength={50}
          required
        />
        <div className="flex gap-5">
          <Input
            className="w-full normal-case"
            label="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            pattern="[a-z0-9.]+@[a-z0-9]+\.[a-z]+"
            placeholder="Ex.: name@domain.com"
            required
          />
          <Input
            className="w-full"
            label="Celular"
            value={phone}
            onChange={e => setPhone(maskPhone(e.target.value))}
            placeholder="Ex.: (xx) x xxxx-xxxx"
            pattern="\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}"
            required
          />
        </div>
        <div className="flex gap-5">
          <Input
            className="w-full"
            label="Linkedin"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            placeholder="Ex.: https://www.linkedin.com/in/username"
            minlength={29}
            maxlength={50}
          />
          <Input
            className="w-full"
            label="Github"
            value={github}
            onChange={e => setGithub(e.target.value)}
            placeholder="Ex.: https://github.com/username"
            minlength={20}
            maxlength={40}
          />
        </div>
        <Input
          label="Resumo Profissional"
          rows={5}
          value={resume}
          onChange={e => setResume(e.target.value)}
          placeholder="Breve descrição de suas formações, capacitações e habilidades..."
          minlength={142}
          maxlength={640}
          required
        />

        <Line />
        <SectionTitle>Experiências Profissionais</SectionTitle>
        {profExp.map(exp => (
          <ProfExpView
            key={exp.id}
            id={exp.id}
            title={exp.title}
            startMonth={exp.start.month}
            startYear={exp.start.year}
            endMonth={exp.end.month}
            endYear={exp.end.year}
            description={exp.description}
            city={exp.city}
            state={exp.state}
          />
        ))}
        <ProfExpForm
          actionLabel={"Adicionar Experiência"}
          actionFunction={addProfExp}
        />

        <Line />
        <SectionTitle>Competências</SectionTitle>
        {competencies.map(comp => (
          <CompetenciesView
            key={comp.id}
            id={comp.id}
            competency={comp.title}
          />
        ))}
        <CompetenciesForm
          actionLabel={"Adicionar Competência"}
          actionFunction={addCompetency}
        />

        <Line />
        <SectionTitle>Certificações</SectionTitle>
        {certifications.map(cert => (
          <CertificationsView
            key={cert.id}
            id={cert.id}
            title={cert.title}
            year={cert.year}
          />
        ))}
        <CertificationsForm
          actionLabel="Adicionar Certificação"
          actionFunction={addCertification}
        />

        <Line />
        <div className="self-center flex gap-5">
          <RoundButton type="submit">Finalizar Currículo</RoundButton>
          <RoundButton type="reset" onClick={resetInputs}>
            Limpar
          </RoundButton>
        </div>
      </form>
    </div>
  );
}
