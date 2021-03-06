import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as historyActions from '../../actions/historyActions';
//import Example from './TableView.js';
import Accordion from './Accordion.js';
import RichEditor from './RichText.js';
import * as env from '../../environment';
import * as init from '../../../tools/init';
import  $ from 'jquery';
import _ from 'underscore';

class ODCHistory extends Component{
  constructor(props, context) {
    super(props, context);
    this.onTitleChange=this.onTitleChange.bind(this);
    this.onYearChange=this.onYearChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.state = {
      history: {
        contenthtml: '',
        contentyear: ''
      },
      invalidData: true
    };
  }

  componentDidMount() {
    const propObject = this.props;
    $.get(env[init.env()].history, function(data){
      propObject.getHistory(data);
    });
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.history.contenthtml && nextState.history.contentyear);
  }


  onTitleChange(data){
    const history = this.state.history;
    history.contenthtml = data;
    this.setState({history: history});
  }

  onYearChange(event){
    const history = this.state.history;
    history.contentyear = event.target.value;
    this.setState({history: history});
  }

  onClickSave(){

    const clearContentyear = this.refs.clearContentyear;
    const clearContenthtml = this.refs.clearContenthtml;
    const propObject = this.props;
    $.ajax({
      type: "POST",
      url: env[init.env()].history,
      data: this.state.history,
      success: function(data){
        console.log(data);
        propObject.createHistory(data);
        clearContentyear.value = "";
        clearContenthtml.value = "";
      },
      error: function(data){
        alert('error');
      }
    });
  }

  historyRow(history, index){
    return (
      <div key={index}>
      <Accordion summary={history.contenthtml} year={history.contentyear} />
      </div>
);

  }

  getHtmlContent(data){
    console.log(data);
  }

  render(){
    return (
      <div>
      <h2>ODC History</h2>
      <div className="table-responsive">
      <table className="table" id="odchistory">
        <thead>
          <tr>
            <th>year</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input className="form-control" ref="clearContentyear" id="clearContentyear" onChange={this.onYearChange} value={this.state.history.contentyear}/></td>
            <td><RichEditor ref="clearContenthtml" id="clearContenthtml" onTitleChange={this.onTitleChange}/></td>
            <td><button className="btn btn-primary" onClick={this.onClickSave} value="save" disabled={this.state.invalidData}>Add History</button></td>
          </tr>
        </tbody>
      </table>
      </div>
      {this.props.histories.map(this.historyRow)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
    histories: state.histories
  };

}
export default connect(mapStateToProps, historyActions)(ODCHistory);
