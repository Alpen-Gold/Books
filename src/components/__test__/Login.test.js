import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Login from "../Login.vue";

vi.mock("vue-router");

describe("Login", () => {
  test("the login has gotob", () => {
    const wrapper = mount(Login);

    const logo = wrapper.find("img[data-test-img-logo]");

    expect(logo.attributes("src")).toBe("/src/img/Logo1.png");
  });

  it("is the value entered in the input in the form and is the state value stored!", async () => {
    const wrapper = mount(Login);

    const input = wrapper.find("input");

    input.element.value = "hello world";
    input.trigger("input");
    expect(wrapper.vm.username).toBe("hello world");
  });

  it("when the form is clicked, check the user!", async () => {
    const wrapper = mount(Login);

    const form = wrapper.find("form[data-test-form]");
    const input = wrapper.find("input");

    input.element.value = "hshshshshshshshsh";
    input.trigger("input");

    await form.trigger("submit");

    expect(wrapper.vm.username.length >= 16).toBe(true);
    expect(wrapper.vm.usernameError).toBe("");
    expect(wrapper.vm.disabled).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
  });

  it("when the form is clicked, check the user 2", async () => {
    const wrapper = mount(Login);

    const form = wrapper.find("form[data-test-form]");
    const input = wrapper.find("input");

    input.element.value = "hshshsh";
    input.trigger("input");

    await form.trigger("submit");

    expect(wrapper.vm.username.length < 16).toBe(true);
    expect(wrapper.vm.usernameError).toBe(
      "Foydalanuvchi nomida xatolik mavjud!"
    );
  });
});
