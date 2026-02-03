# Chrislearn's Blog

Personal blog built with [Hugo](https://gohugo.io/) and the [Mistiness](https://github.com/kakawait/hugo-mistiness-theme) theme.

## Quick Start

### Prerequisites

- [Hugo](https://gohugo.io/installation/) v0.155.1 or later

### Local Development

```bash
# Clone with submodules (for theme)
git clone --recursive https://github.com/chrislearn/blog.git
cd blog

# Start development server
hugo server -D

# Build for production
hugo
```

The site will be available at `http://localhost:1313/`.

## Project Structure

```
.
├── archetypes/     # Content templates
├── content/
│   └── posts/      # Blog posts
├── static/         # Static assets (images, CSS, JS)
├── themes/
│   └── mistiness/  # Blog theme
├── config.toml     # Hugo configuration
└── netlify.toml    # Netlify deployment configuration
```

## Deployment

This blog is automatically deployed to [Netlify](https://www.netlify.com/) on push to the master branch.

Live site: https://www.chrislearn.im/

## License

Content: All rights reserved.
