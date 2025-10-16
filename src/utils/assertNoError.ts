import { assert } from "jsr:@std/assert";

export function assertNoError<T>(
  result: T | { error: string },
  msg?: string,
) {
  if (
    typeof result === "object" &&
    result !== null &&
    "error" in result
  ) {
    const prefix = msg ? `${msg}: ` : "";
    assert(false, `${prefix}${(result as { error: string }).error}`);
  }
}

// export function assertAllNoError(
//   items: Array<{ value: any | { error: string }; label?: string }>,
// ) {
//   items.forEach(({ value, label }) => assertNoError(value, label));
// }

export function assertAllNoError(
  results: Array<{ value: unknown }>,
): asserts results is Array<{ value: unknown }> {
  for (const { value } of results) {
    assertNoError(value);
  }
}
