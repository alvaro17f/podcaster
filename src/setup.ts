import { server } from "./mocks/server";
import { beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom";
import "whatwg-fetch";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
