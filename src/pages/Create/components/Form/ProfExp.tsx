import React from "react";
import uuid from "react-uuid";

import { Input, RoundButton } from "@/components";
import { MonthInput } from "..";
import { ProfExpProps } from "@/config/interfaces";
import { handleYearValidation } from "@/utils/validateYear";
import { getMonth } from "@/utils/getMonth";
import xCircle from "@/assets/icons/xCircle.svg";

interface ProfExpFormProps {
  id?: string;
  title?: string;
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  description?: string;
  city?: string;
  state?: string;
  actionLabel: string;
  actionFunction: (args?: any) => void;
  edit?: boolean;
}

export function ProfExpForm({
  id = "",
  title = "",
  startMonth = "janeiro",
  startYear = "",
  endMonth = "janeiro",
  endYear = "",
  description = "",
  city = "",
  state = "",
  actionLabel,
  actionFunction,
  edit = false,
}: ProfExpFormProps) {
  const [open, setOpen] = React.useState(edit);
  const [titleState, setTitle] = React.useState(title);
  const [cityState, setCity] = React.useState(city);
  const [stateState, setState] = React.useState(state);
  const [startMonthState, setStartMonth] = React.useState(startMonth);
  const [startYearState, setStartYear] = React.useState(startYear);
  const [endMonthState, setEndMonth] = React.useState(endMonth);
  const [endYearState, setEndYear] = React.useState(endYear);
  const [descriptionState, setDescription] = React.useState(description);

  function onAddButtonClick() {
    if (
      !titleState ||
      !cityState ||
      !stateState ||
      !startMonthState ||
      !startYearState ||
      !endMonthState ||
      !endYearState ||
      !descriptionState
    ) {
      alert("Dado(s) faltando, preenche todo o formulário.");
      return;
    }
    const year = new Date().getFullYear();
    if (startYearState.length != 4 || endYearState.length != 4) {
      alert("Formato de ano inválido, formato: yyyy.");
      return;
    } else if (
      +startYearState < 1970 ||
      +startYearState > year ||
      +endYearState < 1970 ||
      +endYearState > year
    ) {
      alert(`O intervalo do ano deve ser entre 1970 e ${year}.`);
      return;
    }
    if (
      startYearState === endYearState &&
      getMonth(endMonthState) < getMonth(startMonthState)
    ) {
      alert(
        "Data de fim está vindo antes da data de começo, por favor corrija as datas.",
      );
      return;
    }
    const exp: ProfExpProps = {
      id: id ? id : uuid(),
      title: titleState,
      city: cityState,
      state: stateState,
      start: {
        month: startMonthState,
        year: startYearState,
      },
      end: {
        month: endMonthState,
        year: endYearState,
      },
      description: descriptionState,
    };
    actionFunction(exp);
    onCloseFormButtonClick();
  }
  function clearForm() {
    setTitle("");
    setCity("");
    setState("");
    setStartMonth("janeiro");
    setStartYear("");
    setEndMonth("janeiro");
    setEndYear("");
    setDescription("");
  }
  function onCloseFormButtonClick() {
    setOpen(false);
    clearForm();
  }

  return (
    <section className="flex flex-col gap-y-3.5">
      {open ? (
        <div className="relative flex flex-col gap-y-3.5">
          {!edit ? (
            <img
              className="absolute right-0 -top-5 cursor-pointer hover:scale-105"
              src={xCircle}
              alt="Close button"
              onClick={onCloseFormButtonClick}
            />
          ) : (
            ""
          )}
          <Input
            label="Título"
            value={titleState}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex.: Front-end developer na empresa tal..."
            minlength={5}
            maxlength={100}
            required
          />

          <div className="flex gap-5">
            <Input
              className="w-full"
              label="Cidade"
              value={cityState}
              onChange={e => setCity(e.target.value)}
              placeholder="Ex.: São Paulo"
              minlength={3}
              maxlength={20}
              required
            />
            <Input
              className="w-full"
              label="Estado"
              value={stateState}
              onChange={e => setState(e.target.value)}
              placeholder="Ex.: Amazonas"
              minlength={3}
              maxlength={15}
              required
            />
          </div>

          <div className="flex gap-5 justify-center self-center flex-wrap">
            <fieldset className="border rounded p-3">
              <legend className="font-bold">Início</legend>
              <div className="flex gap-5">
                <MonthInput
                  label="Mês"
                  value={startMonthState}
                  onChange={setStartMonth}
                  required
                />
                <Input
                  className="w-20"
                  type="number"
                  label="Ano"
                  value={startYearState}
                  onChange={e =>
                    handleYearValidation(e.target.value, setStartYear)
                  }
                  placeholder="yyyy"
                  min={1970}
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </fieldset>
            <fieldset className="border rounded p-3">
              <legend className="font-bold">Fim</legend>
              <div className="flex gap-5">
                <MonthInput
                  label="Mês"
                  value={endMonthState}
                  onChange={setEndMonth}
                  required
                />
                <Input
                  className="w-20"
                  type="number"
                  label="Ano"
                  value={endYearState}
                  onChange={e =>
                    handleYearValidation(e.target.value, setEndYear)
                  }
                  placeholder="yyyy"
                  min={+startYearState}
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </fieldset>
          </div>

          <Input
            label="Descrição"
            rows={5}
            value={descriptionState}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição das atividades e obrigações realizadas nessa experiência"
            minlength={142}
            maxlength={640}
            required
          />

          <RoundButton className="self-center" onClick={onAddButtonClick}>
            {actionLabel}
          </RoundButton>
        </div>
      ) : (
        <RoundButton className="self-center" onClick={() => setOpen(true)}>
          {actionLabel}
        </RoundButton>
      )}
    </section>
  );
}
