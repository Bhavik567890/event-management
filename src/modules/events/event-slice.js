import { createSlice } from "@reduxjs/toolkit";



export const eventSlice = createSlice({
  name: "events",
  initialState: {
    loading: false,
    events: [],
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      const updatedEvent = action.payload;
      state.events = state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id
      );
    },
  },
});

export const { toggleLoading, setEvents, addEvent, updateEvent, deleteEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
