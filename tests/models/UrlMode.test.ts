import UrlModel from "../../src/models/UrlModel"

it("should create a new instance of UrlModel", () => {
  const urlModel = new UrlModel(
    '123',
    'https://maps.google.com',
    true,
    123,
    123
  )
  expect(urlModel.getId()).toBe('123')
  expect(urlModel.getDestinationUrl()).toBe('https://maps.google.com')
  expect(urlModel.getEnabled()).toBe(true)
  expect(urlModel.getCreatedAt()).toBe(123)
  expect(urlModel.getUpdatedAt()).toBe(123)
})