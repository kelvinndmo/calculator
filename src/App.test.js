import React from "react";
import { shallow } from "enzyme";
import App from "./App";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });
});

test("should render the component App", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should append a number when clicked", () => {
  expect(wrapper.state("currentValue")).toBe("2");
});

test("should append operator when operator is clicked", () => {
  wrapper
    .find("button")
    .at(2)
    .simulate("click", {
      target: { value: "/" }
    });
  expect(wrapper.state("operation")).toBe("/");
});

test("should call calculate when equal sign is presses", () => {
  //we called with wrapper with one in the beforeEach funtion let's call
  // another sign operator then ccall calculate to calculate the result by
  // simulating the equals button
  wrapper
    .find("button")
    .at(2)
    .simulate("click", {
      target: { value: "/" }
    });

  wrapper
    .find("button")
    .at(3)
    .simulate("click", {
      target: { value: "1" }
    });

  //lets now simulate the = button
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});

  expect(wrapper.state("currentValue")).toBe(2);
});

test("should multiply when a multiplication sign is clicked", () => {
  wrapper
    .find("button")
    .at(6)
    .simulate("click", {
      target: { value: "*" }
    });

  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });

  //lets now simulate the = button
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});
  //expect 2*2 to be 4
  expect(wrapper.state("currentValue")).toBe(4);
});

test("should add when a addition sign is clicked", () => {
  wrapper
    .find("button")
    .at(10)
    .simulate("click", {
      target: { value: "+" }
    });

  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });

  //lets now simulate the = button
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});
  //expect 2+2 to be 4
  expect(wrapper.state("currentValue")).toBe(4);
});

test("should substract when a substraction sign is clicked", () => {
  wrapper
    .find("button")
    .at(14)
    .simulate("click", {
      target: { value: "-" }
    });

  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });

  //lets now simulate the = button
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});
  //expect 2-2 to be 0
  expect(wrapper.state("currentValue")).toBe(0);
});

test("should test that the input field is cleared", () => {
  //simulate the clear button
  wrapper
    .find("button")
    .at(0)
    .simulate("click", {});
  expect(wrapper.state("currentValue")).toBe("");
  expect(wrapper.state("previousValue")).toBe("");
  expect(wrapper.state("operation")).toBe("");
});

test("should delete when delete button is clicked", () => {
  wrapper
    .find("button")
    .at(1)
    .simulate("click", {});
  expect(wrapper.state("currentValue")).toBe("");
  expect(wrapper.state("previousValue")).toBe("");
  expect(wrapper.state("operation")).toBe("");
});

test("should automatically calculate when more than one operation is passed", () => {
  wrapper
    .find("button")
    .at(14)
    .simulate("click", {
      target: { value: "-" }
    });

  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });
  wrapper
    .find("button")
    .at(14)
    .simulate("click", {
      target: { value: "-" }
    });
  wrapper
    .find("button")
    .at(14)
    .simulate("click", {
      target: { value: "-" }
    });
  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });
  expect(wrapper.state("currentValue")).toBe("2");
});

test("should previous text should be empty when an operator has not been input", () => {
  expect(wrapper.state("previousText")).toBe("");
});

test("should add decimals when a addition sign is clicked with dot character", () => {
  wrapper
    .find("button")
    .at(10)
    .simulate("click", {
      target: { value: "+" }
    });

  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });
  wrapper
    .find("button")
    .at(15)
    .simulate("click", {
      target: { value: "." }
    });
  wrapper
    .find("button")
    .at(4)
    .simulate("click", {
      target: { value: "2" }
    });

  //lets now simulate the = button
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});
  //expect 2+2 to be 4
  expect(wrapper.state("currentValue")).toBe(4.2);
});

test("should return when switch has no operation", () => {
  wrapper
    .find("button")
    .at(17)
    .simulate("click", {});
  expect(wrapper.state("operation")).toBe("");
});
