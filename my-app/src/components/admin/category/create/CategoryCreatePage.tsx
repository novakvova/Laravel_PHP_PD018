import axios from "axios";
import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import { ICategoryCreate, ICategoryCreateErrror } from "./types";
import http_common from "../../../../http_common";

const CategoryCreatePage = () => {
  const navigator = useNavigate();

  const [dto, setDto] = useState<ICategoryCreate>({
    name: "",
    description: "",
    image: null
  });

  const [errors, setErrors] = useState<ICategoryCreateErrror>({
    name: "",
    description: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDto({ ...dto, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ name: "", description: "" });
    http_common
      .post(`api/category`, dto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        navigator("/admin/category");
      })
      .catch((er) => {
        const errors = er.response.data as ICategoryCreateErrror;
        setErrors(errors);
        console.log("Server error ", errors);
      });
    //console.log("Submit data", dto);
  };
  const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setDto({ ...dto, image: e.target.files[0] });
    }
  };

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
            className={classNames("form-control", {
              "is-invalid": errors.name,
            })}
            id="name"
            name="name"
            value={dto.name}
            onChange={onChangeHandler}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Опис
          </label>
          <input
            type="text"
            id="description"
            className={classNames("form-control", {
              "is-invalid": errors.description,
            })}
            name="description"
            value={dto.description}
            onChange={onChangeHandler}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={onImageChangeHandler}
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
