import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Care Plan recorder</h1>
        <p>Demo app following the specs provided</p>
        <ul>
          <li>Backend uses ASP.NET Core web API (latest version). It's configured to run on ports 50255 and 44390</li>
          <li>This is a regular React client based on ASP.NET "react" standard template. It's configured to run on port 44438</li>
          <li>To test the management screen, click on the "Plan management" menu option</li>
        </ul>
        <p>Data storage uses a temporary json file. A database connector could be easily plugged in throug the dependency container</p>
        
      </div>
    );
  }
}
