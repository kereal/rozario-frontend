import "./utils.css";
import ActionTelInput from "../views/ActionTelInput.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "ActionTelInput",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Disabled = () => ({
  Component: ActionTelInput,
  props: {
    state:"disabled",
    placeholder: 'номер телефона'
  }
});

export const Active = () => ({
  Component: ActionTelInput,
  props: {
    state: 'active',
    placeholder: 'номер телефона'
  }
});


export const Loading = () => ({
  Component: ActionTelInput,
  props: {
    state: 'loading',
    placeholder: 'номер телефона'
  }
});

export const Timer = () => ({
  Component: ActionTelInput,
  props: {
    state: 'timer',
    placeholder: 'номер телефона'
  }
});
