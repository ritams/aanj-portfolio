# Aanjaneya Kumar — standalone portfolio

The current portfolio recreated in plain HTML, CSS, and JavaScript, with the same content, Libertinus fonts, layout, publication categories, mobile navigation, and email-copy button. No frameworks, dependencies, build step, or CDN.

## Open locally

Open `index.html` directly, or serve this folder with any static web server. For example, run `python3 -m http.server 4174` in this folder and visit `http://localhost:4174`.

## Edit

- `index.html`: home/about text.
- `publications/index.html`: all 25 publications, already rendered for search engines and visitors without JavaScript. Each article has a `data-categories` attribute. When adding a publication, update the total and category counts in the HTML and the archive date.
- `contact/index.html`: email and academic profiles.
- `assets/styles.css`: shared design and responsive styles.
- `assets/site.js`: publication filtering, keyboard navigation, mobile menu, and email copying.
- `assets/fonts/`: self-hosted Libertinus fonts and their license.

Navigation and footer markup are shared by convention; edit them in all three HTML files. The copy button uses the browser clipboard API, which works on HTTPS and localhost. If copying is unavailable, it displays a message and the email remains selectable.

## GitHub Pages

Publish the **contents of this folder** at the root of a repository, including `.nojekyll`. In repository Settings → Pages, choose **Deploy from a branch**, select the branch containing these files and `/ (root)`, then Save. An existing framework build workflow should be removed or disabled in the standalone repository so it cannot overwrite the static deployment.

Relative links support both a user site such as `aanjaneyak.github.io` and a project subdirectory. No domain or deployment path is hardcoded. The HTML includes page titles, descriptions, Open Graph metadata, and Person structured data. All content is available without JavaScript; category filtering requires JavaScript.

This is a separate copy. It does not change the existing app or its deployment.
