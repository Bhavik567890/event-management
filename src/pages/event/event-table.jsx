import React from "react";
import { Pencil, Trash } from "lucide-react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteEvent } from "../../modules/events/event-slice";

const EventListingPage = () => {
  const { events } = useSelector((state) => state?.root?.event);
  const dispatch = useDispatch();
  const handleDelete = (eventId) => {
    dispatch(deleteEvent({ id: eventId }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "eventName", headerName: "Event Name", width: 200 },
    { field: "eventType", headerName: "Event Type", width: 200 },
    {
      field: "startDate",
      headerName: "Start-Date",
      width: 150,
    },
    {
      field: "endDate",
      headerName: "End-Date",

      width: 160,
    },
    {
      field: "organization",
      headerName: "Organization",

      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex">
          <Link to={`/add-edit/event/${params.row.id}`} className="mr-2">
            <Pencil className="h-5 w-5 mr-1" />
          </Link>
          <button onClick={() => handleDelete(params.row.id)}>
            <Trash className="h-5 w-5 mr-1" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full mt-5">
      <div className="flex justify-end mb-4  ">
        <Link
          to="/add-edit/event"
          className="bg-blue-500 text-white   py-2 px-4 mr-11 rounded-md "
        >
          Add Event
        </Link>
      </div>
      <DataGrid
        rows={events}
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
  );
};

export default EventListingPage;
