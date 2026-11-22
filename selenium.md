---
title: Selenium
seo_title: Selenium cheatsheet — Python WebDriver, waits, locators
subtitle: Browser automation library
description: "Selenium WebDriver in Python: locators, waits, actions, options, screenshots and WebDriver BiDi. One-page reference."
category: JavaScript testing
tier: t2
fragments:
  - "webdriver.Chrome"
  - "driver.get("
  - "By.CSS_SELECTOR"
  - "By.XPATH"
  - "find_element("
  - "send_keys("
  - "WebDriverWait("
  - "EC.title_is("
  - "ActionChains("
  - "Keys.ENTER"
  - "switch_to.frame("
  - "save_screenshot("
  - "add_cookie("
  - "enable_bidi"
  - "driver.quit()"
keywords: [WebDriver, browser automation, Python, UI testing, Selenium Manager]
updated: 2026-11-23
last_verified_with: "Selenium 4.53.0 (Python bindings)."
intro: |
  [Selenium](https://www.selenium.dev/) drives real browsers through WebDriver and WebDriver BiDi. This reference uses the Python bindings for locating elements, waiting, interacting, and capturing failures.
links:
  - title: Selenium documentation
    url: https://www.selenium.dev/documentation/webdriver/
  - title: Python API reference
    url: https://www.selenium.dev/selenium/docs/api/py/
  - title: Release notes
    url: https://www.selenium.dev/documentation/release_notes/
---

## First session

### Install and launch

```bash
pip install selenium
```

Selenium Manager supplies the matching driver since 4.6; no separate download.

See: [Getting started](https://www.selenium.dev/documentation/webdriver/getting_started/)

### First script
<!-- {: .-prime} -->

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://www.selenium.dev/selenium/web/web-form.html")
field = driver.find_element(By.NAME, "my-text")
field.send_keys("Selenium")
driver.find_element(By.CSS_SELECTOR, "button").click()
print(driver.find_element(By.ID, "message").text)
driver.quit()
```

Launch, navigate, find, act, read, and close the session in one flow.

See: [Getting started](https://www.selenium.dev/documentation/webdriver/getting_started/)

### Driver choice

```python
from selenium import webdriver

driver = webdriver.Firefox()
```
<!-- {: data-highlight="Firefox()"} -->

Swap `Firefox()` for `Chrome()`, `Edge()`, or `Safari()`; Selenium Manager resolves the driver.

See: [Selenium Manager](https://www.selenium.dev/documentation/selenium_manager/)

## Finding elements
<!-- {: .-three-column} -->

### Locator strategies

- `By.ID`
- `By.CSS_SELECTOR`
- `By.XPATH`
- `By.NAME`
- `By.TAG_NAME`
- `By.CLASS_NAME`
- `By.LINK_TEXT`
- `By.PARTIAL_LINK_TEXT`
<!-- {: .-enum-wide} -->

Pass one strategy and its query to `find_element()`.

See: [Locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/)

### First and all matches

```python
first = driver.find_element(
    By.ID, "my-text"
)
all_fields = driver.find_elements(
    By.TAG_NAME, "input"
)
```
<!-- {: data-highlight="find_elements"} -->

`find_element()` raises when missing; `find_elements()` returns an empty list.

See: [Finding web elements](https://www.selenium.dev/documentation/webdriver/elements/finders/)

### Scoped and shadow DOM

```python
form = driver.find_element(By.ID, "form")
field = form.find_element(
    By.NAME, "my-text"
)
host = driver.find_element(By.ID, "host")
inner = host.shadow_root.find_element(
    By.CSS_SELECTOR, "button"
)
```

Search inside an element or shadow root to narrow scope.

See: [Finding web elements](https://www.selenium.dev/documentation/webdriver/elements/finders/)

### CSS selectors

```python
buttons = driver.find_elements(
    By.CSS_SELECTOR,
    "form button[type=submit]"
)
```
<!-- {: data-highlight="By.CSS_SELECTOR"} -->

CSS selectors suit ids, classes, and structural queries.

See: [Locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/)

### XPath locators

```python
totals = driver.find_elements(
    By.XPATH,
    "//tr[contains(@class,'total')]"
)
```
<!-- {: data-highlight="By.XPATH"} -->

Use XPath when the target depends on text or ancestor position.

See: [Locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/)

[XPath cheatsheet](./xpath)
<!-- {: .-crosslink} -->

### Relative locators

```python
from selenium.webdriver.support \
    import relative_locator as rel

locator = rel.locate_with(
    By.TAG_NAME, "input"
)
field = locator.above({By.ID: "password"})
```

Relative locators describe position next to another element.

See: [Locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/)

## Interacting
<!-- {: .-three-column} -->

### Click, type, clear

```python
field = driver.find_element(
    By.NAME, "my-text"
)
field.send_keys("Selenium")
field.clear()
field.send_keys("Selenium 4.53")
driver.find_element(
    By.CSS_SELECTOR, "button"
).click()
```

Element commands cover the everyday interaction surface.

See: [Interacting with web elements](https://www.selenium.dev/documentation/webdriver/elements/interactions/)

### Select lists

```python
from selenium.webdriver.support import ui

select = ui.Select(
    driver.find_element(By.ID, "car")
)
select.select_by_value("volvo")
select.select_by_visible_text("Saab")
select.select_by_index(2)
```
<!-- {: data-highlight="select_by_value, select_by_visible_text, select_by_index"} -->

`deselect_all()` is available only on multi-selects.

See: [Select lists](https://www.selenium.dev/documentation/webdriver/support_features/select_lists/)

### Element information

```python
field = driver.find_element(By.ID, "msg")
field.text
field.get_attribute("class")
field.is_displayed()
field.is_enabled()
```

Read these properties to assert state after an interaction.

See: [Element information](https://www.selenium.dev/documentation/webdriver/elements/information/)

### Keyboard actions

```python
from selenium.webdriver import (
    ActionChains,
)
from selenium.webdriver.common.keys \
    import Keys

field.send_keys(Keys.ENTER)
ActionChains(driver).key_down(
    Keys.SHIFT
).send_keys("abc").key_up(
    Keys.SHIFT
).perform()
```

`key_down()` and `key_up()` hold a modifier during other input.

See: [Actions API](https://www.selenium.dev/documentation/webdriver/actions_api/)

### Mouse actions

```python
from selenium.webdriver import (
    ActionChains,
)

menu = driver.find_element(By.ID, "menu")
item = driver.find_element(By.ID, "item")
ActionChains(driver).move_to_element(
    menu
).pause(0.5).click(item).perform()
```

Chain moves, pauses, drags, and scrolls, then call `perform()`.

See: [Mouse actions](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/)

### JavaScript execution

```python
title = driver.execute_script(
    "return document.title"
)
snapshot = driver.accessibility_snapshot()
print(snapshot.to_text())
```
<!-- {: data-highlight="execute_script"} -->

The 4.53 snapshot returns a node whose `to_text()` gives accessibility text.

See: [Browser interactions](https://www.selenium.dev/documentation/webdriver/interactions/)

## Waiting
<!-- {: .-three-column} -->

### Implicit wait

```python
driver.implicitly_wait(0.5)
```

Applies to every lookup in the session; don't mix it with explicit waits.

See: [Waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)

### Explicit wait

```python
from selenium.webdriver.support import ui

wait = ui.WebDriverWait(driver, 10)
element = wait.until(
    lambda d: d.find_element(By.ID, "msg")
)
```

Poll up to 10 seconds for a truthy result; `until_not()` inverts it.

See: [Waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)

### Expected conditions

```python
from selenium.webdriver.support \
    import expected_conditions as EC
from selenium.webdriver.support import ui

wait = ui.WebDriverWait(driver, 10)
wait.until(EC.title_is("Selenium"))
wait.until(
    EC.visibility_of_element_located(
        (By.ID, "msg")
    )
)
```

Prefer conditions over raw lookups; they ignore missing elements while polling.

See: [Expected conditions](https://www.selenium.dev/documentation/webdriver/support_features/expected_conditions/)

### Custom conditions

```python
from selenium.webdriver.support.ui \
    import WebDriverWait

wait = WebDriverWait(
    driver, 10, poll_frequency=0.5
)
wait.until(
    lambda d: len(d.find_elements(
        By.CSS_SELECTOR, ".done"
    )) > 2
)
```

Any callable returning a truthy value works as a condition.

See: [Python API](https://www.selenium.dev/selenium/docs/api/py/)

## Contexts
<!-- {: .-three-column} -->

### Windows and tabs

```python
driver.switch_to.new_window("tab")
driver.switch_to.window(
    driver.window_handles[0]
)
driver.close()
```

`close()` ends the current context; `quit()` ends the whole session.

See: [Windows and tabs](https://www.selenium.dev/documentation/webdriver/interactions/windows/)

### Frames

```python
frame = driver.find_element(
    By.TAG_NAME, "iframe"
)
driver.switch_to.frame(frame)
driver.switch_to.parent_frame()
driver.switch_to.default_content()
```
<!-- {: data-highlight="default_content()"} -->

Return to the top document before locating page-level elements.

See: [Frames](https://www.selenium.dev/documentation/webdriver/interactions/frames/)

### Alerts

```python
from selenium.webdriver.support import ui
from selenium.webdriver.support \
    import expected_conditions as EC

alert = ui.WebDriverWait(
    driver, 10
).until(EC.alert_is_present())
print(alert.text)
alert.accept()
```

Use `dismiss()` to cancel, or `send_keys()` to answer a prompt.

See: [Alerts](https://www.selenium.dev/documentation/webdriver/interactions/alerts/)

### Cookies

```python
driver.add_cookie(
    {"name": "n", "value": "v"}
)
cookie = driver.get_cookie("n")
cookies = driver.get_cookies()
driver.delete_cookie("n")
driver.delete_all_cookies()
```
<!-- {: data-highlight="add_cookie"} -->

Navigate to the cookie's domain before adding one.

See: [Cookies](https://www.selenium.dev/documentation/webdriver/interactions/cookies/)

## Session options

### Browser options

```python
from selenium import webdriver

options = webdriver.ChromeOptions()
options.add_argument("--headless=new")
options.page_load_strategy = "eager"
driver = webdriver.Chrome(options=options)
```
<!-- {: data-highlight="page_load_strategy"} -->

Page-load strategy controls navigation, not clicks on elements.

See: [Browser options](https://www.selenium.dev/documentation/webdriver/drivers/options/)

### BiDi capability

```python
from selenium import webdriver

options = webdriver.ChromeOptions()
options.enable_bidi = True
driver = webdriver.Chrome(options=options)
```
<!-- {: data-highlight="enable_bidi"} -->

Enable BiDi before using `driver.script` or `driver.network`.

See: [WebDriver BiDi](https://www.selenium.dev/documentation/webdriver/bidi/)

## Output and diagnostics
<!-- {: .-three-column} -->

### Screenshots and PDF

```python
from selenium.webdriver.common \
    import print_page_options as pp

driver.save_screenshot("page.png")
element = driver.find_element(
    By.TAG_NAME, "body"
)
element.screenshot("body.png")
pdf = driver.print_page(pp.PrintOptions())
```
<!-- {: data-highlight="save_screenshot"} -->

Full-page capture needs Firefox classic or WebDriver BiDi; `print_page()` returns a PDF string.

See: [Screenshots](https://www.selenium.dev/documentation/guides/screenshots/)

### Console and JS errors

```python
logs = []
script = driver.script
script.add_console_message_handler(
    logs.append
)
script.add_javascript_error_handler(
    logs.append
)
```

Both handlers need BiDi enabled before use.

See: [Logging](https://www.selenium.dev/documentation/guides/logging/)

### Network handlers

```python
def on_request(request):
    print(request.url)

driver.network.add_request_handler(
    "before_request", on_request
)
```

The callback receives each outgoing request; BiDi must be enabled.

See: [Network guide](https://www.selenium.dev/documentation/guides/network/)

### Driver diagnostics

```python
import logging

logging.getLogger("selenium").setLevel(
    logging.DEBUG
)
```

Shows the WebDriver commands sent by the Python client.

See: [Logging Selenium commands](https://www.selenium.dev/documentation/webdriver/troubleshooting/logging/)
