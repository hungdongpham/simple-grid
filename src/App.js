import React from "react";
import "./styles.css";
import CustomGrid from "./components/customGrid";
import { Icon } from 'semantic-ui-react';

export default function App() {
  return (
    <div className="App">
      <h1><Icon name="grid layout" size='small'/> Simple Grid Demo</h1>
      <h2>for Localize Direct</h2>
      <CustomGrid />
    </div>
  );
}
