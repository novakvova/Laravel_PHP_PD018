import "./admin.scss";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <AdminHeader/>
            <div className="admin container">
                <div className="row">
                    <AdminSidebar/>
                    <main className="col-sm-8 col-md-9 col-lg-10 px-md-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;