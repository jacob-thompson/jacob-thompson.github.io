# jacob-thompson.github.io

Source code for my personal website, hosted at [jacob-thompson.github.io](https://jacob-thompson.github.io).

## Running Locally

### Install Dependencies

Linux:
```bash
sudo apt install ruby-dev ruby-bundler nodejs
```

MacOS:
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

Working from a different OS, or just want to avoid installing dependencies? You can use the provided `Dockerfile` to build a container that will run the site for you if you have [Docker](https://www.docker.com/) installed.

Start by build the container:

```bash
docker build -t jekyll-site .
```

Next, run the container:
```bash
docker run -p 4000:4000 --rm -v $(pwd):/usr/src/app jekyll-site
```
