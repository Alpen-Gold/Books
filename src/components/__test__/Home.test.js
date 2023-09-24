import { describe, it, expect } from "vitest"; // mocha kutubxonasi
import { mount } from "@vue/test-utils";
import Home from "../Home.vue";

vi.mock("vue-router");

describe("Home", () => {
  test("is there an isLogind in the project", async () => {
    const wrapper = mount(Home, {
      props: {
        storeElements: {
          isNotValue: false,
          totalPage: 1,
          currentPage: 1,
          isError: false,
          isLoading: true,
        },
        books: [],
      },
    });

    expect(wrapper.props().storeElements.isLoading).toBe(true);
  });

  test("made a click in prevBtn ?", async () => {
    const wrapper = mount(Home, {
      props: {
        storeElements: {
          isNotValue: false,
          totalPage: 1,
          currentPage: 1,
          isError: false,
          isLoading: false,
        },
        books: [],
      },
    });

    let prevBtn = wrapper.find("button[data-test-prevPage]");

    console.log(prevBtn);

    expect(prevBtn.trigger("click")).toBeTruthy();
  });

  test("made a click in nextBtn ?", async () => {
    const wrapper = mount(Home, {
      props: {
        storeElements: {
          isNotValue: false,
          totalPage: 1,
          currentPage: 1,
          isError: false,
          isLoading: false,
        },
        books: [],
      },
    });

    let prevBtn = wrapper.find("button[data-test-nextPage]");

    console.log(prevBtn);

    expect(prevBtn.trigger("click")).toBeTruthy();
  });

  test("the prevPageView function on emmite has been triggered", async () => {
    const wrapper = mount(Home, {
      props: {
        storeElements: {
          isNotValue: false,
          totalPage: 1,
          currentPage: 1,
          isError: false,
          isLoading: false,
        },
        books: [],
      },
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.prevPage();
      expect(wrapper.emitted("prevPageView")).toBeTruthy();
      done();
    });
  });

  test("the nextPageView function on emmite has been triggered", async () => {
    const wrapper = mount(Home, {
      props: {
        storeElements: {
          isNotValue: false,
          totalPage: 1,
          currentPage: 1,
          isError: false,
          isLoading: false,
        },
        books: [],
      },
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.nextPage();
      expect(wrapper.emitted("nextPageView")).toBeTruthy();
      done();
    });
  });
});
