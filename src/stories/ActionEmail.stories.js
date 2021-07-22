import "./utils.css";
import ActionEmail from "../views/ActionEmail.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ActionEmail",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Disabled = () => ({
  Component: ActionEmail,
  props: {
    state:"disabled",
    placeholder: 'Введите e-mail'
  }
});

export const Active = () => ({
  Component: ActionEmail,
  props: {
    state: 'active',
    placeholder: 'Введите e-mail'
  }
});


export const Loading = () => ({
  Component: ActionEmail,
  props: {
    state: 'loading',
    placeholder: 'Введите e-mail'
  }
});

export const Timer = () => ({
  Component: ActionEmail,
  props: {
    state: 'timer',
    placeholder: 'Введите e-mail'
  }
});
