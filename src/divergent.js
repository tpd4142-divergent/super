import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import './divergent.css';

const DatePicker = require("react-bootstrap-date-picker");
let buttonToShow = <div className="FoodButton"></div>

export default class Divergent extends Component {

  constructor(props) {
    super(props);
    // Binds the different functions so they are able to use this
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.setFoodStatus = this.setFoodStatus.bind(this);
    this.donateFood = this.donateFood.bind(this);
    this.throwFood = this.throwFood.bind(this);

    this.state = {
      inputProduct: "", // Saves the text written in description input field.
      amountProduct: 0,
      dateValue: "",
      selectValue: "",
      donateFoodList: [
        {
          id: "Sugar-21-23-11-2016",
          prodName: "Sugar",
          prodAmount: 21,
          prodDateType: "Best before",
          prodDate: "23-11-2016"
        },
        {
          id: "Minces Meat-52-01-12-2016",
          prodName: "Minced Meat",
          prodAmount: 52,
          prodDateType: "Last day of use",
          prodDate: "01-12-2016"
        }
      ],
      throwFoodList: [
        {
          id: "Butter-40-12-11-2016",
          prodName: "Butter",
          prodAmount: 40,
          prodDateType: "Last day of use",
          prodDate: "12-11-2016"
        },
        {
          id: "Eggs-35-02-09-2016",
          prodName: "Eggs",
          prodAmount: 35,
          prodDateType: "Best before",
          prodDate: "02-09-2016"
        }
      ],
      foodObj: {}
    };
  }

  getInitialStat(){
    const dateValue = new Date().toISOString();
    return {
      dateValue: dateValue
    }
  }

  handleChange(dateValue) {
    // value is an ISO String.
    this.setState({
      dateValue: dateValue
    });
  }

  handleProductChange(event) {
    this.setState({
      inputProduct: event.target.value
    })
  }

  handleAmountChange(event) {
    this.setState({
      amountProduct: event.target.value
    })
  }

  handleSelectChange(event) {
    this.setState({
      selectValue: event.target.value
    })
  }

  setFoodStatus() {
    const today = new Date();
    const tDay = today.getDate();
    const tMonth = today.getUTCMonth() + 1;
    const tYear = today.getFullYear();
    const iDay = this.state.dateValue.slice(8, 10)
    const iMonth = this.state.dateValue.slice(5,7)
    const iYear = this.state.dateValue.slice(0,4)

    const date = iDay + "-" + iMonth + "-" + iYear
    const id = this.state.inputProduct + "-" + this.state.amountProduct + "-" + date

    const tempObj = {
      id: id,
      prodName: this.state.inputProduct,
      prodAmount: this.state.amountProduct,
      prodDateType: this.state.selectValue,
      prodDate: date
    }
    this.setState({
      foodObj: tempObj
    })



    if (iYear >= tYear && iMonth >= tMonth && iDay >= tDay && this.state.selectValue === "Last day of use") {
      console.log("“Last day of use” date is not passed")
      buttonToShow = <div className="FoodButton">
                      <Button bsStyle="success" type="submit" bsSize="large" onClick={this.donateFood} className="ButtonToShow">Donate</Button>
                      <Button bsStyle="warning" type="submit" bsSize="large" onClick={this.throwFood} className="ButtonToShow">Throw away</Button>
                    </div>;
      this.forceUpdate();

    } else if (iYear <= tYear && iMonth <= tMonth && iDay < tDay && this.state.selectValue === "Last day of use") {
      console.log("“Last day of use” date is passed")
      buttonToShow = <div className="FoodButton">
                      <Button bsStyle="success" type="submit" bsSize="large" onClick={this.throwFood} className="ButtonToShow">Throw away</Button>
                    </div>;
      this.forceUpdate();

    } else if (iYear >= tYear && iMonth >= tMonth && iDay >= tDay && this.state.selectValue === "Best before") {
      console.log("“Best before” date is not passed")
      buttonToShow = <div className="FoodButton">
                      <Button bsStyle="success" type="submit" bsSize="large" onClick={this.donateFood} className="ButtonToShow">Donate</Button>
                      <Button bsStyle="warning" type="submit" bsSize="large" onClick={this.throwFood} className="ButtonToShow">Throw away</Button>
                    </div>;
      this.forceUpdate();

    } else if (iYear <= tYear && iMonth <= tMonth && iDay < tDay && this.state.selectValue === "Best before") {
      console.log("“Best before” date is passed")
      buttonToShow = <div className="FoodButton">
                      <Button bsStyle="success" type="submit" bsSize="large" onClick={this.throwFood} className="ButtonToShow">Throw away</Button>
                      <Button bsStyle="warning" type="submit" bsSize="large" onClick={this.donateFood} className="ButtonToShow">Donate</Button>
                    </div>;
      this.forceUpdate();

    } else {
      console.log("Nothing")
      this.forceUpdate();
    }
    return buttonToShow
  }

  donateFood() {
    console.log("Donate click");
    this.state.donateFoodList.push(this.state.foodObj)
    this.forceUpdate();

  }

  throwFood() {
    console.log("Throw click");
    this.state.throwFoodList.push(this.state.foodObj)
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h1>Donator Super 6.0</h1>
        <FormGroup id="description" type="text" label="Text" >
          <ControlLabel>Enter product</ControlLabel>
          <FormControl type="text" value={this.state.inputProduct} onChange={this.handleProductChange} placeholder="Enter product" className="Input" />
          <ControlLabel>Enter amount of the product</ControlLabel>
          <FormControl type="number" value={this.state.amountProduct} onChange={this.handleAmountChange} placeholder="Enter amount of the product" className="Input" />
          <ControlLabel>Select type of experiation date</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleSelectChange} className="Input">
            <option value="Select">--</option>
            <option value="Best before">“Best before”</option>
            <option value="Last day of use">“Last day of use”</option>
          </FormControl>
          <ControlLabel>Select experiation date</ControlLabel>
          <DatePicker value={this.state.dateValue} onChange={this.handleChange} className="Input" />
        </FormGroup>
        <Button bsStyle="primary" type="submit" onClick={this.setFoodStatus} className="CheckButton">Check food</Button>

        {buttonToShow}

        <h3 className="TableHeader">Donate</h3>
        <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Type of date</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {this.state.donateFoodList.map((food, i) =>
          <tr key={food.id}>
            <td>{food.prodName}</td>
            <td>{food.prodAmount}</td>
            <td>{food.prodDateType}</td>
            <td>{food.prodDate}</td>
          </tr>
        )}
        </tbody>
        </Table>

        <h3 className="TableHeader">Throw away</h3>
        <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Type of date</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {this.state.throwFoodList.map((food, i) =>
          <tr key={food.id}>
            <td>{food.prodName}</td>
            <td>{food.prodAmount}</td>
            <td>{food.prodDateType}</td>
            <td>{food.prodDate}</td>
          </tr>
        )}
        </tbody>
        </Table>
      </div>
    )
  }
}
