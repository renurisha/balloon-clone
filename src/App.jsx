import EmptyDiv from "./component/Emptydiv";
import Circle from "./component/Circle";
import { InputBox, Button } from "./component/InputAndButton";
import { AppContainer, Leftdiv, Rightdiv } from "./component/Containers";

import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  TOTAL_CIRCLES,
  TOTAL_SELECTED_CIRCLES,
  RESTORE_CIRCLES,
} from "./component/redux/action";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  var totalNumberOfGivenCircles = 5;

  const [id, setId] = useState("");

  const allcircles = useSelector((state) => state.totalCircles);
  const selectedcircles = useSelector((state) => state.selectedCircles);

  var i = 0;
  useEffect(() => {
    while (i < totalNumberOfGivenCircles) {
      var findcolor = randomColorGenerate();
      //console.log("find", findcolor);
      var obj = {
        id: i + 1,
        addcolor: `${findcolor}`,
      };

      dispatch({ type: TOTAL_CIRCLES, payload: obj });
      i++;
    }
  }, []);

  const randomColorGenerate = () => {
    var first = Math.floor(Math.random() * 256);
    var second = Math.floor(Math.random() * 256);
    var third = Math.floor(Math.random() * 256);
    if (first === second || second === third || third === first) {
      randomColorGenerate();
    } else {
      return `rgb(${first},${second},${third})`;
    }
  };

  const handleShoot = () => {
    console.log("id", id);

    dispatch({ type: TOTAL_SELECTED_CIRCLES, payload: id });
    setId("");
  };
  const reStoreCircle = (e) => {
    //console.log("restore", e.id);
    dispatch({ type: RESTORE_CIRCLES, payload: e });
  };

  return (
    <AppContainer>
      <Leftdiv>
        <InputBox
          type="Number"
          onChange={(e) => setId(e.target.value)}
          placeholder="enter circles number"
          id="circleNumber"
          value={id}
        />
        <Button
          onClick={() => {
            handleShoot();
          }}
        >
          SHOOT
        </Button>

        <EmptyDiv>
          {selectedcircles.length == 0 ? (
            <h3>
              <u>Empty Div</u>
            </h3>
          ) : (
            `selected circled ${selectedcircles.length}`
          )}
          <div style={{ display: "flex" }}>
            {selectedcircles.map((e) => {
              return (
                <Circle
                  key={e.id}
                  style={{ backgroundColor: `${e.addcolor}` }}
                  onClick={() => {
                    reStoreCircle(e);
                  }}
                />
              );
            })}
          </div>
        </EmptyDiv>
      </Leftdiv>

      <Rightdiv>
        {allcircles.length == 0 ? (
          <h3>No circles in your bag</h3>
        ) : (
          <h3>Total unselected circles {`${allcircles.length}`}</h3>
        )}
        {allcircles.map((e) => {
          return (
            <Circle key={e.id} style={{ backgroundColor: `${e.addcolor}` }} />
          );
        })}
      </Rightdiv>
    </AppContainer>
  );
}

export default App;
