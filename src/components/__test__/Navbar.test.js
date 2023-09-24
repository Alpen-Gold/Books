import { describe, it, expect } from "vitest"; // mocha kutubxonasi
import { mount } from "@vue/test-utils";
import Navbar from "../Navbar.vue";

vi.mock("vue-router");

describe("Navbar", () => {
  test("should render the logo with the correct src attribute", async () => {
    const wrapper = mount(Navbar, {
      props: {
        notFoundView: true,
        typeViewBook: false,
        is_Login: true,
      },
    });

    let btnLogOut = wrapper.find("button[data-test-log-out]");

    expect(btnLogOut.trigger("click")).toBeTruthy();
  });

  it("emits searchQuery when inputHandle is called", async () => {
    const wrapper = mount(Navbar);
    await wrapper.vm.inputHandle("search term");
    expect(wrapper.emitted().searchQuery).toBeTruthy();
  });

  it("emits fetchBooksAndCurrent when search is called", async () => {
    const wrapper = mount(Navbar);

    const e = {
      preventDefault: () => {},
    };

    await wrapper.vm.search(e);

    expect(wrapper.emitted().fetchBooksAndCurrent).toBeTruthy();
  });
});
