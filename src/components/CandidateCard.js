import React, { Component } from 'react';
import numeral from '../utils/index';

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

    const id = this.props.id;

    const candidate = this.props.candidate,
          paslon = candidate.paslon,
          pendukung = candidate.dukungan !== null ? candidate.dukungan.split(', ') : '-',
          noUrut = candidate.no_urut;
    
    const data = this.props.data,
          suara = data.totalScoresEachCandidate[id],
          persentase = numeral(suara/data.totalScores).format('0.00%');
    
    return (
      <div className="small-12 medium-4 columns" data-equalizer-watch="card-parent">
      <div className="card" data-equalizer-watch="card">
        <div data-equalizer-watch="card">
          <img src="https://placeimg.com/640/480/people" alt=""/>
        </div>
        <div className="card-body" data-equalizer-watch="card">
          {id === data.winner && <span className="warning label">Pemenang</span>}
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
                <h3>{persentase}</h3>
              </div>
              <div className="number small-6 columns">
                <h4>{numeral(suara).format('0,0')}<br/>
                  <small>Suara</small>
                </h4>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}