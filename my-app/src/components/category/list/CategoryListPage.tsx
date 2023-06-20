import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem, ICategoryList } from "./types";
import http_common from "../../../http_common";

const CategoryListPage = () => {

    const [list, setList] = useState<ICategoryItem[]>([
        // {
        //     id: 1,
        //     name: "SSD",
        //     description: "Для швикдих людей"
        // }
    ]);

    useEffect(() => {
        http_common.get<ICategoryList>(`api/category`)
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


    return (
      <>
        <h1 className="text-center">Список категорій</h1>
        <Link to="/category/create" className="btn btn-success">Додати</Link>

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