import React, { useState } from "react";
import useSound from "use-sound";

export interface IDragAndDropActivityProps {
  dogImage: string;
  treatImage: string;
  toyImage: string;
  completionSound: string;
}

export function DragAndDropActivity({
  props,
  setAllowNext,
}: {
  props: IDragAndDropActivityProps;
  setAllowNext: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { dogImage, treatImage, toyImage, completionSound } = props;
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [playCompletionSound] = useSound(completionSound, { volume: 0.5 });

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemType: string,
  ) => {
    e.dataTransfer.setData("itemType", itemType);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const itemType = e.dataTransfer.getData("itemType");
    if (itemType === "treat" || itemType === "toy") {
      setIsCompleted(true);
      playCompletionSound();
      setAllowNext(true);
    }
    e.preventDefault();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="drag-and-drop-activity flex items-center justify-between"
      style={{ minHeight: "90vh", width: "100%", padding: "0 5%" }}
    >
      <div
        className="left-items flex flex-col space-y-8"
        style={{ alignItems: "flex-start" }}
      >
        <div
          className="treat cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, "treat")}
          style={{ width: 100, height: 100 }}
        >
          <img
            src={treatImage}
            alt="Treat for dog"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div
          className="toy cursor-pointer"
          draggable
          onDragStart={(e) => onDragStart(e, "toy")}
          style={{ width: 100, height: 100 }}
        >
          <img
            src={toyImage}
            alt="Toy for dog"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div
        className="drop-area"
        style={{
          width: 150,
          height: 150,
          position: "relative",
          border: "2px dashed gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <img
          src={dogImage}
          alt="Dog awaiting treat or toy"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {isCompleted && (
        <p className="text-green-500 mt-4">
          Well done! You gave the dog a gift!
        </p>
      )}
    </div>
  );
}
