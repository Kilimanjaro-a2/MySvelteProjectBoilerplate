import { multiply } from "~/logics/Utility"

test("2と3を掛けたら6", () => {
    expect(multiply(2, 3)).toEqual(6)
})
