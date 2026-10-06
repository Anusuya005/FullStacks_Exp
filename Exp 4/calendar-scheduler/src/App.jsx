import {
  useCallback,
  useRef,
  useState,
} from "react";

import { useSelector } from "react-redux";

import Calendar, {
  MemoizedCalendar,
} from "./components/Calendar";

import PostForm from "./components/PostForm";
import EditPost from "./components/EditPost";

import "./App.css";


function App() {
  const posts = useSelector(
    (state) => state.posts
  );

  const [editingPostId, setEditingPostId] =
    useState(null);

  /*
   * ----------------------------------------
   * OPTIMIZATION SETTINGS
   * ----------------------------------------
   */

  const [optimizations, setOptimizations] =
    useState({
      memo: true,
      useMemo: true,
      useCallback: true,
    });


  /*
   * ----------------------------------------
   * PERFORMANCE DEMO
   * ----------------------------------------
   */

  const [testUpdates, setTestUpdates] =
    useState(0);

  /*
   * This ref is shared with Calendar.
   * It does NOT cause re-renders itself.
   */

  const performanceRef = useRef({
    calendarRenders: 0,
    eventCalculations: 0,
    insightCalculations: 0,
  });


  const editingPost = posts.find(
    (post) =>
      String(post.id) ===
      String(editingPostId)
  );


  /*
   * ----------------------------------------
   * OPTIMIZATION STATUS
   * ----------------------------------------
   */

  const enabledCount = Object.values(
    optimizations
  ).filter(Boolean).length;


  /*
   * ----------------------------------------
   * EVENT HANDLERS
   * ----------------------------------------
   */

  const handleEventClick = useCallback(
    (postId) => {
      setEditingPostId(postId);
    },
    []
  );


  const handleCloseEdit = useCallback(() => {
    setEditingPostId(null);
  }, []);


  /*
   * ----------------------------------------
   * OPTIMIZED MODE
   * ----------------------------------------
   */

  const handleOptimizedMode = () => {
    setOptimizations({
      memo: true,
      useMemo: true,
      useCallback: true,
    });
  };


  /*
   * ----------------------------------------
   * NON-OPTIMIZED MODE
   * ----------------------------------------
   */

  const handleUnoptimizedMode = () => {
    setOptimizations({
      memo: false,
      useMemo: false,
      useCallback: false,
    });
  };


  /*
   * ----------------------------------------
   * PERFORMANCE TEST
   *
   * This updates the parent component
   * without changing calendar data.
   *
   * React.memo can skip the Calendar
   * render in optimized mode.
   * ----------------------------------------
   */

  const handlePerformanceTest = () => {
    setTestUpdates(
      (previous) => previous + 1
    );
  };


  /*
   * ----------------------------------------
   * SELECT CALENDAR VERSION
   * ----------------------------------------
   */

  const CalendarComponent =
    optimizations.memo
      ? MemoizedCalendar
      : Calendar;


  return (
    <div className="app">

      {/* ====================================
          HEADER
          ==================================== */}

      <header className="app-header">

        <div>

          <div className="app-eyebrow">
            FULL STACK-II
          </div>

          <h1>
            Content Scheduling Calendar
          </h1>

          <p>
            Plan, organize and manage scheduled
            posts from one place.
          </p>

        </div>


        <div className="post-count">

          <span>
            Scheduled Posts
          </span>

          <strong>
            {posts.length}
          </strong>

        </div>

      </header>


      <main className="app-content">


        {/* ====================================
            CREATE POST
            ==================================== */}

        <section className="form-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                CREATE
              </span>

              <h2>
                Schedule a Post
              </h2>

            </div>

            <p>
              Add a new post to your calendar.
            </p>

          </div>

          <PostForm />

        </section>


        {/* ====================================
            PERFORMANCE MODE
            ==================================== */}

        <section className="performance-section">

          <div className="optimization-mode">

            <div>

              <span className="section-label">
                PERFORMANCE MODE
              </span>

              <h3>
                Optimization
              </h3>

              <p className="optimization-description">
                Compare optimized and
                non-optimized rendering.
              </p>

            </div>


            <div className="mode-buttons">

              <button
                type="button"
                className={
                  enabledCount === 3
                    ? "mode-button active"
                    : "mode-button"
                }
                onClick={
                  handleOptimizedMode
                }
              >
                Optimized
              </button>


              <button
                type="button"
                className={
                  enabledCount === 0
                    ? "mode-button active"
                    : "mode-button"
                }
                onClick={
                  handleUnoptimizedMode
                }
              >
                Not Optimized
              </button>

            </div>

          </div>


          {/* ====================================
              OPTIMIZATION STATUS
              ==================================== */}

          <div className="optimization-status">

            <div className="optimization-status-item">

              <span
                className={
                  optimizations.memo
                    ? "status-indicator on"
                    : "status-indicator off"
                }
              />

              React.memo

            </div>


            <div className="optimization-status-item">

              <span
                className={
                  optimizations.useMemo
                    ? "status-indicator on"
                    : "status-indicator off"
                }
              />

              useMemo

            </div>


            <div className="optimization-status-item">

              <span
                className={
                  optimizations.useCallback
                    ? "status-indicator on"
                    : "status-indicator off"
                }
              />

              useCallback

            </div>


            <strong className="current-mode">

              {enabledCount === 3
                ? "Optimized Mode"
                : enabledCount === 0
                ? "Not Optimized Mode"
                : "Custom Mode"}

            </strong>

          </div>


          {/* ====================================
              PERFORMANCE MONITOR
              ==================================== */}

          <div className="performance-monitor">

            <div className="monitor-header">

              <div>

                <span className="section-label">
                  LIVE PERFORMANCE MONITOR
                </span>

                <h3>
                  Rendering & Optimization
                </h3>

              </div>


              <button
                type="button"
                className="test-render-button"
                onClick={
                  handlePerformanceTest
                }
              >
                Test Re-render
              </button>

            </div>


            <div className="monitor-grid">


              {/* Calendar renders */}

              <div className="monitor-card">

                <span>
                  Calendar renders
                </span>

                <strong>
                  {
                    performanceRef.current
                      .calendarRenders
                  }
                </strong>

                <small>
                  React component executions
                </small>

              </div>


              {/* Parent updates */}

              <div className="monitor-card">

                <span>
                  Test updates
                </span>

                <strong>
                  {testUpdates}
                </strong>

                <small>
                  Parent re-render tests
                </small>

              </div>


              {/* Event calculations */}

              <div className="monitor-card">

                <span>
                  Event calculations
                </span>

                <strong>
                  {
                    performanceRef.current
                      .eventCalculations
                  }
                </strong>

                <small>
                  Calendar event processing
                </small>

              </div>


              {/* Insight calculations */}

              <div className="monitor-card">

                <span>
                  Insight calculations
                </span>

                <strong>
                  {
                    performanceRef.current
                      .insightCalculations
                  }
                </strong>

                <small>
                  Scheduling analysis
                </small>

              </div>

            </div>


            {/* Explanation */}

            <div className="performance-explanation">

              <strong>
                What to demonstrate:
              </strong>

              <p>

                Click <b>Test Re-render</b> several
                times. In Optimized Mode,
                React.memo can prevent the Calendar
                component from rendering when its
                props have not changed.

                In Not Optimized Mode, the Calendar
                renders again with each parent update.

              </p>

            </div>

          </div>

        </section>


        {/* ====================================
            CALENDAR
            ==================================== */}

        <section className="calendar-section">

          <div className="section-heading">

            <div>

              <span className="section-label">
                SCHEDULE
              </span>

              <h2>
                Calendar
              </h2>

            </div>

            <p>
              Click a post to edit. Drag or resize
              events to change their schedule.
            </p>

          </div>


          <CalendarComponent

            onEventClick={
              handleEventClick
            }

            useMemoOptimization={
              optimizations.useMemo
            }

            useCallbackOptimization={
              optimizations.useCallback
            }

            performanceRef={
              performanceRef
            }

          />

        </section>

      </main>


      {/* ====================================
          EDIT POST
          ==================================== */}

      {editingPost && (

        <EditPost
          post={editingPost}
          onClose={handleCloseEdit}
        />

      )}

    </div>
  );
}


export default App;