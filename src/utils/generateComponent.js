const { program } = require("commander");
const path = require("path");
const fs = require("fs");

const COMPOENT_DIR = path.join(__dirname, "../components");
const STORIES_DIR = path.join(__dirname, "../stories");
const VIEWS_DIR = path.join(__dirname, "../views");

const componentTemplate = (props = []) => `<script>
${props.map((prop) => `export let ${prop}`).join("\n")}
</script>
<style>
</style>`;

const modalComponentTemplate = (props = []) => `<script>
  import { createEventDispatcher } from 'svelte'
  import ModalSurface from "./ModalSurface.svelte"

  ${props.map((prop) => `export let ${prop}`).join("\n")}

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch('close')
  };
</script>

<style>
</style>

<ModalSurface css="width: ; height: ;" on:close={closeModal}>
</ModalSurface>`;

const storyTemplate = (componentName, props = []) => `import "./utils.css";
import ${componentName} from "../views/${componentName}.svelte";
import { withKnobs, text, object, array } from "@storybook/addon-knobs";

export default {
  title: "${componentName}",
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export const Default = () => ({
  Component: ${componentName},
  props: {
    ${props.map((prop) => `${prop}: `).join("\n")}
  }
})
`;
const viewTemplate = (componentName, props = []) => `<script>
  import ${componentName} from "../components/${componentName}.svelte";
  ${props.map((prop) => `export let ${prop}`).join("\n")}
</script>

<style>
  .wrapper{
    padding: 50px;
  }
</style>

<div class="wrapper">
  <${componentName} {...$$props} />
</div>
`;

function commaSeparatedList(value) {
  return value.split(",");
}

program
  .command("gen <componentName>")
  .option("-p, --props <props>", "props list", commaSeparatedList)
  .description("generates component, story and view for story")
  .action((componentName, options) => {
    fs.writeFileSync(
      path.join(COMPOENT_DIR, componentName + ".svelte"),
      componentTemplate(options.props)
    );
    fs.writeFileSync(
      path.join(STORIES_DIR, componentName + ".stories.js"),
      storyTemplate(componentName, options.props)
    );
    fs.writeFileSync(
      path.join(VIEWS_DIR, componentName + ".svelte"),
      viewTemplate(componentName, options.props)
    );
  });

program
  .command("modal <componentName>")
  .description("generates modal component, story and view for story")
  .action((componentName, options) => {
    fs.writeFileSync(
      path.join(COMPOENT_DIR, componentName + ".svelte"),
      modalComponentTemplate(options.props)
    );
    fs.writeFileSync(
      path.join(STORIES_DIR, componentName + ".stories.js"),
      storyTemplate(componentName, options.props)
    );
    fs.writeFileSync(
      path.join(VIEWS_DIR, componentName + ".svelte"),
      viewTemplate(componentName, options.props)
    );
  });

program.parse(process.argv);
