import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoryCreate } from "./types";

const CategoryCreatePage = () => {

    const navigator = useNavigate();

    const [dto, setDto] = useState<ICategoryCreate>({
        name: "",
        description: ""
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDto({...dto, [e.target.name]: e.target.value});
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/category", dto)
            .then(resp => {
                navigator("/");
            });
        //console.log("Submit data", dto);
    }

  return (
    <>
      <h1 className="text-center">Створити категорію</h1>
      <form className="col-md-6 offset-md-3" onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Наза
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={dto.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Опис
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={dto.description}
            onChange={onChangeHandler}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Додати
        </button>
      </form>
    </>
  );
};
export default CategoryCreatePage;