# jacob-thompson.github.io

Source code for my personal website, hosted at [jacob-thompson.github.io](https://jacob-thompson.github.io).

## Running Locally

### Install Dependencies

#### Ubuntu/Debian
```bash
sudo apt install ruby-dev ruby-bundler nodejs
```

#### macOS
```bash
brew install ruby
brew install node
gem install bundler
```

### Run

```bash
bundle install
jekyll serve -l -H localhost
```

### Docker

You can use the provided `Dockerfile` to build a container that will run the site for you if you have [Docker](https://www.docker.com/) installed.

#### Build
```bash
docker build -t jekyll-site .
```

#### Run
```bash
docker run -p 4000:4000 --rm -v $(pwd):/usr/src/app jekyll-site
```
