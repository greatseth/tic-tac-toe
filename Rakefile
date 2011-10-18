require 'rubygems'
require 'bundler'
Bundler.setup :development, :test

namespace :compass do
  task :watch do
    system "compass watch ."
  end
end

namespace :test do
  task :jasmine do
    system "launchy -a browser test/SpecRunner.html"
  end
end

task :default => "test:jasmine"
