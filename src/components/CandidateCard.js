import _ from 'lodash';
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

  formatNumber(string) {
    return numeral(string).format('0,0');
  }

  render() {

    const id = this.props.id;

    const candidate = this.props.candidate,
          paslon = candidate.paslon,
          pendukung = candidate.dukungan !== null ? candidate.dukungan.split(', ') : '-',
          noUrut = candidate.no_urut;
    
    const data = this.props.data,
          suara = data.totalScoresEachCandidate[id],
          suaraPerDaerah = data.candidatesScore[id],
          persentase = numeral(suara/data.totalScores).format('0.00%');

    const rataanSuara = _.mean(suaraPerDaerah),
          suaraTertinggi = _.max(suaraPerDaerah),
          suaraTerendah = _.min(suaraPerDaerah),
          daerahSuaraTertinggi = data.subregions[suaraPerDaerah.indexOf(suaraTertinggi)],
          daerahSuaraTerendah = data.subregions[suaraPerDaerah.indexOf(suaraTerendah)];

    
    return (
      <div className="card" data-equalizer-watch="card">
        <div data-equalizer-watch="card">
          <img src="images/user_placeholder.png" alt=""/>
        </div>
        <div className="card-body" data-equalizer-watch="card">
          {id === data.winner && <span className="warning label">Pemenang</span>}
          <h4 className="paslon">{paslon[0].nama}<br/>{paslon[1].nama}</h4>
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
            <dl>
              <dt>Rataan suara</dt><dd>{this.formatNumber(rataanSuara)}</dd>
              <dt>Suara tertinggi</dt><dd>{this.formatNumber(suaraTertinggi)} dari <span className="capitalize">{daerahSuaraTertinggi.toLowerCase()}</span></dd>
              <dt>Suara terendah</dt><dd>{this.formatNumber(suaraTerendah)} dari <span className="capitalize">{daerahSuaraTerendah.toLowerCase()}</span></dd>
            </dl>
        </div>
      </div>
      
    );
  }
}