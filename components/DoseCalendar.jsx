import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const DoseCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchDoseSchedule = async () => {
      const response = await axios.get("/api/medications/dose-schedule");
      const events = response.data.doses.flatMap((dose) =>
        dose.doses.map((date) => ({
          title: dose.name,
          start: date,
          end: date,
        }))
      );
      setEvents(events);
    };

    fetchDoseSchedule();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default DoseCalendar;
