import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
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


function Calendar({
  onEventClick,

  useMemoOptimization = true,

  useCallbackOptimization = true,

  performanceRef,
}) {

  const posts = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();


  /*
   * ----------------------------------------
   * RENDER COUNT
   * ----------------------------------------
   */

  if (performanceRef) {
    performanceRef.current.calendarRenders += 1;
  }


  /*
   * ----------------------------------------
   * SELECTED DATE
   * ----------------------------------------
   */

  const [selectedDate, setSelectedDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );


  /*
   * ----------------------------------------
   * EVENT CALCULATION
   * ----------------------------------------
   */

  const createCalendarEvents = () => {

    if (performanceRef) {
      performanceRef.current
        .eventCalculations += 1;
    }


    return posts.map((post) => ({

      id: String(post.id),

      title: post.completed
        ? `✓ ${post.title}`
        : post.title,

      start: post.start,

      end: post.end,

      classNames:
        post.completed
          ? ["completed-event"]
          : [],

    }));
  };


  /*
   * useMemo VERSION
   */

  const memoizedCalendarEvents =
    useMemo(
      () => createCalendarEvents(),
      [posts]
    );


  /*
   * NORMAL VERSION
   */

  const calendarEvents =
    useMemoOptimization
      ? memoizedCalendarEvents
      : createCalendarEvents();


  /*
   * ----------------------------------------
   * SCHEDULING INSIGHT
   * ----------------------------------------
   */

  const calculateSchedulingInsight = () => {

    if (performanceRef) {
      performanceRef.current
        .insightCalculations += 1;
    }


    const TOTAL_SLOTS = 12;


    const selectedPosts =
      posts.filter((post) => {

        if (!post.start) {
          return false;
        }


        const postDate =
          new Date(post.start)
            .toISOString()
            .split("T")[0];


        return (
          postDate === selectedDate
        );

      });


    const postCount =
      selectedPosts.length;


    const occupiedSlots =
      Math.min(
        postCount,
        TOTAL_SLOTS
      );


    const availableSlots =
      TOTAL_SLOTS -
      occupiedSlots;


    const availabilityPercentage =
      Math.round(
        (availableSlots /
          TOTAL_SLOTS) *
          100
      );


    let status;

    let recommendation;


    if (
      availabilityPercentage >= 80
    ) {

      status =
        "Excellent availability";

      recommendation =
        "This date has plenty of scheduling capacity.";

    }

    else if (
      availabilityPercentage >= 60
    ) {

      status =
        "Good availability";

      recommendation =
        "The selected date can comfortably accommodate more posts.";

    }

    else if (
      availabilityPercentage >= 40
    ) {

      status =
        "Moderate availability";

      recommendation =
        "Consider distributing additional posts across other dates.";

    }

    else if (
      availabilityPercentage >= 20
    ) {

      status =
        "High scheduling density";

      recommendation =
        "This date is becoming busy. Consider using another date.";

    }

    else {

      status =
        "Nearly fully scheduled";

      recommendation =
        "Avoid adding many more posts to this date.";

    }


    return {

      postCount,

      availableSlots,

      occupiedSlots,

      availabilityPercentage,

      status,

      recommendation,

    };

  };


  /*
   * useMemo VERSION
   */

  const memoizedSchedulingInsight =
    useMemo(
      () =>
        calculateSchedulingInsight(),

      [posts, selectedDate]
    );


  /*
   * NORMAL VERSION
   *
   * Only execute when optimization
   * is disabled.
   */

  const schedulingInsight =
    useMemoOptimization
      ? memoizedSchedulingInsight
      : calculateSchedulingInsight();


  /*
   * ----------------------------------------
   * DATE CLICK
   * ----------------------------------------
   */

  const memoizedDateClick =
    useCallback(
      (info) => {

        setSelectedDate(
          info.dateStr
        );

      },
      []
    );


  const normalDateClick = (info) => {

    setSelectedDate(
      info.dateStr
    );

  };


  /*
   * ----------------------------------------
   * EVENT CLICK
   * ----------------------------------------
   */

  const memoizedEventClick =
    useCallback(
      (info) => {

        onEventClick(
          info.event.id
        );

      },
      [onEventClick]
    );


  const normalEventClick = (info) => {

    onEventClick(
      info.event.id
    );

  };


  /*
   * ----------------------------------------
   * DRAG / RESIZE
   * ----------------------------------------
   */

  const memoizedEventChange =
    useCallback(
      (info) => {

        const start =
          info.event.start;


        const end =
          info.event.end
            ? info.event.end
            : new Date(
                start.getTime() +
                60 * 60 * 1000
              );


        dispatch(
          reschedulePost({

            id: info.event.id,

            start:
              start.toISOString(),

            end:
              end.toISOString(),

          })
        );


        setSelectedDate(
          start
            .toISOString()
            .split("T")[0]
        );

      },
      [dispatch]
    );


  const normalEventChange = (info) => {

    const start =
      info.event.start;


    const end =
      info.event.end
        ? info.event.end
        : new Date(
            start.getTime() +
            60 * 60 * 1000
          );


    dispatch(
      reschedulePost({

        id: info.event.id,

        start:
          start.toISOString(),

        end:
          end.toISOString(),

      })
    );


    setSelectedDate(
      start
        .toISOString()
        .split("T")[0]
    );

  };


  /*
   * ----------------------------------------
   * SELECT CALLBACK VERSION
   * ----------------------------------------
   */

  const handleDateClick =
    useCallbackOptimization
      ? memoizedDateClick
      : normalDateClick;


  const handleEventClick =
    useCallbackOptimization
      ? memoizedEventClick
      : normalEventClick;


  const handleEventChange =
    useCallbackOptimization
      ? memoizedEventChange
      : normalEventChange;


  /*
   * ----------------------------------------
   * DOUBLE CLICK
   * ----------------------------------------
   */

  const handleEventDoubleClick =
    useCallback(
      (info) => {

        dispatch(
          togglePostStatus(
            info.event.id
          )
        );

      },
      [dispatch]
    );


  /*
   * ----------------------------------------
   * DOUBLE CLICK CLEANUP
   * ----------------------------------------
   */

  const doubleClickHandlers =
    useRef(new WeakMap());


  const handleEventDidMount =
    useCallback(
      (info) => {

        const handler = () =>
          handleEventDoubleClick(info);


        info.el.addEventListener(
          "dblclick",
          handler
        );


        doubleClickHandlers.current.set(
          info.el,
          handler
        );

      },
      [handleEventDoubleClick]
    );


  const handleEventWillUnmount =
    useCallback(
      (info) => {

        const handler =
          doubleClickHandlers.current.get(
            info.el
          );


        if (handler) {

          info.el.removeEventListener(
            "dblclick",
            handler
          );


          doubleClickHandlers.current.delete(
            info.el
          );

        }

      },
      []
    );


  /*
   * ----------------------------------------
   * STATIC CONFIGURATION
   * ----------------------------------------
   */

  const headerToolbar =
    useMemo(
      () => ({

        left:
          "prev,next today",

        center:
          "title",

        right:
          "dayGridMonth,timeGridWeek,timeGridDay",

      }),
      []
    );


  const plugins =
    useMemo(
      () => [

        dayGridPlugin,

        timeGridPlugin,

        interactionPlugin,

      ],
      []
    );


  /*
   * ----------------------------------------
   * DATE FORMAT
   * ----------------------------------------
   */

  const formattedDate =
    useMemo(
      () => {

        const date =
          new Date(
            `${selectedDate}T00:00:00`
          );


        return date.toLocaleDateString(
          "en-IN",
          {

            day: "numeric",

            month: "short",

            year: "numeric",

          }
        );

      },
      [selectedDate]
    );


  /*
   * ----------------------------------------
   * UI
   * ----------------------------------------
   */

  return (

    <div className="calendar-layout">


      {/* CALENDAR */}

      <div className="calendar-main">

        <div className="render-counter">

          <span>
            Current Calendar Render Count
          </span>

          <strong>

            {
              performanceRef?.current
                .calendarRenders ?? 0
            }

          </strong>

        </div>


        <FullCalendar

          plugins={plugins}

          initialView="dayGridMonth"

          headerToolbar={
            headerToolbar
          }

          events={
            calendarEvents
          }

          editable={true}

          selectable={true}

          eventClick={
            handleEventClick
          }

          dateClick={
            handleDateClick
          }

          eventDrop={
            handleEventChange
          }

          eventResize={
            handleEventChange
          }

          eventDidMount={
            handleEventDidMount
          }

          eventWillUnmount={
            handleEventWillUnmount
          }

          height="auto"

        />

      </div>


      {/* ====================================
          AI INSIGHT
          ==================================== */}

      <aside className="ai-insight-panel">

        <div className="insight-header">

          <div className="insight-label">
            AI SCHEDULING
          </div>

          <h2>
            Insight
          </h2>

          <p>
            Scheduling analysis for
          </p>

          <strong>
            {formattedDate}
          </strong>

        </div>


        <div className="percentage-section">

          <div className="percentage-circle">

            <span>
              {
                schedulingInsight
                  .availabilityPercentage
              }%
            </span>

            <small>
              available
            </small>

          </div>

        </div>


        <div className="insight-status">

          <span className="status-dot"></span>

          <strong>
            {
              schedulingInsight.status
            }
          </strong>

        </div>


        <div className="insight-stats">


          <div className="stat-item">

            <span>
              Scheduled posts
            </span>

            <strong>
              {
                schedulingInsight
                  .postCount
              }
            </strong>

          </div>


          <div className="stat-item">

            <span>
              Available slots
            </span>

            <strong>
              {
                schedulingInsight
                  .availableSlots
              }
            </strong>

          </div>


          <div className="stat-item">

            <span>
              Used capacity
            </span>

            <strong>

              {
                Math.round(
                  (
                    schedulingInsight
                      .occupiedSlots /
                    12
                  ) * 100
                )
              }%

            </strong>

          </div>


        </div>


        <div className="recommendation-box">

          <div className="recommendation-title">
            Recommendation
          </div>

          <p>
            {
              schedulingInsight
                .recommendation
            }
          </p>

        </div>


        <div className="insight-note">

          <strong>
            Scheduling model
          </strong>

          <p>
            Availability is estimated
            using 12 standard scheduling
            slots per day. Multiple posts
            are supported at the same time.
          </p>

        </div>

      </aside>

    </div>
  );
}


/*
 * Normal Calendar
 */

export { Calendar };


/*
 * Optimized Calendar
 */

export const MemoizedCalendar =
  memo(Calendar);


/*
 * Default export
 */

export default MemoizedCalendar;