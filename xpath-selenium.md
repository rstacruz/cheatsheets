---
title: How to find elements with XPath in Selenium
link_title: XPath in Selenium
subtitle: Locate and wait for elements
category: JavaScript testing
layout: snippet
last_verified_with: "Selenium 4.53.0, Playwright 1.64.1."
updated: 2026-11-26
links:
  - title: Selenium locator strategies
    url: https://www.selenium.dev/documentation/webdriver/elements/locators/
  - title: Playwright locators
    url: https://playwright.dev/docs/locators
  - title: Selenium waits
    url: https://www.selenium.dev/documentation/webdriver/waits/
---

## Locating with XPath
<!-- {: .-snippets} -->

### Selenium Python
<!-- {: .-snippet} -->

```python
from selenium.webdriver.common.by import By

field = driver.find_element(
    By.XPATH, "//input[@name='q']"
)
```
<!-- {: data-highlight="By.XPATH"} -->

**Uses `By.XPATH` for any XPath expression.** `find_elements()` returns a list instead; see [locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/).

### Selenium Java
<!-- {: .-snippet} -->

```java
WebElement field = driver.findElement(
  By.xpath("//input[@name='q']")
);
```
<!-- {: data-highlight="By.xpath"} -->

**Java passes the expression as a string.** Use `findElements` to collect all matches; see [locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/).

### Playwright
<!-- {: .-snippet} -->

```python
page.locator(
    "xpath=//button[text()='Submit']"
).click()
```
<!-- {: data-highlight="xpath="} -->

**Prefixes the expression with `xpath=`.** Playwright treats unprefixed strings as CSS; see [locators](https://playwright.dev/docs/locators).

### Relative vs absolute
<!-- {: .-snippet} -->

#### Relative

```bash
//div[@id='cart']//button
```
<!-- {: data-highlight="//div[@id='cart']"} -->

#### Absolute

```bash
/html/body/div[2]/button
```
<!-- {: data-highlight="/html/body/div[2]"} -->

**Starts from a landmark instead of the document root.** Absolute paths break when markup changes; see the [XPath cheatsheet](./xpath).

### Class idiom
<!-- {: .-snippet} -->

```bash
//tr[contains(
  concat(' ', normalize-space(@class), ' '),
  ' total '
)]
```
<!-- {: data-highlight="normalize-space(@class)"} -->

**Matches `total` as one class token.** Plain `contains(@class, 'total')` also matches `total-row`; see the [XPath cheatsheet](./xpath).

### Waits
<!-- {: .-snippet} -->

```python
from selenium.webdriver.support.ui import (
    WebDriverWait,
)
from selenium.webdriver.support import (
    expected_conditions as EC,
)

field = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located(
        (By.XPATH, "//button[text()='Go']")
    )
)
```
<!-- {: data-highlight="WebDriverWait(driver, 10)"} -->

**Waits for the node before interacting.** `presence_of_element_located` checks that the element is attached; see [waits](https://www.selenium.dev/documentation/webdriver/waits/).
