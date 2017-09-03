import Radium from 'radium';
import React from 'react';
var $ = require('jquery');

class MainPage extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {person: [], input: ''};
  }

  getContributors(val) {
    return $.getJSON('https://api.github.com/repos/'+val+'/contributors?page=1&per_page=100')
      .then((data) => {
        console.log(data)
        this.setState({ person: data });
      });
  }

  render() {
    let persons = this.state.person.map((item) => {
      return `[<img alt="${item.login}" src="${item.avatar_url}&s=117 width=117">](${item.html_url}) |`;
    });

    let dots = this.state.person.map(() => {
      return ':---:|';
    });

    let urls = this.state.person.map((item) => {
      return `[${item.login}](${item.html_url})|`;
    });

    let contributors = persons.join("").concat("\n").concat(dots.join("")).concat("\n").concat(urls.join(""));

    return <div style={{marginTop:100}} id="layout-content" className="container">
      <div className="row">
        <label style={style.label}>Repository</label><input placeholder="username/repository" type="text" onChange={ this.handleChange } />
        <button onClick={this.handleClick}>Generate</button>
      </div>
      <div className="row form-group">
        <label style={style.label}>Contributors Markdown</label>
        <textarea readOnly="true" className="form-control" rows="10" value={ contributors }/>
      </div>
    </div>
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value})
  };

  handleClick = () => {
    this.getContributors(this.state.input.trim());
  };


}

////////
// Style
const style =
{
label:
{
  width:"180px",
clear:'left',
textAlign:'right',
paddingRight:'10px'
},
  base:
  {

  },

};

export default Radium(MainPage);
