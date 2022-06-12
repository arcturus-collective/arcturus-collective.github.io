# Running locally

## Running with Ruby

Jekyll is a Ruby gem. First, install Ruby on your machine. Then, with Ruby
installed, install Jekyll from the terminal:

```sh
gem install jekyll bundler
```

Now, you can build and run the site by running the following command:

```sh
bundle exec jekyll serve
```

Whenever a change is made locally, Jekyll will automatically rebuild the site.

## Running with Docker

You can run the website using the official jekyll docker image. First, make sure
that docker is installed. Then:

```sh
docker-compose up
```
