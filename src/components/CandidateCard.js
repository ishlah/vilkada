import React, { Component } from 'react';

export default class CandidateCard extends Component {
  renderPendukung(pendukung){
    if (pendukung === '-')
      return (<p>Caleg independen, tidak ada dukungan partai</p>);
    return (
      <ul>
        {pendukung.map((partai, id) => <li key={id}>{partai}</li>)}
      </ul>
    );
  }

  render() {

    const candidate = this.props.candidate;
    const paslon = candidate.paslon;
    const pendukung = candidate.dukungan !== null ? candidate.dukungan.split(', ') : '-';
    const noUrut = candidate.no_urut;
    
    return (
      <div className="small-12 medium-4 columns" data-equalizer-watch="card-parent">
      <div className="card" data-equalizer-watch="card">
        <div data-equalizer-watch="card">
          <img src="https://placeimg.com/640/480/people" alt=""/>
        </div>
        <div className="card-body" data-equalizer-watch="card">
          <h5>{paslon[0].nama}<br/>{paslon[1].nama}</h5>
          <div className="no-urut">{noUrut}</div>
          <hr/>
          <h6>Dukungan</h6>
          {this.renderPendukung(pendukung)}
        </div>
        <div className="card-footer" data-equalizer-watch="card">
            <h6>Perolehan Suara</h6>
            <hr/>
            <div className="row">
              <div className="percentage small-6 columns">
                <h1>56%</h1>
              </div>
              <div className="number small-6 columns">
                <h3>50.000<br/>
                  <small>Suara</small>
                </h3>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}