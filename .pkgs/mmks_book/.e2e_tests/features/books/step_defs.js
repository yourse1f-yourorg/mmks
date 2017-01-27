/* eslint-disable no-undef   */

const cukeBtnSubmit = '//button[@data-cuke="save-item"]';

const cukeInpNumPages = '//input[@data-cuke="pages"]';
const cukeInpTitle = '//input[@data-cuke="title"]';
const cukeInpContent = '//textarea[@data-cuke="content"]';

const cukeNumPages = '//x-cuke[@id="pages"]';
const cukeTitle = '//x-cuke[@id="title"]';
const cukeContent = '//x-cuke[@id="content"]';

/*
const cukeHrefEdit = '//a[@data-cuke="edit-ite"]';
const cukeHrefDelete = '//a[@data-cuke="delete-item"]';
*/

const cukeInvalidNumPages = '//span[@class="help-block error-block"]';

let pages = '';
let title = '';
let content = '';
module.exports = function () {

//   Scenario: Create a new book
// ------------------------------------------------------------------------
  this.Given(/^I have opened the 'add books' page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 20000);
    browser.timeouts('page load', 20000);

    browser.url(_url);
    server.call('_books.wipe');
  });

  this.When(/^I create a "([^"]*)" page "([^"]*)" book with text "([^"]*)",$/,
    function (_pages, _title, _content) {

      pages = _pages;
      title = _title;
      content = _content;

      browser.waitForEnabled( cukeBtnSubmit );
      browser.setValue(cukeInpTitle, title);
      browser.setValue(cukeInpNumPages, pages);
      browser.setValue(cukeInpContent, content);

      browser.click(cukeBtnSubmit);

    });

  this.Then(/^I see a new record with the same title, number of pages and contents\.$/, function () {
    expect(browser.getText(cukeNumPages)).toEqual(pages + ' pages.');
    expect(browser.getText(cukeTitle)).toEqual(title);
    expect(browser.getText(cukeContent)).toEqual(content);
  });

// =======================================================================


//   Scenario: Verify field validation
// ------------------------------------------------------------------------
  this.Given(/^I have opened the books list page : "([^"]*)"$/, function (_url) {
    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeoutsImplicitWait(1000);
    browser.url(_url);
  });

/*
  let link = '';
  this.Given(/^I decide to edit the "([^"]*)" item,$/, function (_book) {
    link = '//a[@data-cuke="' + _book + '"]';
    browser.waitForExist( link );
    browser.click(link);
    browser.waitForEnabled( cukeHrefEdit );
    browser.click(cukeHrefEdit);
  });
*/
  this.When(/^I set 'Number of Pages' to "([^"]*)"$/, function (_pages) {
    browser.setValue(cukeInpNumPages, _pages);
  });

  this.Then(/^I see the number of pages validation hint "([^"]*)"\.$/, function (_message) {
    expect(browser.getText(cukeInvalidNumPages)).toEqual(_message);
  });

// =======================================================================


//   Scenario: Fail to delete book
// ------------------------------------------------------------------------

  let book = '';
  this.Given(/^I decide to view the "([^"]*)" book,$/, function (_book) {
    book = _book;
    const cukeHrefBook = `//a[@data-cuke="${book}"]`;

    browser.waitForEnabled( cukeHrefBook );
    browser.click( cukeHrefBook );

  });

/*
  let href = null;
  this.When(/^I decide to delete the item,$/, function () {
    href = cukeHrefDelete;

    browser.waitForExist( href );

  });

  this.Then(/^I see it is disabled\.$/, function () {
    expect(browser.isEnabled( href )).toBe(true);
  });
*/

// =======================================================================




//   Scenario: Unable to update book
// ------------------------------------------------------------------------

/*
  this.When(/^I attempt to edit the item,$/, function () {
    href = cukeHrefEdit;
    browser.waitForExist( href );
  });
*/

// =======================================================================




//   Scenario: Prohibited from add and from update
// ------------------------------------------------------------------------

  this.Given(/^I have opened the books editor page : "([^"]*)"$/, function (_url) {

    browser.setViewportSize({ width: 1024, height: 480 });
    browser.timeouts('implicit', 30000);
    browser.timeouts('page load', 30000);

    browser.url(_url);
  });

/*
  this.Then(/^I see the warning "([^"]*)"$/, function (_warning) {
    expect(_warning).toEqual(browser.getText(cukeWarning));
  });
*/
// =======================================================================


//   Scenario: Hide book
// ------------------------------------------------------------------------
/*
  this.Given(/^I have elected to "([^"]*)" the "([^"]*)" item\.$/, function (_cmd, _book) {
    link = '//a[@data-cuke="' + _book + '"]';
    browser.waitForEnabled( link );
    browser.click(link);
    let cukeHrefCmd = '//a[@data-cuke="' + _cmd + '-book"]';

    browser.waitForEnabled( cukeHrefCmd );
    browser.click( cukeHrefCmd );

  });
*/

/*
  this.Then(/^I no longer see that book record\.$/, function () {
    browser.waitForEnabled( cukeBooksList );
    let item = browser.elements(link);
    expect(item.value.length).toEqual(0);
  });
*/
};
