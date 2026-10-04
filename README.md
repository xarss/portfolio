# Guilherme Schwarz — portfolio

One-page static portfolio: plain HTML, CSS and vanilla JS, no build step.

```
index.html          page skeleton (title/description for SEO live here)
css/style.css       design: both themes (dark + light) and category colors
js/theme.js         light/dark/system switching (loaded in <head>, no flash)
js/main.js          renders the page from the data file
data/portfolio.js   ALL the text: profile, categories, projects, experience, about
assets/projects/    project photos
```

## Edit the content

Open `data/portfolio.js`. Everything on the page comes from there.

- **Add a project**: copy an object in `projects`, set its `category` to a category `id`.
- **Add a photo**: put the file in `assets/projects/` (about 1400px wide, JPEG) and add
  `{ src: "assets/projects/name.jpg", alt: "..." }` to the project's `images`.
  Two or more images show a small thumbnail strip. Photos only download when a project is opened.
- **Add a game link** (e.g. itch.io): add `{ label: "itch.io", url: "..." }` to the project's `links`.
- **Add or reorder a category**: edit `categories`. Order in the array is the order on the page
  and in the top menu. Pick its `color` from `red`, `orange`, `yellow`, `green`, `blue`, `purple`,
  `cyan` or `pink` (the VS Code theme colors).
- **Color words inside any text**: write `{color:words}`, e.g. `cut from {red:6 hours} to {green:minutes}`.
  Experience uses red for the "before" numbers and green for the good results.
- **Open a project from a link**: `index.html#rifa-no-pix` (the title, lowercased with dashes).

## Mobile

At 1040px wide and below the menu becomes a hamburger dropdown (name, theme icon and hamburger in a
sticky header). The menu closes when a link is tapped, on Escape, or when tapping outside it. Phones
(640px and below) also get tighter spacing. Breakpoints are at the bottom of `css/style.css`
(and `min-width: 1041px` in `js/main.js` must match the 1040px one).

## Themes

The default follows the device's light/dark setting. The button in the header shows the theme you are
seeing (sun = light, moon = dark) and switches to the other one. A choice different from the device's
is remembered; switching back to the device's theme goes back to following the device. Dark uses the
VS Code theme colors; light uses Catppuccin Latte. Both live at the top of `css/style.css`: edit the variables in `:root` (dark) or
`:root[data-theme="light"]` (light). Pale accents are darkened when used as text in the light theme
(the `--k-*` values) so they stay readable.

## Preview

Open `index.html` in a browser (no server needed).

## Publish

Push to a GitHub repo and enable GitHub Pages on the main branch.
