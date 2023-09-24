import { describe, it, expect } from "vitest"; // mocha kutubxonasi
import { mount } from "@vue/test-utils";
import Footer from "../Footer.vue";

vi.mock("vue-router");

describe("Footer", () => {
  test("check if there are footer elements", async () => {
    const wrapper = mount(Footer);

    let footer = wrapper.find("#footer-class");
    console.log(footer);
    expect(footer.exists()).toBe(true);
  });
});
