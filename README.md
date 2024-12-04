# DukeLine Coach Support Platform

## Introduction

This application is a platform designed for **DukeLine**, an anonymous peer mental health textline at Duke University. It aims to assist coaches in better supporting their callers by providing tools to submit post-call client summaries and view past client call summaries. The integration with the OpenAI GPT API allows coaches to gain a better understanding of a client's history and identify which specific therapy techniques have been effective.This application was developed to enhance the support provided by DukeLine coaches, integrating advanced AI technologies to facilitate better mental health assistance to better serve the Duke student community.

## Features

- **Submit Post-Call Summaries**: Coaches can create detailed summaries after each call, documenting important information about the client and the interaction.
- **View Past Summaries**: Access a history of all past call summaries to track client progress over time.
- **GPT-Powered Summaries**: Utilize OpenAI's GPT API to generate dynamic summaries, providing insights into the client's history, struggles, and effective strategies.
- **Secure Authentication**: Coaches can securely log in to the platform to access and manage call summaries.
- **Responsive Interface**: A user-friendly frontend built with React.js ensures seamless interaction and real-time updates.

## Tech Stack

### Backend

- **Ruby on Rails**: Provides a robust framework for handling database interactions, API endpoints, and business logic.
- **PostgreSQL**: Serves as the relational database management system for storing user and review data.
- **OpenAI GPT API**: Integrated using the `ruby-openai` gem to generate AI-powered summaries.

### Frontend

- **React.js**: Offers a dynamic and responsive user interface.
- **Axios**: Handles HTTP requests to the backend API.
- **React Router**: Manages client-side routing for seamless navigation.
- **CSS**: Styles the application for an intuitive user experience.

## Application Structure

### Backend Components

#### Models

- **User**
  - Represents a coach using the platform.
  - Associations: `has_many :reviews`

- **Review**
  - Represents a post-call client summary.
  - Associations: `belongs_to :user`

#### Controllers

- **UsersController**
  - `index`, `create`, `show`: Manage user data and authentication.

- **ReviewsController**
  - `index`, `create`, `show`, `update`, `destroy`: Handle CRUD operations for reviews.
  - `summary`: Generates GPT-based summaries of reviews.

#### Routes

- RESTful routes for users and reviews.
- Custom route for summaries:


#### Services

- **OpenAI Integration**
- Utilizes the `ruby-openai` gem.
- Handles API calls to generate summaries.
- Error handling for rate limits and API exceptions.

### Frontend Components

#### Pages

- **LoginPage**
- Coaches can authenticate using their credentials.

- **ReviewsPage**
- Displays a list of past call summaries.
- Shows GPT-generated summaries at the top of the page.
- Allows deletion and updating of existing summaries.

- **CreateReviewPage**
- Form for submitting new post-call client summaries.

- **UpdateReviewPage**
- Edit and update existing call summaries.

#### Services

- **`userService.js`**
- API calls related to user authentication and data retrieval.

- **`reviewService.js`**
- API calls for reviews and summaries.
- Functions: `getReviews`, `createReview`, `getReview`, `updateReview`, `deleteReview`, `getSummaries`.

