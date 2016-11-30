import React, { Component } from 'react';
import '../css/App.css';

import fchanApi from './4chan_api';
import storage from './Storage';
import Immutable from 'immutable';
import keyboard from 'keyboardjs';
import classNames from 'classnames';
import perf from 'react-addons-perf';

import Catalog from './Catalog';

var threadActionsCache = {};

const REVISION = process.env.GIT_REVISION;

class App extends Component {

  constructor() {
    super();
    let threadStates = this.loadThreadStates();
    this.state = {
      threads: [],
      catalogState: 'empty',
      threadStates: Immutable.fromJS(threadStates),
      saveEnabled: true
    }
    this.sorters = ["tim", "images", "no"].map((field) => {
      return {sorter: this.sorter(field).bind(this), name: field}
    });
  }

  loadThreadStates() {
    return storage.get("threadStates") || {};
  }

  saveThreadStates(threadStates) {
    if(this.state.saveEnabled) {
      storage.set("threadStates", threadStates.toJS());
    }
  }

  getCatalog(board) {
    this.setState({catalogState: 'loading', board: board});
    return fchanApi.getCatalog(board)
      .done(() => this.setState({catalogState: 'loaded'}))
      .fail(() => this.setState({catalogState: 'error'}))
      .done((threads) => this.sort(threads, "images"));
  }

  componentDidMount() {
    this.getCatalog("b");

    // move keyboard to catalog. that way the App can decide what threads to input into the catalog, and the
    // whole "first" logic will always be consistent with what the user sees. This would also mean that
    // all threadPreviews would always be rendered, as the app has already decided what will be displayed.
    keyboard.bind('a', (event) => {
      return !event.ctrlKey && !event.shiftKey && !event.metaKey && this.hideFirstThread();
    });
    keyboard.bind('d', (event) => {
      return !event.ctrlKey && !event.shiftKey && !event.metaKey && this.saveFirstThread();
    });
  }

  stateLessThreads() {
    return this.state.threads.filter((thread) =>
      !this.state.threadStates.getIn(this.stateKeyPath(thread), null)
    );
  }

  statefulThreads() {
    return this.state.threads.filter((thread) =>
      this.state.threadStates.getIn(this.stateKeyPath(thread), null)
    );
  }

  sorter(field) {
    return function() {
      this.sort(this.state.threads, field);
    }
  }

  sort(threads, field) {
    var sorted = threads.sort((x, y) => {
        return x[field] > y[field] ? 1 : y[field] > x[field] ? -1 : 0;
      }).reverse();
    this.setState({threads: sorted});
  }

  // {b: {2321313: {state: "<STATE>"}}}
  hideThread(board, threadNo) {
    perf.start();
    this.setThreadState(board, threadNo, "hidden");
    setTimeout(() => {
      perf.stop();
      var m = perf.getLastMeasurements();
      perf.printWasted(m);
    }, 1000)
  }

  hideFirstThread() {
    var thread = this.stateLessThreads()[0];
    return thread && this.hideThread(this.state.board, thread);
  }

  // {b: {2321313: {state: "<STATE>"}}}
  saveThread(board, threadNo) {
    this.setThreadState(board, threadNo, "saved");
  }

  unsetThread(board, threadNo) {
    this.setThreadState(board, threadNo, undefined);
  }

  saveFirstThread() {
    var thread = this.stateLessThreads()[0];
    return thread && this.saveThread(this.state.board, thread);
  }

  unsetLastThread() {
    var statefulThreads = this.statefulThreads();
    var thread = statefulThreads[statefulThreads.length - 1];
    return thread && this.unsetThread(this.state.board, thread);
  }

setThreadState(board, threadNo, state) {
    var newThreadStates = this.state.threadStates.setIn(this.stateKeyPath(threadNo), state);
    this.setState({threadStates: newThreadStates});
    this.saveThreadStates(newThreadStates);
  }

  stateKeyPath(thread) {
    return [this.state.board, (thread.no || thread).toString(), "state"];
  }

  threadActions() {
    if(!threadActionsCache[this.state.board]) {
      threadActionsCache[this.state.board] = {
        hideThread: this.hideThread.bind(this, this.state.board),
        saveThread: this.saveThread.bind(this, this.state.board),
        setDebugThread: this.setDebugThread.bind(this)
      };
    }
    return threadActionsCache[this.state.board];
  }

  boardSavedThreads() {
    return this.state.threads.filter((thread) =>
      this.state.threadStates.getIn(this.stateKeyPath(thread), null) === "saved"
    );
  }

  hiddenThreads() {
    return this.state.threads.filter((thread) =>
      this.state.threadStates.getIn(this.stateKeyPath(thread), null) === "hidden"
    );
  }

  boardThreadStates() {
    return this.state.threadStates.get(this.state.board) || Immutable.fromJS({});
  }

  setDebugThread(thread) {
    this.setState({debugThread: thread});
  }

  setSaveEnabled(event) {
    this.setState({saveEnabled: event.target.checked});
  }

  setShowAll(event) {
    this.setState({showAll: event.target.checked}); 
  }

  render() {
    return (
      <div className="App">
        <div>{REVISION}</div>
        saved: {this.boardSavedThreads().length}, hidden: {this.hiddenThreads().length}, board: {this.state.board}
        <label> Save: <input type="checkbox" onChange={this.setSaveEnabled.bind(this)} checked={this.state.saveEnabled} /></label>
        <label> Show All: <input type="checkbox" onChange={this.setShowAll.bind(this)} checked={this.state.showAll} /></label>
        <div >
          {fchanApi.boards.map((board) => {
            return <a href='#' key={board} onClick={this.getCatalog.bind(this, board)}> {board} </a> 
          })}
        </div>
        <textarea value={this.boardSavedThreads().map((t) => t.url).join("\n")} cols="100" />

        <Catalog
          threads={this.state.threads}
          loadState={this.state.catalogState}
          sorters={this.sorters}
          threadStates={this.boardThreadStates()}
          threadActions={this.threadActions()}
          showAll={this.state.showAll} />
        
        <pre className={classNames("DebugThread", {'DebugThread--shown': this.state.debugThread})}>
          {JSON.stringify(this.state.debugThread, null, "\t")}
        </pre>
      </div>
    );
  }
}

export default App;



