---
excerpt: Lorem ipsum
facts:
  Year: '2019'
  Role: Concept, film setup and development
  Built with: Ember.js
  Shown at: ag—prop 11th anniversary party, Berlin
metaDescription: Retro games controlled by you phone
metaTitle: Flimmerkasten
position: 4
previewImage: '/assets/projects/flimmerkasten/flimmerkasten_preview.jpg'
subtitle: Retro games on tube TVs controlled by you phone
title: Flimmerkasten
visible: true
tags: ['ember.js', 'WebRTC']
---

The body is rendered to HTML with [marked](https://marked.js.org) and inserted
into the page as-is, so everything below is available in any `content/**/*.md`
file — projects and pages alike.

## Headings

`#` through `######` map to `h1`–`h6`. The project title is already an `h1` in
the detail header, so bodies should start at `##`.

### Third level

#### Fourth level

##### Fifth level

###### Sixth level

## Text

Paragraphs are separated by a blank line. Inside a paragraph you have **bold**,
_italic_, **_both_**, ~~strikethrough~~, `inline code` and super/subscript via
raw HTML: H<sub>2</sub>O, x<sup>2</sup>.

A single newline does _not_ become a line break — the two halves of this
sentence
end up in the same line. Use a backslash at the end of the line\
or a `<br />` tag<br />
to force one.

Special characters need no escaping: & < > "quotes" 'apostrophes' — em dashes,
… ellipses, © ® ™. To show markdown syntax literally, escape it with a
backslash: \*not italic\* and \`not code\`.

## Links

An [inline link](https://wiedenmann.cc), a link with a
[title attribute](https://wiedenmann.cc 'Shown on hover'), a
[reference-style link][ref], a relative link to
[another project](/projects/mint-ec), an anchor to
[a heading on this page](#tables) and a bare autolink:
<https://github.com/kennstenicht>.

[ref]: https://emberjs.com

## Lists

- Unordered items use `-`, `*` or `+`
- Items can wrap across lines as long as the continuation is indented
- Nesting works with two spaces:
  - second level
    - third level
- Items may contain **formatting**, `code` and [links](/about)

1. Ordered lists use numbers
2. The numbers you write are ignored — the output is always sequential
3. Mixed nesting works too:
   - unordered inside ordered

Task lists render as disabled checkboxes:

- [x] shipped
- [ ] still open

Definition-style content needs raw HTML:

<dl>
  <dt>Term</dt>
  <dd>Description of the term.</dd>
</dl>

## Images

A plain image, styled by `elements.image.css` (`max-width: 100%`):

![A chin-chin installation in action](/assets/projects/chin-chin/installation-in-action.jpg)

Images in a list — the pattern the existing projects use for stacking several
shots after each other:

- ![Installation setup](/assets/projects/chin-chin/installation-setup.jpg)
- ![Installation in action](/assets/projects/chin-chin/installation-in-action.jpg)

A captioned image needs raw HTML, since markdown has no figure syntax:

<figure>
  <img src="/assets/home/love-for-details.jpg" alt="Love for details, in 16-bit pixel art" />
  <figcaption>figcaption text sits underneath the image.</figcaption>
</figure>

A linked image: [![Portrait](/assets/home/i-am.jpg)](/about)

## Quotes

> Blockquotes are written with `>` and can span
> several lines.
>
> > Nested quotes work as well.

## Code

Indented or fenced code both work; fenced is preferred because it takes a
language:

```js
export function getBem(styles) {
  return (element, modifier) => resolve(styles, element, modifier);
}
```

```bash
pnpm start
```

A fence without a language renders as plain `pre`:

```
no highlighting, just preformatted text
```

## Tables

| Field     | Rendered as         | Markdown? |
| --------- | ------------------- | --------- |
| `title`   | plain text `h1`     | no        |
| `excerpt` | raw HTML            | no        |
| body      | HTML via marked     | yes       |
| `tags`    | joined with `" & "` | no        |

Alignment is set per column with colons:

| left | center | right |
| :--- | :----: | ----: |
| a    |   b    |     c |

## Rules

Three or more dashes on their own line become an `hr`:

---

## Raw HTML

Any HTML passes through untouched, which is the escape hatch for anything
markdown cannot express — `<video>`, `<iframe>`, `<details>`, tables with
`colspan`, and so on.

<details>
  <summary>A collapsible section</summary>

Content inside `details` needs a blank line above it to be parsed as markdown
again — otherwise it stays literal text.

</details>

Video is the most common case — `elements.video.css` already styles the element,
so it only needs a file under `public/assets/`:

```html
<video
  controls
  muted
  loop
  playsinline
  poster="/assets/projects/<id>/poster.jpg"
>
  <source src="/assets/projects/<id>/clip.mp4" type="video/mp4" />
</video>
```

Two caveats for raw HTML in content:

1. It cannot use the app's CSS-module classes. Those class names are hashed in
   production builds, so a `class="c-project-detail__wrapper"` written here
   would not match anything. Only element styles (`h1`–`h6`, `a`, `img`,
   `video`, `button`, `label`, `textarea`) and inline `style` attributes apply.
2. The content is inserted with `{{{ }}}`, so it is never escaped. That is fine
   for authored content in this repository, but do not paste HTML from
   untrusted sources into it.

## What is not styled yet

The global stylesheet gives every block element a bottom margin and indents
lists, and it styles headings, links, images and video. It has no rules for
`blockquote`, `pre`/`code`, `table`, `hr` or `dl`, so those currently render
with browser defaults — worth adding to `app/assets/styles/elements/` if this
project starts using them.
