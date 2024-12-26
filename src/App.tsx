import { Engine, EventsEnum } from "@rendley/sdk";
import React, { useEffect, useRef, useState } from "react";
import { SceneManager } from "./scene/SceneManager";
import { data } from "./data";

const App = () => {
  const displayElementRef = useRef<HTMLCanvasElement | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const timelineSeeker = useRef<HTMLInputElement | null>(null);
  const sceneManagerRef = useRef(new SceneManager());

  useEffect(() => {
    init();

    return () => {
      sceneManagerRef.current.destroy();
    };
  }, []);

  async function init() {
    if (!displayElementRef.current) {
      return;
    }

    await sceneManagerRef.current.init(displayElementRef.current);
    await sceneManagerRef.current.load(data);

    const engine = Engine.getInstance();

    setVideoDuration(engine.getTimeline().getFitDuration());

    // start the playback from the beginning when the video finished playing
    engine.events.on(EventsEnum.TIME, (time) => {
      if (
        !Engine.getInstance().isRendering() &&
        time >= Engine.getInstance().getTimeline().getFitDuration() - 1 / 30
      ) {
        engine.stop();

        if (timelineSeeker?.current) {
          timelineSeeker.current.value = "0";
        }

        return;
      }

      if (timelineSeeker?.current)
        timelineSeeker.current.value = time.toString();
    });

    engine.events.on(EventsEnum.RENDER_COMPLETED, () => {
      Engine.getInstance().stop();
    });

    engine.events.on(EventsEnum.RENDER_ERROR, () => {
      Engine.getInstance().stop();
    });
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    Engine.getInstance().getTimeline().seek(value);
  };

  const handlePlay = () => {
    Engine.getInstance().getTimeline().play();
  };

  const handlePause = () => {
    Engine.getInstance().getTimeline().pause();
  };

  return (
    <div className="composition">
      <div className="container">
        <input
          className="tools-timeline"
          type="range"
          min="0"
          max={videoDuration}
          step={0.033}
          onChange={handleSeek}
          ref={timelineSeeker}
        ></input>
        <div className="tools">
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button
            onClick={() =>
              Engine.getInstance().seek(
                Engine.getInstance().getTimeline().currentTime - 0.033
              )
            }
          >
            Prev frame
          </button>
          <button
            onClick={() =>
              Engine.getInstance().seek(
                Engine.getInstance().getTimeline().currentTime + 0.033
              )
            }
          >
            Next frame
          </button>
          <button
            onClick={async () => {
              const result = await Engine.getInstance().export();
              if (result) {
                const url = URL.createObjectURL(result.blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "rendley.mp4";
                link.click();
                URL.revokeObjectURL(url);
              } else {
                console.error("Failed to export");
              }
            }}
          >
            Export
          </button>
        </div>

        <canvas ref={displayElementRef}></canvas>
      </div>
    </div>
  );
};

export default App;
