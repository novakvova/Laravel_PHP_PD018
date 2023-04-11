import axios from "axios";
import { useEffect, useState } from "react";
import { ICategoryItem } from "./types";

const CategoryListPage = () => {

    const [list, setList] = useState<ICategoryItem[]>([
        // {
        //     id: 1,
        //     name: "SSD",
        //     description: "Для швикдих людей"
        // }
    ]);

    useEffect(() => {
        axios.get<ICategoryItem[]>("http://127.0.0.1:8000/api/category")
            .then(resp => {
                console.log("Сервак дав дані", resp);
                setList(resp.data);
            });

        console.log("use Effect working");
    }, []);

    console.log("Render component");

    const viewData = list.map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>{category.description}</td>
      </tr>
    ));
    //console.error("Сало");

    return (
      <>
        <h1 className="text-center">Список категорій</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
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