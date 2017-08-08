import React, { Component } from 'react';
import { Header } from './components/Header';
import debounce from 'lodash.debounce';
import Markdown from 'react-markdown';
import './App.css';

let hasLocalStorage = supportsLocalStorage();
let initialSource = getDefaultSource();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: initialSource
    }
  }

  onChange(event) {
    this.setState({
      source: event.target.value
    });
    this.storeSource(event.target.value);
  }

  storeSource() {
    if (hasLocalStorage) {
      debounce(function(src) {
        localStorage.markdownSource = src || initialSource;
      }, 250);
    } else {
      return function() {};
    }
  }

  render() {
    return (
      <div className="app">
        <Header companyName="freeCodeCamp" />

        <h1>Markdown Previewer</h1>
        <div className="previewer">
          <textarea
            className="editor"
            rows="22"
            cols="80"
            defaultValue={initialSource}
            onChange={(event) => this.onChange(event)}
          />

        <Markdown
            className="preview"
            source={this.state ? this.state.source : initialSource}
            escapeHtml
          />
        </div>
      </div>
    )
  }
}

function supportsLocalStorage() {
  let mod = 'test';
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

function getDefaultSource() {
  return (hasLocalStorage && localStorage.markdownSource) ||
`Heading
=======

Sub-heading
-----------

### Another deeper heading

Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a
line break

Text attributes *italic*, **bold**,
\`monospace\`, ~~strikethrough~~.

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`;
}

export default App;
