import  { useEffect } from "react";
import { getAllUsers } from "../../modules/users/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "../../components/loader/loader";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "username", headerName: "User name", width: 200 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "phone", headerName: "Phone-Number", width: 220 },

  {
    field: "website",
    headerName: "WebSite",
    width: 170,
  },
];
const USersListingPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state?.root?.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-full w-full mt-5">
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default USersListingPage;
