import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        civ: 'Mr.',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        framework: '',
        other: ''
      },
      step: 1,
      error: true
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    
    let v = {
      ...this.state.values,
      [event.target.name]: event.target.value
    }
    let error = ((this.state.step === 1 && (v.civ === '' || v.firstname === '' || v.lastname === '' || v.email === '')) || ((this.state.step === 2) && (v.framework === '')))

    this.setState({
      values: v,
      error: error
    })
  }

  gotoPrevStep(e) {
    e.preventDefault();
    if (this.state.step > 1) {
      this.setState({
        step: (this.state.step-1),
        error: false
      })
    }
  }

  gotoNextStep(e) {
    e.preventDefault();
    if (this.state.step < 3) {
      this.setState({
        step: (this.state.step+1),
        error: true
      })
    }
  }

  cancel(e) {
    e.preventDefault();
    //reload page to get back to step 1
    // TODO: GO back to step 1 without reload
    window.location.reload();
  }

  submit(e) {
    e.preventDefault();
    fetch('http://localhost:3003/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.values)
    })
  }

  render() {
    let wrapStyle = {
      transform: `translateY(-${(this.state.step-1) * 90}vh)`
    }

    return (
      <div className="App">

        <form className={`f-main f-current-step-${this.state.step}`}>
          <div className="f-gradient-background">
            <div className="f-gradient-1"></div>
            <div className="f-gradient-2"></div>
            <div className="f-gradient-3"></div>
          </div>
          <div className="f-container">
            <div className="f-wrapper" style={wrapStyle}>
              <section className="f-section f-step-1">
                <select name="civ" onChange={this.handleChange}>
                  <option>Mr.</option>
                  <option>M.</option>
                </select>

                <label htmlFor="firstname">First Name*</label>
                <input name="firstname" id="firstname" type="text" onChange={this.handleChange} />

                <label htmlFor="lastname">Last Name*</label>
                <input name="lastname" id="lastname" type="text" onChange={this.handleChange} />
                
                <label htmlFor="email">Email*</label>
                <input name="email" id="email" type="email" onChange={this.handleChange} />
                
                <label htmlFor="phone">Phone*</label>
                <input name="phone" id="phone" type="tel" onChange={this.handleChange} />
              </section>

              <section className="f-section f-step-2">
                <p>Favourite framework*</p>
                <div className="m-radio">
                  <span>
                    <label htmlFor="vue">Vue</label>
                    <input name="framework" id="vue" value="Vue" type="radio" onChange={this.handleChange} />
                  </span>
                  <span>
                    <label htmlFor="react">React</label>
                  <input name="framework" id="react" value="React" type="radio" onChange={this.handleChange} />
                  </span>
                  <span>
                    <label htmlFor="angular">Angular</label>
                    <input name="framework" id="angular" value="Angular"  type="radio" onChange={this.handleChange} />
                </span>
              </div>

                <span htmlFor="other">Other</span>
                <input name="other" id="other" type="textarea" onChange={this.handleChange} />
              </section>

              <section className="f-section f-step-3">

                <div className="m-recap">
                  <div><span>Civility : </span><span>{this.state.values.civ}</span></div>
                  <div><span>First Name : </span><span>{this.state.values.firstname}</span></div>
                  <div><span>Last Name : </span><span>{this.state.values.lastname}</span></div>
                  <div><span>Email : </span><span>{this.state.values.email}</span></div>
                  {this.state.values.phone !== '' && (
                    <div><span>Phone : </span><span>{this.state.values.phone}</span></div>
                  )}
                  <div><span>Favourite Framework : </span><span>{this.state.values.framework}</span></div>
                  {this.state.values.other !== '' && (
                    <div><span>Other : </span><span>{this.state.values.other}</span></div>
                  )}
                </div>
                <div className="f-action-container">
                  <button className="m-button m-button-cancel"
                          onClick={this.cancel.bind(this)}
                  >Cancel</button>
                  <button className="m-button m-button-submit"
                          onClick={this.submit.bind(this)}
                  >Save</button>
                </div>
              </section>
            </div>
          </div>
          <div className="f-action-bar f-action-container">
            <button className="m-button m-button-prev" 
                    disabled={this.state.step <= 1}
                    onClick={this.gotoPrevStep.bind(this)}
            >Prev</button>
            <button className="m-button m-button-next"
                    disabled={this.state.step >= 3 || this.state.error}
                    onClick={this.gotoNextStep.bind(this)}
            >Next</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
