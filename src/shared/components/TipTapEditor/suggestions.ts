import { computePosition } from "@floating-ui/dom";
import { Editor } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import { EmojiList } from "./EmojiList";

export default {
  items: ({ editor, query }: { editor: Editor; query: string }) => {
    const emojis: any = editor.storage.emoji.emojis;

    return emojis
      .filter(({ shortcodes, tags }: any) => {
        return (
          shortcodes.some((shortcode: any) =>
            shortcode.startsWith(query.toLowerCase())
          ) || tags.some((tag: any) => tag.startsWith(query.toLowerCase()))
        );
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: (): any => {
    let component: any;

    const repositionComponent = (clientRect: DOMRect) => {
      if (!component?.element) return;

      const virtualElement = {
        getBoundingClientRect: () => clientRect,
      };

      computePosition(virtualElement, component.element, {
        placement: "bottom-start",
      }).then(({ x, y, strategy }) => {
        Object.assign(component.element.style, {
          left: `${x}px`,
          top: `${y}px`,
          position: strategy === "fixed" ? "fixed" : "absolute",
        });
      });
    };

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        document.body.appendChild(component.element);
        repositionComponent(props.clientRect());
      },

      onUpdate(props: any) {
        component.updateProps(props);
        repositionComponent(props.clientRect());
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          if (component?.element?.parentNode) {
            component.element.parentNode.removeChild(component.element);
          }
          component.destroy();
          return true;
        }

        return component.ref?.onKeyDown?.(props) ?? false;
      },

      onExit() {
        if (component?.element?.parentNode) {
          component.element.parentNode.removeChild(component.element);
        }
        component.destroy();
      },
    };
  },
} satisfies Partial<any>;
