import React, {Component} from 'react';
import Menu from './views/Menu';

class App extends Component{
  render() {
    return(
      <div>
        <div style={{float: "left", marginTop: "100px"}}>
          <Menu />
        </div>
        <div style={{textAlign: "center", margin: "5% 12% 0% 150px", border: "lightgray 1px solid", minHeight: "400px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
