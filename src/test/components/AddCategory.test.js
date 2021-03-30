import React from "react";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("Pruebas en AddCategory", () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    const value = "Hola Mundo";
    input.simulate("change", { target: { value } });
  });

  test("No debe postear la informacion con submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(setCategories).not.toHaveBeenCalled();
  });

  test("Debe llamar setCategories y limpiar la caja de text", () => {
    // Simulacion del input
    const input = wrapper.find("input");
    const value = "Hola Mundo";
    input.simulate("change", { target: { value } });

    // Simulacion del submit
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    // setCategories se debe llamar por lo menos 1 vez
    expect(setCategories).toHaveBeenCalled();

    // setCategories se debe llamar con alguna funcion
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));

    //El valor del input debe estar vacio ""
    expect(input.prop("value")).toBe("");
  });
});
