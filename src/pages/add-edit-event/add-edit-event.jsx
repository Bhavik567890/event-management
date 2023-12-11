import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, updateEvent } from "../../modules/events/event-slice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
const validationSchema = Yup.object().shape({
  eventName: Yup.string().required("Event Name is required"),
  eventType: Yup.string().required("Event Type is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string()
    .when("startDate", (startDate, schema) => {
      return schema.test({
        test: function (endDate) {
          if (!startDate || !endDate) {
            return true;
          }
          return new Date(endDate) > new Date(startDate);
        },
        message: "End Date must be after Start Date",
      });
    })
    .required("End Date is required"),
  eventDescription: Yup.string().required("Event Description is required"),
  handledBy: Yup.string().required("Handled By is required"),
  organization: Yup.string().required("Organization is required"),
  totalSubEvents: Yup.number()
    .typeError("Total Sub-Events must be a number")
    .required("Total Sub-Events is required")
    .positive("Total Sub-Events must be a positive number")
    .integer("Total Sub-Events must be an integer"),
});

const AddOrEditEventPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events } = useSelector((state) => state?.root?.event);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      eventName: "",
      eventType: "sports",
      startDate: "",
      endDate: "",
      eventDescription: "",
      handledBy: "",
      organization: "",

      totalSubEvents: "",
    },
  });

  useEffect(() => {
    if (id) {
      const eventToEdit = events.find((event) => event.id === id);
      if (eventToEdit) {
        Object.keys(eventToEdit).forEach((key) => {
          setValue(key, eventToEdit[key]);
        });
      }
    }
  }, [id, events, setValue]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(
        updateEvent({
          ...data,
          id,
        })
      );
    } else {
      dispatch(
        addEvent({
          ...data,
          id: uuidv4(),
        })
      );
    }

    navigate("/");
    reset();
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5 text-center "> {id ? "Edit" :"Add"} Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-semibold mb-1"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              {...register("eventName", { required: true })}
              className="w-full border rounded px-3 py-2 "
            />
            {errors.eventName && (
              <p className="text-red-500">{errors.eventName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventType"
              className="block text-sm font-semibold mb-1"
            >
              Event Type
            </label>
            <select
              id="eventType"
              {...register("eventType", { required: true })}
              className="w-full border rounded px-3 py-2"
            >

              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="general">General</option>
              <option value="children">Children</option>
              <option value="school">School</option>
            </select>
            {errors.eventType && (
              <p className="text-red-500">{errors.eventType.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold mb-1"
            >
              Event Start Date
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold mb-1"
            >
              Event End Date
            </label>
            <input
              type="date"
              id="endDate"
              {...register("endDate", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-semibold mb-1"
            >
              Event Description
            </label>
            <textarea
              id="eventDescription"
              {...register("eventDescription", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.eventDescription && (
              <p className="text-red-500">{errors.eventDescription.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="handledBy"
              className="block text-sm font-semibold mb-1"
            >
              Event Handled By
            </label>
            <input
              type="text"
              id="handledBy"
              {...register("handledBy", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.handledBy && (
              <p className="text-red-500">{errors.handledBy.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="organization"
              className="block text-sm font-semibold mb-1"
            >
              Event Organization
            </label>
            <input
              type="text"
              id="organization"
              {...register("organization", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.organization && (
              <p className="text-red-500">{errors.organization.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalSubEvents"
              className="block text-sm font-semibold mb-1"
            >
              Total Number of Sub-Events
            </label>
            <input
              type="number"
              id="totalSubEvents"
              {...register("totalSubEvents", { required: true })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.totalSubEvents && (
              <p className="text-red-500">{errors.totalSubEvents.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditEventPage;
