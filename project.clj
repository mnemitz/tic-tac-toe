(defproject tic-tac-toe "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license "UNLICENSED"

  :cljsbuild {:builds [{:id "dev"
  :source-paths ["src"] ;; This should probably be revised
  ;;:figwheel true
  :compiler
  {:optimizations :none
    :output-to "resources/public/javascripts/dev.js"
    :output-dir "resources/public/javascripts/cljs-dev"
    :pretty-print true
    :source-map true}}]}

  :plugins [[lein-cljsbuild "1.1.7"]
            #_[lein-figwheel "0.5.16"]]

  :dependencies [
    [org.clojure/clojure "1.8.0"]
    [clj-http-lite "0.3.0"]
    [org.clojure/clojurescript "1.10.339"]
    [reagent "0.8.1"]
  ]


  :main tic-tac-toe.core)
