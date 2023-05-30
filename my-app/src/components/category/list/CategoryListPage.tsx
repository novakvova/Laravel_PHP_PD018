import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { AuthUserActionType, IUser } from "../../auth/types";
import { ICategoryItem, ICategoryList } from "./types";

const CategoryListPage = () => {

    const [list, setList] = useState<ICategoryItem[]>([
        // {
        //     id: 1,
        //     name: "SSD",
        //     description: "Для швикдих людей"
        // }
    ]);

    useEffect(() => {
        axios.get<ICategoryList>(`${APP_ENV.BASE_URL}api/category`)
            .then(resp => {
                console.log("Сервак дав дані", resp);
                setList(resp.data.data);
            });

        console.log("use Effect working");
    }, []);

    console.log("Render component");

    const viewData = list.map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <img src={`${APP_ENV.BASE_URL}storage/${category.image}`} width={50} />
        </td>
        <td>{category.description}</td>
      </tr>
    ));

    const dispatch = useDispatch();
    //console.error("Сало");
    const onLogin =() => {
      const user : IUser={name:"Хтось", email: "test@gmail.com"};
      dispatch({type: AuthUserActionType.LOGIN_USER, payload: user });
    }

    const onLogout = () => {
      dispatch({type: AuthUserActionType.LOGOUT_USER });
    }

    return (
      <>
        <h1 className="text-center">Список категорій</h1>
        <Link to="/category/create" className="btn btn-success">Додати</Link>
        <button onClick={onLogin} className="btn btn-success">Залогінити телесика</button>
        <button onClick={onLogout} className="btn btn-success">Вийти</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Фото</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>
           {viewData}
          </tbody>
        </table>
      </>
    );
}

export default CategoryListPage;