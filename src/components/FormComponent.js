import { useState } from "react";
import { useFormData } from "../context/FormDataContext";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { updateFormState } = useFormData();

  async function handleSubmit(event) {
    event.preventDefault();
    updateFormState(formData);

    let response = await fetch(
      "https://www.greatfrontend.com/api/questions/contact-form",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let data = await response.text();
    console.log(data);
  }

  function handleChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  return (
   
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <textarea
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
  
  );
};

export default FormComponent;
