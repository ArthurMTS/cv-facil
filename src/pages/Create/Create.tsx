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
  FieldsDesc,
} from "./components";
import { CreateContext } from "@/contexts/create";
import { maskPhone } from "@/config/masks/phone";
import { textOnly } from "@/config/masks/textOnly";
import { api } from "@/config/api";

export function Create() {
  const [loading, setLoading] = React.useState(false);
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
    setProfExp,
    setCertifications,
    setCompetencies,
  } = React.useContext(CreateContext);

  function resetInputs() {
    setName("");
    setJob("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setGithub("");
    setResume("");
    setProfExp([]);
    setCertifications([]);
    setCompetencies([]);
  }
  async function onFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/cvs", {
        job,
        phone,
        linkedin,
        github,
        resume,
        userId: "22486745-bac2-4bee-a316-633c170bc4bc",
      });
      const cVId = response.data;

      for (const exp of profExp) {
        await api.post("/exp", {
          cVId,
          title: exp?.title,
          city: exp?.city,
          state: exp?.state,
          description: exp?.description,
          start: `${exp?.start.month} ${exp?.start.year}`,
          end: `${exp?.end.month} ${exp?.end.year}`,
        });
      }
      for (const comp of competencies) {
        await api.post("/comp", {
          title: comp?.title,
          cVId,
        });
      }
      for (const cert of certifications) {
        await api.post("/cert", {
          title: cert?.title,
          year: +cert?.year,
          cVId,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Erro, tente novamente");
    } finally {
      setLoading(false);
      resetInputs();
      alert("Currículo cadastrado com sucesso!");
    }
  }

  return (
    <div className="bg-slate-200 pb-1">
      <Header />
      <form
        onSubmit={onFormSubmit}
        className="bg-slate-50 my-[45px] mx-5 pt-20 pb-5 px-5 lg:mx-40 xl:py-[17px] xl:mx-[150px] xl:px-[260px] shadow-lg rounded flex flex-col gap-y-3.5 relative"
      >
        <FieldsDesc className="absolute top-[9px] left-[20px]" />
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
          <RoundButton
            className={`flex ${loading ? "animate-bounce" : ""}`}
            type="submit"
          >
            {loading ? "Processando..." : "Finalizar Currículo"}
          </RoundButton>
          <RoundButton type="reset" onClick={resetInputs}>
            Limpar
          </RoundButton>
        </div>
      </form>
    </div>
  );
}
