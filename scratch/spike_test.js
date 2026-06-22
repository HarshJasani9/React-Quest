const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Simulate the Sandbox execution
function testExecution(codeStr) {
  try {
    const exports = {};
    const executeFn = new Function('exports', 'require', 'React', codeStr);
    executeFn(exports, require, React);
    
    const Component = exports.default;
    // Simulate render
    const html = ReactDOMServer.renderToString(React.createElement(Component));
    console.log("Rendered successfully:", html.slice(0, 50));
  } catch (err) {
    console.log("Caught error:", err.message);
  }
}

console.log("--- Test 1: Infinite re-render (setState in render) ---");
const code1 = `
  exports.default = function App() {
    const [count, setCount] = React.useState(0);
    setCount(count + 1); // Infinite re-render
    return React.createElement('div', null, count);
  }
`;
testExecution(code1);

console.log("--- Test 2: Literal while(true) ---");
console.log("This will hang Node.js if it runs. Skipping literal while(true) as it provably blocks synchronous execution.");
// We don't actually run while(true) here because it would hang this test script too.
