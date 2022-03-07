import React from 'react';
import './Loading.css';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="shadow" />
        <div className="shadow" />
        <div className="shadow" />
        <h1>Carregando...</h1>
      </div>
    );
  }
}
