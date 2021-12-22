const element =
  ["div", {style: "background: salmon"},
    ["h1", "Hello World"],
    ["h2", "from our library", {style: "text-align:right"}] ]


function init () {
  let appRoot = document.getElementById("app")
  renderSJDON(element, appRoot)
}


function renderSJDON(sjdon, node) {
  let struct;
  if (Array.isArray(sjdon)) {
    struct = document.createElement(sjdon[0]);
    let attrs = Object.assign({}, ...sjdon.filter(a => {
      return typeof a === "object" && !Array.isArray(a);
    }));
    for (const a in attrs) {
      struct.setAttribute(a, attrs[a]);
    }
    let children = sjdon.slice(1).filter(a => {
      return typeof a === "string" || Array.isArray(a);
    });
    for (let child of children) {
      renderSJDON(child, struct)
    }
  } else if (typeof sjdon === "string") {
    struct = document.createTextNode(sjdon)
  }
  node.appendChild(struct)
}
