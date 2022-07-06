/*
import { add } from '../src/index';
 
describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add('')).toBe(0);
  });
});
*/

import { decodedPayload } from "../utils/jwtDecoder";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzM2ZmVjZjFiMmUxM2M1NDc5Nzc0YSIsImVtYWlsIjoiYWRtaW5AbG9jYWxob3N0LmNvbSIsImFjY291bnRUeXBlIjoiYWRtaW4iLCJpYXQiOjE2NTcwMzcyNjIsImV4cCI6MTY1NzY0MjA2Mn0.JNtnD8TdYyAifRG85wV_gK2tE33gkEPkchwbgThWmvk";

describe("decode jwt token", () => {
  test("should return payload", () => {
    decodedPayload(token);
  });
});
