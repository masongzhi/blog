import React from 'react';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

class Highlighter extends React.PureComponent {
  updateHighlightBlock() {
    document.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  }

  componentDidMount() {
    this.updateHighlightBlock();
  }

  componentDidUpdate() {
    this.updateHighlightBlock();
  }

  render() {
    let { children } = this.props;
    return { children };
  }
}
export default Highlighter;
