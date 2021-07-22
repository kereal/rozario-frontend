import "./utils.css";
import SignInModal from "../components/SignInModal.svelte";

export default {
  title: "SignInModal",
  excludeStories: /.*Data$/,
};

export const Default = () => ({
  Component: SignInModal,
});
