import { describe, it, expect } from "vitest"; // mocha kutubxonasi
import { mount } from "@vue/test-utils";
import BookDetail from "../BookDetail.vue";

vi.mock("vue-router");

describe("BookDetail", () => {
  test("made a click in btnDetail ?", async () => {
    const wrapper = mount(BookDetail, {
      props: {
        book: [],
        books: [],
        isLoading: false,
        isError: false,
        filteredBooks: [
          {
            id: 1,
            volumeInfo: {
              title: "Book name",
              imageLinks: {
                thumbnail:
                  "http://books.google.com/books/content?id=jmpYAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
              },
              authors: ["Jim Melton", "Stephen Buxton"],
            },
          },
        ],
      },
    });

    let btnDetail = wrapper.find("button[data-test-book-detail]");

    console.log(btnDetail);

    expect(btnDetail.trigger("click")).toBeTruthy();

    wrapper.vm.$nextTick(() => {
      wrapper.vm.booksRender();
      expect(wrapper.emitted("booksRenderView")).toBeTruthy();
      done();
    });
  });

  test("prosps isLoading is true", async () => {
    const wrapper = mount(BookDetail, {
      props: {
        book: [],
        books: [],
        isLoading: true,
        isError: false,
        filteredBooks: [],
      },
    });

    expect(wrapper.props().isLoading).toBe(true);
  });

  test("props books is null", async () => {
    const wrapper = mount(BookDetail, {
      props: {
        book: null,
        books: [],
        isLoading: false,
        isError: false,
        filteredBooks: [],
      },
    });

    expect(wrapper.props().book === null).toBe(true);
  });
});
