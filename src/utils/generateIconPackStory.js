const fs = require("fs");
const path = require("path");
const camelCase = require("camelcase");

const template = (importlist, iconlist) => `<script>
  import Icon from '../components/Icon.svelte'

  ${importlist.join("\n")}

  let iconlist = [
    ${iconlist.join(",\n")}
  ]

</script>

<style>
.wrapper {
  max-width: 1000px;
  margin: 50px auto;

}
.icon-list {
  display: flex;
  flex-flow: row wrap;
}
.item {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.block:hover {
  background: rgba(200,200,200,.2);
}
.wrapper :global(.icon) {
  fill: currentColor;
  color: black;
}
.title {
  margin-top: 0.5rem;
  font-weight: 600;
}
.block {
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 0.5rem;
}
h1 {
  margin: 20px auto;
  font-weight: 700;
  font-size: 24px;
}
</style>

<div class="wrapper">
  <h1>ICON PACK</h1>
  <div class="icon-list">
    {#each iconlist as icon}
    <div class="block">
      <div class="item">
        <Icon classNames="icon" iconSize="32" name={icon.icon}/>
      </div>
      <div class="title">{icon.title}</div>
    </div>
    {/each}
  </div>
</div>
`;

const viewFile = "../views/IconPack.svelte";
const iconsFolder = "../icons";

let iconlist = [];
let importlist = [];

fs.readdirSync(iconsFolder).forEach((file) => {
  console.log(file);
  const filename = path.basename(file, ".svg");
  importlist.push(
    `import ${camelCase(filename, {
      pascalCase: true,
    })} from '../components/icons/${camelCase(filename, {
      pascalCase: true,
    })}.svelte';`
  );
  iconlist.push(
    `{icon: ${camelCase(filename, {
      pascalCase: true,
    })}, title: "${camelCase(filename, { pascalCase: true })}"}`
  );
});

fs.writeFileSync(viewFile, template(importlist, iconlist));
