import React, { Component } from "react";
import classes from "./Main.module.css";
import Button from "../../component/ui/button/Button";
class Main extends Component {
  state = {
    box: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    currentPlayer: 1,
    isGameOver: false
  };
  clickHandler = (i, j) => {
    if (this.state.isGameOver === true) {
      alert("Game is over: You can't change the result now");
      return false;
    }

    let box = this.state.box;
    if (box[i][j] === "") {
      let value = "X";
      if (this.state.currentPlayer === 2) {
        value = "O";
      }

      this.checkWinnerAfterSetState(i, j, value, this.checkWinner);
    } else {
      alert("you can't change value once entered");
    }
  };
  checkWinnerAfterSetState = (i, j, value, cb) => {
    const modifiedBox = [...this.state.box];

    modifiedBox[i][j] = value;
    this.setState({
      box: modifiedBox,
      currentPlayer: this.state.currentPlayer === 1 ? 2 : 1
    });
    console.log(this.state.box, "box value is::");
    cb(i, j, value);
  };
  checkWinner = (i, j, value) => {
    let modifiedBox = [...this.state.box];

    let count1 = 0;
    for (let row = 0; row < 3; row++) {
      //row contstant / check column value

      if (modifiedBox[i][row] === value) {
        count1++;
        if (count1 === 3) {
          this.setState({
            isGameOver: true
          });
          return;
        }
      }
    }
    let count2 = 0;
    for (let col = 0; col < 3; col++) {
      //row contstant / check column value

      if (modifiedBox[col][j] === value) {
        count2++;
        if (count2 === 3) {
          this.setState({
            isGameOver: true
          });
          return;
        }
      }
    }
    // check for diagnal values
    // primary diagnal
    let count3 = 0;
    let count4 = 0;
    for (let i = 0; i < 3; i++) {
      //row contstant / check column value
      if (modifiedBox[i][i] === value) {
        count3++;
        if (count3 === 3) {
          this.setState({
            isGameOver: true
          });
          return;
        }
      }
      let n = 2;
      if (modifiedBox[i][n - i] === value) {
        count4++;
        if (count4 === 3) {
          this.setState({
            isGameOver: true
            // box: [
            //   ["", "", ""],
            //   ["", "", ""],
            //   ["", "", ""]
            // ]
          });
          return;
        }
      }
    }
  };
  restartButtonClickHandler = () => {
    this.setState({
      box: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      currentPlayer: 1,
      isGameOver: false
    });
  };
  render() {
    let msg = null;

    if (this.state.isGameOver) {
      const currentPlayer = this.state.currentPlayer === 1 ? "Second" : "First";
      const colorname = currentPlayer === "First" ? "green" : "orange";
      msg = (
        <h1
          style={{ textAlign: "center", fontWeight: "bold", color: colorname }}
        >
          {currentPlayer} player won the match
        </h1>
      );
    }

    const FirstPlayer = {
      color: "green"
    };
    const SecondPlayer = {
      color: "orange"
    };
    return (
      <React.Fragment>
        {msg}
        <table>
          <tr>
            <td
              value={this.state.box[0][0]}
              onClick={() => this.clickHandler(0, 0)}
              style={this.state.box[0][0] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[0][0]}
            </td>
            <td
              className={[classes.vert, this.state.currentPlayerClass].join(
                " "
              )}
              value={this.state.box[0][1]}
              onClick={() => this.clickHandler(0, 1)}
              style={this.state.box[0][1] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[0][1]}
            </td>
            <td
              value={this.state.box[0][2]}
              onClick={() => this.clickHandler(0, 2)}
              style={this.state.box[0][2] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[0][2]}{" "}
            </td>
          </tr>
          <tr>
            <td
              className={classes.hori}
              value={this.state.box[1][0]}
              onClick={() => this.clickHandler(1, 0)}
              style={this.state.box[1][0] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[1][0]}
            </td>
            <td
              className={[classes.vert, classes.hori].join(" ")}
              value={this.state.box[1][1]}
              onClick={() => this.clickHandler(1, 1)}
              style={this.state.box[1][1] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[1][1]}
            </td>
            <td
              className={classes.hori}
              value={this.state.box[1][2]}
              onClick={() => this.clickHandler(1, 2)}
              style={this.state.box[1][2] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[1][2]}
            </td>
          </tr>
          <tr>
            <td
              value={this.state.box[2][0]}
              onClick={() => this.clickHandler(2, 0)}
              style={this.state.box[2][0] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[2][0]}
            </td>
            <td
              className={classes.vert}
              value={this.state.box[2][1]}
              onClick={() => this.clickHandler(2, 1)}
              style={this.state.box[2][1] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[2][1]}
            </td>
            <td
              value={this.state.box[2][2]}
              onClick={() => this.clickHandler(2, 2)}
              style={this.state.box[2][2] === "X" ? FirstPlayer : SecondPlayer}
            >
              {this.state.box[2][2]}
            </td>
          </tr>
        </table>
        {this.state.isGameOver ? (
          <Button
            clicked={this.restartButtonClickHandler}
            value="Restart Game"
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Main;
