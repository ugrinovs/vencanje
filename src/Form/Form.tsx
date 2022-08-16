import React, { useState } from "react";
import { BackendService, Guest, GuestMember } from "../api/backendService";
import { ReactComponent as TrashIcon } from "../assets/icons8-trash.svg";
import "./Form.css";

const backendService = new BackendService();
interface Field extends Partial<HTMLInputElement> {}
interface FormProps {
  guest?: Guest;
}
export default function Form({ guest }: FormProps) {
  const [inputs, setInputs] = useState<{ fullName: Field; note: Field }[]>([
    {
      fullName: {
        value: "",
      },
      note: {
        value: "",
      },
    },
  ]);

  const addInput = () => {
    setInputs((prevInputs) => {
      const nextInputs = prevInputs.slice();
      nextInputs.push({ fullName: { value: "" }, note: { value: "" } });
      return nextInputs;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs((prevInputs) => {
      const nextInputs = prevInputs.slice();
      const [index, fieldName] = name.split(".") as [
        string,
        "fullName" | "note"
      ];
      nextInputs[Number(index)][fieldName].value = value;
      return nextInputs;
    });
  };
  const deleteInput = (idx: number) => {
    const nextInputs = inputs.slice();
    nextInputs.splice(idx, 1);
    setInputs(nextInputs);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    const members = inputs.map((input) => {
      return {
        member: input.fullName.value,
        note: input.note.value,
        visitor: guest,
      } as Partial<GuestMember>;
    });

    backendService.addMembers(members);
  };

  return (
    <form className="forma" onSubmit={handleSubmitForm}>
      {inputs.map((input, index) => {
        return (
          <React.Fragment key={index}>
            {index !== 0 && <hr />}
            <div className="ime-prezime-container">
              <input
                key={index.toString()}
                name={`${index.toString()}.fullName`}
                className="ime-prezime"
                placeholder="Upisite puno ime i prezime"
                defaultValue={input.fullName.defaultValue}
                value={input.fullName.value}
                onChange={handleChange}
              />

              {index !== 0 && (
                <i onClick={() => deleteInput(index)} className="trash">
                  <TrashIcon />
                </i>
              )}
            </div>
            <textarea
              name={`${index.toString()}.note`}
              className="napomena"
              placeholder="Rezim ishrane"
              onChange={handleChange}
            />
          </React.Fragment>
        );
      })}
      <div className="dugme" onClick={() => addInput()}>
        <div className="ikonica">+</div>
      </div>
      <input
        className="submit"
        type="submit"
        value="Potvrdi"
        disabled={!inputs.every((input) => input.fullName.value?.split(" ")[1])}
      />
    </form>
  );
}
