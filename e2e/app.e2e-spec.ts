import { CommonUIPage } from './app.po';

describe('base App', () => {
  let page: CommonUIPage;

  beforeEach(() => {
    page = new CommonUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
