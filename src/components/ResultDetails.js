import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  render() {
    return (
      
      <div className="result-details">
        <div className="row small-11 medium-8 large-7 columns">
          <h3>Details here</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, unde, quam. Possimus cumque voluptatum aut eos, odit dolor facilis fuga quod aliquam ab, corporis deleniti quae quibusdam suscipit consequuntur! Quis.</p>
          <p>Delectus numquam quisquam nam laboriosam fuga corrupti provident consectetur modi vel magni, sapiente cupiditate ex, nihil exercitationem excepturi nulla quae tenetur ducimus hic eius vero laborum sequi deserunt sint impedit.</p>
          <p>Iste, corporis accusamus laudantium nulla tempore voluptate, modi eum esse porro consequuntur commodi accusantium quod, voluptatibus explicabo ex velit fugiat perferendis maiores quasi magnam reprehenderit. Dolorum asperiores, iste provident eos.</p>
          <p>Nemo voluptatum rem nobis ipsa corporis officiis perspiciatis natus sequi quae placeat quidem officia tempore numquam odio voluptates nam recusandae, suscipit pariatur asperiores libero! Saepe tenetur, dolore molestias voluptates quam.</p>
          <p>Saepe, quasi consequatur laboriosam voluptate commodi quibusdam laborum tempore at enim aspernatur, cumque nihil ipsam. Sequi enim neque quibusdam. Delectus nobis perferendis, laborum voluptatem aperiam culpa unde quia quisquam illum!</p>
          <p>Dolorum magnam harum ullam consectetur eum. Delectus consequatur praesentium sequi, quae porro fugit fuga quo eligendi tempora accusantium iusto maiores vitae voluptatibus at libero aperiam numquam, hic, quis explicabo id.</p>
          <p>Ipsum quam nesciunt sapiente modi quia sit a quibusdam dolores, quisquam nobis nostrum alias vero, ducimus, voluptas sunt. Suscipit, sunt minus quis vel maiores facere ad enim veniam, eligendi sint.</p>
          <p>Qui molestiae cumque est esse non, alias delectus blanditiis quaerat nulla, temporibus sunt! Optio quam sint, mollitia, maiores dicta ipsam! Culpa fuga animi natus dolores repudiandae corrupti molestiae modi reiciendis.</p>
          <p>Voluptatem nam, facilis. Ex odit libero, eaque optio nemo quod, molestiae quia repellendus, necessitatibus vel dolorum veritatis asperiores. Fugiat esse laboriosam, ipsum dignissimos magni veniam architecto nemo, id sunt omnis.</p>
          <p>Accusamus voluptatem molestias nisi ducimus, ipsam, sint recusandae praesentium placeat corporis omnis distinctio dolor! Perspiciatis animi quidem libero quae sed quam, unde dolores numquam nostrum labore! Et incidunt rerum, sequi.</p>
        </div>
      </div>
    );
  }
}

function mapStatToProps({ selectedRegion, regionsRecapitulation}) {
  const {
    isFetching,
    recapitulation
  } = regionsRecapitulation[selectedRegion] || {
    isFetching: true,
    recapitulation: []
  };

  return {
    selectedRegion,
    recapitulation,
    isFetching
  };
}

export default connect(mapStatToProps)(Result);