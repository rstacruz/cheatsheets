---
title: Rspec-rails
layout: default
---

### Require

    require 'spec_helper'

### Controller tests

    # spec/controllers/*
    describe ItemsController do
      it "works" do
        get :index
        expect(response).to be_success
        expect(response.status).to eq(200)
        expect(response).to render_template("index")
      end

      it "loads all of the posts into @posts" do
        post1, post2 = Post.create!, Post.create!
        get :index

        expect(assigns(:posts)).to match_array([post1, post2])
      end
    end

### Request specs

    # spec/features/*
    describe "Foo tests", type: :request do
      include RequestHelpers

      it "should work" do
        visit "/"
        expect(page).to have_content "Hello"
        expect(page).to have_selector "h1", text: "Welcome"
      end
    end

### View specs

    # spec/views/*
    it "renders _event partial for each event" do
      assign(:events, [stub_model(Event), stub_model(Event)])
      render
      expect(view).to render_template(:partial => "_event", :count => 2)
    end

### Routes

    # spec/routes/*
    describe "routing to profiles" do
      it "routes /profile/:username to profile#show for username" do
        expect(get: "/profiles/jsmith").to route_to(
          :controller => "profiles",
          :action => "show",
          :username => "jsmith"
        )
      end

      it "does not expose a list of profiles" do
        expect(:get => "/profiles").not_to be_routable
      end
    end

### Helpers

    # spec/helpers/*
    describe EventsHelper do
      describe "#link_to_event" do
        it "displays the title, and formatted date" do
          event = Event.new("Ruby Kaigi", Date.new(2010, 8, 27))
          # helper is an instance of ActionView::Base configured with the
          # EventsHelper and all of Rails' built-in helpers
          expect(helper.link_to_event).to match /Ruby Kaigi, 27 Aug, 2010/
        end
      end
    end
