import {
  memo,
  useCallback,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  reschedulePost,
  togglePostStatus,
} from "../redux/postsSlice";

function Calendar({ onEventClick }) {
  const posts = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  const calendarEvents = useMemo(() => {
    return posts.map((post) => ({
      id: String(post.id),
      title: post.completed
        ? `✓ ${post.title}`
        : post.title,

      start: post.start,
      end: post.end,

      classNames: post.completed
        ? ["completed-event"]
        : [],
    }));
  }, [posts]);

  const handleEventChange = useCallback(
    (info) => {
      const start = info.event.start;

      const end = info.event.end
        ? info.event.end
        : new Date(
            start.getTime() + 60 * 60 * 1000
          );

      dispatch(
        reschedulePost({
          id: info.event.id,
          start: start.toISOString(),
          end: end.toISOString(),
        })
      );
    },
    [dispatch]
  );

  const handleEventClick = useCallback(
    (info) => {
      onEventClick(info.event.id);
    },
    [onEventClick]
  );

  const handleEventDoubleClick = useCallback(
    (info) => {
      dispatch(
        togglePostStatus(info.event.id)
      );
    },
    [dispatch]
  );

  const headerToolbar = useMemo(
    () => ({
      left: "prev,next today",
      center: "title",
      right:
        "dayGridMonth,timeGridWeek,timeGridDay",
    }),
    []
  );

  const plugins = useMemo(
    () => [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
    ],
    []
  );

  return (
    <div className="calendar-container">

      <FullCalendar
        plugins={plugins}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        events={calendarEvents}

        editable={true}

        eventClick={handleEventClick}

        eventDrop={handleEventChange}

        eventResize={handleEventChange}

        eventDidMount={(info) => {
          info.el.addEventListener(
            "dblclick",
            () => handleEventDoubleClick(info)
          );
        }}

        height="auto"
      />

    </div>
  );
}

export default memo(Calendar);