const svelte = require('svelte/compiler')
const fs = require('fs')

// let classes = new Map();
let classes = []

function processHtml(html) {
  // debugger;
  for (let i = 0; i < html.children.length; ++i) {
    const children = html.children[i]
    // console.log(children);
    if (children.attributes) processAttribute(children.attributes)
    if (children.children) processHtml(children)

    const isAButtonComponent = children.type === 'InlineComponent' && children.name === 'Button'
    if (isAButtonComponent && children.attribute) {
      // console.log(children);
      processAttribute(children.attribute)
    }
  }
}

function processAttribute(attributes) {
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i]
    // console.log(attribute);
    if (attribute.type == 'Class') pushToClasses(attribute.name)
    if (attribute.name == 'class') processClassValues(attribute.value)
    if (attribute.name == 'icon' && attribute.value) {
      processIconValues(attribute.value)
    }
  }
}

function processIconValues(values) {
  values.forEach((value) => {
    // console.log(value);
    pushToClasses('mdi-' + value.data)
  })
}

function processClassValues(values) {
  values.forEach((value) => {
    // console.log(value);
    if (value) {
      if (value.type == 'Text') {
        pushClasses(value.data)
      }
      if (value.type == 'MustacheTag') {
        processClassValuesExpression(value.expression)
      }
    }
  })
}

function processClassValuesExpression(expression) {
  const isLogicalExpression = expression.type == 'LogicalExpression'
  const isOperatorExpression = expression.operator == '||'
  if (isLogicalExpression && isOperatorExpression && expression.right.type == 'Literal') {
    pushClasses(expression.right.value)
  }
}

function pushClasses(value) {
  value.split(/\s/).forEach((word) => {
    pushToClasses(word)
  })
}

function pushToClasses(value) {
  if (value && !!value.length) {
    classes.push(value)
  }
}

function purgecssFromSvelte(content) {
  classes = []
  const ast = svelte.parse(content)
  processHtml(ast.html)
  return classes
}

// const source = fs.readFileSync('./src/views/admin/rayon/Index.svelte').toString();
// purgecssFromSvelte(source);
// console.log(classes);

module.exports = purgecssFromSvelte
