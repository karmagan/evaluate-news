import { checkForURL } from "../src/client/js/urlChecker";

test("Testing checkForURL", () => {
    expect(checkForURL('')).toBe(false);
});
