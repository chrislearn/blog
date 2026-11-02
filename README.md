# Chrislearn's Blog

Personal blog built with [Hugo](https://gohugo.io/) and the [Mistiness](https://github.com/kakawait/hugo-mistiness-theme) theme.

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.169.0 (the theme compiles SCSS)

### Local Development

```bash
# The customized theme is included in this repository
git clone https://github.com/chrislearn/blog.git
cd blog

# Start development server
hugo server -D

# Build for production
hugo --gc --minify
```

The site will be available at `http://localhost:1313/`.

On Windows, keep generated files and caches on D: by setting these variables
before running either command:

```powershell
$env:HUGO_PUBLISHDIR = 'D:/BuildCache/blog/public'
$env:HUGO_CACHEDIR = 'D:/BuildCache/blog/hugo-cache'
$env:HUGO_RESOURCEDIR = 'D:/BuildCache/blog/resources'
$env:TEMP = 'D:/BuildCache/blog/tmp'
$env:TMP = $env:TEMP
New-Item -ItemType Directory -Force -Path $env:TEMP | Out-Null
```

## Project Structure

```
.
├── archetypes/     # Content templates
├── content/
│   └── posts/      # Blog posts
├── static/         # Static assets (images, CSS, JS)
├── themes/
│   └── mistiness/  # Blog theme
├── config.toml     # Hugo configuration and production URL
└── static/_redirects # Cloudflare Pages redirects
```

## Deployment

This blog is automatically deployed by [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/)
using its GitHub integration. The project is `chrislearn-blog`, with the default
hostname [chrislearn-blog.pages.dev](https://chrislearn-blog.pages.dev/).
The previous Netlify project's automatic builds are stopped.

Build configuration:

- Repository: `chrislearn/blog`
- Production branch: `main`
- Framework preset: Hugo
- Build command: `hugo --gc --minify`
- Build output directory: `public`
- Root directory: repository root
- Environment variables (set for both Production and Preview):
  - `HUGO_VERSION=0.169.0`
  - `HUGO_ENVIRONMENT=production`
  - `HUGO_ENABLEGITINFO=true`

Pushes to `main` trigger production deployments; other branches and pull requests
can receive preview deployments. The configured base URL remains the production
domain, including in preview metadata and feeds.

In the Pages project's **Custom domains**, add `chris.veco.id` and activate the
Cloudflare-managed CNAME to the project's `*.pages.dev` hostname. Associate the
domain with Pages before adding the DNS record. The existing `/` to `/posts/`
temporary redirect is provided by `static/_redirects`.

Live site: [chris.veco.id](https://chris.veco.id/)

## License

Content: All rights reserved.
