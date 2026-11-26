---
title: How to find elements with XPath in Selenium
link_title: XPath in Selenium
subtitle: Locate and wait for elements
category: JavaScript testing
layout: snippet
last_verified_with: "Selenium 4.54.0, Playwright 1.65.1."
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

**Java uses `By.xpath` with the expression as a string.** `findElements` collects all matches; see [locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/).

### Playwright
<!-- {: .-snippet} -->

```python
page.locator(
    "xpath=//button[text()='Submit']"
).click()
```
<!-- {: data-highlight="xpath="} -->

**Prefixes the expression with `xpath=`.** The prefix is optional: Playwright auto-detects strings starting with `//` or `..` as XPath; see [locators](https://playwright.dev/docs/locators).

### Relative vs absolute
<!-- {: .-snippet} -->

#### Relative

```python
driver.find_element(
    By.XPATH, "//div[@id='cart']//button"
)
```
<!-- {: data-highlight="//div[@id='cart']"} -->

#### Absolute

```python
driver.find_element(
    By.XPATH, "/html/body/div[2]/button"
)
```
<!-- {: data-highlight="/html/body/div[2]"} -->

**Uses a landmark instead of the document root.** Absolute paths break when markup changes; see [abbreviated syntax](https://www.w3.org/TR/1999/REC-xpath-19991116/#path-abbrev) and the [XPath cheatsheet](./xpath).

### Class idiom
<!-- {: .-snippet} -->

```python
button = driver.find_element(
    By.XPATH,
    "//button[contains(@class, 'primary')]"
)
```
<!-- {: data-highlight="contains(@class, 'primary')"} -->

**Matches a class substring.** `primary-outline` also matches; for exact tokens, use the padded `normalize-space` form in the [XPath cheatsheet](./xpath); see [contains()](https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Reference/Functions#contains).

### Waits
<!-- {: .-snippet} -->

```python
from selenium.webdriver.common.by import By
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
