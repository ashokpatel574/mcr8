import { data } from "../contants";

export const initialState = {
  isModalOpen: false,
  eventsData: data?.meetups,
  eventType: "both",
  searchKey: "",
  rsvpState: "",
  eventPaid: "",
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "SearchEvent": {
      return {
        ...state,
        searchKey: action.payload,
      };
    }

    case "OpenModal": {
      return {
        ...state,
        isModalOpen: true,
        eventPaid: action.payload,
      };
    }

    case "EventType": {
      return {
        ...state,
        eventType: action.payload,
      };
    }

    case "CloseModal": {
      return {
        ...state,
        isModalOpen: false,
      };
    }

    case "RSVPEvent": {
      return {
        ...state,
        rsvpState: action.payload,
        isModalOpen: false,
      };
    }

    default:
      return state;
  }
};
