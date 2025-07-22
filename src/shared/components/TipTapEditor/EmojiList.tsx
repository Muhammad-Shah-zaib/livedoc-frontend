import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export const EmojiList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: any) => {
    const item = props.items[index];

    if (item) {
      props.command({ name: item.name });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(
    ref,
    () => {
      return {
        onKeyDown: (x: any) => {
          if (x.event.key === "ArrowUp") {
            upHandler();
            return true;
          }

          if (x.event.key === "ArrowDown") {
            downHandler();
            return true;
          }

          if (x.event.key === "Enter") {
            enterHandler();
            return true;
          }

          return false;
        },
      };
    },
    [upHandler, downHandler, enterHandler]
  );

  return (
    <div className="flex flex-col max-w-[250px] w-full bg-slate-100 dark:bg-slate-800/80 shadow-lg rounded-md p-1">
      {props.items.map((item: any, index: any) => (
        <button
          className={`rounded-md px-2 py-0.5 flex items-center gap-1 ${
            index === selectedIndex ? "bg-slate-300 dark:bg-slate-600" : ""
          }`}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.fallbackImage ? (
            <img src={item.fallbackImage} className="w-[1em] h-[em]" />
          ) : (
            item.emoji
          )}
          :{item.name}:
        </button>
      ))}
    </div>
  );
});
