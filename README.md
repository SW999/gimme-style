# GimmeStyle

Tool for developers.

Effortlessly investigate the CSS styles of any hovered element on any site (I want to believe) with **GimmeStyle**.
Additionally, you can copy the CSS, along with CSS of the children elements and HTML code, with just one click.

[![demo](https://github.com/SW999/gimme-style/assets/3176886/1d07f1fd-ad78-4a2d-987b-9844ba61c3c1)](https://sw999.github.io/gimme-style/)

## Why?

Browser DevTools can be tricky to use, especially when you need to quickly find all the styles of a selected element or copy the markup and styles (including those of nested elements) of a complex site component.

While this isn't a common task, it can be necessary at times. **GimmeStyle** is designed precisely for these situations.

## Usage

Just drag **GimmeStyle** button from the [Demo page](https://sw999.github.io/gimme-style/) to the bookmarks panel of your browser.

Click on this bookmark will activate *GimmeStyle* script on any page.

The second click on the bookmark (esc or button with a cross) will close **GimmeStyle** script.

# Features

* Nothing to install, just simple bookmarklet
* Zero dependencies. Made via JavaScript
* It merges rules for the same selector
* It merges rules for the same selector in same @media
* It adds inline styles
* Easy way to copy interesting styles (including children styles) and HTML

# Known issues

* Popup adds horizontal scrollbar in some cases
* It does not work for local pages because of security rules (JavaScript in the browser doesn't have access to local files). Please restart your browser with the flag **"--allow-file-access-from-files"** to fix such issue.
* May not work for sites with third-party styles, especially for sites with insecure (HTTP) connection (or depending on the server security settings). A workaround may have used a proxy service, but such cases are not currently supported.

## License

MIT © 2024 Sergey Vaitehovich ![Version Badge](https://img.shields.io/badge/version-v0.9.11-brightgreen)
