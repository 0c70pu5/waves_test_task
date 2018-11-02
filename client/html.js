/* @flow */

import React, {Node} from 'react';

type Props = {
  initialData: string,
  children: Node
};

function Html(props: Props) {
  return (
    <html>
    <head>
      <title>App</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <link rel='stylesheet' href='/build/bundle.css'/>
    </head>
    <body>
    <div id='app'>
      {props.children}
    </div>
    <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_DATA__ = ${props.initialData}`}}/>
    <script src='/build/bundle.js'/>
    <script>
      bundle.init();
    </script>
    </body>
    </html>
  );
}

export default Html;
