// inspired by https://github.com/carbon-design-system/carbon/tree/master/packages/icon-build-helpers/src/builders/vanilla
const fs = require("fs");
const path = require("path");
const svg2js = require("svgo/lib/svgo/svg2js");
const SVGO = require("svgo");

const iconComponentsFolder = path.join(__dirname, "../components/icons");
const iconsFolder = path.join(__dirname, "../icons");

let icons = [];

function convert(svg) {
  if (svg.elem === "style") {
    return;
  }
  const icon = {
    elem: svg.elem,
    attrs: normalizeAttributes(svg.attrs),
  };
  if (svg.content) {
    icon.content = svg.content.map(convert);
  }
  return icon;
}

function parse() {
  fs.readdirSync(iconsFolder).forEach(async (file) => {
    let content = fs.readFileSync(path.join(iconsFolder, file));
    content = await optimize(content);
    svg2js(content.data, ({ error, ...rest }) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      const svg = rest.content[0];
      const json = convert(svg);
      json.name = file.replace(/(?:\.([^.]+))?$/, "");
      fs.writeFileSync(
        path.join(iconComponentsFolder, capitalize(json.name) + ".svelte"),
        component_template(json)
      );
    });
  });
}

function hasProhibitedAttribute(value) {
  const prohibitedAttributes = [
    "x",
    "y",
    "width",
    "height",
    "class",
    "id",
    "xml:space",
    "xmlns:xlink",
  ];
  return prohibitedAttributes.includes(value);
}

function normalizeAttributes(attrs) {
  if (!attrs) {
    return "";
  }
  let normalizedAttrs = {};
  Object.entries(attrs).forEach(([k, v]) => {
    if (!hasProhibitedAttribute(k)) {
      if (
        k !== "style" &&
        v["value"] &&
        !v["value"].includes("enable-background")
      ) {
        normalizedAttrs[k] = v["value"];
      }
    }
  });
  return normalizedAttrs;
}

function generateElement(svg) {
  if (svg && (svg.elem === "svg" || svg.elem === "g")) {
    return `<${svg.elem} ${formatAttributes(svg.attrs)} >
      ${svg.content && svg.content.map(generateElement).join("\n")}
    </${svg.elem}>`;
  }
  if (svg) return `<${svg.elem} ${formatAttributes(svg.attrs)}/>`;
}

const component_template = (svg) => `<script>
  export let iconSize = '';
  export let classNames = '';
  export let height = '';
  export let width = '';
</script>
<${
  svg.elem
} class={classNames} width={iconSize ? iconSize : width} height={iconSize ? iconSize : height} ${formatAttributes(
  svg.attrs
)}>
  ${svg.content.map(generateElement).join("\n")}
</${svg.elem}>`;

function capitalize(str) {
  if (!str && str.length < 1) {
    return "";
  }
  const firstLetter = str[0].toUpperCase();
  let other = str.slice(1);
  for (let i = 0; i < other.length; i++) {
    if (other[i] === "-" || other[i] === "_") {
      other =
        other.slice(0, i) +
        other.slice(i + 1, i + 2).toUpperCase() +
        other.slice(i + 2);
    }
  }
  return firstLetter + other;
}

const svgo = new SVGO({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      cleanupIDs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeAttrs: { attrs: "(stroke|fill)" },
    },
  ],
});

async function optimize(file) {
  const data = await svgo.optimize(file);
  return data;
}

function formatAttributes(attrs) {
  if (attrs) {
    return Object.keys(attrs).reduce((acc, key, index) => {
      const attribute = `${key}="${attrs[key]}"`;
      if (attribute.includes("width") || attribute.includes("height")) {
        attribute;
      }
      if (index === 0) {
        return attribute;
      }
      return acc + " " + attribute;
    }, "");
  }
  return "";
}

parse();
