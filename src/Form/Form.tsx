import { useState } from "react";
import "./Form.css";

interface Field extends Partial<HTMLInputElement> {}
export default function Form() {
  const [inputs, setInputs] = useState<Field[]>([
    {
      value: "",
    },
  ]);

  const addInput = () => {
    setInputs((prevInputs) => {
      const nextInputs = prevInputs.slice();
      nextInputs.push({ value: "" });
      return nextInputs;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInputs((prevInputs) => {
      const nextInputs = prevInputs.slice();
      nextInputs[Number(name)].value = value;
      return nextInputs;
    });
  };
  const deleteInput = (idx: number) => {
    const nextInputs = inputs.slice();
    nextInputs.splice(idx, 1);
    setInputs(nextInputs);
  };

  return (
    <form className="forma">
      {inputs.map((input, index) => {
        if (index !== 0) {
          return (
            <>
              <input
                key={index.toString()}
                name={index.toString()}
                className="ime-prezime"
                placeholder="Upisite puno ime i prezime"
                defaultValue={input.defaultValue}
                value={input.value}
                onChange={handleChange}
              />
              <i onClick={() => deleteInput(index)}>Izbrisi</i>
            </>
          );
        }
        return (
          <input
            key={index.toString()}
            name={index.toString()}
            className="ime-prezime"
            placeholder="Upisite puno ime i prezime"
            defaultValue={input.defaultValue}
            value={input.value}
            onChange={handleChange}
          />
        );
      })}
      <div className="dugme" onClick={() => addInput()}>
        <div className="ikonica">+</div>
      </div>
      <textarea
        className="napomena"
        placeholder="Napomena&#10;Rezim ishrane"
      />
      <input
        className="submit"
        type="submit"
        value="Potvrdi"
        disabled={!inputs.every((input) => input.value?.split(" ")[1])}
      />
    </form>
  );
}
