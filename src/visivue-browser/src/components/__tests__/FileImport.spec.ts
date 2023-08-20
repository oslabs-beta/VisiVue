import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FileImport from "../FileImport.vue";
describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(FileImport);
    expect(wrapper.text()).toContain("Import File");
  });
});
